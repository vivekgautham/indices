import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BalanceIcon from "@mui/icons-material/Balance";
import InsightsIcon from "@mui/icons-material/InsightsOutlined";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SecurityIcon from "@mui/icons-material/Security";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "../components/layout/SiteFooter";

interface InsightArticle {
  id: string;
  category: "Market Structure" | "Factor Dynamics" | "Macro & Yields" | "Index Methodology";
  icon: React.ReactNode;
  title: string;
  summary: string;
  takeaways: string[];
  relatedSeriesOrIndices?: { label: string; to: string }[];
}

const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "cap-weight-vs-equal-weight",
    category: "Market Structure",
    icon: <BalanceIcon sx={{ color: "#6366f1" }} />,
    title: "Market-Cap Weighting vs. Equal Weight: Navigating Mega-Cap Concentration",
    summary:
      "The top 10 constituents of the S&P 500 now represent over 35% of total index weight—the highest concentration in over four decades. Equal-weight indexing (such as RSP) resets each constituent to 0.2% quarterly, systematically selling winners and reallocating to undervalued market participants.",
    takeaways: [
      "Market-cap weighting maximizes capital efficiency and minimizes rebalance turnover.",
      "High concentration heightens portfolio vulnerability to single-sector tech drawdowns.",
      "Equal-weighting introduces a structural size and value factor tilt over long market horizons.",
    ],
    relatedSeriesOrIndices: [
      { label: "S&P 500 (SP500)", to: "/tracker?series=SP500" },
      { label: "S&P 500 Equal Weight (RSP)", to: "/index/sp-500-equal-weight" },
    ],
  },
  {
    id: "wide-moat-philosophy",
    category: "Factor Dynamics",
    icon: <SecurityIcon sx={{ color: "#10b981" }} />,
    title: "The Wide Moat Advantage: Sustainable Competitive Edges in Benchmark Investing",
    summary:
      "Pioneered by Morningstar and Warren Buffett, economic moat indexing targets companies with durable competitive moats: Network Effects, Intangible Assets, Switching Costs, Cost Advantages, and Efficient Scale. Combining moat durability with disciplined valuation screens has historically delivered superior risk-adjusted returns.",
    takeaways: [
      "Companies with Wide Moats generate Return on Invested Capital (ROIC) far exceeding Cost of Capital.",
      "Quality moats act as a defensive shock absorber during broad equity drawdowns.",
      "Morningstar Wide Moat Index (MWMFTR) tracks the top 40-50 wide-moat companies trading at significant discounts to fair value.",
    ],
    relatedSeriesOrIndices: [
      { label: "Morningstar Wide Moat", to: "/index/morningstar-wide-moat" },
      { label: "Russell 1000 (RUI)", to: "/tracker?series=RUI" },
    ],
  },
  {
    id: "yield-curve-inversion",
    category: "Macro & Yields",
    icon: <TrendingUpIcon sx={{ color: "#f59e0b" }} />,
    title: "Treasury Yield Curve Dynamics: De-Inversion & What the 10Y-2Y Spread Signals",
    summary:
      "The 10-Year minus 2-Year Treasury spread (T10Y2Y) is among the most reliable leading macroeconomic gauges. Following extended inversion periods, the yield curve typically steepens ('un-inverts') as the Federal Reserve initiates monetary easing cycles, shifting market leadership across equity sectors.",
    takeaways: [
      "Inversion reflects bond market expectations of restrictive monetary policy and eventual rate cuts.",
      "Historically, the critical phase for equity volatility occurs during the steepening/un-inversion process.",
      "Value, dividend, and rate-sensitive equity sectors often rotate into leadership as yield curves normalize.",
    ],
    relatedSeriesOrIndices: [
      { label: "Track 10Y-2Y Spread", to: "/tracker?series=T10Y2Y" },
      { label: "Track 10-Year Yield", to: "/tracker?series=DGS10" },
    ],
  },
  {
    id: "volatility-regimes-vix",
    category: "Market Structure",
    icon: <AutoGraphIcon sx={{ color: "#ec4899" }} />,
    title: "Understanding CBOE VIX: Implied Volatility Regimes and Options Sentiment",
    summary:
      "The CBOE Volatility Index (VIX) measures the 30-day forward-looking expected volatility calculated from S&P 500 index options. Understanding regime thresholds helps distinguish between market complacency, normal consolidation, and systemic risk-off repricing events.",
    takeaways: [
      "VIX < 15: Low volatility regime indicating persistent bullish momentum and market complacency.",
      "VIX 15–20: Historical long-term median, reflecting standard day-to-day market price discovery.",
      "VIX > 25: Heightened risk-off environment where portfolio hedging costs spike sharply.",
    ],
    relatedSeriesOrIndices: [
      { label: "Track VIX Real-Time", to: "/tracker?series=VIXCLS" },
      { label: "Nasdaq 100 (NASDAQ100)", to: "/tracker?series=NASDAQ100" },
    ],
  },
];

const METHODOLOGY_COMPARISONS = [
  {
    provider: "S&P Dow Jones",
    benchmark: "S&P 500",
    coverage: "~80% of US Market Cap",
    selectionMethod: "Committee-driven with strict 4-quarter profitability screen",
    bufferRules: "Discretionary buffer to minimize turnover",
    rebalance: "Quarterly (Mar, Jun, Sep, Dec)",
  },
  {
    provider: "FTSE Russell",
    benchmark: "Russell 1000",
    coverage: "~93% of US Market Cap",
    selectionMethod: "Rank-ordered by market cap (ranks 1 to 1,000); no profitability hurdle",
    bufferRules: "±2.5% market-cap buffer band around rank 1,000",
    rebalance: "Annual (June reconstitution)",
  },
  {
    provider: "Nasdaq",
    benchmark: "NASDAQ 100",
    coverage: "Top 100 non-financial firms on NASDAQ",
    selectionMethod: "Modified market capitalization; strictly excludes financial institutions",
    bufferRules: "Top 75 automatic inclusion; ranks 76-100 defended",
    rebalance: "Annual (December) + quarterly weighting reviews",
  },
  {
    provider: "Morningstar",
    benchmark: "Morningstar US Market",
    coverage: "~97% of US Equity Market",
    selectionMethod: "Rules-based style box classification (Size & Valuation Factor)",
    bufferRules: "Flexible multi-parameter buffer bands across market-cap borders",
    rebalance: "Semi-annual (June and December)",
  },
  {
    provider: "CRSP",
    benchmark: "CRSP US Total Market",
    coverage: "~100% of investable US Equities",
    selectionMethod: "Academic float-adjusted methodology licensed by Vanguard",
    bufferRules: "Packeting mechanism allocating split shares across size borders",
    rebalance: "Quarterly (transitional packeting)",
  },
];

export const InsightsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Market Insights & Index Methodologies | Market Indices Explorer";
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 3, sm: 4 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      {/* Header Banner */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <InsightsIcon sx={{ fontSize: 28, color: "primary.main" }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontSize: { xs: "1.75rem", sm: "2.25rem" },
            }}
          >
            Insights &amp; Research
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: 720,
            mx: "auto",
            fontSize: { xs: "0.9rem", sm: "1.05rem" },
          }}
        >
          Institutional research, factor dynamics, index construction mechanics, and macroeconomic indicators modeled after Morningstar index intelligence.
        </Typography>
      </Box>

      {/* Featured Research Articles Grid */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <PsychologyIcon sx={{ fontSize: 20, color: "primary.main" }} />
        Market Intelligence &amp; Factor Analysis
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2.5,
          mb: 5,
        }}
      >
        {INSIGHT_ARTICLES.map((article) => (
          <Box key={article.id} sx={{ height: "100%" }}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                borderColor: "var(--indices-border, rgba(255, 255, 255, 0.1))",
                backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.45))",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "rgba(99, 102, 241, 0.4)",
                  backgroundColor: "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.75))",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.25, sm: 3 }, flex: 1, display: "flex", flexDirection: "column" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      backgroundColor: "rgba(99, 102, 241, 0.12)",
                      color: "primary.light",
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                    }}
                  />
                  <Box sx={{ fontSize: "1.4rem" }}>{article.icon}</Box>
                </Stack>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.05rem", sm: "1.18rem" },
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    mb: 1.5,
                  }}
                >
                  {article.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.86rem",
                    lineHeight: 1.6,
                    mb: 2,
                    flex: 1,
                  }}
                >
                  {article.summary}
                </Typography>

                {/* Key Takeaways */}
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.4))",
                    border: "1px solid var(--indices-border, rgba(255, 255, 255, 0.06))",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      mb: 0.75,
                    }}
                  >
                    Key Takeaways
                  </Typography>
                  <Stack spacing={0.6}>
                    {article.takeaways.map((point, idx) => (
                      <Typography
                        key={idx}
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.78rem",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 0.75,
                          lineHeight: 1.45,
                        }}
                      >
                        <Box component="span" sx={{ color: "primary.light", fontWeight: 800 }}>•</Box>
                        {point}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                {/* Related Series Links */}
                {article.relatedSeriesOrIndices && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                    {article.relatedSeriesOrIndices.map((rel, idx) => (
                      <Button
                        key={idx}
                        component={Link}
                        to={rel.to}
                        size="small"
                        variant="outlined"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 13 }} />}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          borderRadius: 2,
                          px: 1.25,
                          py: 0.3,
                          borderColor: "var(--indices-border, rgba(255, 255, 255, 0.15))",
                          color: "text.primary",
                          "&:hover": {
                            borderColor: "primary.light",
                            backgroundColor: "var(--indices-subtle-bg, rgba(99, 102, 241, 0.1))",
                          },
                        }}
                      >
                        {rel.label}
                      </Button>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4, borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))" }} />

      {/* Index Provider Methodology Comparison */}
      <Box sx={{ mb: 4 }}>
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
            <ShowChartIcon sx={{ fontSize: 20, color: "primary.main" }} />
            Index Provider Methodology Comparison
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
            How major index sponsors construct and maintain flagship US equity benchmarks.
          </Typography>
        </Stack>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            borderRadius: 3,
            borderColor: "var(--indices-border, rgba(255, 255, 255, 0.1))",
            backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.4))",
            overflowX: "auto",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.6))" }}>
                <TableCell sx={{ fontWeight: 800, fontSize: "0.78rem" }}>Provider &amp; Flagship</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: "0.78rem" }}>Market Coverage</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: "0.78rem" }}>Selection Criteria</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: "0.78rem" }}>Buffer / Turnover Defense</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: "0.78rem" }}>Rebalance Schedule</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {METHODOLOGY_COMPARISONS.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.03))",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.82rem" }}>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.82rem", color: "primary.light" }}>
                      {row.provider}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.72rem" }}>
                      {row.benchmark}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", color: "text.secondary" }}>{row.coverage}</TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", color: "text.secondary", maxWidth: 260 }}>
                    {row.selectionMethod}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", color: "text.secondary", maxWidth: 220 }}>
                    {row.bufferRules}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", color: "text.secondary", whiteSpace: "nowrap" }}>
                    {row.rebalance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <SiteFooter />
    </Container>
  );
};

export default InsightsPage;
