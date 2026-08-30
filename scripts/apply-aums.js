import fs from "fs";

const aumMap = {
  SPY: "$815B+",
  VOO: "$1.05T+",
  IVV: "$887B+",
  SPYM: "$157B+",
  DIA: "$46B+",
  IJH: "$126B+",
  MDY: "$26B+",
  IVOO: "$4B+",
  IJR: "$110B+",
  SPSM: "$17B+",
  VIOO: "$4.2B+",
  ITOT: "$97B+",
  SPTM: "$14B+",
  RSP: "$101B+",
  NOBL: "$12B+",
  SCHD: "$112B+",
  VXX: "$475M+",
  UVXY: "$293M+",
  IWM: "$81B+",
  VTWO: "$17B+",
  TNA: "$1.2B+",
  IWB: "$49B+",
  VONE: "$9B+",
  IWF: "$126B+",
  VONG: "$46B+",
  IWV: "$20B+",
  VTHR: "$5B+",
  ISF: "£15B+",
  VUKE: "£5B+",
  VEA: "$238B+",
  SCHF: "$70B+",
  VWO: "$128B+",
  VT: "$82B+",
  ACWI: "$33B+",
  SPGM: "$1.8B+",
  URTH: "$8B+",
  SWDA: "$95B+",
  EFA: "$79B+",
  IEFA: "$195B+",
  EEM: "$31B+",
  IEMG: "$161B+",
  SUSL: "$1.2B+",
  QQQ: "$486B+",
  QQQM: "$105B+",
  IQQ: "$375M+",
  QNDX: "$335M+",
  TQQQ: "$36B+",
  SQQQ: "$1.9B+",
  ONEQ: "$11B+",
  SOXX: "$42B+",
  SOXL: "$19B+",
  QQQJ: "$1.2B+",
  BUG: "$1.7B+",
  CIBR: "$16B+",
  VTI: "$690B+ (ETF) / $1.9T (Fund)",
  VTSAX: "$1.9T Total Fund",
  VV: "$54B+",
  VLCAX: "$65B+ Total Fund",
  VUG: "$228B+",
  VIGAX: "$300B+ Total Fund",
  VTV: "$192B+",
  VVIAX: "$220B+ Total Fund",
  VO: "$108B+",
  VIMAX: "$190B+ Total Fund",
  VB: "$81B+",
  VSMAX: "$160B+ Total Fund",
};

let content = fs.readFileSync("src/data/indicesData.ts", "utf8");

// Parse trackingEtfs objects and update aum
content = content.replace(
  /\{\s*ticker:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*aum:\s*"([^"]+)"\s*\}/g,
  (match, ticker, name, _oldAum) => {
    const newAum = aumMap[ticker] || _oldAum;
    return `{ ticker: "${ticker}", name: "${name}", aum: "${newAum}" }`;
  }
);

fs.writeFileSync("src/data/indicesData.ts", content);
console.log("Successfully updated all ETF AUMs in indicesData.ts!");
