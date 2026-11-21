import {
  BigDropEvent,
  CandleItem,
  ChartType,
  formatSeriesValue,
} from "../components/tracker/FredSeriesChart";

export interface ExportChartParams {
  seriesName: string;
  seriesId: string;
  source?: string;
  format: "currency" | "percent" | "number" | "index";
  decimals?: number;
  selectedRange: string;
  chartType: ChartType;
  latestValue: number;
  change: number;
  pctChange: number;
  latestDate: string;
  coords: [number, number, string, number][]; // [x, y, date, val]
  candleCoords?: CandleItem[];
  dma50Coords?: [number, number, string, number][];
  dma200Coords?: [number, number, string, number][];
  gridLines: { y: number; val: number }[];
  dateTicks: { x: number; label: string }[];
  plotW: number;
  plotH: number;
  strokeColor: string;
  show50Dma?: boolean;
  show200Dma?: boolean;
  showBigDrops?: boolean;
  dropThreshold?: number;
  bigDropEvents?: BigDropEvent[];
  latestDma50?: number;
  latestDma200?: number;
}

function formatAxisVal(
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

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

/**
 * Renders an offscreen 1400x800 high-resolution branded PNG image of the FRED chart
 * complete with live technical overlays, watermark footer, and metrics banner,
 * and triggers an instant browser download.
 */
export function exportChartAsPng(params: ExportChartParams): boolean {
  if (
    typeof document === "undefined" ||
    !params.coords ||
    params.coords.length === 0
  ) {
    return false;
  }

  try {
    const W = 1400;
    const H = 800;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    // 1. Deep Modern Canvas Background (#0B0F19)
    ctx.fillStyle = "#0B0F19";
    ctx.fillRect(0, 0, W, H);

    // Subtle Radial Glow in top-left
    const glow = ctx.createRadialGradient(80, 80, 10, 80, 80, 600);
    glow.addColorStop(0, "rgba(99, 102, 241, 0.15)");
    glow.addColorStop(1, "rgba(11, 15, 25, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Outer subtle card border
    drawRoundedRect(ctx, 12, 12, W - 24, H - 24, 16);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Top Header Banner
    // Brand pill tag
    ctx.font =
      '700 11px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
    ctx.fillStyle = "#818CF8";
    ctx.textAlign = "left";
    ctx.fillText("MARKETINDICES.XYZ • BENCHMARK TRACKER", 64, 52);

    // Benchmark Title
    ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(params.seriesName, 64, 84);

    // Meta Specs
    ctx.font = "500 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#94A3B8";
    const metaStr = `ID: ${params.seriesId}   •   Source: ${
      params.source || "FRED (Federal Reserve Bank)"
    }   •   Timeframe: ${params.selectedRange}   •   Style: ${params.chartType.toUpperCase()}`;
    ctx.fillText(metaStr, 64, 108);

    // Right Side: Latest Price, Change Pill, Observation Date
    ctx.textAlign = "right";
    ctx.font =
      'bold 30px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
    ctx.fillStyle = "#FFFFFF";
    const valText = formatSeriesValue(
      params.latestValue,
      params.format,
      params.decimals ?? 2,
    );
    ctx.fillText(valText, W - 64, 62);

    // Change pill
    const isPositive = params.change >= 0;
    const changeStr = `${isPositive ? "+" : ""}${formatSeriesValue(
      params.change,
      params.format,
      params.decimals ?? 2,
    )} (${isPositive ? "+" : ""}${params.pctChange.toFixed(2)}%)`;

    ctx.font =
      'bold 13px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
    const badgeW = ctx.measureText(changeStr).width + 18;
    const badgeH = 26;
    const badgeX = W - 64 - badgeW;
    const badgeY = 76;

    drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 6);
    ctx.fillStyle = isPositive
      ? "rgba(16, 185, 129, 0.16)"
      : "rgba(239, 68, 68, 0.16)";
    ctx.fill();
    ctx.strokeStyle = isPositive ? "#10B981" : "#EF4444";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = isPositive ? "#34D399" : "#F87171";
    ctx.textAlign = "center";
    ctx.fillText(changeStr, badgeX + badgeW / 2, badgeY + 18);

    // Observation Date
    ctx.textAlign = "right";
    ctx.font = "500 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText(`Observation Date: ${params.latestDate}`, W - 64, 122);

    // 3. Technical Indicator Badges (if any active)
    let indicatorX = 64;
    const indicatorY = 126;

    if (params.show50Dma && params.latestDma50 !== undefined) {
      const dmaText = `50 DMA: ${formatSeriesValue(
        params.latestDma50,
        params.format,
        params.decimals ?? 2,
      )}`;
      ctx.font =
        'bold 11px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
      const indW = ctx.measureText(dmaText).width + 18;
      drawRoundedRect(ctx, indicatorX, indicatorY, indW, 22, 5);
      ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#FBBF24";
      ctx.textAlign = "center";
      ctx.fillText(dmaText, indicatorX + indW / 2, indicatorY + 15);
      indicatorX += indW + 10;
    }

    if (params.show200Dma && params.latestDma200 !== undefined) {
      const dmaText = `200 DMA: ${formatSeriesValue(
        params.latestDma200,
        params.format,
        params.decimals ?? 2,
      )}`;
      ctx.font =
        'bold 11px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
      const indW = ctx.measureText(dmaText).width + 18;
      drawRoundedRect(ctx, indicatorX, indicatorY, indW, 22, 5);
      ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "#A855F7";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#C084FC";
      ctx.textAlign = "center";
      ctx.fillText(dmaText, indicatorX + indW / 2, indicatorY + 15);
      indicatorX += indW + 10;
    }

    if (params.showBigDrops && params.bigDropEvents) {
      const dropText = `Selloffs (≥${params.dropThreshold ?? 1.5}%): ${
        params.bigDropEvents.length
      }`;
      ctx.font =
        'bold 11px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
      const indW = ctx.measureText(dropText).width + 18;
      drawRoundedRect(ctx, indicatorX, indicatorY, indW, 22, 5);
      ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#F87171";
      ctx.textAlign = "center";
      ctx.fillText(dropText, indicatorX + indW / 2, indicatorY + 15);
    }

    // 4. Plot Area Geometry & Scaling
    const plotX = 64;
    const plotY = 162;
    const plotWidth = 1170;
    const plotHeight = 525;

    const mapX = (x: number) => plotX + (x / params.plotW) * plotWidth;
    const mapY = (y: number) => plotY + (y / params.plotH) * plotHeight;

    // Horizontal Y-Axis Gridlines & Labels
    ctx.textAlign = "left";
    ctx.font =
      '600 11px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
    for (const line of params.gridLines) {
      const cy = mapY(line.y);
      if (cy < plotY || cy > plotY + plotHeight) continue;

      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.moveTo(plotX, cy);
      ctx.lineTo(plotX + plotWidth, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#94A3B8";
      ctx.fillText(
        formatAxisVal(line.val, params.format),
        plotX + plotWidth + 12,
        cy + 4,
      );
    }

    // Bottom X-Axis Ticks & Dates
    ctx.textAlign = "center";
    ctx.font =
      '600 11px ui-monospace, SFMono-Regular, "Roboto Mono", monospace';
    ctx.fillStyle = "#94A3B8";
    for (const tick of params.dateTicks) {
      const cx = mapX(tick.x);
      if (cx < plotX || cx > plotX + plotWidth) continue;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
      ctx.moveTo(cx, plotY + plotHeight);
      ctx.lineTo(cx, plotY + plotHeight + 6);
      ctx.stroke();

      ctx.fillText(tick.label, cx, plotY + plotHeight + 22);
    }

    // Plot Frame Box
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(plotX, plotY, plotWidth, plotHeight);

    // 5. Draw Data Series Inside Clipped Viewport
    ctx.save();
    ctx.beginPath();
    ctx.rect(plotX, plotY, plotWidth, plotHeight);
    ctx.clip();

    if (
      (params.chartType === "line" ||
        params.chartType === "mountain" ||
        params.chartType === "baseline") &&
      params.coords.length > 0
    ) {
      // Mountain Area Gradient Fill
      const grad = ctx.createLinearGradient(0, plotY, 0, plotY + plotHeight);
      grad.addColorStop(0, "rgba(99, 102, 241, 0.28)");
      grad.addColorStop(1, "rgba(99, 102, 241, 0.0)");

      ctx.beginPath();
      ctx.moveTo(mapX(params.coords[0][0]), plotY + plotHeight);
      for (let i = 0; i < params.coords.length; i++) {
        ctx.lineTo(mapX(params.coords[i][0]), mapY(params.coords[i][1]));
      }
      ctx.lineTo(
        mapX(params.coords[params.coords.length - 1][0]),
        plotY + plotHeight,
      );
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Line Stroke
      ctx.beginPath();
      for (let i = 0; i < params.coords.length; i++) {
        const x = mapX(params.coords[i][0]);
        const y = mapY(params.coords[i][1]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = params.strokeColor || "#6366f1";
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Endpoint highlight pulse dot
      const last = params.coords[params.coords.length - 1];
      const lx = mapX(last[0]);
      const ly = mapY(last[1]);
      ctx.beginPath();
      ctx.arc(lx, ly, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = params.strokeColor || "#6366f1";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (params.chartType === "candles" && params.candleCoords) {
      const count = params.candleCoords.length;
      const candleWidth = Math.max(3, Math.min(12, (plotWidth / count) * 0.72));

      for (const c of params.candleCoords) {
        const x = mapX(c.x);
        const openY = mapY(c.yOpen);
        const highY = mapY(c.yHigh);
        const lowY = mapY(c.yLow);
        const closeY = mapY(c.yClose);
        const isUp = c.isBullish;
        const color = isUp ? "#10B981" : "#EF4444";

        // High-Low Wick
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Candle Body
        const top = Math.min(openY, closeY);
        const bodyHeight = Math.max(2, Math.abs(closeY - openY));
        ctx.fillStyle = color;
        ctx.fillRect(x - candleWidth / 2, top, candleWidth, bodyHeight);
      }
    } else if (params.chartType === "bars" && params.coords.length > 0) {
      const count = params.coords.length;
      const barWidth = Math.max(2, Math.min(10, (plotWidth / count) * 0.75));

      for (const pt of params.coords) {
        const x = mapX(pt[0]);
        const y = mapY(pt[1]);
        const h = Math.max(2, plotY + plotHeight - y);
        ctx.fillStyle = params.strokeColor || "#6366f1";
        ctx.fillRect(x - barWidth / 2, y, barWidth, h);
      }
    }

    // 50 DMA Curve
    if (
      params.show50Dma &&
      params.dma50Coords &&
      params.dma50Coords.length > 0
    ) {
      ctx.beginPath();
      for (let i = 0; i < params.dma50Coords.length; i++) {
        const x = mapX(params.dma50Coords[i][0]);
        const y = mapY(params.dma50Coords[i][1]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }

    // 200 DMA Curve
    if (
      params.show200Dma &&
      params.dma200Coords &&
      params.dma200Coords.length > 0
    ) {
      ctx.beginPath();
      for (let i = 0; i < params.dma200Coords.length; i++) {
        const x = mapX(params.dma200Coords[i][0]);
        const y = mapY(params.dma200Coords[i][1]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#A855F7";
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }

    // Big Drops Selloff Markers
    if (
      params.showBigDrops &&
      params.bigDropEvents &&
      params.bigDropEvents.length > 0
    ) {
      for (const drop of params.bigDropEvents) {
        const x = mapX(drop.x);
        const y = mapY(drop.y);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#EF4444";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    ctx.restore();

    // 6. Watermark Footer (Virality Loop)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.moveTo(64, 736);
    ctx.lineTo(W - 64, 736);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "600 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText(
      "MarketIndices.xyz  •  200+ Benchmark Indices, Real-Time Market Clocks & Tracking ETFs",
      64,
      764,
    );

    ctx.textAlign = "right";
    ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#818CF8";
    ctx.fillText("📊 https://marketindices.xyz", W - 64, 764);

    // 7. Instant Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const cleanDate = params.latestDate.replace(/[^a-zA-Z0-9]/g, "-");
      a.download = `marketindices-${params.seriesId.toLowerCase()}-${params.selectedRange.toLowerCase()}-${cleanDate}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");

    return true;
  } catch (err) {
    console.error("Failed to export chart image:", err);
    return false;
  }
}
