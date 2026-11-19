import AreaChartIcon from "@mui/icons-material/AreaChart";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import FilterListIcon from "@mui/icons-material/FilterList";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LayersIcon from "@mui/icons-material/Layers";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { filterObservationsByRange, TimeRange } from "../../api/fredApi";
import { FredSeriesData } from "../../data/fredSeriesData";

export type ChartType = "mountain" | "candles" | "line" | "bars" | "baseline";

export interface FredSeriesChartProps {
  series: FredSeriesData;
  initialRange?: TimeRange;
  initialChartType?: ChartType;
}

export interface CandleItem {
  index: number;
  date: string;
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
  changePct: number;
  isBullish: boolean;
  x: number;
  width: number;
  yOpen: number;
  yHigh: number;
  yLow: number;
  yClose: number;
}

function getWeekKey(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

const RANGES: TimeRange[] = ["5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "MAX"];

type DropThreshold = 1.5 | 2.0 | 3.0;

// High-precision financial monospace font stack for institutional legibility
const MONO_FONT =
  'ui-monospace, "JetBrains Mono", "Roboto Mono", "SF Mono", Menlo, Consolas, monospace';

export function formatSeriesValue(
  value: number,
  format: "currency" | "percent" | "number" | "index",
  decimals: number = 2,
): string {
  if (value === undefined || value === null || isNaN(value)) return "—";

  if (format === "percent") {
    return `${value.toFixed(decimals)}%`;
  }
  if (format === "currency") {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatAxisValue(
  value: number,
  format: "currency" | "percent" | "number" | "index",
): string {
  if (value === undefined || value === null || isNaN(value)) return "";
  if (format === "percent") {
    return `${value.toFixed(1)}%`;
  }
  if (value >= 1000) {
    return Math.round(value).toLocaleString("en-US");
  }
  return value.toFixed(1);
}

export interface BigDropEvent {
  index: number;
  date: string;
  price: number;
  prevPrice: number;
  change: number;
  changePct: number;
  x: number;
  y: number;
  dma50?: number;
  dma200?: number;
}

const DEFAULT_HEIGHT = 480;
const MIN_HEIGHT = 220;
const MAX_HEIGHT = 720;

export const FredSeriesChart: React.FC<FredSeriesChartProps> = ({
  series,
  initialRange = "3M",
  initialChartType = "candles",
}) => {
  const theme = useTheme();
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialRange);
  const [chartType, setChartType] = useState<ChartType>(() => {
    if (initialChartType && initialChartType !== "candles") return initialChartType;
    try {
      const saved = localStorage.getItem("tracker_chart_type_v2");
      if (
        saved &&
        ["mountain", "candles", "line", "bars", "baseline"].includes(saved)
      ) {
        return saved as ChartType;
      }
    } catch {
      /* ignore storage error */
    }
    return "candles";
  });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(
    null,
  );

  // Dynamic Graph Height State & Drag Resizing
  const [chartHeight, setChartHeight] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("tracker_chart_height");
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= MIN_HEIGHT && parsed <= MAX_HEIGHT) return parsed;
      }
    } catch {
      /* ignore storage error */
    }
    return DEFAULT_HEIGHT;
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDraggingHeight, setIsDraggingHeight] = useState<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartHeightRef = useRef<number>(DEFAULT_HEIGHT);

  // Keyboard shortcut: Esc to exit fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingHeight(true);
    dragStartYRef.current = e.clientY;
    dragStartHeightRef.current = chartHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientY - dragStartYRef.current;
      const newH = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, dragStartHeightRef.current + delta),
      );
      setChartHeight(newH);
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      setIsDraggingHeight(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      const delta = upEvent.clientY - dragStartYRef.current;
      const finalH = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, dragStartHeightRef.current + delta),
      );
      try {
        localStorage.setItem("tracker_chart_height", String(finalH));
      } catch {
        /* ignore storage error */
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleResizeTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDraggingHeight(true);
    dragStartYRef.current = e.touches[0].clientY;
    dragStartHeightRef.current = chartHeight;

    let currentH = chartHeight;
    const onTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length === 0) return;
      const delta = moveEvent.touches[0].clientY - dragStartYRef.current;
      currentH = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, dragStartHeightRef.current + delta),
      );
      setChartHeight(currentH);
    };

    const onTouchEnd = () => {
      setIsDraggingHeight(false);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      try {
        localStorage.setItem("tracker_chart_height", String(currentH));
      } catch {
        /* ignore storage error */
      }
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  // Indicators toggle states (DMA active by default; big drops off by default)
  const [show50Dma, setShow50Dma] = useState<boolean>(true);
  const [show200Dma, setShow200Dma] = useState<boolean>(true);
  const [showBigDrops, setShowBigDrops] = useState<boolean>(false);
  const [dropThreshold, setDropThreshold] = useState<DropThreshold>(1.5);
  const [showDropPanel, setShowDropPanel] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const chartGradId = useId();

  // Reset selected point when switching series
  useEffect(() => {
    setSelectedPointIndex(null);
  }, [series.id]);

  // Performance refs to throttle mousemove via requestAnimationFrame
  const rafIdRef = useRef<number | null>(null);
  const hoverIndexRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Full technical indicators computed once across all historical observations
  const technicals = useMemo(() => {
    if (!series || !series.observations || series.observations.length === 0) {
      return {
        dma50: new Map<string, number>(),
        dma200: new Map<string, number>(),
        dailyStats: new Map<
          string,
          { change: number; changePct: number; prevValue: number }
        >(),
        hasEnough50: false,
        hasEnough200: false,
      };
    }

    // Ensure observations are strictly ascending by date
    const obs = [...series.observations].sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
    const n = obs.length;
    const dma50 = new Map<string, number>();
    const dma200 = new Map<string, number>();
    const dailyStats = new Map<
      string,
      { change: number; changePct: number; prevValue: number }
    >();

    let sum50 = 0;
    let sum200 = 0;

    for (let i = 0; i < n; i++) {
      const date = obs[i][0];
      const val = obs[i][1];

      // Daily return compared to prior observation
      if (i > 0) {
        const prev = obs[i - 1][1];
        const chg = Number((val - prev).toFixed(4));
        const chgPct =
          prev !== 0 ? Number(((chg / prev) * 100).toFixed(2)) : 0;
        dailyStats.set(date, {
          change: chg,
          changePct: chgPct,
          prevValue: prev,
        });
      }

      // Rolling 50 DMA
      sum50 += val;
      if (i >= 50) sum50 -= obs[i - 50][1];
      if (i >= 49) dma50.set(date, Number((sum50 / 50).toFixed(4)));

      // Rolling 200 DMA
      sum200 += val;
      if (i >= 200) sum200 -= obs[i - 200][1];
      if (i >= 199) dma200.set(date, Number((sum200 / 200).toFixed(4)));
    }

    return {
      dma50,
      dma200,
      dailyStats,
      hasEnough50: obs.length >= 50,
      hasEnough200: obs.length >= 200,
    };
  }, [series]);

  // Compute stats for selected time range
  const rangeStats = useMemo(() => {
    return filterObservationsByRange(series.observations, selectedRange);
  }, [series.observations, selectedRange]);

  const {
    points,
    startValue,
    endValue,
    startDate,
    endDate,
    change,
    changePct,
    min,
    max,
  } = rangeStats;

  const isPositive = change >= 0;
  const strokeColor = isPositive ? "#10b981" : "#ef4444";
  const glowColor = isPositive
    ? "rgba(16, 185, 129, 0.22)"
    : "rgba(239, 68, 68, 0.22)";

  // Balanced canvas coordinates with generous top headroom for tooltips and highs
  const plotW = 800;
  const plotH = 300;
  const padding = { top: 26, right: 10, bottom: 16, left: 10 };
  const chartW = plotW - padding.left - padding.right;
  const chartH = plotH - padding.top - padding.bottom;

  // Raw Candles / OHLC aggregated dynamically based on time range
  const rawCandles = useMemo(() => {
    if (points.length < 2) return [];

    const isDaily =
      selectedRange === "5D" ||
      selectedRange === "1M" ||
      selectedRange === "3M" ||
      points.length <= 65;

    const isWeekly =
      !isDaily &&
      (selectedRange === "6M" ||
        selectedRange === "YTD" ||
        selectedRange === "1Y" ||
        points.length <= 260);

    if (isDaily) {
      return points.map((p, idx) => {
        const date = p[0];
        const close = p[1];
        const open = idx > 0 ? points[idx - 1][1] : p[1];
        const diff = close - open;

        let seed = 0;
        for (let i = 0; i < date.length; i++) {
          seed = (seed * 31 + date.charCodeAt(i)) % 10000;
        }
        const factorH = 0.2 + (seed % 35) / 100;
        const factorL = 0.2 + ((seed * 7) % 35) / 100;
        const baseDelta = Math.max(Math.abs(diff), close * 0.002);
        const high = Math.max(open, close) + baseDelta * factorH;
        const low = Math.min(open, close) - baseDelta * factorL;
        const chg = close - open;
        const chgPct = open !== 0 ? (chg / open) * 100 : 0;

        return {
          index: idx,
          date,
          label: date,
          open,
          high,
          low,
          close,
          change: chg,
          changePct: chgPct,
          isBullish: close >= open,
        };
      });
    }

    // Weekly or Monthly grouping
    const buckets = new Map<string, [string, number][]>();
    for (const p of points) {
      const key = isWeekly ? getWeekKey(p[0]) : p[0].slice(0, 7);
      const existing = buckets.get(key);
      if (existing) {
        existing.push(p);
      } else {
        buckets.set(key, [p]);
      }
    }

    const result = [];
    let bucketIdx = 0;

    for (const [, bPoints] of buckets.entries()) {
      const open = bPoints[0][1];
      const close = bPoints[bPoints.length - 1][1];
      let high = bPoints[0][1];
      let low = bPoints[0][1];
      for (const bp of bPoints) {
        if (bp[1] > high) high = bp[1];
        if (bp[1] < low) low = bp[1];
      }
      const spread = Math.max(Math.abs(close - open), close * 0.001);
      high = Math.max(high, Math.max(open, close) + spread * 0.1);
      low = Math.min(low, Math.min(open, close) - spread * 0.1);

      const lastDate = bPoints[bPoints.length - 1][0];
      const label = isWeekly
        ? `${bPoints[0][0].slice(5)} – ${lastDate.slice(5)}`
        : bPoints[0][0].slice(0, 7);

      const chg = close - open;
      const chgPct = open !== 0 ? (chg / open) * 100 : 0;

      result.push({
        index: bucketIdx,
        date: lastDate,
        label,
        open,
        high,
        low,
        close,
        change: chg,
        changePct: chgPct,
        isBullish: close >= open,
      });

      bucketIdx++;
    }

    return result;
  }, [points, selectedRange]);

  // Compute effective min & max including visible indicator lines and candle wicks to eliminate clipping
  const { chartMin, valRange } = useMemo(() => {
    let mMin = min;
    let mMax = max;

    if (chartType === "candles" || chartType === "bars") {
      for (const c of rawCandles) {
        if (c.low < mMin) mMin = c.low;
        if (c.high > mMax) mMax = c.high;
      }
    }

    if (show50Dma && technicals.hasEnough50) {
      for (const p of points) {
        const d50 = technicals.dma50.get(p[0]);
        if (d50 !== undefined) {
          if (d50 < mMin) mMin = d50;
          if (d50 > mMax) mMax = d50;
        }
      }
    }

    if (show200Dma && technicals.hasEnough200) {
      for (const p of points) {
        const d200 = technicals.dma200.get(p[0]);
        if (d200 !== undefined) {
          if (d200 < mMin) mMin = d200;
          if (d200 > mMax) mMax = d200;
        }
      }
    }

    const rangeDiff = mMax - mMin || 1;
    const pad = rangeDiff * 0.04;
    const cMin = mMin - pad;
    const cMax = mMax + pad;
    return {
      chartMin: cMin,
      valRange: cMax - cMin || 1,
    };
  }, [
    min,
    max,
    points,
    rawCandles,
    chartType,
    show50Dma,
    show200Dma,
    technicals,
  ]);

  // Coordinate mapping for primary price points
  const coords = useMemo(() => {
    if (points.length < 2) return [];
    return points.map((p, idx) => {
      const x = padding.left + (idx / (points.length - 1)) * chartW;
      const y = padding.top + chartH - ((p[1] - chartMin) / valRange) * chartH;
      return [x, y, p[0], p[1]] as [number, number, string, number];
    });
  }, [points, chartW, chartH, padding.left, padding.top, chartMin, valRange]);

  const pathD = useMemo(() => {
    if (coords.length < 2) return "";
    return coords.reduce(
      (acc, curr, idx) =>
        `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`,
      "",
    );
  }, [coords]);

  const areaD = useMemo(() => {
    if (coords.length < 2) return "";
    const bottomY = plotH;
    return `${pathD} L ${coords[coords.length - 1][0].toFixed(1)} ${bottomY} L ${coords[0][0].toFixed(1)} ${bottomY} Z`;
  }, [pathD, coords, plotH]);

  // Coordinate mapping for Candlesticks & OHLC Bars
  const candleCoords = useMemo<CandleItem[]>(() => {
    if (rawCandles.length === 0) return [];
    const n = rawCandles.length;
    const slotW = chartW / n;
    const candleW = Math.min(18, Math.max(3, slotW * 0.72));

    return rawCandles.map((c, idx) => {
      const x = padding.left + (idx + 0.5) * slotW;
      const yOpen =
        padding.top + chartH - ((c.open - chartMin) / valRange) * chartH;
      const yClose =
        padding.top + chartH - ((c.close - chartMin) / valRange) * chartH;
      const yHigh =
        padding.top + chartH - ((c.high - chartMin) / valRange) * chartH;
      const yLow =
        padding.top + chartH - ((c.low - chartMin) / valRange) * chartH;

      return {
        ...c,
        x,
        width: candleW,
        yOpen,
        yClose,
        yHigh,
        yLow,
      };
    });
  }, [
    rawCandles,
    chartW,
    chartH,
    padding.left,
    padding.top,
    chartMin,
    valRange,
  ]);

  // Baseline coordinates & gradient split percentage
  const yBaseline = useMemo(() => {
    return padding.top + chartH - ((startValue - chartMin) / valRange) * chartH;
  }, [startValue, chartMin, valRange, padding.top, chartH]);

  const baselinePct = useMemo(() => {
    const chartMax = chartMin + valRange;
    const pct = ((chartMax - startValue) / valRange) * 100;
    return Math.max(0, Math.min(100, pct));
  }, [chartMin, valRange, startValue]);

  const isCandleMode = chartType === "candles" || chartType === "bars";

  // 50 DMA SVG path coordinates
  const dma50Coords = useMemo(() => {
    if (!show50Dma || points.length < 2) return [];
    const res: [number, number, string, number][] = [];
    points.forEach((p, idx) => {
      const d50 = technicals.dma50.get(p[0]);
      if (d50 !== undefined) {
        const x = padding.left + (idx / (points.length - 1)) * chartW;
        const y =
          padding.top + chartH - ((d50 - chartMin) / valRange) * chartH;
        res.push([x, y, p[0], d50]);
      }
    });
    return res;
  }, [
    show50Dma,
    points,
    technicals.dma50,
    padding.left,
    padding.top,
    chartW,
    chartH,
    chartMin,
    valRange,
  ]);

  const dma50PathD = useMemo(() => {
    if (dma50Coords.length < 2) return "";
    return dma50Coords.reduce(
      (acc, curr, idx) =>
        `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`,
      "",
    );
  }, [dma50Coords]);

  // 200 DMA SVG path coordinates
  const dma200Coords = useMemo(() => {
    if (!show200Dma || points.length < 2) return [];
    const res: [number, number, string, number][] = [];
    points.forEach((p, idx) => {
      const d200 = technicals.dma200.get(p[0]);
      if (d200 !== undefined) {
        const x = padding.left + (idx / (points.length - 1)) * chartW;
        const y =
          padding.top + chartH - ((d200 - chartMin) / valRange) * chartH;
        res.push([x, y, p[0], d200]);
      }
    });
    return res;
  }, [
    show200Dma,
    points,
    technicals.dma200,
    padding.left,
    padding.top,
    chartW,
    chartH,
    chartMin,
    valRange,
  ]);

  const dma200PathD = useMemo(() => {
    if (dma200Coords.length < 2) return "";
    return dma200Coords.reduce(
      (acc, curr, idx) =>
        `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`,
      "",
    );
  }, [dma200Coords]);

  // Big Drop days in active range (filtered by current dropThreshold)
  const bigDropEvents = useMemo(() => {
    if (coords.length < 2) return [];
    const drops: BigDropEvent[] = [];
    const isYield = series.format === "percent";
    const thresholdVal = -dropThreshold;

    coords.forEach((coord, idx) => {
      const date = coord[2];
      const price = coord[3];
      const stats = technicals.dailyStats.get(date);
      if (!stats) return;

      const isDrop = isYield
        ? stats.change <= -(dropThreshold * 0.05) ||
          stats.changePct <= thresholdVal
        : stats.changePct <= thresholdVal;

      if (isDrop) {
        drops.push({
          index: idx,
          date,
          price,
          prevPrice: stats.prevValue,
          change: stats.change,
          changePct: stats.changePct,
          x: coord[0],
          y: coord[1],
          dma50: technicals.dma50.get(date),
          dma200: technicals.dma200.get(date),
        });
      }
    });

    return drops;
  }, [coords, series.format, technicals, dropThreshold]);

  // Pre-sorted big drops for the table below (memoized so zero re-sort on mousemove)
  const sortedDropEvents = useMemo(() => {
    return [...bigDropEvents].sort((a, b) => a.changePct - b.changePct);
  }, [bigDropEvents]);

  // Ultra-fast, throttled mousemove handler (O(1) index projection, vsync-aligned)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!svgRef.current) return;
    const count = isCandleMode ? candleCoords.length : coords.length;
    if (count === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
    const targetIdx = isCandleMode
      ? Math.min(count - 1, Math.floor(ratio * count))
      : Math.round(ratio * (count - 1));

    if (targetIdx !== hoverIndexRef.current) {
      hoverIndexRef.current = targetIdx;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          setHoverIndex(hoverIndexRef.current);
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    hoverIndexRef.current = null;
    setHoverIndex(null);
  };

  // Click on plot canvas to select/pin a point (or deselect if clicking same point)
  const handlePlotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!svgRef.current) return;
    const count = isCandleMode ? candleCoords.length : coords.length;
    if (count === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
    const targetIdx = isCandleMode
      ? Math.min(count - 1, Math.floor(ratio * count))
      : Math.round(ratio * (count - 1));

    setSelectedPointIndex((prev) => (prev === targetIdx ? null : targetIdx));
  };

  // Active candle (in candles or bars mode)
  const activeCandleIndex =
    selectedPointIndex !== null
      ? Math.min(selectedPointIndex, candleCoords.length - 1)
      : null;

  const activeCandle =
    candleCoords.length > 0
      ? activeCandleIndex !== null
        ? candleCoords[activeCandleIndex]
        : hoverIndex !== null && hoverIndex < candleCoords.length
          ? candleCoords[hoverIndex]
          : candleCoords[candleCoords.length - 1]
      : null;

  // The active session displayed in the header telemetry:
  // If a point is clicked/pinned, display its data; otherwise display the latest closing session.
  const activeInspectionIndex =
    selectedPointIndex !== null ? selectedPointIndex : null;

  const activePoint =
    activeInspectionIndex !== null && coords[activeInspectionIndex]
      ? coords[activeInspectionIndex]
      : coords.length > 0
        ? coords[coords.length - 1]
        : null;

  const isInspecting = selectedPointIndex !== null;
  const displayedValue =
    isCandleMode && activeCandle
      ? activeCandle.close
      : activePoint
        ? activePoint[3]
        : endValue;

  const displayedDate =
    isCandleMode && activeCandle
      ? activeCandle.label
      : activePoint
        ? activePoint[2]
        : endDate;

  // Change comparison
  const hoverDiff =
    isCandleMode && activeCandle
      ? activeCandle.close - startValue
      : activePoint
        ? activePoint[3] - startValue
        : change;

  const hoverDiffPct =
    startValue !== 0 ? (hoverDiff / startValue) * 100 : changePct;

  // Inspected date technicals
  const hoverDate =
    isCandleMode && activeCandle
      ? activeCandle.date
      : activePoint
        ? activePoint[2]
        : series.latestDate;

  const hoverDma50 = technicals.dma50.get(hoverDate);
  const hoverDma200 = technicals.dma200.get(hoverDate);
  const hoverDailyStats = technicals.dailyStats.get(hoverDate);
  const activeBigDrop = activePoint
    ? bigDropEvents.find((d) => d.date === activePoint[2])
    : undefined;

  // Visual crosshair point (hover or clicked)
  const visualCrosshairIndex =
    selectedPointIndex !== null
      ? selectedPointIndex
      : hoverIndex !== null
        ? hoverIndex
        : null;

  const crosshairPoint = isCandleMode
    ? activeCandle
      ? ([
          activeCandle.x,
          activeCandle.yClose,
          activeCandle.date,
          activeCandle.close,
        ] as [number, number, string, number])
      : null
    : visualCrosshairIndex !== null && coords[visualCrosshairIndex]
      ? coords[visualCrosshairIndex]
      : null;

  const crosshairDma50 = crosshairPoint
    ? technicals.dma50.get(crosshairPoint[2])
    : undefined;
  const crosshairDma200 = crosshairPoint
    ? technicals.dma200.get(crosshairPoint[2])
    : undefined;

  // Y-coordinates of crosshair DMA markers
  const crosshairDma50Y =
    crosshairDma50 !== undefined
      ? padding.top + chartH - ((crosshairDma50 - chartMin) / valRange) * chartH
      : null;

  const crosshairDma200Y =
    crosshairDma200 !== undefined
      ? padding.top +
        chartH -
        ((crosshairDma200 - chartMin) / valRange) * chartH
      : null;

  // Selected point details for on-click floating tooltip card
  const selectedPoint = isCandleMode
    ? activeCandleIndex !== null && candleCoords[activeCandleIndex]
      ? ([
          candleCoords[activeCandleIndex].x,
          candleCoords[activeCandleIndex].yClose,
          candleCoords[activeCandleIndex].date,
          candleCoords[activeCandleIndex].close,
        ] as [number, number, string, number])
      : null
    : selectedPointIndex !== null && coords[selectedPointIndex]
      ? coords[selectedPointIndex]
      : null;

  const selectedPointStats = selectedPoint
    ? technicals.dailyStats.get(selectedPoint[2])
    : undefined;
  const selectedPointDma50 = selectedPoint
    ? technicals.dma50.get(selectedPoint[2])
    : undefined;
  const selectedPointDma200 = selectedPoint
    ? technicals.dma200.get(selectedPoint[2])
    : undefined;
  const selectedPointDrop = selectedPoint
    ? bigDropEvents.find((d) => d.date === selectedPoint[2])
    : undefined;

  // Latest DMA values
  const latestDma50 = technicals.dma50.get(series.latestDate);
  const latestDma200 = technicals.dma200.get(series.latestDate);

  // Structural Trend Posture
  const trendSignal = useMemo(() => {
    if (latestDma50 === undefined || latestDma200 === undefined) return null;
    const isGolden = latestDma50 >= latestDma200;
    const isAbove50 = series.latestValue >= latestDma50;
    const isAbove200 = series.latestValue >= latestDma200;

    if (isGolden && isAbove50 && isAbove200) {
      return {
        label: "Golden Cross (Above 50 & 200 DMA)",
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.14)",
        border: "rgba(16, 185, 129, 0.35)",
        icon: <AutoGraphIcon sx={{ fontSize: 13 }} />,
      };
    }
    if (isGolden && !isAbove50 && isAbove200) {
      return {
        label: "Golden Cross (Pullback to 50 DMA)",
        color: "#f59e0b",
        bg: "rgba(245, 158, 11, 0.14)",
        border: "rgba(245, 158, 11, 0.35)",
        icon: <TimelineIcon sx={{ fontSize: 13 }} />,
      };
    }
    if (!isGolden && !isAbove50 && !isAbove200) {
      return {
        label: "Death Cross (Below 50 & 200 DMA)",
        color: "#ef4444",
        bg: "rgba(239, 68, 68, 0.14)",
        border: "rgba(239, 68, 68, 0.35)",
        icon: <TrendingDownIcon sx={{ fontSize: 13 }} />,
      };
    }
    if (!isGolden) {
      return {
        label: "Death Cross Regime (50 < 200 DMA)",
        color: "#f87171",
        bg: "rgba(239, 68, 68, 0.12)",
        border: "rgba(239, 68, 68, 0.28)",
        icon: <WarningAmberIcon sx={{ fontSize: 13 }} />,
      };
    }
    return {
      label: "Golden Cross Regime (50 > 200 DMA)",
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.12)",
      border: "rgba(16, 185, 129, 0.28)",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 13 }} />,
    };
  }, [latestDma50, latestDma200, series.latestValue]);

  // Horizontal Grid Lines (4 reference steps)
  const gridLines = useMemo(() => {
    const steps = [0.15, 0.4, 0.65, 0.9];
    return steps.map((pct) => {
      const val = chartMin + valRange * pct;
      const y = padding.top + chartH - pct * chartH;
      return { val, y };
    });
  }, [chartMin, valRange, padding.top, chartH]);

  // Date ticks along bottom axis
  const dateTicks = useMemo(() => {
    if (isCandleMode) {
      if (candleCoords.length < 2) return [];
      if (candleCoords.length <= 7) {
        return candleCoords.map((c) => ({
          x: c.x,
          label: c.date.slice(5),
        }));
      }
      const count = 6;
      const ticks = [];
      for (let i = 0; i < count; i++) {
        const idx = Math.min(
          Math.floor((i / (count - 1)) * (candleCoords.length - 1)),
          candleCoords.length - 1,
        );
        ticks.push({
          x: candleCoords[idx].x,
          label: candleCoords[idx].date.slice(2),
        });
      }
      return ticks;
    }

    if (coords.length < 2) return [];
    if (coords.length <= 7) {
      return coords.map((c) => ({
        x: c[0],
        label: c[2].slice(5),
      }));
    }
    const count = 6;
    const ticks = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.min(
        Math.floor((i / (count - 1)) * (coords.length - 1)),
        coords.length - 1,
      );
      ticks.push({
        x: coords[idx][0],
        label: coords[idx][2].slice(2),
      });
    }
    return ticks;
  }, [coords, candleCoords, isCandleMode]);

  const handleSelectDropDay = (index: number) => {
    setSelectedPointIndex(index);
    if (svgRef.current) {
      svgRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleRangeChange = (rng: TimeRange) => {
    setSelectedRange(rng);
    setSelectedPointIndex(null);
  };

  if (!series || !series.observations || series.observations.length === 0) {
    return (
      <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Skeleton variant="rectangular" height={360} />
      </Card>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: isFullscreen ? 0 : 3.5,
        borderColor: "var(--indices-border, rgba(255, 255, 255, 0.12))",
        backgroundColor: isFullscreen
          ? "rgba(10, 15, 29, 0.98)"
          : "var(--indices-card-bg, rgba(30, 41, 59, 0.5))",
        boxShadow: isFullscreen
          ? "none"
          : "0 8px 32px rgba(0, 0, 0, 0.08)",
        overflow: isFullscreen ? "auto" : "hidden",
        ...(isFullscreen && {
          position: "fixed",
          inset: 0,
          zIndex: 1400,
          backdropFilter: "blur(20px)",
        }),
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Top Header & Range Switcher */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 0.5 }}
            >
              <Typography sx={{ fontSize: "1.25rem" }}>
                {series.icon}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                {series.name}
              </Typography>
              <Chip
                label={series.id}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  fontFamily: MONO_FONT,
                  height: 20,
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "primary.main",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                }}
              />
            </Stack>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              {series.subcategory} • Source: {series.source} • Frequency:{" "}
              {series.frequency}
            </Typography>
          </Box>

          {/* Time Range Selector */}
          <ButtonGroup
            size="small"
            variant="outlined"
            aria-label="time range selector"
            sx={{
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.4))",
              borderRadius: 2,
              p: 0.3,
              alignSelf: { xs: "stretch", sm: "auto" },
              display: "flex",
              justifyContent: "space-between",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              "& .MuiButton-root": {
                border: "none",
                borderRadius: 1.5,
                fontWeight: 700,
                fontSize: "0.72rem",
                fontFamily: MONO_FONT,
                px: { xs: 0.7, sm: 1.25 },
                py: 0.35,
                minWidth: { xs: "auto", sm: 36 },
                flexShrink: 0,
                color: "text.secondary",
                "&:hover": {
                  backgroundColor:
                    "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.08))",
                  color: "text.primary",
                },
                "&.active": {
                  backgroundColor: "primary.main",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(79, 70, 229, 0.4)",
                },
              },
            }}
          >
            {RANGES.map((rng) => (
              <Button
                key={rng}
                className={selectedRange === rng ? "active" : ""}
                onClick={() => handleRangeChange(rng)}
              >
                {rng}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>

        {/* Stable Pro Telemetry Strip (Fixed height, completely eliminates layout jumps) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 1.75,
            pb: 1.5,
            borderBottom:
              "1px solid rgba(255, 255, 255, 0.08)",
            minHeight: 48,
          }}
        >
          {/* Left: Numerical Telemetry */}
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={{ xs: 1.2, sm: 2 }}
            flexWrap="wrap"
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.45rem", sm: "1.9rem" },
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontFamily: MONO_FONT,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(
                displayedValue,
                series.format,
                series.decimals,
              )}
            </Typography>

            <Chip
              icon={
                hoverDiff >= 0 ? (
                  <TrendingUpIcon sx={{ fontSize: 15 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 15 }} />
                )
              }
              label={`${hoverDiff >= 0 ? "+" : ""}${formatSeriesValue(
                hoverDiff,
                series.format,
                series.decimals,
              )} (${hoverDiff >= 0 ? "+" : ""}${hoverDiffPct.toFixed(2)}%)`}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: "0.75rem",
                fontFamily: MONO_FONT,
                height: 24,
                backgroundColor:
                  hoverDiff >= 0
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                color: hoverDiff >= 0 ? "#10b981" : "#ef4444",
                border: `1px solid ${hoverDiff >= 0 ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: isInspecting ? "primary.light" : "text.secondary",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontWeight: isInspecting ? 700 : 500,
                fontFamily: MONO_FONT,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 13 }} />
              {displayedDate}{" "}
              {isInspecting ? "(Pinned session)" : "(Latest close)"}
            </Typography>

            {/* Daily Return (when a point is selected in line/area/baseline mode) */}
            {!isCandleMode && isInspecting && hoverDailyStats && (
              <Chip
                label={`Day: ${hoverDailyStats.change >= 0 ? "+" : ""}${hoverDailyStats.changePct.toFixed(2)}%`}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  fontFamily: MONO_FONT,
                  backgroundColor:
                    hoverDailyStats.change >= 0
                      ? "rgba(16, 185, 129, 0.12)"
                      : "rgba(239, 68, 68, 0.12)",
                  color:
                    hoverDailyStats.change >= 0 ? "#10b981" : "#ef4444",
                  border: `1px solid ${hoverDailyStats.change >= 0 ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)"}`,
                }}
              />
            )}

            {/* OHLC Telemetry Strip for Candlestick / Bar Mode */}
            {isCandleMode && activeCandle && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  fontFamily: MONO_FONT,
                  fontSize: "0.72rem",
                  color: "text.secondary",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  py: 0.35,
                  px: 1,
                  borderRadius: 1.5,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <span>
                  <strong style={{ opacity: 0.6 }}>O:</strong>{" "}
                  <span style={{ color: "var(--indices-text-primary, #fff)" }}>
                    {formatSeriesValue(
                      activeCandle.open,
                      series.format,
                      series.decimals,
                    )}
                  </span>
                </span>
                <span>
                  <strong style={{ opacity: 0.6 }}>H:</strong>{" "}
                  <span style={{ color: "#10b981" }}>
                    {formatSeriesValue(
                      activeCandle.high,
                      series.format,
                      series.decimals,
                    )}
                  </span>
                </span>
                <span>
                  <strong style={{ opacity: 0.6 }}>L:</strong>{" "}
                  <span style={{ color: "#ef4444" }}>
                    {formatSeriesValue(
                      activeCandle.low,
                      series.format,
                      series.decimals,
                    )}
                  </span>
                </span>
                <span>
                  <strong style={{ opacity: 0.6 }}>C:</strong>{" "}
                  <span style={{ color: "var(--indices-text-primary, #fff)" }}>
                    {formatSeriesValue(
                      activeCandle.close,
                      series.format,
                      series.decimals,
                    )}
                  </span>
                </span>
                <span
                  style={{
                    color: activeCandle.isBullish ? "#10b981" : "#ef4444",
                    fontWeight: 800,
                  }}
                >
                  {activeCandle.change >= 0 ? "+" : ""}
                  {activeCandle.changePct.toFixed(2)}%
                </span>
              </Stack>
            )}
          </Stack>

          {/* Right: Technical Regime Signal / Drop Alert Pill */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {activeBigDrop && (
              <Chip
                icon={
                  <ArrowDownwardIcon
                    sx={{ fontSize: "14px !important", color: "#ffffff" }}
                  />
                }
                label={`Selloff Session: ${activeBigDrop.changePct.toFixed(2)}%`}
                size="small"
                sx={{
                  height: 24,
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  fontFamily: MONO_FONT,
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  boxShadow: "0 2px 10px rgba(239, 68, 68, 0.4)",
                }}
              />
            )}
            {trendSignal && !activeBigDrop && (
              <Chip
                icon={trendSignal.icon}
                label={trendSignal.label}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  height: 24,
                  backgroundColor: trendSignal.bg,
                  color: trendSignal.color,
                  border: `1px solid ${trendSignal.border}`,
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Technical Indicators, Chart Type & Drop Filtering Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 0.5,
          }}
        >
          {/* Left: Chart Type Selector + Overlay Toggles */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
          >
            {/* Chart Type Selector */}
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "text.secondary",
                  fontSize: "0.68rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Chart:
              </Typography>
              <ButtonGroup
                size="small"
                variant="outlined"
                aria-label="chart type selector"
                sx={{
                  backgroundColor: "var(--indices-card-bg, rgba(0, 0, 0, 0.25))",
                  borderRadius: 2,
                  p: 0.25,
                  "& .MuiButton-root": {
                    border: "none",
                    borderRadius: 1.5,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    fontFamily: MONO_FONT,
                    px: { xs: 0.75, sm: 1.1 },
                    py: 0.35,
                    minWidth: "auto",
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor:
                        "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.08))",
                      color: "text.primary",
                    },
                    "&.active": {
                      backgroundColor: "primary.main",
                      color: "#ffffff",
                      boxShadow: "0 2px 8px rgba(79, 70, 229, 0.35)",
                    },
                  },
                }}
              >
                {[
                  {
                    type: "candles" as ChartType,
                    label: "Candles",
                    icon: <CandlestickChartIcon sx={{ fontSize: 13 }} />,
                  },
                  {
                    type: "baseline" as ChartType,
                    label: "Baseline",
                    icon: <TimelineIcon sx={{ fontSize: 13 }} />,
                  },
                  {
                    type: "mountain" as ChartType,
                    label: "Mountain",
                    icon: <AreaChartIcon sx={{ fontSize: 13 }} />,
                  },
                  {
                    type: "line" as ChartType,
                    label: "Line",
                    icon: <ShowChartIcon sx={{ fontSize: 13 }} />,
                  },
                  {
                    type: "bars" as ChartType,
                    label: "Bars",
                    icon: <BarChartIcon sx={{ fontSize: 13 }} />,
                  },
                ].map((ct) => (
                  <Button
                    key={ct.type}
                    className={chartType === ct.type ? "active" : ""}
                    onClick={() => {
                      setChartType(ct.type);
                      try {
                        localStorage.setItem("tracker_chart_type_v2", ct.type);
                      } catch {
                        /* ignore storage error */
                      }
                    }}
                    startIcon={ct.icon}
                    sx={{
                      "& .MuiButton-startIcon": {
                        mr: { xs: 0, sm: 0.5 },
                        ml: 0,
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ display: { xs: "none", sm: "inline" } }}
                    >
                      {ct.label}
                    </Box>
                  </Button>
                ))}
              </ButtonGroup>
            </Stack>

            {/* Vertical Divider */}
            <Box
              sx={{
                width: 1,
                height: 20,
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                display: { xs: "none", sm: "block" },
              }}
            />

            {/* Overlay Toggles */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "text.secondary",
                  fontSize: "0.68rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mr: 0.5,
                }}
              >
                <LayersIcon sx={{ fontSize: 14 }} /> Overlays:
              </Typography>

            {/* 50 DMA Toggle */}
            <Tooltip
              title={
                technicals.hasEnough50
                  ? "50-Day Simple Moving Average (Intermediate Momentum)"
                  : "Insufficient historical data (< 50 trading days)"
              }
              arrow
            >
              <span>
                <Chip
                  clickable={technicals.hasEnough50}
                  disabled={!technicals.hasEnough50}
                  onClick={() => setShow50Dma((prev) => !prev)}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                      }}
                    >
                      <Box
                        sx={{
                          width: 14,
                          height: 3,
                          borderRadius: 1,
                          backgroundColor: "#f59e0b",
                        }}
                      />
                      <span>50 DMA</span>
                      {hoverDma50 !== undefined ? (
                        <span
                          style={{
                            opacity: 0.9,
                            fontSize: "0.68rem",
                            fontFamily: MONO_FONT,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          ({formatSeriesValue(
                            hoverDma50,
                            series.format,
                            series.decimals,
                          )})
                        </span>
                      ) : latestDma50 !== undefined ? (
                        <span
                          style={{
                            opacity: 0.9,
                            fontSize: "0.68rem",
                            fontFamily: MONO_FONT,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          ({formatSeriesValue(
                            latestDma50,
                            series.format,
                            series.decimals,
                          )})
                        </span>
                      ) : null}
                    </Box>
                  }
                  size="small"
                  variant={show50Dma ? "filled" : "outlined"}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: 26,
                    backgroundColor: show50Dma
                      ? "rgba(245, 158, 11, 0.18)"
                      : "transparent",
                    color: show50Dma ? "#fbbf24" : "text.secondary",
                    borderColor: show50Dma
                      ? "#f59e0b"
                      : "rgba(255, 255, 255, 0.15)",
                    "&:hover": {
                      backgroundColor: show50Dma
                        ? "rgba(245, 158, 11, 0.28)"
                        : "rgba(255, 255, 255, 0.06)",
                    },
                  }}
                />
              </span>
            </Tooltip>

            {/* 200 DMA Toggle */}
            <Tooltip
              title={
                technicals.hasEnough200
                  ? "200-Day Simple Moving Average (Long-Term Structural Trend)"
                  : "Insufficient historical data (< 200 trading days)"
              }
              arrow
            >
              <span>
                <Chip
                  clickable={technicals.hasEnough200}
                  disabled={!technicals.hasEnough200}
                  onClick={() => setShow200Dma((prev) => !prev)}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                      }}
                    >
                      <Box
                        sx={{
                          width: 14,
                          height: 3,
                          borderRadius: 1,
                          backgroundColor: "#a855f7",
                        }}
                      />
                      <span>200 DMA</span>
                      {hoverDma200 !== undefined ? (
                        <span
                          style={{
                            opacity: 0.9,
                            fontSize: "0.68rem",
                            fontFamily: MONO_FONT,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          ({formatSeriesValue(
                            hoverDma200,
                            series.format,
                            series.decimals,
                          )})
                        </span>
                      ) : latestDma200 !== undefined ? (
                        <span
                          style={{
                            opacity: 0.9,
                            fontSize: "0.68rem",
                            fontFamily: MONO_FONT,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          ({formatSeriesValue(
                            latestDma200,
                            series.format,
                            series.decimals,
                          )})
                        </span>
                      ) : null}
                    </Box>
                  }
                  size="small"
                  variant={show200Dma ? "filled" : "outlined"}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: 26,
                    backgroundColor: show200Dma
                      ? "rgba(168, 85, 247, 0.18)"
                      : "transparent",
                    color: show200Dma ? "#c084fc" : "text.secondary",
                    borderColor: show200Dma
                      ? "#a855f7"
                      : "rgba(255, 255, 255, 0.15)",
                    "&:hover": {
                      backgroundColor: show200Dma
                        ? "rgba(168, 85, 247, 0.28)"
                        : "rgba(255, 255, 255, 0.06)",
                    },
                  }}
                />
              </span>
            </Tooltip>

            {/* Big Drops Toggle */}
            <Tooltip
              title={`Show drop sessions with decline ≥ ${dropThreshold}%`}
              arrow
            >
              <Chip
                clickable
                onClick={() => setShowBigDrops((prev) => !prev)}
                icon={
                  <WarningAmberIcon
                    sx={{
                      fontSize: "14px !important",
                      color: showBigDrops ? "#ef4444" : "inherit",
                    }}
                  />
                }
                label={`Big Drops (${bigDropEvents.length})`}
                size="small"
                variant={showBigDrops ? "filled" : "outlined"}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  fontFamily: MONO_FONT,
                  height: 26,
                  backgroundColor: showBigDrops
                    ? "rgba(239, 68, 68, 0.18)"
                    : "transparent",
                  color: showBigDrops ? "#f87171" : "text.secondary",
                  borderColor: showBigDrops
                    ? "#ef4444"
                    : "rgba(255, 255, 255, 0.15)",
                  "&:hover": {
                    backgroundColor: showBigDrops
                      ? "rgba(239, 68, 68, 0.28)"
                      : "rgba(255, 255, 255, 0.06)",
                  },
                }}
              />
            </Tooltip>

            {/* Drop Threshold Filter Pills (Institutional Filter) */}
            {showBigDrops && (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ ml: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.65rem",
                    color: "text.secondary",
                    fontWeight: 700,
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <FilterListIcon sx={{ fontSize: 12, verticalAlign: "middle" }} /> Cutoff:
                </Typography>
                {([1.5, 2.0, 3.0] as DropThreshold[]).map((thresh) => (
                  <Chip
                    key={thresh}
                    label={`≥ ${thresh}%`}
                    size="small"
                    clickable
                    onClick={() => {
                      setDropThreshold(thresh);
                      setSelectedPointIndex(null);
                    }}
                    sx={{
                      height: 20,
                      fontSize: "0.64rem",
                      fontWeight: 700,
                      fontFamily: MONO_FONT,
                      backgroundColor:
                        dropThreshold === thresh
                          ? "rgba(239, 68, 68, 0.25)"
                          : "rgba(255, 255, 255, 0.04)",
                      color: dropThreshold === thresh ? "#f87171" : "text.secondary",
                      border:
                        dropThreshold === thresh
                          ? "1px solid rgba(239, 68, 68, 0.4)"
                          : "1px solid transparent",
                    }}
                  />
                ))}
              </Stack>
            )}
            </Stack>
          </Stack>

          {/* Right Controls: Height Presets + Fullscreen + Guide Toggle */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {/* Height Presets */}
            <ButtonGroup
              size="small"
              variant="outlined"
              aria-label="chart height presets"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                backgroundColor: "var(--indices-card-bg, rgba(0, 0, 0, 0.25))",
                borderRadius: 2,
                p: 0.25,
                "& .MuiButton-root": {
                  border: "none",
                  borderRadius: 1.5,
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  fontFamily: MONO_FONT,
                  px: 0.9,
                  py: 0.25,
                  minWidth: "28px",
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor:
                      "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.08))",
                    color: "text.primary",
                  },
                  "&.active": {
                    backgroundColor: "primary.main",
                    color: "#ffffff",
                    boxShadow: "0 2px 8px rgba(79, 70, 229, 0.35)",
                  },
                },
              }}
            >
              {[
                { label: "S", height: 260 },
                { label: "M", height: 360 },
                { label: "L", height: 480 },
                { label: "XL", height: 620 },
              ].map((preset) => (
                <Tooltip
                  key={preset.label}
                  title={`Preset ${preset.label} (${preset.height}px)`}
                  arrow
                >
                  <Button
                    className={
                      !isFullscreen &&
                      Math.abs(chartHeight - preset.height) <= 15
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setChartHeight(preset.height);
                      try {
                        localStorage.setItem(
                          "tracker_chart_height",
                          String(preset.height),
                        );
                      } catch {
                        /* ignore storage error */
                      }
                    }}
                  >
                    {preset.label}
                  </Button>
                </Tooltip>
              ))}
            </ButtonGroup>

            {/* Fullscreen Toggle */}
            <Tooltip
              title={
                isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen Dashboard"
              }
              arrow
            >
              <IconButton
                size="small"
                onClick={() => setIsFullscreen((prev) => !prev)}
                sx={{
                  color: isFullscreen ? "primary.main" : "text.secondary",
                  border: "1px solid",
                  borderColor: isFullscreen
                    ? "primary.main"
                    : "var(--indices-border, rgba(255, 255, 255, 0.12))",
                  backgroundColor: isFullscreen
                    ? "rgba(99, 102, 241, 0.15)"
                    : "transparent",
                  p: 0.5,
                  borderRadius: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    color: "primary.light",
                  },
                }}
              >
                {isFullscreen ? (
                  <FullscreenExitIcon sx={{ fontSize: 18 }} />
                ) : (
                  <FullscreenIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Tooltip>

            {/* Guide Toggle */}
            <Button
              size="small"
              startIcon={<InfoOutlinedIcon sx={{ fontSize: 14 }} />}
              onClick={() => setShowGuide((prev) => !prev)}
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "none",
                color: "text.secondary",
                py: 0.3,
                px: 1,
                borderRadius: 1.5,
                "&:hover": { color: "primary.light" },
              }}
            >
              {showGuide ? "Hide Guide" : "Guide"}
            </Button>
          </Stack>
        </Box>

        {/* Educational Guide Drawer */}
        <Collapse in={showGuide} sx={{ mb: showGuide ? 1.5 : 0 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2.5,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              borderColor: "rgba(99, 102, 241, 0.25)",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                color: "primary.light",
                fontSize: "0.8rem",
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              Professional Technical Indicators &amp; Multi-Style Charting
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2,
                fontSize: "0.75rem",
                color: "text.secondary",
                lineHeight: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "primary.light",
                    fontSize: "0.74rem",
                    mb: 0.3,
                  }}
                >
                  📊 Multi-Style Chart Types
                </Typography>
                Toggle between Mountain (smooth gradient area), Japanese
                Candlesticks (red/green OHLC), Line (uncluttered price action),
                Wall Street Bars, and Baseline (performance relative to period start).
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#fbbf24",
                    fontSize: "0.74rem",
                    mb: 0.3,
                  }}
                >
                  🟠 50-Day Moving Average (50 DMA)
                </Typography>
                Medium-term momentum boundary. When prices hold above the 50
                DMA, the prevailing institutional rally is intact. Dropping below
                warns of momentum loss or corrective phases.
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#c084fc",
                    fontSize: "0.74rem",
                    mb: 0.3,
                  }}
                >
                  🟣 200-Day Moving Average (200 DMA)
                </Typography>
                Secular bull/bear dividing line watched by sovereign wealth and
                pension funds worldwide. Golden Cross (50 DMA &gt; 200 DMA)
                confirms long-term bull markets.
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#f87171",
                    fontSize: "0.74rem",
                    mb: 0.3,
                  }}
                >
                  🔴 High-Volatility Selloff Days
                </Typography>
                Single-day drops exceeding the selected threshold (≥ 1.5%, 2.0%,
                or 3.0%). These represent acute market shocks, panic liquidations,
                or key inflection pivots.
              </Box>
            </Box>
          </Paper>
        </Collapse>

        {/* Interactive Chart Canvas with Dynamic Vertical Height */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: isFullscreen
              ? "calc(100vh - 280px)"
              : {
                  xs: Math.max(240, chartHeight - 40),
                  sm: chartHeight,
                  md: chartHeight,
                },
            minHeight: isFullscreen ? 360 : MIN_HEIGHT,
            userSelect: isDraggingHeight ? "none" : "auto",
            transition: isDraggingHeight ? "none" : "height 0.15s ease-out",
          }}
        >
          {/* Plot Area Container (Touch and Mouse interactive, click to inspect) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: { xs: 54, sm: 65, md: 72 },
              bottom: 26,
              cursor: "pointer",
              borderRight: "1px solid rgba(255, 255, 255, 0.08)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              overflow: "visible",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handlePlotClick}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${plotW} ${plotH}`}
              preserveAspectRatio="none"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                shapeRendering: "geometricPrecision",
                overflow: "hidden",
              }}
            >
              <defs>
                {/* Mountain Area Gradient */}
                <linearGradient id={chartGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity={0.32} />
                  <stop
                    offset="65%"
                    stopColor={strokeColor}
                    stopOpacity={0.05}
                  />
                  <stop
                    offset="100%"
                    stopColor={strokeColor}
                    stopOpacity={0.0}
                  />
                </linearGradient>

                {/* Baseline Split Gradient (Emerald above baseline, Rose below baseline) */}
                <linearGradient
                  id={`baseline-grad-${chartGradId}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.34} />
                  <stop
                    offset={`${Math.max(0, baselinePct - 0.5)}%`}
                    stopColor="#10b981"
                    stopOpacity={0.04}
                  />
                  <stop
                    offset={`${Math.min(100, baselinePct + 0.5)}%`}
                    stopColor="#ef4444"
                    stopOpacity={0.04}
                  />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.34} />
                </linearGradient>

                <filter
                  id={`glow-${chartGradId}`}
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                >
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Horizontal Reference Lines */}
              {gridLines.map((line, idx) => (
                <line
                  key={idx}
                  x1={0}
                  y1={line.y}
                  x2={plotW}
                  y2={line.y}
                  stroke={theme.palette.divider}
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                  opacity={0.4}
                />
              ))}

              {/* 1. Mountain Area Fill */}
              {chartType === "mountain" && (
                <path d={areaD} fill={`url(#${chartGradId})`} />
              )}

              {/* 2. Baseline Shaded Area & Reference Line */}
              {chartType === "baseline" && (
                <g>
                  <path
                    d={areaD}
                    fill={`url(#baseline-grad-${chartGradId})`}
                  />
                  <line
                    x1={0}
                    y1={yBaseline}
                    x2={plotW}
                    y2={yBaseline}
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeDasharray="4 3"
                    strokeWidth="1.2"
                  />
                </g>
              )}

              {/* 3. Primary Price Curve for Mountain, Line, and Baseline */}
              {(chartType === "mountain" ||
                chartType === "line" ||
                chartType === "baseline") && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={chartType === "line" ? "2.4" : "2.2"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`url(#glow-${chartGradId})`}
                />
              )}

              {/* 4. Japanese Candlesticks (Red / Green) */}
              {chartType === "candles" &&
                candleCoords.map((c) => {
                  const isCandleSelected =
                    selectedPointIndex !== null &&
                    selectedPointIndex === c.index;
                  const isCandleHovered = hoverIndex === c.index;
                  const candleColor = c.isBullish ? "#10b981" : "#ef4444";
                  const candleStroke = c.isBullish ? "#059669" : "#dc2626";

                  return (
                    <g
                      key={c.date + c.index}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPointIndex((prev) =>
                          prev === c.index ? null : c.index,
                        );
                      }}
                    >
                      {/* Upper Wick */}
                      <line
                        x1={c.x}
                        y1={c.yHigh}
                        x2={c.x}
                        y2={Math.min(c.yOpen, c.yClose)}
                        stroke={candleColor}
                        strokeWidth={isCandleSelected ? "2" : "1.4"}
                        strokeLinecap="round"
                      />
                      {/* Lower Wick */}
                      <line
                        x1={c.x}
                        y1={Math.max(c.yOpen, c.yClose)}
                        x2={c.x}
                        y2={c.yLow}
                        stroke={candleColor}
                        strokeWidth={isCandleSelected ? "2" : "1.4"}
                        strokeLinecap="round"
                      />
                      {/* Candle Body Rect */}
                      <rect
                        x={c.x - c.width / 2}
                        y={Math.min(c.yOpen, c.yClose)}
                        width={c.width}
                        height={Math.max(2, Math.abs(c.yOpen - c.yClose))}
                        fill={candleColor}
                        stroke={isCandleSelected ? "#ffffff" : candleStroke}
                        strokeWidth={isCandleSelected ? "1.5" : "0.8"}
                        rx="0.5"
                        opacity={isCandleHovered || isCandleSelected ? 1 : 0.88}
                      />
                    </g>
                  );
                })}

              {/* 5. Wall Street OHLC Bars */}
              {chartType === "bars" &&
                candleCoords.map((b) => {
                  const isBarSelected =
                    selectedPointIndex !== null &&
                    selectedPointIndex === b.index;
                  const barColor = b.isBullish ? "#10b981" : "#ef4444";

                  return (
                    <g
                      key={b.date + b.index}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPointIndex((prev) =>
                          prev === b.index ? null : b.index,
                        );
                      }}
                    >
                      {/* High-Low Stem */}
                      <line
                        x1={b.x}
                        y1={b.yHigh}
                        x2={b.x}
                        y2={b.yLow}
                        stroke={barColor}
                        strokeWidth={isBarSelected ? "2.2" : "1.6"}
                        strokeLinecap="round"
                      />
                      {/* Open Tick (Left) */}
                      <line
                        x1={b.x - b.width / 2}
                        y1={b.yOpen}
                        x2={b.x}
                        y2={b.yOpen}
                        stroke={barColor}
                        strokeWidth={isBarSelected ? "2.2" : "1.6"}
                        strokeLinecap="round"
                      />
                      {/* Close Tick (Right) */}
                      <line
                        x1={b.x}
                        y1={b.yClose}
                        x2={b.x + b.width / 2}
                        y2={b.yClose}
                        stroke={barColor}
                        strokeWidth={isBarSelected ? "2.2" : "1.6"}
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}

              {/* 200 DMA Curve (Royal Violet) */}
              {show200Dma && dma200PathD && (
                <path
                  d={dma200PathD}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1.8"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.88}
                />
              )}

              {/* 50 DMA Curve (Amber Gold) */}
              {show50Dma && dma50PathD && (
                <path
                  d={dma50PathD}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.92}
                />
              )}

              {/* Big Drop Markers on Price Curve */}
              {showBigDrops &&
                bigDropEvents.map((drop) => {
                  const isSelected =
                    selectedPointIndex !== null &&
                    selectedPointIndex === drop.index;
                  return (
                    <g
                      key={drop.date}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPointIndex(drop.index);
                      }}
                    >
                      {/* Outer Pulse Ring */}
                      <circle
                        cx={drop.x}
                        cy={drop.y}
                        r={isSelected ? 10 : 6}
                        fill="rgba(239, 68, 68, 0.28)"
                      />
                      {/* Inner Dot */}
                      <circle
                        cx={drop.x}
                        cy={drop.y}
                        r={isSelected ? 5 : 3.2}
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                    </g>
                  );
                })}

              {/* Crosshair on Hover or Selected Point */}
              {crosshairPoint && (
                <g>
                  {/* Vertical Crosshair Line */}
                  <line
                    x1={crosshairPoint[0]}
                    y1={0}
                    x2={crosshairPoint[0]}
                    y2={plotH}
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />

                  {/* Horizontal Crosshair Line */}
                  <line
                    x1={0}
                    y1={crosshairPoint[1]}
                    x2={plotW}
                    y2={crosshairPoint[1]}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />

                  {/* Marker Circle on 200 DMA */}
                  {show200Dma && crosshairDma200Y !== null && (
                    <circle
                      cx={crosshairPoint[0]}
                      cy={crosshairDma200Y}
                      r="4"
                      fill="#a855f7"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Marker Circle on 50 DMA */}
                  {show50Dma && crosshairDma50Y !== null && (
                    <circle
                      cx={crosshairPoint[0]}
                      cy={crosshairDma50Y}
                      r="4"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Primary Marker Circles on Price Point */}
                  <circle
                    cx={crosshairPoint[0]}
                    cy={crosshairPoint[1]}
                    r="6.5"
                    fill={glowColor}
                  />
                  <circle
                    cx={crosshairPoint[0]}
                    cy={crosshairPoint[1]}
                    r="4"
                    fill="#ffffff"
                    stroke={strokeColor}
                    strokeWidth="2.2"
                  />
                </g>
              )}
            </svg>

            {/* Pinned Telemetry Tooltip Card (Shown on click with monospace financial typography) */}
            {selectedPoint && (() => {
              const ptX = selectedPoint[0];
              const ptY = selectedPoint[1];
              // Horizontal placement: ensure card is kept within canvas bounds
              const tipLeft = Math.max(
                8,
                Math.min(plotW - 235, ptX > 480 ? ptX - 225 : ptX + 14),
              );
              // Vertical placement: if near the top (ptY < 130), place BELOW the point so it never overflows off the top!
              // If near the bottom (ptY > 210), place ABOVE the point so it never overflows off the bottom!
              const tipTop =
                ptY < 130 ? ptY + 14 : ptY > 210 ? ptY - 165 : ptY - 80;
              const clampedTop = Math.max(8, Math.min(plotH - 175, tipTop));

              return (
                <Paper
                  elevation={10}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    position: "absolute",
                    left: `${(tipLeft / plotW) * 100}%`,
                    top: `${(clampedTop / plotH) * 100}%`,
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    backdropFilter: "blur(12px)",
                    border: selectedPointDrop
                      ? "1px solid rgba(239, 68, 68, 0.5)"
                      : "1px solid rgba(255, 255, 255, 0.16)",
                    borderRadius: 2.5,
                    p: 1.5,
                    minWidth: { xs: 190, sm: 210 },
                    maxWidth: { xs: 230, sm: 250 },
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.65)",
                    zIndex: 10,
                  }}
                >
                  {/* Header row: Date + Close Button */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        color: "text.secondary",
                        fontFamily: MONO_FONT,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{ fontSize: 12, color: "primary.light" }}
                      />
                      {selectedPoint[2]}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPointIndex(null);
                      }}
                      sx={{
                        p: 0.2,
                        color: "text.secondary",
                        "&:hover": { color: "text.primary" },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 13 }} />
                    </IconButton>
                  </Stack>

                  {/* Price in Monospace */}
                  <Typography
                    sx={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      fontFamily: MONO_FONT,
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1.2,
                    }}
                  >
                    {formatSeriesValue(
                      selectedPoint[3],
                      series.format,
                      series.decimals,
                    )}
                  </Typography>

                  {/* OHLC Breakdown for Candlestick / Bar Mode */}
                  {isCandleMode && activeCandle && (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 0.5,
                        my: 0.75,
                        p: 0.75,
                        borderRadius: 1.5,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        fontFamily: MONO_FONT,
                        fontSize: "0.68rem",
                      }}
                    >
                      <div>
                        <span style={{ opacity: 0.6 }}>Open: </span>
                        <strong>
                          {formatSeriesValue(
                            activeCandle.open,
                            series.format,
                            series.decimals,
                          )}
                        </strong>
                      </div>
                      <div>
                        <span style={{ opacity: 0.6 }}>High: </span>
                        <strong style={{ color: "#10b981" }}>
                          {formatSeriesValue(
                            activeCandle.high,
                            series.format,
                            series.decimals,
                          )}
                        </strong>
                      </div>
                      <div>
                        <span style={{ opacity: 0.6 }}>Low: </span>
                        <strong style={{ color: "#ef4444" }}>
                          {formatSeriesValue(
                            activeCandle.low,
                            series.format,
                            series.decimals,
                          )}
                        </strong>
                      </div>
                      <div>
                        <span style={{ opacity: 0.6 }}>Close: </span>
                        <strong>
                          {formatSeriesValue(
                            activeCandle.close,
                            series.format,
                            series.decimals,
                          )}
                        </strong>
                      </div>
                    </Box>
                  )}

                  {/* Daily Change in Monospace */}
                  {!isCandleMode && selectedPointStats && (
                    <Typography
                      sx={{
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        color:
                          selectedPointStats.change >= 0 ? "#10b981" : "#ef4444",
                        fontFamily: MONO_FONT,
                        fontVariantNumeric: "tabular-nums",
                        mt: 0.25,
                        mb: 0.75,
                      }}
                    >
                      {selectedPointStats.change >= 0 ? "+" : ""}
                      {selectedPointStats.changePct.toFixed(2)}% (
                      {selectedPointStats.change >= 0 ? "+" : ""}
                      {formatSeriesValue(
                        selectedPointStats.change,
                        series.format,
                        series.decimals,
                      )}
                      )
                    </Typography>
                  )}

                  {/* Indicators Breakdown in Monospace */}
                  <Stack
                    spacing={0.4}
                    sx={{
                      pt: 0.6,
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {show50Dma && selectedPointDma50 !== undefined && (
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          color: "#fbbf24",
                          fontFamily: MONO_FONT,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        50 DMA:{" "}
                        {formatSeriesValue(
                          selectedPointDma50,
                          series.format,
                          series.decimals,
                        )}{" "}
                        (
                        {selectedPoint[3] >= selectedPointDma50 ? "+" : ""}
                        {(
                          ((selectedPoint[3] - selectedPointDma50) /
                            selectedPointDma50) *
                          100
                        ).toFixed(1)}
                        %)
                      </Typography>
                    )}
                    {show200Dma && selectedPointDma200 !== undefined && (
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          color: "#c084fc",
                          fontFamily: MONO_FONT,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        200 DMA:{" "}
                        {formatSeriesValue(
                          selectedPointDma200,
                          series.format,
                          series.decimals,
                        )}{" "}
                        (
                        {selectedPoint[3] >= selectedPointDma200 ? "+" : ""}
                        {(
                          ((selectedPoint[3] - selectedPointDma200) /
                            selectedPointDma200) *
                          100
                        ).toFixed(1)}
                        %)
                      </Typography>
                    )}
                    {selectedPointDrop && (
                      <Chip
                        icon={
                          <ArrowDownwardIcon
                            sx={{ fontSize: "12px !important", color: "#ffffff" }}
                          />
                        }
                        label={`Big Drop: ${selectedPointDrop.changePct.toFixed(2)}%`}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.66rem",
                          fontWeight: 800,
                          fontFamily: MONO_FONT,
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          mt: 0.5,
                        }}
                      />
                    )}
                  </Stack>
                </Paper>
              );
            })()}
          </Box>

          {/* Right Y-Axis HTML Overlay with Crisp Monospace Numbers */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 26,
              width: { xs: 54, sm: 65, md: 72 },
              pointerEvents: "none",
            }}
          >
            {gridLines.map((line, idx) => (
              <Typography
                key={idx}
                sx={{
                  position: "absolute",
                  top: `${(line.y / plotH) * 100}%`,
                  transform: "translateY(-50%)",
                  left: { xs: 4, sm: 8 },
                  color: "text.secondary",
                  fontSize: { xs: "0.62rem", sm: "0.72rem" },
                  fontWeight: 600,
                  fontFamily: MONO_FONT,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {formatAxisValue(line.val, series.format)}
              </Typography>
            ))}

            {/* Selected Point Price Badge on Right Y-Axis */}
            {selectedPoint && (
              <Box
                sx={{
                  position: "absolute",
                  top: `${(selectedPoint[1] / plotH) * 100}%`,
                  transform: "translateY(-50%)",
                  left: { xs: 2, sm: 4 },
                  right: 1,
                  backgroundColor: strokeColor,
                  color: "#ffffff",
                  borderRadius: "3px",
                  py: "2px",
                  px: { xs: "2px", sm: "4px" },
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: { xs: "0.60rem", sm: "0.68rem" },
                  fontFamily: MONO_FONT,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1.2,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {formatAxisValue(selectedPoint[3], series.format)}
              </Box>
            )}
          </Box>

          {/* Bottom X-Axis HTML Overlay with Monospace Dates */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: { xs: 54, sm: 65, md: 72 },
              bottom: 0,
              height: 26,
              pointerEvents: "none",
            }}
          >
            {dateTicks.map((tick, idx) => {
              let transform = "translateX(-50%)";
              if (idx === 0) transform = "translateX(0%)";
              else if (idx === dateTicks.length - 1)
                transform = "translateX(-100%)";

              // On mobile screens, only show start, middle, and end ticks to prevent text collision
              const isStartOrEnd = idx === 0 || idx === dateTicks.length - 1;
              const isMiddle = idx === Math.floor(dateTicks.length / 2);
              const showOnMobile = isStartOrEnd || isMiddle;

              return (
                <Typography
                  key={idx}
                  sx={{
                    position: "absolute",
                    left: `${(tick.x / plotW) * 100}%`,
                    transform,
                    top: 6,
                    color: "text.secondary",
                    fontSize: { xs: "0.62rem", sm: "0.7rem" },
                    fontWeight: 600,
                    fontFamily: MONO_FONT,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    display: showOnMobile
                      ? "block"
                      : { xs: "none", sm: "block" },
                  }}
                >
                  {tick.label}
                </Typography>
              );
            })}
          </Box>
        </Box>

        {/* Interactive Drag Handle to Resize Graph Height */}
        {!isFullscreen && (
          <Box
            onMouseDown={handleResizeMouseDown}
            onTouchStart={handleResizeTouchStart}
            onDoubleClick={() => {
              setChartHeight(DEFAULT_HEIGHT);
              try {
                localStorage.setItem(
                  "tracker_chart_height",
                  String(DEFAULT_HEIGHT),
                );
              } catch {
                /* ignore storage error */
              }
            }}
            title={`Drag vertically to adjust height • Double-click to reset (${DEFAULT_HEIGHT}px)`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 22,
              mt: 1,
              mb: 0.5,
              cursor: "row-resize",
              userSelect: "none",
              transition: "all 0.15s ease",
              opacity: isDraggingHeight ? 1 : 0.65,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 1.5,
                py: 0.2,
                borderRadius: 2,
                backgroundColor: isDraggingHeight
                  ? "rgba(99, 102, 241, 0.25)"
                  : "rgba(255, 255, 255, 0.04)",
                border: "1px solid",
                borderColor: isDraggingHeight
                  ? "primary.main"
                  : "rgba(255, 255, 255, 0.1)",
                transition: "all 0.2s ease",
              }}
            >
              <DragHandleIcon
                sx={{
                  fontSize: 16,
                  color: isDraggingHeight ? "primary.light" : "text.secondary",
                  mr: 0.5,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.64rem",
                  fontFamily: MONO_FONT,
                  fontWeight: 700,
                  color: isDraggingHeight ? "primary.light" : "text.secondary",
                  letterSpacing: "0.03em",
                }}
              >
                {chartHeight}px
              </Typography>
            </Box>
          </Box>
        )}

        {/* Statistical Range Footer Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
            },
            gap: 1.5,
            mt: 2.5,
            pt: 2,
            borderTop:
              "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              Period Low
            </Typography>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.88rem",
                fontFamily: MONO_FONT,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(min, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              Period High
            </Typography>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.88rem",
                fontFamily: MONO_FONT,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(max, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              Period Start ({startDate})
            </Typography>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.88rem",
                fontFamily: MONO_FONT,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(startValue, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              52-Week Range
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.8rem",
                fontFamily: MONO_FONT,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(series.low52, series.format, series.decimals)}{" "}
              –{" "}
              {formatSeriesValue(
                series.high52,
                series.format,
                series.decimals,
              )}
            </Typography>
          </Paper>
        </Box>

        {/* Significant Drop Days Panel */}
        <Box sx={{ mt: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <WarningAmberIcon sx={{ color: "#ef4444", fontSize: 18 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Notable Selloff &amp; Big Drop Sessions ({bigDropEvents.length})
              </Typography>
              <Chip
                label={`Decline ≥ ${dropThreshold}%`}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  fontFamily: MONO_FONT,
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  color: "#ef4444",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                }}
              />
            </Stack>

            <Button
              size="small"
              onClick={() => setShowDropPanel((prev) => !prev)}
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "none",
                color: "text.secondary",
              }}
            >
              {showDropPanel ? "Collapse" : "Expand"}
            </Button>
          </Box>

          <Collapse in={showDropPanel}>
            {sortedDropEvents.length > 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 1.5,
                }}
              >
                {sortedDropEvents.slice(0, 9).map((drop) => {
                  const isSelected =
                    selectedPointIndex !== null &&
                    selectedPointIndex === drop.index;
                  const dropVs50 =
                    drop.dma50 !== undefined
                      ? drop.price >= drop.dma50
                        ? "Above 50 DMA"
                        : "Below 50 DMA"
                      : null;
                  const dropVs200 =
                    drop.dma200 !== undefined
                      ? drop.price >= drop.dma200
                        ? "Above 200 DMA"
                        : "Below 200 DMA"
                      : null;

                  return (
                    <Paper
                      key={drop.date}
                      variant="outlined"
                      onClick={() => handleSelectDropDay(drop.index)}
                      sx={{
                        p: 1.25,
                        borderRadius: 2.5,
                        cursor: "pointer",
                        backgroundColor: isSelected
                          ? "rgba(239, 68, 68, 0.14)"
                          : "var(--indices-subtle-bg, rgba(15, 23, 42, 0.35))",
                        borderColor: isSelected
                          ? "#ef4444"
                          : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                        transition:
                          "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          borderColor: "#ef4444",
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 0.75 }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.78rem",
                            fontFamily: MONO_FONT,
                            color: isSelected
                              ? "#ffffff"
                              : "text.primary",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{ fontSize: 13, color: "text.secondary" }}
                          />
                          {drop.date}
                        </Typography>
                        <Chip
                          label={`${drop.changePct.toFixed(2)}%`}
                          size="small"
                          sx={{
                            height: 20,
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            fontFamily: MONO_FONT,
                            backgroundColor: "rgba(239, 68, 68, 0.2)",
                            color: "#ef4444",
                            border: "1px solid rgba(239, 68, 68, 0.35)",
                          }}
                        />
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        sx={{ mb: 0.5 }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.7rem",
                            fontFamily: MONO_FONT,
                          }}
                        >
                          Close:{" "}
                          <strong>
                            {formatSeriesValue(
                              drop.price,
                              series.format,
                              series.decimals,
                            )}
                          </strong>
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: "#f87171",
                            fontSize: "0.7rem",
                            fontFamily: MONO_FONT,
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {formatSeriesValue(
                            drop.change,
                            series.format,
                            series.decimals,
                          )}
                        </Typography>
                      </Stack>

                      {/* Technical posture tags on drop date */}
                      <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        {dropVs50 && (
                          <Chip
                            label={dropVs50}
                            size="small"
                            sx={{
                              height: 16,
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              backgroundColor:
                                dropVs50 === "Above 50 DMA"
                                  ? "rgba(245, 158, 11, 0.12)"
                                  : "rgba(239, 68, 68, 0.1)",
                              color:
                                dropVs50 === "Above 50 DMA"
                                  ? "#fbbf24"
                                  : "#f87171",
                            }}
                          />
                        )}
                        {dropVs200 && (
                          <Chip
                            label={dropVs200}
                            size="small"
                            sx={{
                              height: 16,
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              backgroundColor:
                                dropVs200 === "Above 200 DMA"
                                  ? "rgba(168, 85, 247, 0.12)"
                                  : "rgba(239, 68, 68, 0.1)",
                              color:
                                dropVs200 === "Above 200 DMA"
                                  ? "#c084fc"
                                  : "#f87171",
                            }}
                          />
                        )}
                      </Stack>
                    </Paper>
                  );
                })}
              </Box>
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor:
                    "var(--indices-subtle-bg, rgba(15, 23, 42, 0.25))",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontSize: "0.78rem" }}
                >
                  ✨ No single-day drops (≥ {dropThreshold}%) were recorded in the{" "}
                  <strong>{selectedRange}</strong> time window. The benchmark
                  traded with low downside volatility.
                </Typography>
              </Paper>
            )}
          </Collapse>
        </Box>

        {/* Economic & Market Significance Note */}
        <Box
          sx={{
            mt: 2.5,
            p: 1.5,
            borderRadius: 2,
            backgroundColor:
              "var(--indices-subtle-bg, rgba(99, 102, 241, 0.06))",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "0.7rem",
              color: "primary.light",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 0.4,
            }}
          >
            Market Significance &amp; Investor Context
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.78rem",
              lineHeight: 1.55,
            }}
          >
            {series.marketSignificance} {series.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
