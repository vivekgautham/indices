import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/FileDownload";
import TodayIcon from "@mui/icons-material/Today";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { CorporateEarningsCalendar } from "../components/events/CorporateEarningsCalendar";
import SiteFooter from "../components/layout/SiteFooter";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  formatIsoDate,
  getMonthMarketEvents,
  groupEventsByDate,
  MarketEvent,
} from "../utils/marketCalendarEngine";

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

const DEFAULT_CATEGORY_COLOR = {
  bg: "rgba(0, 221, 148, 0.12)",
  border: "rgba(0, 221, 148, 0.35)",
  text: "#00DD94",
  dot: "#00DD94",
};

/**
 * Generates an .ics file download for a market event
 */
function downloadIcsEvent(event: MarketEvent) {
  try {
    const [year, month, day] = (event.date || "").split("-").map(Number);
    if (!year || !month || !day) return;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dateStr = `${year}${pad(month)}${pad(day)}`;

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MarketIndices.xyz//Institutional Events Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${event.id || dateStr}@marketindices.xyz`,
      `DTSTAMP:${dateStr}T120000Z`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `SUMMARY:${(event.title || "").replace(/,/g, "\\,")}`,
      `DESCRIPTION:${(event.description || "").replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
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
    link.setAttribute("download", `${event.id || "event"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to generate .ics file", err);
  }
}

export default function EventsCalendarPage() {
  const today = useMemo(() => new Date(), []);
  const todayIso = useMemo(() => {
    return formatIsoDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
  }, [today]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabParam = searchParams.get("tab");
  const activeTab: "events" | "earnings" =
    currentTabParam === "earnings" ? "earnings" : "events";

  const handleTabChange = (newTab: "events" | "earnings") => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (newTab === "events") {
          next.delete("tab");
        } else {
          next.set("tab", newTab);
        }
        return next;
      },
      { replace: true }
    );
  };

  const [currentYear, setCurrentYear] = useState<number>(() =>
    today.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    () => today.getMonth() + 1
  ); // 1-indexed (1 - 12)

  const [selectedDate, setSelectedDate] = useState<string>(() => todayIso);
  const [viewMode, setViewMode] = useState<"calendar" | "agenda">("calendar");

  // Dynamic document title for client-side SEO
  useEffect(() => {
    if (activeTab === "earnings") {
      document.title =
        "Top 50 US Corporate Earnings Calendar 📊 | Market Indices";
    } else {
      document.title =
        "Market Events & Index Rebalance Calendar 📅 | Market Indices";
    }
  }, [activeTab]);

  // Fetch all events for the active month with defensive sanitization
  const safeYear = Number.isFinite(currentYear) ? currentYear : today.getFullYear();
  const safeMonth =
    Number.isFinite(currentMonth) && currentMonth >= 1 && currentMonth <= 12
      ? currentMonth
      : today.getMonth() + 1;

  const monthEvents = useMemo(() => {
    try {
      return getMonthMarketEvents(safeYear, safeMonth) || [];
    } catch (err) {
      console.error("Failed to fetch market events for month", err);
      return [];
    }
  }, [safeYear, safeMonth]);

  // Group events by date YYYY-MM-DD
  const eventsByDate = useMemo(() => {
    try {
      return groupEventsByDate(monthEvents || []);
    } catch {
      return {};
    }
  }, [monthEvents]);

  // Summary counts for KPI header cards
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: (monthEvents || []).length,
      rebalance: 0,
      witching: 0,
      opex: 0,
      fomc: 0,
      macro: 0,
      holiday: 0,
    };
    for (const e of monthEvents || []) {
      if (e?.category && counts[e.category] !== undefined) {
        counts[e.category]++;
      }
    }
    return counts;
  }, [monthEvents]);

  // Calendar Grid Days Calculation
  const calendarCells = useMemo(() => {
    const daysInMonth = new Date(
      Date.UTC(safeYear, safeMonth, 0)
    ).getUTCDate();
    const firstDayOfWeek = new Date(
      Date.UTC(safeYear, safeMonth - 1, 1)
    ).getUTCDay(); // 0 = Sun, 1 = Mon...

    const daysInPrevMonth = new Date(
      Date.UTC(safeYear, safeMonth - 1, 0)
    ).getUTCDate();

    interface CalendarCell {
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      events: MarketEvent[];
    }

    const cells: CalendarCell[] = [];

    // 1. Previous month trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = safeMonth === 1 ? 12 : safeMonth - 1;
      const prevYear = safeMonth === 1 ? safeYear - 1 : safeYear;
      const dateStr = formatIsoDate(prevYear, prevMonth, day);
      cells.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: dateStr === todayIso,
        events: [],
      });
    }

    // 2. Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatIsoDate(safeYear, safeMonth, day);
      cells.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: dateStr === todayIso,
        events: (eventsByDate && eventsByDate[dateStr]) || [],
      });
    }

    // 3. Next month leading days (fill up to complete weeks, 35 or 42 cells)
    const totalCells = cells.length <= 35 ? 35 : 42;
    const remaining = Math.max(0, totalCells - cells.length);
    for (let day = 1; day <= remaining; day++) {
      const nextMonth = safeMonth === 12 ? 1 : safeMonth + 1;
      const nextYear = safeMonth === 12 ? safeYear + 1 : safeYear;
      const dateStr = formatIsoDate(nextYear, nextMonth, day);
      cells.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: dateStr === todayIso,
        events: [],
      });
    }

    return cells;
  }, [safeYear, safeMonth, eventsByDate, todayIso]);

  // Selected Day Events
  const selectedDayEvents = useMemo(() => {
    return (monthEvents || []).filter((e) => e?.date === selectedDate);
  }, [monthEvents, selectedDate]);

  // Navigation handlers
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

  const handleJumpToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setSelectedDate(todayIso);
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--indices-bg, #040907)",
        color: "text.primary",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Banner / Header */}
      <Box
        sx={{
          py: { xs: 3, sm: 4 },
          borderBottom:
            "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
          background:
            activeTab === "earnings"
              ? "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99, 102, 241, 0.16), transparent 70%), #050d0a"
              : "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0, 221, 148, 0.14), transparent 70%), #050d0a",
        }}
      >
        <Container maxWidth="lg">
          {/* Dashboard Subtabs Navigation Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mb: { xs: 2.5, sm: 3 },
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, val) => handleTabChange(val)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                minHeight: 40,
                maxWidth: "100%",
                width: { xs: "100%", md: "auto" },
                backgroundColor: "rgba(15, 23, 42, 0.55)",
                p: 0.5,
                borderRadius: 3,
                border:
                  "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
                "& .MuiTabs-scroller": {
                  overflowX: "auto !important",
                },
                "& .MuiTabs-flexContainer": {
                  gap: { xs: 0.5, sm: 0.75 },
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTab-root": {
                  minHeight: 32,
                  minWidth: "unset",
                  py: 0.6,
                  px: { xs: 1.25, sm: 2 },
                  fontSize: { xs: "0.74rem", sm: "0.82rem" },
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2.5,
                  color: "text.secondary",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease-in-out",
                  "&.Mui-selected": {
                    color: "#fff",
                    backgroundColor:
                      activeTab === "earnings"
                        ? "rgba(99, 102, 241, 0.28)"
                        : "rgba(0, 221, 148, 0.2)",
                    border:
                      activeTab === "earnings"
                        ? "1px solid rgba(99, 102, 241, 0.5)"
                        : "1px solid rgba(0, 221, 148, 0.45)",
                  },
                },
              }}
            >
              <Tab
                icon={<CalendarMonthIcon sx={{ fontSize: { xs: 15, sm: 16 } }} />}
                iconPosition="start"
                label={
                  <span>
                    <Box
                      component="span"
                      sx={{ display: { xs: "none", sm: "inline" } }}
                    >
                      Market Events &amp; Index Rebalance
                    </Box>
                    <Box
                      component="span"
                      sx={{ display: { xs: "inline", sm: "none" } }}
                    >
                      Market Events &amp; Rebalance
                    </Box>
                  </span>
                }
                value="events"
              />
              <Tab
                icon={<TrendingUpIcon sx={{ fontSize: { xs: 15, sm: 16 } }} />}
                iconPosition="start"
                label="Corporate Earnings (US)"
                value="earnings"
              />
            </Tabs>

            {/* Quick Summary Pill */}
            {activeTab === "earnings" ? (
              <Chip
                label="Top 50 US Mega-Caps"
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 0.5,
                  py: 0.4,
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "primary.light",
                  backgroundColor: "rgba(99, 102, 241, 0.12)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                }}
              />
            ) : (
              <Chip
                label={`${monthEvents.length} Events Scheduled This Month`}
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 0.5,
                  py: 0.4,
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "#00DD94",
                  backgroundColor: "rgba(0, 221, 148, 0.08)",
                  border: "1px solid rgba(0, 221, 148, 0.3)",
                }}
              />
            )}
          </Box>

          {activeTab === "earnings" ? (
            <Stack spacing={1.5} alignItems="flex-start">
              <Chip
                icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
                label="Corporate Earnings (US) • Top 50 Mega-Caps"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.74rem",
                  color: "primary.light",
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              />

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  fontSize: { xs: "1.75rem", sm: "2.4rem", md: "2.8rem" },
                }}
              >
                Top 50 U.S. Corporate Earnings Calendar
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.92rem", sm: "1.05rem" },
                  maxWidth: 820,
                  lineHeight: 1.6,
                }}
              >
                Quarterly earnings announcement schedules, consensus EPS and revenue
                estimates, pre-market (BMO) vs. after-hours (AMC) reporting timings,
                and direct investor relations webcast links for the 50 largest U.S.
                corporations.
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={1.5} alignItems="flex-start">
              <Chip
                icon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
                label="Institutional Market Catalysts &amp; Flows"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.74rem",
                  color: "#00DD94",
                  backgroundColor: "rgba(0, 221, 148, 0.1)",
                  borderColor: "rgba(0, 221, 148, 0.3)",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              />

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  fontSize: { xs: "1.75rem", sm: "2.4rem", md: "2.8rem" },
                }}
              >
                Market Events &amp; Index Rebalance Calendar
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.92rem", sm: "1.05rem" },
                  maxWidth: 820,
                  lineHeight: 1.6,
                }}
              >
                Institutional calendar tracking major benchmark rebalances (S&amp;P
                500, FTSE Russell, MSCI), quadruple witching, options &amp; VIX
                expirations, and Federal Reserve FOMC policy decisions.
              </Typography>

              {/* Quick Metrics KPI Bar */}
              <Box
                sx={{
                  pt: 1.5,
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(6, 1fr)",
                  },
                  gap: 1.5,
                }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 700 }}
                  >
                    This Month
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#ffffff",
                    }}
                  >
                    {monthEvents.length} Events
                  </Typography>
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(6, 182, 212, 0.04)",
                    borderColor: "rgba(6, 182, 212, 0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "#22d3ee", fontWeight: 700 }}
                  >
                    Macro (CPI &amp; Jobs)
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#22d3ee",
                    }}
                  >
                    {categoryCounts.macro}
                  </Typography>
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(0, 221, 148, 0.04)",
                    borderColor: "rgba(0, 221, 148, 0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "#00DD94", fontWeight: 700 }}
                  >
                    Index Rebalances
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#00DD94",
                    }}
                  >
                    {categoryCounts.rebalance}
                  </Typography>
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(168, 85, 247, 0.04)",
                    borderColor: "rgba(168, 85, 247, 0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "#c084fc", fontWeight: 700 }}
                  >
                    Derivatives Expiries
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#c084fc",
                    }}
                  >
                    {categoryCounts.witching + categoryCounts.opex}
                  </Typography>
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(245, 158, 11, 0.04)",
                    borderColor: "rgba(245, 158, 11, 0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "#fbbf24", fontWeight: 700 }}
                  >
                    FOMC Catalysts
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#fbbf24",
                    }}
                  >
                    {categoryCounts.fomc}
                  </Typography>
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(239, 68, 68, 0.04)",
                    borderColor: "rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "#f87171", fontWeight: 700 }}
                  >
                    Market Holidays
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#f87171",
                    }}
                  >
                    {categoryCounts.holiday}
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          )}
        </Container>
      </Box>

      {/* Main Content Section */}
      <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
        {activeTab === "earnings" ? (
          <CorporateEarningsCalendar />
        ) : (
          <>
            {/* Navigation & Controls Bar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mb: 2.5,
              }}
            >
          {/* Month / Year Navigator */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 2.5,
                p: 0.5,
              }}
            >
              <IconButton
                onClick={handlePrevMonth}
                size="small"
                aria-label="Previous Month"
                sx={{
                  color: "text.primary",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <Typography
                sx={{
                  px: 2,
                  fontWeight: 900,
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                  color: "#ffffff",
                  minWidth: { xs: 150, sm: 180 },
                  textAlign: "center",
                }}
              >
                {MONTH_NAMES[currentMonth - 1]} {currentYear}
              </Typography>

              <IconButton
                onClick={handleNextMonth}
                size="small"
                aria-label="Next Month"
                sx={{
                  color: "text.primary",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>

            <Button
              variant="outlined"
              size="small"
              onClick={handleJumpToToday}
              startIcon={<TodayIcon sx={{ fontSize: 16 }} />}
              sx={{
                borderRadius: 2,
                px: 1.5,
                py: 0.6,
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#00DD94",
                borderColor: "rgba(0, 221, 148, 0.4)",
                "&:hover": {
                  borderColor: "#00DD94",
                  backgroundColor: "rgba(0, 221, 148, 0.08)",
                },
              }}
            >
              Today
            </Button>
          </Stack>

          {/* View Mode Toggle (Grid vs Agenda) */}
          <ButtonGroup
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              borderRadius: 2,
              p: 0.3,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              "& .MuiButton-root": {
                border: "none",
                fontWeight: 700,
                fontSize: "0.78rem",
                borderRadius: 1.5,
                color: "text.secondary",
                textTransform: "none",
                px: 1.5,
                py: 0.5,
                "&.active": {
                  backgroundColor: "rgba(0, 221, 148, 0.15)",
                  color: "#00DD94",
                  borderColor: "transparent",
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              },
            }}
          >
            <Button
              className={viewMode === "calendar" ? "active" : ""}
              onClick={() => setViewMode("calendar")}
              startIcon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
            >
              Calendar View
            </Button>
            <Button
              className={viewMode === "agenda" ? "active" : ""}
              onClick={() => setViewMode("agenda")}
              startIcon={<ViewAgendaIcon sx={{ fontSize: 16 }} />}
            >
              Agenda Feed ({monthEvents.length})
            </Button>
          </ButtonGroup>
        </Box>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: MONTHLY CALENDAR GRID                                  */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "calendar" && (
          <Box sx={{ mb: 4 }}>
            {/* Calendar Container */}
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "rgba(15, 23, 42, 0.4)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Day of Week Header */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: "rgba(15, 23, 42, 0.6)",
                }}
              >
                {DAY_NAMES.map((dayName, idx) => (
                  <Box
                    key={dayName}
                    sx={{
                      py: 1.2,
                      textAlign: "center",
                      fontWeight: 800,
                      fontSize: { xs: "0.72rem", sm: "0.82rem" },
                      color:
                        idx === 0 || idx === 6
                          ? "text.secondary"
                          : "text.primary",
                      borderRight:
                        idx < 6
                          ? "1px solid rgba(255, 255, 255, 0.04)"
                          : "none",
                    }}
                  >
                    {dayName}
                  </Box>
                ))}
              </Box>

              {/* Day Cells Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  gap: "1px",
                }}
              >
                {calendarCells.map((cell) => {
                  const isSelected = cell.dateStr === selectedDate;
                  const hasEvents = cell.events.length > 0;

                  return (
                    <Box
                      key={cell.dateStr}
                      onClick={() => {
                        if (cell.isCurrentMonth) {
                          setSelectedDate(cell.dateStr);
                        }
                      }}
                      sx={{
                        aspectRatio: "1 / 1",
                        width: "100%",
                        minWidth: 0,
                        minHeight: 0,
                        p: { xs: 0.5, sm: 0.85, md: 1 },
                        backgroundColor: isSelected
                          ? "rgba(0, 221, 148, 0.08)"
                          : cell.isCurrentMonth
                          ? "rgba(15, 23, 42, 0.55)"
                          : "rgba(10, 16, 14, 0.75)",
                        opacity: cell.isCurrentMonth ? 1 : 0.35,
                        cursor: cell.isCurrentMonth ? "pointer" : "default",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.15s ease",
                        border: isSelected
                          ? "1.5px solid #00DD94"
                          : "1px solid transparent",
                        overflow: "hidden",
                        "&:hover": cell.isCurrentMonth
                          ? {
                              backgroundColor: isSelected
                                ? "rgba(0, 221, 148, 0.12)"
                                : "rgba(255, 255, 255, 0.04)",
                            }
                          : {},
                      }}
                    >
                      {/* Top Date Header */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: { xs: 0.25, sm: 0.5 },
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 20, sm: 24 },
                            height: { xs: 20, sm: 24 },
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: { xs: "0.74rem", sm: "0.82rem" },
                            fontWeight: cell.isToday ? 900 : 700,
                            color: cell.isToday
                              ? "#050D0A"
                              : isSelected
                              ? "#00DD94"
                              : "text.primary",
                            backgroundColor: cell.isToday
                              ? "#00DD94"
                              : "transparent",
                            boxShadow: cell.isToday
                              ? "0 0 10px rgba(0, 221, 148, 0.6)"
                              : "none",
                          }}
                        >
                          {cell.dayNumber}
                        </Box>

                        {/* Mobile Event Count Badge */}
                        {hasEvents && (
                          <Box
                            sx={{
                              display: { xs: "flex", sm: "none" },
                              alignItems: "center",
                              gap: 0.3,
                            }}
                          >
                            {cell.events.map((ev) => {
                              const dotColor =
                                CATEGORY_COLORS[ev?.category]?.dot ||
                                DEFAULT_CATEGORY_COLOR.dot;
                              return (
                                <Box
                                  key={ev.id}
                                  sx={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    backgroundColor: dotColor,
                                  }}
                                />
                              );
                            })}
                          </Box>
                        )}
                      </Box>

                      {/* Desktop Events Stack */}
                      <Box
                        sx={{
                          display: { xs: "none", sm: "flex" },
                          flexDirection: "column",
                          gap: 0.5,
                          flex: 1,
                          minHeight: 0,
                          overflowY: "auto",
                          scrollbarWidth: "none",
                          "&::-webkit-scrollbar": { display: "none" },
                        }}
                      >
                        {cell.events.map((ev) => {
                          const col =
                            CATEGORY_COLORS[ev?.category] ||
                            DEFAULT_CATEGORY_COLOR;
                          return (
                            <Box
                              key={ev.id}
                              sx={{
                                px: { sm: 0.6, md: 0.75 },
                                py: { sm: 0.25, md: 0.35 },
                                borderRadius: 1.25,
                                backgroundColor: col.bg,
                                border: `1px solid ${col.border}`,
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 0.5,
                                minWidth: 0,
                                flexShrink: 0,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: "50%",
                                  backgroundColor: col.dot,
                                  flexShrink: 0,
                                  mt: "3px",
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: { sm: "0.62rem", md: "0.68rem" },
                                  fontWeight: 700,
                                  color: col.text,
                                  lineHeight: 1.25,
                                  whiteSpace: "normal",
                                  wordBreak: "break-word",
                                  overflowWrap: "break-word",
                                }}
                              >
                                {ev.title}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            {/* Selected Date Detail Cards Section */}
            <Box sx={{ mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarMonthIcon sx={{ color: "#00DD94", fontSize: 20 }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "#ffffff" }}
                  >
                    Events for {selectedDate}
                  </Typography>
                  <Chip
                    label={`${selectedDayEvents.length} scheduled`}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.72rem",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                    }}
                  />
                </Stack>
              </Box>

              {selectedDayEvents.length === 0 ? (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    backgroundColor: "rgba(15, 23, 42, 0.3)",
                    borderColor: "rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "0.92rem" }}
                  >
                    No major institutional index rebalances, derivatives
                    expiries, or FOMC catalysts scheduled for {selectedDate}.
                  </Typography>
                </Paper>
              ) : (
                <Stack spacing={2}>
                  {selectedDayEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: AGENDA / FEED VIEW                                    */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "agenda" && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#ffffff", mb: 2 }}
            >
              All Scheduled Events in {MONTH_NAMES[currentMonth - 1]}{" "}
              {currentYear} ({monthEvents.length})
            </Typography>

            {monthEvents.length === 0 ? (
              <Paper
                variant="outlined"
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: 3,
                  backgroundColor: "rgba(15, 23, 42, 0.3)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <Typography sx={{ color: "text.secondary" }}>
                  No events scheduled for this month.
                </Typography>
              </Paper>
            ) : (
              <Stack spacing={2}>
                {monthEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Stack>
            )}
          </Box>
        )}
      </>
    )}
  </Container>

      <SiteFooter />
    </Box>
  );
}

/**
 * Institutional Event Card Component
 */
function EventCard({ event }: { event: MarketEvent }) {
  const styling =
    CATEGORY_COLORS[event?.category] || DEFAULT_CATEGORY_COLOR;
  const categoryLabel =
    CATEGORY_LABELS[event?.category] || "Market Event";

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        borderColor: styling.border,
        boxShadow: `0 4px 20px ${styling.bg}`,
        transition: "all 0.18s ease-in-out",
        "&:hover": {
          borderColor: styling.text,
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 1.5,
          mb: 1.25,
        }}
      >
        {/* Left Badges */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Chip
            label={categoryLabel}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              color: styling.text,
              backgroundColor: styling.bg,
              borderColor: styling.border,
              borderWidth: 1,
              borderStyle: "solid",
            }}
          />

          {event.impact === "high" && (
            <Chip
              label="HIGH FLOW IMPACT"
              size="small"
              sx={{
                fontWeight: 900,
                fontSize: "0.68rem",
                color: "#ff5252",
                backgroundColor: "rgba(255, 82, 82, 0.12)",
                borderColor: "rgba(255, 82, 82, 0.35)",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            />
          )}

          {event.provider && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            >
              • {event.provider}
            </Typography>
          )}

          {event.time && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              • {event.time}
            </Typography>
          )}
        </Stack>

        {/* Right Action: Add to Calendar (.ics) */}
        <Tooltip title="Download iCalendar file (.ics) for Google/Apple Calendar">
          <Button
            size="small"
            variant="outlined"
            onClick={() => downloadIcsEvent(event)}
            startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
            sx={{
              borderRadius: 2,
              px: 1.25,
              py: 0.35,
              fontSize: "0.74rem",
              fontWeight: 700,
              textTransform: "none",
              color: "text.secondary",
              borderColor: "rgba(255, 255, 255, 0.12)",
              "&:hover": {
                color: "#ffffff",
                borderColor: "#00DD94",
                backgroundColor: "rgba(0, 221, 148, 0.08)",
              },
            }}
          >
            Add to Cal
          </Button>
        </Tooltip>
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: "#ffffff",
          fontSize: { xs: "1rem", sm: "1.15rem" },
          mb: 0.75,
        }}
      >
        {event.title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: "0.85rem", sm: "0.92rem" },
          lineHeight: 1.6,
          mb: 1.5,
        }}
      >
        {event.description}
      </Typography>

      {/* Affected Tickers & Tags */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.2,
          pt: 1,
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* Affected Tickers */}
        {event.affectedTickers && event.affectedTickers.length > 0 ? (
          <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap">
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 700 }}
            >
              Affected Proxies:
            </Typography>
            {event.affectedTickers.map((ticker) => (
              <Chip
                key={ticker}
                label={ticker}
                size="small"
                component={RouterLink}
                to={`/tracker?series=${ticker}`}
                clickable
                sx={{
                  height: 22,
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#00DD94",
                  border: "1px solid rgba(0, 221, 148, 0.25)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 221, 148, 0.15)",
                  },
                }}
              />
            ))}
          </Stack>
        ) : (
          <Box />
        )}

        {/* Date Tag */}
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 800,
            fontSize: "0.74rem",
            letterSpacing: "0.03em",
          }}
        >
          DATE: {event.date}
        </Typography>
      </Box>
    </Paper>
  );
}
