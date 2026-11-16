import {
  ExchangeLiveStatus,
  MarketSessionStatus,
  WorldExchange,
} from "../types/exchange";

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
      month: "short",
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

    const hour = parseInt(getVal("hour"), 10) || 0;
    const minute = parseInt(getVal("minute"), 10) || 0;
    const second = parseInt(getVal("second"), 10) || 0;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const timeString = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
    const dateString = `${weekdayStr}, ${getVal("month")} ${getVal("day")}`;

    return {
      dayOfWeek,
      hour,
      minute,
      second,
      timeString,
      dateString,
    };
  } catch {
    // Fallback if timezone not supported in environment
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return {
      dayOfWeek: date.getDay(),
      hour,
      minute,
      second,
      timeString: `${pad(hour)}:${pad(minute)}:${pad(second)}`,
      dateString: date.toLocaleDateString(),
    };
  }
}

/**
 * Calculates days and minutes until the next active trading session
 */
function getMinutesUntilNextTradingDayOpen(
  currentDay: number,
  currentMinutes: number,
  tradingDays: number[],
  openMinutes: number,
): number {
  for (let offset = 1; offset <= 7; offset++) {
    const candidateDay = (currentDay + offset) % 7;
    if (tradingDays.includes(candidateDay)) {
      const minutesRemainingToday = 24 * 60 - currentMinutes;
      const intermediateDaysMinutes = (offset - 1) * 24 * 60;
      return minutesRemainingToday + intermediateDaysMinutes + openMinutes;
    }
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

  let status: MarketSessionStatus = "CLOSED";
  let statusLabel = "Closed";
  let nextEvent = "Closed";
  let minutesToNextEvent = 0;
  let isRegularOpen = false;

  if (!isTradingDay) {
    status = "WEEKEND";
    statusLabel = "Weekend Closed";
    minutesToNextEvent = getMinutesUntilNextTradingDayOpen(
      localTime.dayOfWeek,
      currentMinutes,
      exchange.tradingDays,
      openMin,
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
    // Current day after close, wait for next trading day open
    status = "CLOSED";
    statusLabel = "Closed";
    minutesToNextEvent = getMinutesUntilNextTradingDayOpen(
      localTime.dayOfWeek,
      currentMinutes,
      exchange.tradingDays,
      openMin,
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
