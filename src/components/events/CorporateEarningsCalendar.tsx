import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/FileDownload";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LaunchIcon from "@mui/icons-material/Launch";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SearchIcon from "@mui/icons-material/Search";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TodayIcon from "@mui/icons-material/Today";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  CorporateEarningsEvent,
  EARNINGS_SECTORS,
  EarningsTiming,
  getEarningsForMonth,
  groupEarningsByDate,
} from "../../data/corporateEarningsData";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONO_FONT =
  'ui-monospace, "JetBrains Mono", "Roboto Mono", "SF Mono", Menlo, Consolas, monospace';

/**
 * Generates an .ics file download for a corporate earnings announcement
 */
function downloadIcsEarnings(event: CorporateEarningsEvent) {
  try {
    const [year, month, day] = event.date.split("-").map(Number);
    if (!year || !month || !day) return;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dateStr = `${year}${pad(month)}${pad(day)}`;

    const timingStr =
      event.timeOfDay === "BMO"
        ? "Before Market Open (approx 8:00 AM ET)"
        : event.timeOfDay === "AMC"
          ? "After Market Close (approx 4:30 PM ET)"
          : "During Market Hours";

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MarketIndices.xyz//Corporate Earnings Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${event.id}@marketindices.xyz`,
      `DTSTAMP:${dateStr}T120000Z`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `SUMMARY:${event.ticker} Earnings Release (${event.fiscalQuarter})`,
      `DESCRIPTION:${event.companyName} (${event.ticker}) ${event.fiscalQuarter} Earnings Announcement.\\nTiming: ${timingStr}\\nEst EPS: ${event.epsEstimate ?? "N/A"}\\nEst Revenue: ${event.revenueEstimate ?? "N/A"}\\nInvestor Relations: ${event.irUrl}`,
      `URL:${event.irUrl}`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([icsLines.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.ticker}_earnings_${event.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to generate .ics earnings calendar file", err);
  }
}

function downloadIcsNextQuarterEarnings(event: CorporateEarningsEvent) {
  if (!event.nextQuarterDate) return;
  try {
    const dateStr = event.nextQuarterDate.replace(/-/g, "");
    const timing = event.nextQuarterTimeOfDay || event.timeOfDay;
    const timingStr =
      timing === "BMO"
        ? "Before Market Open (approx 8:00 AM ET)"
        : timing === "AMC"
          ? "After Market Close (approx 4:30 PM ET)"
          : "During Market Hours";

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MarketIndices.xyz//Corporate Earnings Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${event.ticker}-next-${dateStr}@marketindices.xyz`,
      `DTSTAMP:${dateStr}T120000Z`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `SUMMARY:${event.ticker} Next Quarter Earnings Release (${event.nextQuarterPeriod || "Projected"})`,
      `DESCRIPTION:${event.companyName} (${event.ticker}) Projected Next Quarter (${event.nextQuarterPeriod || "Next Qtr"}) Earnings Announcement.\\nStatus: ${event.nextQuarterConfirmed ? "CONFIRMED" : "PROJECTED / ESTIMATED"}\\nTiming: ${timingStr}\\nEst EPS: ${event.nextQuarterEpsEstimate ?? "N/A"}\\nEst Revenue: ${event.nextQuarterRevenueEstimate ?? "N/A"}\\nInvestor Relations: ${event.irUrl}`,
      `URL:${event.irUrl}`,
      `STATUS:${event.nextQuarterConfirmed ? "CONFIRMED" : "TENTATIVE"}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([icsLines.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${event.ticker}_next_quarter_earnings_${event.nextQuarterDate}.ics`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to generate next quarter .ics calendar file", err);
  }
}

export const CorporateEarningsCalendar: React.FC = () => {
  const today = useMemo(() => new Date(), []);
  const todayIso = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [today]);

  const [currentYear, setCurrentYear] = useState<number>(() =>
    today.getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    () => today.getMonth() + 1,
  );
  const [viewMode, setViewMode] = useState<"calendar" | "table">("calendar");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [timingFilter, setTimingFilter] = useState<"ALL" | EarningsTiming>(
    "ALL",
  );
  const [selectedEvent, setSelectedEvent] =
    useState<CorporateEarningsEvent | null>(null);

  // Filter events for the current active month
  const rawMonthEvents = useMemo(() => {
    return getEarningsForMonth(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  // Filter events based on search query, sector, and timing
  const filteredMonthEvents = useMemo(() => {
    let list = rawMonthEvents;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.ticker.toLowerCase().includes(q) ||
          e.companyName.toLowerCase().includes(q) ||
          e.sector.toLowerCase().includes(q),
      );
    }

    if (selectedSector !== "All") {
      list = list.filter((e) => e.sector === selectedSector);
    }

    if (timingFilter !== "ALL") {
      list = list.filter((e) => e.timeOfDay === timingFilter);
    }

    return list;
  }, [rawMonthEvents, searchQuery, selectedSector, timingFilter]);

  // Group events by date for calendar view
  const eventsByDate = useMemo(() => {
    return groupEarningsByDate(filteredMonthEvents);
  }, [filteredMonthEvents]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleTodayClick = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
  };

  // Calendar cells generation
  const calendarCells = useMemo(() => {
    const daysInMonth = new Date(
      Date.UTC(currentYear, currentMonth, 0),
    ).getUTCDate();
    const firstDayOfWeek = new Date(
      Date.UTC(currentYear, currentMonth - 1, 1),
    ).getUTCDay();
    const daysInPrevMonth = new Date(
      Date.UTC(currentYear, currentMonth - 1, 0),
    ).getUTCDate();

    interface Cell {
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      events: CorporateEarningsEvent[];
    }

    const cells: Cell[] = [];

    // Trailing days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevM = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevY = currentMonth === 1 ? currentYear - 1 : currentYear;
      const dateStr = `${prevY}-${String(prevM).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: dateStr === todayIso,
        events: [],
      });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: dateStr === todayIso,
        events: eventsByDate[dateStr] || [],
      });
    }

    // Leading days of next month
    const totalCells = cells.length <= 35 ? 35 : 42;
    const remaining = Math.max(0, totalCells - cells.length);
    for (let d = 1; d <= remaining; d++) {
      const nextM = currentMonth === 12 ? 1 : currentMonth + 1;
      const nextY = currentMonth === 12 ? currentYear + 1 : currentYear;
      const dateStr = `${nextY}-${String(nextM).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: false,
        isToday: dateStr === todayIso,
        events: [],
      });
    }

    return cells;
  }, [currentYear, currentMonth, eventsByDate, todayIso]);

  // Calculate timing stats
  const timingStats = useMemo(() => {
    let bmo = 0;
    let amc = 0;
    for (const e of rawMonthEvents) {
      if (e.timeOfDay === "BMO") bmo++;
      if (e.timeOfDay === "AMC") amc++;
    }
    return { bmo, amc, total: rawMonthEvents.length };
  }, [rawMonthEvents]);

  return (
    <Box>
      {/* KPI Stats Bar */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 1.5,
          mb: 3,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 1.75,
            borderRadius: 2.5,
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: "0.68rem",
            }}
          >
            Universe Tracked
          </Typography>
          <Typography
            sx={{
              fontSize: "1.45rem",
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: MONO_FONT,
              mt: 0.25,
            }}
          >
            Top 50 US Mega-Caps
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            S&P 500 &amp; Nasdaq-100 Leaders
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 1.75,
            borderRadius: 2.5,
            backgroundColor: "rgba(99, 102, 241, 0.05)",
            borderColor: "rgba(99, 102, 241, 0.25)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "primary.light",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: "0.68rem",
            }}
          >
            {MONTH_NAMES[currentMonth - 1]} Earnings
          </Typography>
          <Typography
            sx={{
              fontSize: "1.45rem",
              fontWeight: 900,
              color: "primary.light",
              fontFamily: MONO_FONT,
              mt: 0.25,
            }}
          >
            {timingStats.total} Reports
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Scheduled this month
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 1.75,
            borderRadius: 2.5,
            backgroundColor: "rgba(245, 158, 11, 0.05)",
            borderColor: "rgba(245, 158, 11, 0.25)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#fbbf24",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: "0.68rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <WbSunnyIcon sx={{ fontSize: 13 }} /> Before Market Open (BMO)
          </Typography>
          <Typography
            sx={{
              fontSize: "1.45rem",
              fontWeight: 900,
              color: "#fbbf24",
              fontFamily: MONO_FONT,
              mt: 0.25,
            }}
          >
            {timingStats.bmo} Companies
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Pre-market releases (~7:00–8:30 AM ET)
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 1.75,
            borderRadius: 2.5,
            backgroundColor: "rgba(168, 85, 247, 0.05)",
            borderColor: "rgba(168, 85, 247, 0.25)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#c084fc",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: "0.68rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <NightsStayIcon sx={{ fontSize: 13 }} /> After Market Close (AMC)
          </Typography>
          <Typography
            sx={{
              fontSize: "1.45rem",
              fontWeight: 900,
              color: "#c084fc",
              fontFamily: MONO_FONT,
              mt: 0.25,
            }}
          >
            {timingStats.amc} Companies
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Post-market releases (~4:00–5:00 PM ET)
          </Typography>
        </Paper>
      </Box>

      {/* Main Calendar Navigation & View Toolbar */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {/* Month & Year Navigation */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <ButtonGroup
              variant="outlined"
              size="small"
              sx={{
                "& .MuiButton-root": {
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  color: "text.secondary",
                  py: 0.4,
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(99, 102, 241, 0.12)",
                    color: "primary.light",
                  },
                },
              }}
            >
              <Button onClick={handlePrevMonth} aria-label="Previous Month">
                <ChevronLeftIcon sx={{ fontSize: 20 }} />
              </Button>
              <Button onClick={handleTodayClick} startIcon={<TodayIcon />}>
                Today
              </Button>
              <Button onClick={handleNextMonth} aria-label="Next Month">
                <ChevronRightIcon sx={{ fontSize: 20 }} />
              </Button>
            </ButtonGroup>

            <Typography
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.1rem", sm: "1.35rem" },
                color: "#ffffff",
                letterSpacing: "-0.02em",
                pl: 1,
              }}
            >
              {MONTH_NAMES[currentMonth - 1]} {currentYear}
            </Typography>
          </Stack>

          {/* Search & View Mode Switcher */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              size="small"
              placeholder="Search ticker (NVDA, AAPL) or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: { xs: 1, sm: "unset" },
                minWidth: { sm: 260 },
                "& .MuiOutlinedInput-root": {
                  fontSize: "0.8rem",
                  borderRadius: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.12)",
                  },
                },
              }}
            />

            <ButtonGroup
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                p: 0.25,
                "& .MuiButton-root": {
                  border: "none",
                  borderRadius: 1.5,
                  fontWeight: 700,
                  fontSize: "0.76rem",
                  textTransform: "none",
                  px: 1.5,
                  py: 0.4,
                  color: "text.secondary",
                  "&.active": {
                    backgroundColor: "primary.main",
                    color: "#ffffff",
                  },
                },
              }}
            >
              <Button
                className={viewMode === "calendar" ? "active" : ""}
                onClick={() => setViewMode("calendar")}
                startIcon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
              >
                Calendar
              </Button>
              <Button
                className={viewMode === "table" ? "active" : ""}
                onClick={() => setViewMode("table")}
                startIcon={<TableRowsIcon sx={{ fontSize: 16 }} />}
              >
                Table
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>

        {/* Filter Chips: Timing & Sectors */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            mt: 1.5,
            pt: 1.5,
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              fontSize: "0.68rem",
              textTransform: "uppercase",
              color: "text.secondary",
              letterSpacing: "0.06em",
              mr: 0.5,
            }}
          >
            Timing:
          </Typography>
          <Chip
            label="All Timing"
            size="small"
            clickable
            onClick={() => setTimingFilter("ALL")}
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              height: 24,
              backgroundColor:
                timingFilter === "ALL"
                  ? "primary.main"
                  : "rgba(255, 255, 255, 0.05)",
              color: timingFilter === "ALL" ? "#fff" : "text.secondary",
            }}
          />
          <Chip
            icon={<WbSunnyIcon sx={{ fontSize: "13px !important" }} />}
            label="BMO (Before Open)"
            size="small"
            clickable
            onClick={() => setTimingFilter("BMO")}
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              height: 24,
              backgroundColor:
                timingFilter === "BMO"
                  ? "rgba(245, 158, 11, 0.25)"
                  : "rgba(255, 255, 255, 0.05)",
              color: timingFilter === "BMO" ? "#fbbf24" : "text.secondary",
              border:
                timingFilter === "BMO"
                  ? "1px solid #f59e0b"
                  : "1px solid transparent",
            }}
          />
          <Chip
            icon={<NightsStayIcon sx={{ fontSize: "13px !important" }} />}
            label="AMC (After Close)"
            size="small"
            clickable
            onClick={() => setTimingFilter("AMC")}
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              height: 24,
              backgroundColor:
                timingFilter === "AMC"
                  ? "rgba(168, 85, 247, 0.25)"
                  : "rgba(255, 255, 255, 0.05)",
              color: timingFilter === "AMC" ? "#c084fc" : "text.secondary",
              border:
                timingFilter === "AMC"
                  ? "1px solid #a855f7"
                  : "1px solid transparent",
            }}
          />

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 0.5, borderColor: "rgba(255, 255, 255, 0.1)" }}
          />

          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              fontSize: "0.68rem",
              textTransform: "uppercase",
              color: "text.secondary",
              letterSpacing: "0.06em",
              mr: 0.5,
            }}
          >
            Sector:
          </Typography>
          {EARNINGS_SECTORS.map((sector) => {
            const isSelected = selectedSector === sector;
            return (
              <Chip
                key={sector}
                label={sector}
                size="small"
                clickable
                onClick={() => setSelectedSector(sector)}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  height: 24,
                  backgroundColor: isSelected
                    ? "rgba(99, 102, 241, 0.25)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? "primary.light" : "text.secondary",
                  border: isSelected
                    ? "1px solid rgba(99, 102, 241, 0.5)"
                    : "1px solid transparent",
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* Mode 1: Visual Interactive Calendar View */}
      {viewMode === "calendar" && (
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3.5,
            overflow: "hidden",
            borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
            backgroundColor: "rgba(10, 15, 29, 0.5)",
          }}
        >
          {/* Day Names Header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {DAY_NAMES.map((d, i) => (
              <Box
                key={d}
                sx={{
                  py: 1,
                  textAlign: "center",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: i === 0 || i === 6 ? "text.secondary" : "text.primary",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {d}
              </Box>
            ))}
          </Box>

          {/* 7-Column Days Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              gap: "1px",
            }}
          >
            {calendarCells.map((cell, idx) => {
              const isWeekend = idx % 7 === 0 || idx % 7 === 6;
              const hasEvents = cell.events.length > 0;

              return (
                <Box
                  key={cell.dateStr + idx}
                  sx={{
                    minHeight: { xs: 80, sm: 110, md: 125 },
                    p: { xs: 0.5, sm: 1 },
                    backgroundColor: cell.isToday
                      ? "rgba(99, 102, 241, 0.08)"
                      : cell.isCurrentMonth
                        ? isWeekend
                          ? "rgba(15, 23, 42, 0.65)"
                          : "rgba(15, 23, 42, 0.92)"
                        : "rgba(10, 15, 25, 0.4)",
                    opacity: cell.isCurrentMonth ? 1 : 0.35,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "background-color 0.15s ease",
                    "&:hover": {
                      backgroundColor: cell.isCurrentMonth
                        ? "rgba(30, 41, 59, 0.85)"
                        : undefined,
                    },
                  }}
                >
                  {/* Date Number Badge */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                        fontWeight: cell.isToday ? 900 : 700,
                        color: cell.isToday
                          ? "primary.light"
                          : cell.isCurrentMonth
                            ? "text.primary"
                            : "text.secondary",
                        fontFamily: MONO_FONT,
                        ...(cell.isToday && {
                          backgroundColor: "primary.main",
                          color: "#fff",
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                        }),
                      }}
                    >
                      {cell.dayNumber}
                    </Typography>

                    {hasEvents && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.62rem",
                          fontWeight: 800,
                          color: "primary.light",
                          fontFamily: MONO_FONT,
                        }}
                      >
                        {cell.events.length}
                      </Typography>
                    )}
                  </Box>

                  {/* Company Announcement Badges in Day Cell */}
                  <Stack spacing={0.5} sx={{ overflowY: "auto", flex: 1 }}>
                    {cell.events.map((ev) => {
                      const isBmo = ev.timeOfDay === "BMO";
                      return (
                        <Tooltip
                          key={ev.id}
                          title={
                            <Box sx={{ p: 0.5 }}>
                              <Typography
                                sx={{ fontWeight: 800, fontSize: "0.75rem" }}
                              >
                                {ev.ticker} — {ev.companyName}
                              </Typography>
                              <Typography variant="caption" sx={{ display: "block" }}>
                                {ev.fiscalQuarter} • Market Cap: {ev.marketCap} (#{ev.rank})
                              </Typography>
                              <Typography variant="caption" sx={{ display: "block" }}>
                                Timing: {isBmo ? "Before Open (BMO)" : "After Close (AMC)"}
                              </Typography>
                              {ev.epsEstimate !== undefined && (
                                <Typography
                                  variant="caption"
                                  sx={{ display: "block", color: "#34d399" }}
                                >
                                  Consensus EPS Est: ${ev.epsEstimate}
                                </Typography>
                              )}
                              <Typography
                                variant="caption"
                                sx={{ color: "#818cf8", mt: 0.5, display: "block" }}
                              >
                                Click to inspect details &amp; download calendar invite
                              </Typography>
                            </Box>
                          }
                          arrow
                        >
                          <Paper
                            onClick={() => setSelectedEvent(ev)}
                            sx={{
                              p: { xs: 0.25, sm: 0.4 },
                              px: { xs: 0.4, sm: 0.6 },
                              borderRadius: 1.5,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              backgroundColor: isBmo
                                ? "rgba(245, 158, 11, 0.14)"
                                : "rgba(168, 85, 247, 0.14)",
                              border: `1px solid ${
                                isBmo
                                  ? "rgba(245, 158, 11, 0.4)"
                                  : "rgba(168, 85, 247, 0.4)"
                              }`,
                              transition: "all 0.12s ease",
                              "&:hover": {
                                transform: "translateY(-1px)",
                                backgroundColor: isBmo
                                  ? "rgba(245, 158, 11, 0.25)"
                                  : "rgba(168, 85, 247, 0.25)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.4,
                              }}
                            >
                              {isBmo ? (
                                <WbSunnyIcon
                                  sx={{ fontSize: 10, color: "#f59e0b" }}
                                />
                              ) : (
                                <NightsStayIcon
                                  sx={{ fontSize: 10, color: "#c084fc" }}
                                />
                              )}
                              <Typography
                                sx={{
                                  fontSize: { xs: "0.64rem", sm: "0.72rem" },
                                  fontWeight: 800,
                                  color: isBmo ? "#fbbf24" : "#c084fc",
                                  fontFamily: MONO_FONT,
                                  lineHeight: 1,
                                }}
                              >
                                {ev.ticker}
                              </Typography>
                            </Box>

                            <Typography
                              sx={{
                                fontSize: "0.6rem",
                                color: "text.secondary",
                                fontFamily: MONO_FONT,
                                display: { xs: "none", md: "block" },
                              }}
                            >
                              {ev.epsEstimate !== undefined
                                ? `$${ev.epsEstimate}`
                                : ev.marketCap}
                            </Typography>
                          </Paper>
                        </Tooltip>
                      );
                    })}
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Paper>
      )}

      {/* Mode 2: Detailed Institutional Table View */}
      {viewMode === "table" && (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            borderRadius: 3,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <Table size="small">
            <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                    width: 60,
                  }}
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                  }}
                >
                  Company &amp; Ticker
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                  }}
                >
                  Release Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                  }}
                >
                  Timing
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                  }}
                >
                  Fiscal Quarter
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                  }}
                >
                  Next Qtr (Est)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                    textAlign: "right",
                  }}
                >
                  Est. EPS (Prior)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                    textAlign: "right",
                  }}
                >
                  Est. Revenue
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                    textAlign: "right",
                  }}
                >
                  Market Cap
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "text.secondary",
                    textAlign: "center",
                    width: 130,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMonthEvents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
                  >
                    No top-50 earnings announcements match the selected filters for{" "}
                    {MONTH_NAMES[currentMonth - 1]} {currentYear}.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMonthEvents
                  .sort((a, b) => a.date.localeCompare(b.date) || a.rank - b.rank)
                  .map((ev) => {
                    const isBmo = ev.timeOfDay === "BMO";
                    return (
                      <TableRow
                        key={ev.id}
                        hover
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "rgba(99, 102, 241, 0.08) !important",
                          },
                        }}
                        onClick={() => setSelectedEvent(ev)}
                      >
                        <TableCell sx={{ fontFamily: MONO_FONT, color: "text.secondary" }}>
                          #{ev.rank}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "0.82rem",
                                  color: "primary.light",
                                  fontFamily: MONO_FONT,
                                }}
                              >
                                {ev.ticker}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.72rem",
                                  color: "text.secondary",
                                  maxWidth: 200,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {ev.companyName}
                              </Typography>
                            </Box>
                            <Chip
                              label={ev.sector}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.62rem",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                color: "text.secondary",
                                display: { xs: "none", md: "inline-flex" },
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontFamily: MONO_FONT, fontWeight: 700 }}>
                          {ev.date}
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={
                              isBmo ? (
                                <WbSunnyIcon sx={{ fontSize: "12px !important" }} />
                              ) : (
                                <NightsStayIcon sx={{ fontSize: "12px !important" }} />
                              )
                            }
                            label={isBmo ? "BMO" : "AMC"}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "0.68rem",
                              fontWeight: 800,
                              fontFamily: MONO_FONT,
                              backgroundColor: isBmo
                                ? "rgba(245, 158, 11, 0.15)"
                                : "rgba(168, 85, 247, 0.15)",
                              color: isBmo ? "#fbbf24" : "#c084fc",
                              border: `1px solid ${
                                isBmo
                                  ? "rgba(245, 158, 11, 0.3)"
                                  : "rgba(168, 85, 247, 0.3)"
                              }`,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontFamily: MONO_FONT, fontSize: "0.76rem" }}>
                          {ev.fiscalQuarter}
                        </TableCell>
                        <TableCell sx={{ fontFamily: MONO_FONT, fontSize: "0.75rem" }}>
                          {ev.nextQuarterDate ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                              <span>{ev.nextQuarterDate}</span>
                              <Chip
                                label={ev.nextQuarterConfirmed ? "Conf" : "Est"}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.6rem",
                                  fontWeight: 800,
                                  fontFamily: MONO_FONT,
                                  backgroundColor: ev.nextQuarterConfirmed
                                    ? "rgba(16, 185, 129, 0.15)"
                                    : "rgba(245, 158, 11, 0.15)",
                                  color: ev.nextQuarterConfirmed ? "#34d399" : "#fbbf24",
                                  border: `1px solid ${
                                    ev.nextQuarterConfirmed
                                      ? "rgba(16, 185, 129, 0.3)"
                                      : "rgba(245, 158, 11, 0.3)"
                                  }`,
                                }}
                              />
                            </Box>
                          ) : (
                            <Typography
                              component="span"
                              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                            >
                              —
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: MONO_FONT,
                            textAlign: "right",
                            fontWeight: 700,
                          }}
                        >
                          {ev.epsEstimate !== undefined ? (
                            <span>
                              ${ev.epsEstimate}{" "}
                              {ev.epsPriorYear !== undefined && (
                                <Typography
                                  component="span"
                                  sx={{
                                    fontSize: "0.68rem",
                                    color: "text.secondary",
                                  }}
                                >
                                  (${ev.epsPriorYear})
                                </Typography>
                              )}
                            </span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: MONO_FONT,
                            textAlign: "right",
                            fontWeight: 700,
                          }}
                        >
                          {ev.revenueEstimate || "—"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: MONO_FONT,
                            textAlign: "right",
                            fontWeight: 800,
                            color: "text.primary",
                          }}
                        >
                          {ev.marketCap}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Tooltip title="Add to Google/Apple Calendar (.ics)">
                              <IconButton
                                size="small"
                                onClick={() => downloadIcsEarnings(ev)}
                                sx={{
                                  color: "text.secondary",
                                  "&:hover": { color: "primary.light" },
                                }}
                              >
                                <DownloadIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Open Investor Relations Webcast">
                              <IconButton
                                size="small"
                                component="a"
                                href={ev.irUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  color: "text.secondary",
                                  "&:hover": { color: "primary.light" },
                                }}
                              >
                                <LaunchIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Sourcing & Documentation Footer Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mt: 3,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.82rem", color: "#ffffff" }}>
            📊 Top 50 U.S. Corporate Earnings Methodology &amp; Data Sourcing
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Sourced from official SEC EDGAR 8-K (Item 2.02) &amp; 10-Q corporate filings,
            verified company Investor Relations press releases, and Wall Street consensus
            estimates. Covers the 50 largest publicly traded U.S. corporations by market
            capitalization.
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontFamily: MONO_FONT,
            color: "primary.light",
            backgroundColor: "rgba(99, 102, 241, 0.12)",
            px: 1,
            py: 0.5,
            borderRadius: 1.5,
            border: "1px solid rgba(99, 102, 241, 0.25)",
          }}
        >
          Timing: BMO (Pre-Market) • AMC (After-Hours)
        </Typography>
      </Paper>

      {/* Announcement Inspection Modal */}
      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              backgroundColor: "rgba(15, 23, 42, 0.98)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(20px)",
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1.5,
              }}
            >
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    sx={{
                      fontSize: "1.35rem",
                      fontWeight: 900,
                      color: "primary.light",
                      fontFamily: MONO_FONT,
                    }}
                  >
                    {selectedEvent.ticker}
                  </Typography>
                  <Chip
                    label={`Rank #${selectedEvent.rank}`}
                    size="small"
                    sx={{
                      height: 20,
                      fontWeight: 800,
                      fontFamily: MONO_FONT,
                      fontSize: "0.66rem",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "text.secondary",
                    }}
                  />
                  <Chip
                    icon={
                      selectedEvent.timeOfDay === "BMO" ? (
                        <WbSunnyIcon sx={{ fontSize: "12px !important" }} />
                      ) : (
                        <NightsStayIcon sx={{ fontSize: "12px !important" }} />
                      )
                    }
                    label={
                      selectedEvent.timeOfDay === "BMO"
                        ? "Before Open (BMO)"
                        : "After Close (AMC)"
                    }
                    size="small"
                    sx={{
                      height: 24,
                      fontWeight: 800,
                      fontSize: "0.68rem",
                      backgroundColor:
                        selectedEvent.timeOfDay === "BMO"
                          ? "rgba(245, 158, 11, 0.2)"
                          : "rgba(168, 85, 247, 0.2)",
                      color:
                        selectedEvent.timeOfDay === "BMO" ? "#fbbf24" : "#c084fc",
                    }}
                  />
                </Stack>
                <Typography sx={{ fontWeight: 800, color: "#ffffff", mt: 0.25 }}>
                  {selectedEvent.companyName}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontFamily: MONO_FONT,
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "#ffffff",
                }}
              >
                {selectedEvent.marketCap}
              </Typography>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1.5,
                my: 1.5,
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Announcement Date
                </Typography>
                <Typography
                  sx={{ fontWeight: 800, fontFamily: MONO_FONT, color: "#ffffff" }}
                >
                  {selectedEvent.date}
                </Typography>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Fiscal Reporting Period
                </Typography>
                <Typography
                  sx={{ fontWeight: 800, fontFamily: MONO_FONT, color: "#ffffff" }}
                >
                  {selectedEvent.fiscalQuarter}
                </Typography>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  backgroundColor: "rgba(16, 185, 129, 0.05)",
                  borderColor: "rgba(16, 185, 129, 0.2)",
                }}
              >
                <Typography variant="caption" sx={{ color: "#34d399" }}>
                  Consensus EPS Estimate
                </Typography>
                <Typography
                  sx={{ fontWeight: 800, fontFamily: MONO_FONT, color: "#34d399" }}
                >
                  {selectedEvent.epsEstimate !== undefined
                    ? `$${selectedEvent.epsEstimate}`
                    : "N/A"}
                </Typography>
                {selectedEvent.epsPriorYear !== undefined && (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Prior Year: ${selectedEvent.epsPriorYear}
                  </Typography>
                )}
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  backgroundColor: "rgba(99, 102, 241, 0.05)",
                  borderColor: "rgba(99, 102, 241, 0.2)",
                }}
              >
                <Typography variant="caption" sx={{ color: "primary.light" }}>
                  Consensus Revenue Estimate
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontFamily: MONO_FONT,
                    color: "primary.light",
                  }}
                >
                  {selectedEvent.revenueEstimate || "N/A"}
                </Typography>
                {selectedEvent.revenuePriorYear && (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Prior Year: {selectedEvent.revenuePriorYear}
                  </Typography>
                )}
              </Paper>
            </Box>

            {selectedEvent.conferenceCallTime && (
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  mb: 2,
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Conference Call &amp; Webcast Schedule:
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                  {selectedEvent.conferenceCallTime}
                </Typography>
              </Box>
            )}

            {/* Following Quarter (Next Qtr) Forward-Looking Projection */}
            {selectedEvent.nextQuarterDate && (
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: 2.5,
                  backgroundColor: "rgba(99, 102, 241, 0.05)",
                  borderColor: "rgba(99, 102, 241, 0.25)",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1.25,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.82rem",
                      color: "primary.light",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    <span>📅 Following Quarter Release (Next Qtr)</span>
                  </Typography>
                  <Chip
                    label={
                      selectedEvent.nextQuarterConfirmed
                        ? "Confirmed Date"
                        : "Projected (~90-day Cadence)"
                    }
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.64rem",
                      fontWeight: 800,
                      backgroundColor: selectedEvent.nextQuarterConfirmed
                        ? "rgba(16, 185, 129, 0.15)"
                        : "rgba(245, 158, 11, 0.15)",
                      color: selectedEvent.nextQuarterConfirmed ? "#34d399" : "#fbbf24",
                      border: `1px solid ${
                        selectedEvent.nextQuarterConfirmed
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(245, 158, 11, 0.3)"
                      }`,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 1.25,
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Projected Release Date
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontFamily: MONO_FONT,
                        fontSize: "0.88rem",
                        color: "#ffffff",
                      }}
                    >
                      {selectedEvent.nextQuarterDate}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Projected Fiscal Period
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontFamily: MONO_FONT,
                        fontSize: "0.88rem",
                        color: "#ffffff",
                      }}
                    >
                      {selectedEvent.nextQuarterPeriod || "Next Fiscal Quarter"}
                    </Typography>
                  </Box>
                  {selectedEvent.nextQuarterEpsEstimate !== undefined && (
                    <Box>
                      <Typography variant="caption" sx={{ color: "#34d399" }}>
                        Consensus EPS Est.
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontFamily: MONO_FONT,
                          fontSize: "0.88rem",
                          color: "#34d399",
                        }}
                      >
                        ${selectedEvent.nextQuarterEpsEstimate}
                      </Typography>
                    </Box>
                  )}
                  {selectedEvent.nextQuarterRevenueEstimate && (
                    <Box>
                      <Typography variant="caption" sx={{ color: "primary.light" }}>
                        Consensus Rev. Est.
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontFamily: MONO_FONT,
                          fontSize: "0.88rem",
                          color: "primary.light",
                        }}
                      >
                        {selectedEvent.nextQuarterRevenueEstimate}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            )}

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                fullWidth
                startIcon={<DownloadIcon />}
                onClick={() => downloadIcsEarnings(selectedEvent)}
                sx={{
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "none",
                  backgroundColor: "primary.main",
                  fontSize: "0.8rem",
                }}
              >
                Add {selectedEvent.fiscalQuarter} (.ics)
              </Button>
              {selectedEvent.nextQuarterDate && (
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EventAvailableIcon />}
                  onClick={() => downloadIcsNextQuarterEarnings(selectedEvent)}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 2,
                    textTransform: "none",
                    borderColor: "rgba(99, 102, 241, 0.4)",
                    color: "primary.light",
                    fontSize: "0.8rem",
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: "rgba(99, 102, 241, 0.08)",
                    },
                  }}
                >
                  Add Next Qtr (.ics)
                </Button>
              )}
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LaunchIcon />}
                component="a"
                href={selectedEvent.irUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "none",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "text.secondary",
                  fontSize: "0.8rem",
                }}
              >
                IR Webcast
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};
