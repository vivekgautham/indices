import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDICES_DATA } from "../src/data/indicesData.ts";

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

// 3. If dist exists, create 404.html and static entry pages for each index
if (fs.existsSync(distDir) && fs.existsSync(path.join(distDir, "index.html"))) {
  const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

  // Create 404.html for GitHub Pages SPA routing fallback
  fs.writeFileSync(path.join(distDir, "404.html"), baseHtml, "utf8");
  console.log("✓ Created dist/404.html");

  // Create static route pages for all 142 indices
  let generatedPages = 0;
  for (const index of INDICES_DATA) {
    const pageDir = path.join(distDir, "index", index.id);
    fs.mkdirSync(pageDir, { recursive: true });

    const title = `${index.name} (${index.symbol}) | MarketIndices.xyz`;
    const description = (index.summary || index.description || "")
      .replace(/"/g, "&quot;")
      .slice(0, 160);
    const pageUrl = `${BASE_URL}/index/${index.id}`;

    let pageHtml = baseHtml;

    // Replace title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${title}</title>`
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
      `<meta property="og:title" content="${title}" />`
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
      `<meta name="twitter:title" content="${title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:url" content="${pageUrl}" />`
    );

    // Inject Index-specific JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: index.name,
      alternateName: index.symbol,
      description: index.summary || index.description,
      url: pageUrl,
      category: index.category,
      provider: {
        "@type": "Organization",
        name: index.providerId.toUpperCase(),
      },
    };

    const ldJsonScript = `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>\n  </head>`;
    pageHtml = pageHtml.replace("</head>", ldJsonScript);

    fs.writeFileSync(path.join(pageDir, "index.html"), pageHtml, "utf8");
    generatedPages++;
  }

  console.log(
    `✓ Generated ${generatedPages} static route HTML pages for GitHub Pages with SEO metadata`
  );
}

console.log("=========================================");
console.log("🎉 SEO Assets Generation Complete");
console.log("=========================================");
