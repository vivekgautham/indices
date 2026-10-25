import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDICES_DATA } from "../src/data/indicesData.ts";
import { PROVIDERS_DATA } from "../src/data/providersData.ts";

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
console.log(`✓ Generated public/sitemap.xml (${INDICES_DATA.length + 1} URLs)`);
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  console.log(`✓ Generated dist/sitemap.xml`);
}

// 3. Build Homepage Prerender HTML & Index Detail Pages
if (fs.existsSync(distDir) && fs.existsSync(path.join(distDir, "index.html"))) {
  const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

  // A. Enhance dist/index.html with crawlable semantic content inside <div id="root">
  const homepagePrerender = `
    <div id="root">
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
      </main>
    </div>`;

  const enhancedHomepageHtml = baseHtml.replace(/<div id="root"><\/div>/i, homepagePrerender.trim());
  fs.writeFileSync(path.join(distDir, "index.html"), enhancedHomepageHtml, "utf8");
  console.log("✓ Prerendered crawlable directory into dist/index.html");

  // Create dist/404.html
  fs.writeFileSync(path.join(distDir, "404.html"), enhancedHomepageHtml, "utf8");
  console.log("✓ Created dist/404.html");

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

    // Prerender semantic, fully accessible content inside <div id="root">
    const prerenderContent = `
    <div id="root">
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
                  <th style="padding: 10px 12px;">AUM</th>
                </tr>
              </thead>
              <tbody>
                ${index.trackingEtfs.map(etf => `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 12px; font-weight: 700; color: #4f46e5;">${escapeHtml(etf.ticker)}</td>
                  <td style="padding: 10px 12px;">${escapeHtml(etf.name)}</td>
                  <td style="padding: 10px 12px; color: #64748b;">${escapeHtml(etf.aum || "N/A")}</td>
                </tr>
                `).join("")}
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
      </main>
    </div>`;

    pageHtml = pageHtml.replace(/<div id="root"><\/div>/i, prerenderContent.trim());

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
