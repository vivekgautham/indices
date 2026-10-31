import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDICES_DATA } from "../src/data/indicesData.ts";
import { PROVIDERS_DATA } from "../src/data/providersData.ts";
import { isActivelyManagedEtf } from "../src/utils/etfClassification.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");

const BASE_URL = "https://marketindices.xyz";
const TODAY = new Date().toISOString().split("T")[0];

console.log("=========================================");
console.log("🚀 Generating SEO Assets & Prerender Pages");
console.log("=========================================");

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 1. Generate robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
console.log("✓ Generated public/robots.txt");
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf8");
  console.log("✓ Generated dist/robots.txt");
}

// 2. Generate sitemap.xml
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/tracker</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/insights</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;

for (const index of INDICES_DATA) {
  sitemapXml += `  <url>
    <loc>${BASE_URL}/index/${index.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

sitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
console.log(`✓ Generated public/sitemap.xml (${INDICES_DATA.length + 2} URLs)`);
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  console.log(`✓ Generated dist/sitemap.xml`);
}

// 3. Build Homepage Prerender HTML & Index Detail Pages
if (fs.existsSync(distDir) && fs.existsSync(path.join(distDir, "index.html"))) {
  const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

  // A. Enhance dist/index.html with crawlable semantic content inside <noscript>
  const homepagePrerender = `
      <main style="max-width: 1100px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
        <header style="margin-bottom: 32px; text-align: center;">
          <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">MarketIndices.xyz – Benchmark Directory &amp; Tracking ETF Guide</h1>
          <p style="font-size: 18px; color: #475569; max-width: 800px; margin: 0 auto;">
            Explore comprehensive data, methodology, and tracking ETFs for ${INDICES_DATA.length}+ global equity, fixed income, commodity, and currency benchmarks across 17 index providers.
          </p>
        </header>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Index Providers</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; margin-top: 16px;">
            ${Object.values(PROVIDERS_DATA).map(p => `
              <div style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
                <strong>${escapeHtml(p.name)}</strong> (${escapeHtml(p.shortName)})
                <div style="font-size: 13px; color: #64748b; margin-top: 4px;">${escapeHtml(p.headquarters)} • Founded ${escapeHtml(String(p.founded))}</div>
              </div>
            `).join("")}
          </div>
        </section>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Directory of Global Market Indices (${INDICES_DATA.length})</h2>
          <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; list-style-type: none; padding-left: 0; margin-top: 16px;">
            ${INDICES_DATA.map(idx => `
              <li style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
                <a href="/index/${idx.id}" style="font-size: 16px; font-weight: 600; color: #4f46e5; text-decoration: none;">
                  ${escapeHtml(idx.name)} (${escapeHtml(idx.symbol)})
                </a>
                <div style="font-size: 13px; color: #64748b; margin-top: 4px;">
                  ${escapeHtml(idx.category)} • ${(idx.trackingEtfs || []).map(e => e.ticker).slice(0, 3).join(", ")}
                </div>
              </li>
            `).join("")}
          </ul>
        </section>
      </main>`;

  const enhancedHomepageHtml = baseHtml.replace(
    /<div id="root"><\/div>/i,
    `<div id="root"></div>\n    <noscript>\n${homepagePrerender.trim()}\n    </noscript>`
  );
  fs.writeFileSync(path.join(distDir, "index.html"), enhancedHomepageHtml, "utf8");
  console.log("✓ Injected crawlable directory inside <noscript> into dist/index.html");

  // Create dist/404.html
  fs.writeFileSync(path.join(distDir, "404.html"), enhancedHomepageHtml, "utf8");
  console.log("✓ Created dist/404.html");

  // Create dist/tracker/index.html
  const trackerDir = path.join(distDir, "tracker");
  fs.mkdirSync(trackerDir, { recursive: true });
  let trackerHtml = baseHtml
    .replace(
      /<title>.*?<\/title>/i,
      `<title>FRED Benchmark Tracker | U.S. Equity &amp; Macroeconomic Indexes</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="Live &amp; historical tracker for major U.S. equity benchmarks (S&amp;P 500, Dow Jones, Nasdaq 100, VIX) and macroeconomic indexes (Treasury yields, yield curves, Fed funds, U.S. dollar, crude oil) from the St. Louis Federal Reserve (FRED)." />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${BASE_URL}/tracker" />`
    );

  const trackerPrerender = `
      <main style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
        <header style="margin-bottom: 28px;">
          <h1 style="font-size: 30px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Federal Reserve Economic Data (FRED®) Benchmark Tracker</h1>
          <p style="font-size: 17px; color: #475569;">
            Live and historical tracking for major U.S. equity benchmarks and macroeconomic indexes powered by the Federal Reserve Bank of St. Louis (FRED).
          </p>
        </header>

        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a;">1. Major U.S. Equity Benchmarks</h2>
          <ul style="padding-left: 20px; color: #334155; line-height: 1.8;">
            <li><strong>S&amp;P 500 Index (SP500)</strong> – The premier barometer of large-cap US equities.</li>
            <li><strong>Dow Jones Industrial Average (DJIA)</strong> – 30 blue-chip industry leaders.</li>
            <li><strong>NASDAQ-100 Index (NASDAQ100)</strong> – Top 100 non-financial tech and innovation leaders.</li>
            <li><strong>NASDAQ Composite Index (NASDAQCOM)</strong> – Comprehensive benchmark of 3,000+ Nasdaq equities.</li>
            <li><strong>Russell 1000 Index (RUI)</strong> – Institutional broad large-to-mid cap benchmark.</li>
            <li><strong>CBOE Volatility Index (VIXCLS)</strong> – The market's 30-day forward implied volatility fear gauge.</li>
          </ul>
        </section>

        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a;">2. Economic, Global &amp; Macro Indexes</h2>
          <ul style="padding-left: 20px; color: #334155; line-height: 1.8;">
            <li><strong>10-Year Treasury Constant Maturity Yield (DGS10)</strong> – Global risk-free benchmark rate.</li>
            <li><strong>2-Year Treasury Constant Maturity Yield (DGS2)</strong> – Near-term Fed policy rate expectation barometer.</li>
            <li><strong>10-Year minus 2-Year Treasury Yield Spread (T10Y2Y)</strong> – Premier yield curve recession indicator.</li>
            <li><strong>Federal Funds Effective Rate (FEDFUNDS)</strong> – Central bank overnight policy rate anchor.</li>
            <li><strong>Trade-Weighted U.S. Dollar Index (DTWEXBGS)</strong> – Global greenback foreign exchange valuation.</li>
            <li><strong>WTI Crude Oil Prices (DCOILWTICO)</strong> – Benchmark energy and transport commodity cost.</li>
            <li><strong>30-Year Fixed Mortgage Rate (MORTGAGE30US)</strong> – US housing borrowing benchmark.</li>
            <li><strong>High Yield Credit Spread (BAMLH0A0HYM2)</strong> – Corporate credit risk appetite indicator.</li>
            <li><strong>Real Gross Domestic Product (GDPC1)</strong> – Comprehensive American economic production measure.</li>
          </ul>
        </section>

        <p><a href="/" style="color: #4f46e5; text-decoration: none; font-weight: 700;">&larr; Back to Market Indices Explorer</a></p>
      </main>`;

  trackerHtml = trackerHtml.replace(
    /<div id="root"><\/div>/i,
    `<div id="root"></div>\n    <noscript>\n${trackerPrerender.trim()}\n    </noscript>`
  );
  fs.writeFileSync(path.join(trackerDir, "index.html"), trackerHtml, "utf8");
  console.log("✓ Generated dist/tracker/index.html");

  // Create dist/insights/index.html
  const insightsDir = path.join(distDir, "insights");
  fs.mkdirSync(insightsDir, { recursive: true });
  let insightsHtml = baseHtml
    .replace(
      /<title>.*?<\/title>/i,
      `<title>Market Insights &amp; Index Methodologies | Market Indices Explorer</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="Institutional research, factor dynamics (Growth vs. Value, Wide Moat), index construction mechanics, and macroeconomic indicators modeled after Morningstar index intelligence." />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${BASE_URL}/insights" />`
    );

  const insightsPrerender = `
      <main style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
        <header style="margin-bottom: 28px;">
          <h1 style="font-size: 30px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Market Insights &amp; Index Methodologies</h1>
          <p style="font-size: 17px; color: #475569;">
            Institutional research, factor dynamics, index construction mechanics, and macroeconomic indicators modeled after Morningstar index intelligence.
          </p>
        </header>

        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a;">Key Research Topics</h2>
          <ul style="padding-left: 20px; color: #334155; line-height: 1.8;">
            <li><strong>Market-Cap Weighting vs. Equal Weight</strong> – Navigating mega-cap tech concentration risks.</li>
            <li><strong>The Wide Moat Advantage</strong> – Sustainable competitive edges and quality factor investing.</li>
            <li><strong>Treasury Yield Curve Dynamics</strong> – De-inversion and what the 10Y-2Y spread signals for equities.</li>
            <li><strong>Understanding CBOE VIX</strong> – Implied volatility regimes and options sentiment.</li>
          </ul>
        </section>

        <p><a href="/" style="color: #4f46e5; text-decoration: none; font-weight: 700;">&larr; Back to Market Indices Explorer</a></p>
      </main>`;

  insightsHtml = insightsHtml.replace(
    /<div id="root"><\/div>/i,
    `<div id="root"></div>\n    <noscript>\n${insightsPrerender.trim()}\n    </noscript>`
  );
  fs.writeFileSync(path.join(insightsDir, "index.html"), insightsHtml, "utf8");
  console.log("✓ Generated dist/insights/index.html");

  // B. Create static route pages for all indices
  let generatedPages = 0;
  for (const index of INDICES_DATA) {
    const pageDir = path.join(distDir, "index", index.id);
    fs.mkdirSync(pageDir, { recursive: true });

    const provider = PROVIDERS_DATA[index.providerId] || { name: index.providerId.toUpperCase(), shortName: index.providerId.toUpperCase() };
    const providerName = provider.name;
    const pageUrl = `${BASE_URL}/index/${index.id}`;

    // Top tracking ETF tickers for search-intent matching
    const topTickers = (index.trackingEtfs || []).map((e) => e.ticker);
    const topTickersSlice = topTickers.slice(0, 4);
    const tickerSuffix = topTickersSlice.length > 0 ? ` (${topTickersSlice.join(", ")})` : "";

    // High-CTR, high-intent title tag
    const title = `${index.name} (${index.symbol}): Tracking ETFs${tickerSuffix} & Methodology | MarketIndices`;

    // High-intent meta description
    const etfDescSnippet = topTickers.length > 0 ? `tracked by ${topTickers.slice(0, 5).join(", ")}. ` : "";
    const description = `Complete benchmark guide to ${index.name} (${index.symbol}) ${etfDescSnippet}Explore methodology, reconstitution schedule, AUM, and UCITS funds: ${(index.summary || index.description || "").replace(/"/g, "&quot;")}`.slice(0, 160);

    // Identify UCITS ETFs for Irish-domiciled FAQ
    const ucitsEtfs = (index.trackingEtfs || []).filter(e =>
      e.name.toLowerCase().includes("ucits") || e.name.toLowerCase().includes("ireland")
    );

    // Generate Structured FAQs for the FAQPage Schema
    const faqs = [
      {
        question: `What ETFs track the ${index.name} (${index.symbol})?`,
        answer: (index.trackingEtfs && index.trackingEtfs.length > 0)
          ? `The ${index.name} is tracked by ${index.trackingEtfs.map(e => `${e.name} (${e.ticker}${e.aum ? `, AUM: ${e.aum}` : ""})`).join("; ")}.`
          : `There are currently no major passive ETFs listed for ${index.name}. It primarily serves as a benchmark for institutional mandates and economic analysis.`,
      },
      {
        question: `How is the ${index.name} weighted and rebalanced?`,
        answer: `The index uses ${index.weightingMethodology} weighting with a ${index.rebalanceFrequency} rebalancing frequency, covering ${index.constituentsCount} constituent securities.`,
      },
    ];

    if (ucitsEtfs.length > 0) {
      faqs.push({
        question: `Are there Irish-domiciled or European UCITS ETFs tracking ${index.symbol}?`,
        answer: `Yes, European and international investors can track ${index.symbol} via UCITS funds including ${ucitsEtfs.map(e => `${e.name} (${e.ticker}${e.aum ? `, AUM: ${e.aum}` : ""})`).join(", ")}. These funds generally offer 15% dividend withholding tax under the US-Ireland tax treaty.`,
      });
    }

    faqs.push({
      question: `Who manages and calculates the ${index.symbol} index?`,
      answer: `The ${index.name} is administered by ${providerName} (${provider.headquarters || "Global"}), founded in ${provider.founded || "N/A"}.`,
    });

    let pageHtml = baseHtml;

    // Replace title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${escapeHtml(title)}</title>`
    );

    // Replace meta description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    );

    // Replace canonical link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${pageUrl}" />`
    );

    // Replace OpenGraph tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${pageUrl}" />`
    );

    // Replace Twitter tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:url" content="${pageUrl}" />`
    );

    // 1. FinancialProduct Schema
    const financialProductSchema = {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: index.name,
      alternateName: [index.symbol, ...(index.altSymbols || [])],
      description: index.summary || index.description,
      url: pageUrl,
      category: index.category,
      provider: {
        "@type": "Organization",
        name: providerName,
        url: provider.website || undefined,
      },
    };

    // 2. BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: providerName,
          item: `${BASE_URL}/?provider=${index.providerId}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${index.name} (${index.symbol})`,
          item: pageUrl,
        },
      ],
    };

    // 3. FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    };

    const ldJsonScript = `
    <script type="application/ld+json">
${JSON.stringify(financialProductSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
    </script>
  </head>`;

    pageHtml = pageHtml.replace("</head>", ldJsonScript);

    // Prerender semantic, fully accessible content inside <noscript>
    const prerenderContent = `
      <main style="max-width: 960px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
        <nav aria-label="Breadcrumb" style="font-size: 14px; margin-bottom: 16px; color: #64748b;">
          <a href="/" style="color: #4f46e5; text-decoration: none;">Home</a> /
          <a href="/?provider=${index.providerId}" style="color: #4f46e5; text-decoration: none;">${escapeHtml(providerName)}</a> /
          <span>${escapeHtml(index.symbol)}</span>
        </nav>

        <header style="margin-bottom: 24px;">
          <h1 style="font-size: 30px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">${escapeHtml(index.name)} (${escapeHtml(index.symbol)})</h1>
          <p style="font-size: 17px; color: #334155; margin: 0;">${escapeHtml(index.summary || index.description)}</p>
        </header>

        <section style="margin-bottom: 28px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">Benchmark Profile &amp; Methodology</h2>
          <ul style="list-style-type: none; padding-left: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
            <li><strong>Provider:</strong> ${escapeHtml(providerName)}</li>
            <li><strong>Category:</strong> ${escapeHtml(index.category)}</li>
            <li><strong>Asset Class:</strong> ${escapeHtml(index.assetClass)}</li>
            <li><strong>Region:</strong> ${escapeHtml(index.region)}</li>
            <li><strong>Constituents:</strong> ${escapeHtml(String(index.constituentsCount))}</li>
            <li><strong>Weighting:</strong> ${escapeHtml(index.weightingMethodology)}</li>
            <li><strong>Rebalance:</strong> ${escapeHtml(index.rebalanceFrequency)}</li>
            <li><strong>Launch Year:</strong> ${escapeHtml(String(index.launchYear))}</li>
          </ul>
        </section>

        ${index.description && index.description !== index.summary ? `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 10px;">Overview &amp; Historical Context</h2>
          <p style="color: #334155; line-height: 1.7;">${escapeHtml(index.description)}</p>
        </section>
        ` : ""}

        ${index.eligibilityCriteria && index.eligibilityCriteria.length > 0 ? `
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 10px;">Eligibility &amp; Selection Criteria</h2>
          <ul style="padding-left: 20px; color: #334155;">
            ${index.eligibilityCriteria.map(c => `<li style="margin-bottom: 6px;">${escapeHtml(c)}</li>`).join("")}
          </ul>
        </section>
        ` : ""}

        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Tracking ETFs &amp; Investment Products (${(index.trackingEtfs || []).length})</h2>
          ${(index.trackingEtfs && index.trackingEtfs.length > 0) ? `
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 15px;">
              <thead>
                <tr style="border-bottom: 2px solid #cbd5e1; background: #f1f5f9;">
                  <th style="padding: 10px 12px;">Ticker</th>
                  <th style="padding: 10px 12px;">Fund Name</th>
                  <th style="padding: 10px 12px;">Strategy / Type</th>
                  <th style="padding: 10px 12px;">AUM</th>
                </tr>
              </thead>
              <tbody>
                ${index.trackingEtfs.map(etf => {
                  const isActive = isActivelyManagedEtf(etf);
                  return `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 12px; font-weight: 700; color: #4f46e5;">${escapeHtml(etf.ticker)}</td>
                  <td style="padding: 10px 12px;">
                    <div>${escapeHtml(etf.name)}</div>
                    ${etf.strategyNote ? `<div style="font-size: 12px; color: #64748b; margin-top: 3px; font-style: italic;">${escapeHtml(etf.strategyNote)}</div>` : ""}
                  </td>
                  <td style="padding: 10px 12px;">
                    <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; ${isActive ? 'background: rgba(245, 158, 11, 0.15); color: #b45309; border: 1px solid rgba(245, 158, 11, 0.35);' : 'background: rgba(16, 185, 129, 0.12); color: #047857; border: 1px solid rgba(16, 185, 129, 0.3);'}">
                      ${isActive ? "Active Benchmark" : "Passive Replication"}
                    </span>
                  </td>
                  <td style="padding: 10px 12px; color: #64748b;">${escapeHtml(etf.aum || "N/A")}</td>
                </tr>
                `;
                }).join("")}
              </tbody>
            </table>
          </div>
          ` : `<p style="color: #64748b;">No direct tracking ETFs listed currently.</p>`}
        </section>

        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Frequently Asked Questions</h2>
          ${faqs.map(faq => `
          <div style="margin-bottom: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 6px;">${escapeHtml(faq.question)}</h3>
            <p style="margin: 0; color: #334155; font-size: 15px;">${escapeHtml(faq.answer)}</p>
          </div>
          `).join("")}
        </section>

        <footer style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
          <p>Explore all 150+ market indices, methodology guides, and tracking ETFs on <a href="/" style="color: #4f46e5; text-decoration: none;">MarketIndices.xyz</a>.</p>
        </footer>
      </main>`;

    pageHtml = pageHtml.replace(
      /<div id="root"><\/div>/i,
      `<div id="root"></div>\n    <noscript>\n${prerenderContent.trim()}\n    </noscript>`
    );

    fs.writeFileSync(path.join(pageDir, "index.html"), pageHtml, "utf8");
    generatedPages++;
  }

  console.log(
    `✓ Generated ${generatedPages} static route HTML pages with semantic prerendering, FAQPage & BreadcrumbList structured data`
  );
}

console.log("=========================================");
console.log("🎉 SEO Assets Generation Complete");
console.log("=========================================");
