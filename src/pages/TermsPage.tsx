import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CopyrightIcon from "@mui/icons-material/Copyright";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GavelIcon from "@mui/icons-material/Gavel";
import LinkIcon from "@mui/icons-material/Link";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import SiteFooter from "../components/layout/SiteFooter";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: <GavelIcon sx={{ color: "#00DD94", fontSize: 24 }} />,
    content: (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          Welcome to <strong>MarketIndices.xyz</strong> (&ldquo;MarketIndices&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the platform&rdquo;). By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;) and all applicable laws and regulations.
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          If you do not agree to these Terms, you must immediately discontinue your use of MarketIndices.xyz. We reserve the right to modify these Terms at any time without prior notice. Your continued use of the website following any changes constitutes your binding acceptance of the updated Terms.
        </Typography>
      </>
    ),
  },
  {
    id: "no-advice",
    title: "2. Not Financial, Legal, or Investment Advice",
    icon: <ErrorOutlineIcon sx={{ color: "#F59E0B", fontSize: 24 }} />,
    content: (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          <strong>MarketIndices.xyz is an educational, research, and directory platform only.</strong> None of the materials, indices descriptions, ETF tracking data, yield curves, macroeconomic indicators, earnings calendars, or historical performance metrics displayed on this website constitute financial advice, investment advice, tax advice, legal counsel, or accounting advice.
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          MarketIndices.xyz is not a registered investment advisor, broker-dealer, commodity trading advisor, or fiduciary under the United States Securities and Exchange Commission (SEC), the Financial Industry Regulatory Authority (FINRA), or any state, national, or international financial regulatory authority.
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          No content on this website constitutes an endorsement, recommendation, sponsorship, offer, or solicitation to purchase, sell, or hold any security, exchange-traded fund (ETF), mutual fund, derivative, digital asset, or other financial product. You should always consult a licensed and certified financial advisor, tax professional, or legal counsel before making investment or financial decisions.
        </Typography>
      </>
    ),
  },
  {
    id: "data-disclaimer",
    title: "3. Market Data & 'As-Is' Warranty Disclaimer",
    icon: <SecurityIcon sx={{ color: "#3B82F6", fontSize: 24 }} />,
    content: (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          Benchmark data, index methodologies, constituent counts, fund expense ratios, assets under management (AUM), and macroeconomic series are aggregated from public filings (such as SEC EDGAR), index provider technical factsheets, Federal Reserve Economic Data (FRED), and public APIs.
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          All data and content are provided on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without warranties of any kind, whether express, statutory, or implied. MarketIndices.xyz expressly disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, accuracy, completeness, timeliness, and non-infringement.
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          Financial markets are dynamic and subject to frequent corporate actions, index rebalances, constituent additions/deletions, and reporting revisions. We do not guarantee that any data point on this website is completely error-free, uninterrupted, or current at any given second. Users are strongly encouraged to independently verify all figures against primary issuer filings and official index provider publications.
        </Typography>
      </>
    ),
  },
  {
    id: "trademarks",
    title: "4. Intellectual Property & Trademark Attributions",
    icon: <CopyrightIcon sx={{ color: "#8B5CF6", fontSize: 24 }} />,
    content: (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          All product names, trademarks, registered trademarks, service marks, and trade names referenced on MarketIndices.xyz belong to their respective proprietary holders. References on this site are solely for nominative, educational, and descriptive identification purposes:
        </Typography>
        <Box
          component="ul"
          sx={{
            pl: 2.5,
            color: "text.secondary",
            fontSize: "0.85rem",
            lineHeight: 1.8,
            mb: 1.5,
            "& li": { mb: 0.5 },
          }}
        >
          <li>
            <strong>S&P®</strong>, <strong>S&P 500®</strong>, <strong>Dow Jones®</strong>, <strong>DJIA®</strong>, <strong>S&P MidCap 400®</strong>, and <strong>S&P SmallCap 600®</strong> are registered trademarks of Standard & Poor&rsquo;s Financial Services LLC / S&P Dow Jones Indices LLC.
          </li>
          <li>
            <strong>MSCI®</strong>, <strong>MSCI ACWI®</strong>, <strong>MSCI EAFE®</strong>, <strong>MSCI Emerging Markets®</strong>, and <strong>MSCI USA®</strong> are registered trademarks of MSCI Inc.
          </li>
          <li>
            <strong>Nasdaq®</strong>, <strong>Nasdaq-100®</strong>, <strong>NDX®</strong>, and <strong>PHLX®</strong> are registered trademarks of Nasdaq, Inc.
          </li>
          <li>
            <strong>Russell®</strong>, <strong>Russell 1000®</strong>, <strong>Russell 2000®</strong>, and <strong>FTSE®</strong> are registered trademarks of Frank Russell Company / FTSE International Limited (FTSE Russell).
          </li>
          <li>
            <strong>CRSP®</strong> is a registered trademark of the Center for Research in Security Prices LLC.
          </li>
          <li>
            <strong>ICE®</strong> is a registered trademark of Intercontinental Exchange Holdings, Inc.
          </li>
          <li>
            <strong>STOXX®</strong> and <strong>DAX®</strong> are registered trademarks of STOXX Ltd. / Deutsche Börse Group.
          </li>
          <li>
            <strong>Cboe®</strong> and <strong>VIX®</strong> are registered trademarks of Cboe Global Markets, Inc.
          </li>
          <li>
            <strong>Bloomberg®</strong> is a registered trademark of Bloomberg Finance L.P.
          </li>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          MarketIndices.xyz is an independent educational catalog and directory. It is <strong>not</strong> sponsored, authorized, endorsed, or affiliated with Standard & Poor&rsquo;s, MSCI, FTSE Russell, Nasdaq, Vanguard, BlackRock, State Street Global Advisors, Fidelity, Schwab, Invesco, or any other commercial benchmark administrator or asset management firm.
        </Typography>
      </>
    ),
  },
  {
    id: "external-links",
    title: "5. Third-Party Links & External Content",
    icon: <LinkIcon sx={{ color: "#06B6D4", fontSize: 24 }} />,
    content: (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          MarketIndices.xyz provides external hyperlinks to official index provider factsheets, regulatory filings (such as the SEC EDGAR system), stock exchange directories, and third-party data platforms for your reference and convenience.
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          These external destinations are operated by independent third parties. MarketIndices.xyz does not control, supervise, verify, or endorse the contents, products, privacy practices, or terms of third-party websites. When you click an external link, you do so entirely at your own risk.
        </Typography>
      </>
    ),
  },
  {
    id: "limitation-liability",
    title: "6. Limitation of Liability",
    icon: <VerifiedUserIcon sx={{ color: "#EC4899", fontSize: 24 }} />,
    content: (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          To the maximum extent permissible under applicable federal, state, and international law, MarketIndices.xyz, its authors, maintainers, contributors, and technical operators shall not be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages.
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          This includes, without limitation, damages for loss of profits, investment losses, portfolio drawdown, loss of goodwill, loss of data, system disruption, or any other commercial or personal damage arising from or relating to your use of, or inability to use, this website or any information contained herein.
        </Typography>
      </>
    ),
  },
  {
    id: "conduct",
    title: "7. User Conduct & Acceptable Use",
    icon: <CheckCircleOutlineIcon sx={{ color: "#10B981", fontSize: 24 }} />,
    content: (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          You agree to access and use MarketIndices.xyz solely for lawful purposes. You agree not to engage in any activity that interferes with, disrupts, or places unreasonable bandwidth burdens upon the website or its associated networks. Automated scraping or data harvesting that impairs performance for other visitors is strictly prohibited.
        </Typography>
      </>
    ),
  },
];

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Use & Disclaimers | MarketIndices.xyz";
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      {/* Back navigation */}
      <Box sx={{ mb: 3 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          size="small"
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": { color: "#00DD94" },
          }}
        >
          Back to Home
        </Button>
      </Box>

      {/* Hero Header */}
      <Box sx={{ mb: 4, textAlign: { xs: "left", sm: "center" } }}>
        <Chip
          label="Legal & Disclaimers"
          size="small"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            fontSize: "0.75rem",
            color: "#00DD94",
            backgroundColor: "rgba(0, 221, 148, 0.12)",
            border: "1px solid rgba(0, 221, 148, 0.25)",
          }}
        />
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.35rem" },
            fontWeight: 800,
            letterSpacing: "-0.02em",
            mb: 1.5,
          }}
        >
          Terms of Use &amp; Disclaimers
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: 720,
            mx: { xs: 0, sm: "auto" },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
          }}
        >
          Important disclosures, non-advisory notices, intellectual property attributions, and data terms governing your use of MarketIndices.xyz.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.secondary",
            opacity: 0.7,
            mt: 1.5,
            fontSize: "0.75rem",
          }}
        >
          Last Updated: November 2026 • Effective Date: November 2026
        </Typography>
      </Box>

      {/* Terms Sections */}
      <Stack spacing={3} sx={{ maxWidth: 860, mx: "auto" }}>
        {SECTIONS.map((section) => (
          <Paper
            key={section.id}
            id={section.id}
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: "16px",
              border: "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
              backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.4))",
              backdropFilter: "blur(12px)",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              {section.icon}
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.15rem" },
                  letterSpacing: "-0.01em",
                }}
              >
                {section.title}
              </Typography>
            </Stack>
            {section.content}
          </Paper>
        ))}

        {/* Quick Nav CTA Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "16px",
            border: "1px solid rgba(0, 221, 148, 0.2)",
            backgroundColor: "rgba(0, 221, 148, 0.04)",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Explore Global Market Benchmarks &amp; Macro Tracker
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2.5, maxWidth: 600, mx: "auto" }}>
            Ready to explore? Browse 205+ documented market indices or analyze live macroeconomic yield curves and indicators.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
            <Button
              component={RouterLink}
              to="/indices"
              variant="contained"
              sx={{
                backgroundColor: "#00DD94",
                color: "#050D0A",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#00C282" },
              }}
            >
              Browse Indices Directory
            </Button>
            <Button
              component={RouterLink}
              to="/tracker"
              variant="outlined"
              sx={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "text.primary",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": { borderColor: "#00DD94", backgroundColor: "rgba(0, 221, 148, 0.08)" },
              }}
            >
              Live Benchmark Tracker
            </Button>
          </Stack>
        </Paper>
      </Stack>

      {/* Footer */}
      <SiteFooter />
    </Container>
  );
}
