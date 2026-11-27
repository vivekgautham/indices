import { GLOBAL_MARKET_HOLIDAYS, type GlobalHoliday } from "../data/globalMarketHolidays.ts";
import type {
  ExchangeLiveStatus,
  MarketSessionStatus,
  WorldExchange,
} from "../types/exchange.ts";
import { getUsMarketHolidays } from "./marketCalendarEngine.ts";

/**
 * Converts "HH:MM" string to minutes from midnight
 */
export function timeStringToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
}

/**
 * Formats minutes remaining into human-readable e.g. "2h 15m", "42m", "1d 4h"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 0) return "0m";
  const days = Math.floor(minutes / (24 * 60));
  const remainingAfterDays = minutes % (24 * 60);
  const hours = Math.floor(remainingAfterDays / 60);
  const mins = Math.floor(remainingAfterDays % 60);

  if (days > 0) {
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }
  if (hours > 0) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${mins}m`;
}

interface LocalTimeInfo {
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 6=Sat
  hour: number;
  minute: number;
  second: number;
  timeString: string; // "HH:MM:SS"
  dateString: string; // e.g. "Mon, Nov 16"
  isoDate: string; // "YYYY-MM-DD"
  year: number;
  month: number;
  day: number;
}

/**
 * Extracts local date and time components for a given IANA timezone
 */
export function getExchangeLocalTime(
  date: Date,
  timeZone: string,
): LocalTimeInfo {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const getVal = (type: string) =>
      parts.find((p) => p.type === type)?.value || "";

    const weekdayStr = getVal("weekday");
    const weekdayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    const dayOfWeek = weekdayMap[weekdayStr] ?? date.getDay();

    const year = parseInt(getVal("year"), 10) || date.getFullYear();
    const month = parseInt(getVal("month"), 10) || date.getMonth() + 1;
    const day = parseInt(getVal("day"), 10) || date.getDate();
    const hour = parseInt(getVal("hour"), 10) || 0;
    const minute = parseInt(getVal("minute"), 10) || 0;
    const second = parseInt(getVal("second"), 10) || 0;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const timeString = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateString = `${weekdayStr}, ${monthNames[month - 1] || getVal("month")} ${day}`;
    const isoDate = `${year}-${pad(month)}-${pad(day)}`;

    return {
      dayOfWeek,
      hour,
      minute,
      second,
      timeString,
      dateString,
      isoDate,
      year,
      month,
      day,
    };
  } catch {
    // Fallback if timezone not supported in environment
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const isoDate = `${year}-${pad(month)}-${pad(day)}`;
    return {
      dayOfWeek: date.getDay(),
      hour,
      minute,
      second,
      timeString: `${pad(hour)}:${pad(minute)}:${pad(second)}`,
      dateString: date.toLocaleDateString(),
      isoDate,
      year,
      month,
      day,
    };
  }
}

/**
 * Checks if a specific date is a recognized market holiday for this exchange
 */
export function getExchangeHoliday(
  exchange: WorldExchange,
  isoDate: string,
  year?: number,
): GlobalHoliday | { name: string; date: string; country: string } | undefined {
  // 1. Direct match in verified GLOBAL_MARKET_HOLIDAYS dataset
  const match = GLOBAL_MARKET_HOLIDAYS.find((h) => {
    if (h.date !== isoDate) return false;
    if (
      exchange.holidayCalendarExchange &&
      (h.exchange.includes(exchange.holidayCalendarExchange) ||
        exchange.holidayCalendarExchange.includes(h.exchange))
    ) {
      return true;
    }
    if (
      h.country.toLowerCase() === exchange.country.toLowerCase() ||
      (exchange.country === "United States" && h.country === "United States")
    ) {
      return true;
    }
    return false;
  });

  if (match) return match;

  // 2. Algorithmic fallback for U.S. exchanges beyond verified holiday years
  const y = year || parseInt(isoDate.split("-")[0], 10);
  if (
    exchange.country === "United States" ||
    exchange.holidayCalendarExchange === "NYSE / Nasdaq"
  ) {
    const usHolidays = getUsMarketHolidays(y);
    const usMatch = usHolidays.find((h) => h.date === isoDate);
    if (usMatch) {
      return {
        date: usMatch.date,
        name: usMatch.title,
        country: "United States",
      };
    }
  }

  return undefined;
}

/**
 * Calculates days and minutes until the next active trading session,
 * skipping weekends AND scheduled market holidays.
 */
function getMinutesUntilNextActiveTradingOpen(
  exchange: WorldExchange,
  currentMinutes: number,
  openMinutes: number,
  localDate: { year: number; month: number; day: number },
): number {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  for (let offset = 1; offset <= 14; offset++) {
    const candidate = new Date(
      Date.UTC(localDate.year, localDate.month - 1, localDate.day + offset),
    );
    const candidateDay = candidate.getUTCDay();
    const candidateYear = candidate.getUTCFullYear();
    const candidateMonth = candidate.getUTCMonth() + 1;
    const candidateDateNum = candidate.getUTCDate();
    const candidateIso = `${candidateYear}-${pad(candidateMonth)}-${pad(candidateDateNum)}`;

    // Must be a normal trading day (e.g. Monday - Friday)
    if (!exchange.tradingDays.includes(candidateDay)) {
      continue;
    }

    // Must not be a market holiday
    const holiday = getExchangeHoliday(exchange, candidateIso, candidateYear);
    if (holiday) {
      continue;
    }

    // Found the next active trading session
    const minutesRemainingToday = Math.max(0, 24 * 60 - currentMinutes);
    const intermediateDaysMinutes = (offset - 1) * 24 * 60;
    return minutesRemainingToday + intermediateDaysMinutes + openMinutes;
  }

  return 24 * 60;
}

/**
 * Formats exchange local open/close times into user's local timezone
 */
export function formatExchangeHoursInUserTz(exchange: WorldExchange): {
  userLocalOpenTime: string;
  userLocalCloseTime: string;
} {
  try {
    const today = new Date();
    const [openH, openM] = exchange.regularHours.open.split(":").map(Number);
    const [closeH, closeM] = exchange.regularHours.close.split(":").map(Number);

    // Get current offset difference
    const sampleDate = new Date();
    const exchangeDateStr = sampleDate.toLocaleString("en-US", {
      timeZone: exchange.timezone,
    });
    const localDateStr = sampleDate.toLocaleString("en-US");
    const diffMs =
      new Date(localDateStr).getTime() - new Date(exchangeDateStr).getTime();

    // Exchange open date
    const exOpen = new Date(today);
    exOpen.setHours(openH, openM, 0, 0);
    const userOpen = new Date(exOpen.getTime() + diffMs);

    // Exchange close date
    const exClose = new Date(today);
    exClose.setHours(closeH, closeM, 0, 0);
    const userClose = new Date(exClose.getTime() + diffMs);

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return {
      userLocalOpenTime: `${pad(userOpen.getHours())}:${pad(userOpen.getMinutes())}`,
      userLocalCloseTime: `${pad(userClose.getHours())}:${pad(userClose.getMinutes())}`,
    };
  } catch {
    return {
      userLocalOpenTime: exchange.regularHours.open,
      userLocalCloseTime: exchange.regularHours.close,
    };
  }
}

/**
 * Calculates live market session status and countdowns for an exchange
 */
export function getExchangeLiveStatus(
  exchange: WorldExchange,
  now: Date = new Date(),
): ExchangeLiveStatus {
  const localTime = getExchangeLocalTime(now, exchange.timezone);
  const currentMinutes = localTime.hour * 60 + localTime.minute;

  const isTradingDay = exchange.tradingDays.includes(localTime.dayOfWeek);
  const openMin = timeStringToMinutes(exchange.regularHours.open);
  const closeMin = timeStringToMinutes(exchange.regularHours.close);

  let lunchStartMin: number | null = null;
  let lunchEndMin: number | null = null;
  if (exchange.lunchBreak) {
    lunchStartMin = timeStringToMinutes(exchange.lunchBreak.start);
    lunchEndMin = timeStringToMinutes(exchange.lunchBreak.end);
  }

  let preOpenMin: number | null = null;
  if (exchange.preMarket) {
    preOpenMin = timeStringToMinutes(exchange.preMarket.open);
  }

  let postCloseMin: number | null = null;
  if (exchange.postMarket) {
    postCloseMin = timeStringToMinutes(exchange.postMarket.close);
  }

  // Check if today is a recognized market holiday for this exchange
  const todayHoliday = getExchangeHoliday(
    exchange,
    localTime.isoDate,
    localTime.year,
  );

  let status: MarketSessionStatus = "CLOSED";
  let statusLabel = "Closed";
  let nextEvent = "Closed";
  let minutesToNextEvent = 0;
  let isRegularOpen = false;

  if (todayHoliday) {
    status = "HOLIDAY";
    statusLabel = todayHoliday.name;
    minutesToNextEvent = getMinutesUntilNextActiveTradingOpen(
      exchange,
      currentMinutes,
      openMin,
      { year: localTime.year, month: localTime.month, day: localTime.day },
    );
    nextEvent = `Opens in ${formatDuration(minutesToNextEvent)}`;
  } else if (!isTradingDay) {
    status = "WEEKEND";
    statusLabel = "Weekend Closed";
    minutesToNextEvent = getMinutesUntilNextActiveTradingOpen(
      exchange,
      currentMinutes,
      openMin,
      { year: localTime.year, month: localTime.month, day: localTime.day },
    );
    nextEvent = `Opens in ${formatDuration(minutesToNextEvent)}`;
  } else if (
    lunchStartMin !== null &&
    lunchEndMin !== null &&
    currentMinutes >= lunchStartMin &&
    currentMinutes < lunchEndMin
  ) {
    status = "LUNCH";
    statusLabel = "Lunch Break";
    minutesToNextEvent = lunchEndMin - currentMinutes;
    nextEvent = `Resumes in ${formatDuration(minutesToNextEvent)}`;
  } else if (currentMinutes >= openMin && currentMinutes < closeMin) {
    status = "OPEN";
    statusLabel = "Open";
    isRegularOpen = true;

    // Check if lunch is next before market close
    if (lunchStartMin !== null && currentMinutes < lunchStartMin) {
      minutesToNextEvent = lunchStartMin - currentMinutes;
      nextEvent = `Lunch in ${formatDuration(minutesToNextEvent)}`;
    } else {
      minutesToNextEvent = closeMin - currentMinutes;
      nextEvent = `Closes in ${formatDuration(minutesToNextEvent)}`;
    }
  } else if (
    preOpenMin !== null &&
    currentMinutes >= preOpenMin &&
    currentMinutes < openMin
  ) {
    status = "PRE_MARKET";
    statusLabel = "Pre-Market";
    minutesToNextEvent = openMin - currentMinutes;
    nextEvent = `Opens in ${formatDuration(minutesToNextEvent)}`;
  } else if (
    postCloseMin !== null &&
    currentMinutes >= closeMin &&
    currentMinutes < postCloseMin
  ) {
    status = "POST_MARKET";
    statusLabel = "Post-Market";
    minutesToNextEvent = postCloseMin - currentMinutes;
    nextEvent = `Post-market ends in ${formatDuration(minutesToNextEvent)}`;
  } else if (currentMinutes < openMin) {
    status = "CLOSED";
    statusLabel = "Closed";
    minutesToNextEvent = openMin - currentMinutes;
    nextEvent = `Opens in ${formatDuration(minutesToNextEvent)}`;
  } else {
    // Current day after close, wait for next active trading day open
    status = "CLOSED";
    statusLabel = "Closed";
    minutesToNextEvent = getMinutesUntilNextActiveTradingOpen(
      exchange,
      currentMinutes,
      openMin,
      { year: localTime.year, month: localTime.month, day: localTime.day },
    );
    nextEvent = `Opens in ${formatDuration(minutesToNextEvent)}`;
  }

  const userHours = formatExchangeHoursInUserTz(exchange);

  return {
    exchangeId: exchange.id,
    status,
    statusLabel,
    currentLocalTime: localTime.timeString,
    currentLocalDate: localTime.dateString,
    nextEvent,
    minutesToNextEvent,
    isRegularOpen,
    userLocalOpenTime: userHours.userLocalOpenTime,
    userLocalCloseTime: userHours.userLocalCloseTime,
    holidayName: todayHoliday?.name,
  };
}

/**
 * Returns color config for a given market session status
 */
export function getStatusColorConfig(status: MarketSessionStatus): {
  badgeBg: string;
  badgeColor: string;
  dotColor: string;
  border: string;
} {
  switch (status) {
    case "OPEN":
      return {
        badgeBg: "rgba(0, 221, 148, 0.12)",
        badgeColor: "#00DD94",
        dotColor: "#00DD94",
        border: "rgba(0, 221, 148, 0.35)",
      };
    case "LUNCH":
      return {
        badgeBg: "rgba(255, 179, 0, 0.14)",
        badgeColor: "#FFB300",
        dotColor: "#FFB300",
        border: "rgba(255, 179, 0, 0.35)",
      };
    case "PRE_MARKET":
    case "POST_MARKET":
      return {
        badgeBg: "rgba(147, 112, 219, 0.14)",
        badgeColor: "#BA68C8",
        dotColor: "#BA68C8",
        border: "rgba(186, 104, 200, 0.35)",
      };
    case "HOLIDAY":
      return {
        badgeBg: "rgba(239, 68, 68, 0.12)",
        badgeColor: "#F87171",
        dotColor: "#EF4444",
        border: "rgba(239, 68, 68, 0.35)",
      };
    case "WEEKEND":
    case "CLOSED":
    default:
      return {
        badgeBg: "rgba(148, 163, 184, 0.08)",
        badgeColor: "#94a3b8",
        dotColor: "#64748b",
        border: "rgba(148, 163, 184, 0.18)",
      };
  }
}
