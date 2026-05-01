// TexCalc — All formula functions
// To add a new calculator: add a new function here and reference it in the page

// ─── Spinning ────────────────────────────────────────────────────────────────
export const spinning = {
  // Ne to Tex
  neTex: (ne) => 590.5 / ne,
  // Ne to Denier
  neDenier: (ne) => 5315 / ne,
  // Ne to Nm
  neNm: (ne) => ne * 1.693,
  // TPI from Twist Factor and Ne
  tpi: (tf, ne) => tf * Math.sqrt(ne),
  // Twist Factor from TPI and Ne
  twistFactor: (tpi, ne) => tpi / Math.sqrt(ne),
};

// ─── Weaving ─────────────────────────────────────────────────────────────────
export const weaving = {
  // GSM of woven fabric
  gsm: (epi, warpNe, ppi, weftNe, crimpFactor) =>
    (epi / warpNe + ppi / weftNe) * 25.6 * crimpFactor,
  // Reed count
  reedCount: (epi, endsPerDent) => epi / endsPerDent,
  // Cloth Cover Factor
  coverFactor: (epi, warpNe, ppi, weftNe) =>
    epi / Math.sqrt(warpNe) + ppi / Math.sqrt(weftNe),
};

// ─── Knitting ─────────────────────────────────────────────────────────────────
export const knitting = {
  // GSM of knitted fabric
  gsm: (wpi, cpi, sl, tex) => (wpi * cpi * sl * tex) / 100,
  // Stitch length
  stitchLength: (wpi, cpi) => 1 / (wpi * cpi),
};

// ─── Dyeing ───────────────────────────────────────────────────────────────────
export const dyeing = {
  // Liquor Ratio
  liquorRatio: (waterL, fabricKg) => waterL / fabricKg,
  // Chemical dosing in grams
  chemDosing: (percent, fabricKg, lr) => (percent * fabricKg * lr) / 100,
  // Salt concentration g/L
  saltConcentration: (requiredSaltG, totalWaterL) => requiredSaltG / totalWaterL,
};

// ─── Garments ─────────────────────────────────────────────────────────────────
export const garments = {
  // Line Efficiency %
  lineEfficiency: (totalSMV, workers, minutes, targetEff) =>
    (totalSMV / (workers * minutes * (targetEff / 100))) * 100,
  // Fabric Consumption in kg
  fabricConsumption: (length, width, allowanceL, allowanceW, gsm) =>
    ((length + allowanceL) * (width + allowanceW) * gsm) / 10000000,
  // Pieces per hour from SMV
  piecesPerHour: (smv) => 60 / smv,
};

// ─── AQL Table (ISO 2859-1 simplified) ───────────────────────────────────────
// Structure: { [lotSizeRange]: { sampleSize, accept, reject } }
// For each AQL level key: '1.0' | '1.5' | '2.5' | '4.0'

export const AQL_TABLE = {
  // Lot size range: [min, max]
  ranges: [
    { label: '2 – 8',        min: 2,      max: 8 },
    { label: '9 – 15',       min: 9,      max: 15 },
    { label: '16 – 25',      min: 16,     max: 25 },
    { label: '26 – 50',      min: 26,     max: 50 },
    { label: '51 – 90',      min: 51,     max: 90 },
    { label: '91 – 150',     min: 91,     max: 150 },
    { label: '151 – 280',    min: 151,    max: 280 },
    { label: '281 – 500',    min: 281,    max: 500 },
    { label: '501 – 1200',   min: 501,    max: 1200 },
    { label: '1201 – 3200',  min: 1201,   max: 3200 },
    { label: '3201 – 10000', min: 3201,   max: 10000 },
    { label: '10001 – 35000',min: 10001,  max: 35000 },
    { label: '35001 – 150000',min:35001,  max: 150000 },
  ],
  data: {
    '1.0': [
      { sample: 2,   ac: 0, re: 1 },
      { sample: 3,   ac: 0, re: 1 },
      { sample: 5,   ac: 0, re: 1 },
      { sample: 8,   ac: 0, re: 1 },
      { sample: 13,  ac: 0, re: 1 },
      { sample: 20,  ac: 0, re: 1 },
      { sample: 32,  ac: 1, re: 2 },
      { sample: 50,  ac: 1, re: 2 },
      { sample: 80,  ac: 2, re: 3 },
      { sample: 125, ac: 3, re: 4 },
      { sample: 200, ac: 5, re: 6 },
      { sample: 315, ac: 7, re: 8 },
      { sample: 500, ac: 10, re: 11 },
    ],
    '1.5': [
      { sample: 2,   ac: 0, re: 1 },
      { sample: 3,   ac: 0, re: 1 },
      { sample: 5,   ac: 0, re: 1 },
      { sample: 8,   ac: 0, re: 1 },
      { sample: 13,  ac: 0, re: 1 },
      { sample: 20,  ac: 1, re: 2 },
      { sample: 32,  ac: 1, re: 2 },
      { sample: 50,  ac: 2, re: 3 },
      { sample: 80,  ac: 3, re: 4 },
      { sample: 125, ac: 5, re: 6 },
      { sample: 200, ac: 7, re: 8 },
      { sample: 315, ac: 10, re: 11 },
      { sample: 500, ac: 14, re: 15 },
    ],
    '2.5': [
      { sample: 2,   ac: 0, re: 1 },
      { sample: 3,   ac: 0, re: 1 },
      { sample: 5,   ac: 0, re: 1 },
      { sample: 8,   ac: 0, re: 1 },
      { sample: 13,  ac: 1, re: 2 },
      { sample: 20,  ac: 1, re: 2 },
      { sample: 32,  ac: 2, re: 3 },
      { sample: 50,  ac: 3, re: 4 },
      { sample: 80,  ac: 5, re: 6 },
      { sample: 125, ac: 7, re: 8 },
      { sample: 200, ac: 10, re: 11 },
      { sample: 315, ac: 14, re: 15 },
      { sample: 500, ac: 21, re: 22 },
    ],
    '4.0': [
      { sample: 2,   ac: 0, re: 1 },
      { sample: 3,   ac: 0, re: 1 },
      { sample: 5,   ac: 0, re: 1 },
      { sample: 8,   ac: 1, re: 2 },
      { sample: 13,  ac: 1, re: 2 },
      { sample: 20,  ac: 2, re: 3 },
      { sample: 32,  ac: 3, re: 4 },
      { sample: 50,  ac: 5, re: 6 },
      { sample: 80,  ac: 7, re: 8 },
      { sample: 125, ac: 10, re: 11 },
      { sample: 200, ac: 14, re: 15 },
      { sample: 315, ac: 21, re: 22 },
      { sample: 500, ac: 21, re: 22 },
    ],
  },
};

// Helper: find AQL row for a given lot size and AQL level
export function getAQLResult(lotSize, aqlLevel) {
  const lot = parseInt(lotSize, 10);
  if (isNaN(lot) || lot < 2) return null;
  const rangeIdx = AQL_TABLE.ranges.findIndex(
    (r) => lot >= r.min && lot <= r.max
  );
  if (rangeIdx === -1) return null;
  const row = AQL_TABLE.data[aqlLevel]?.[rangeIdx];
  if (!row) return null;
  return {
    range: AQL_TABLE.ranges[rangeIdx].label,
    sample: row.sample,
    accept: row.ac,
    reject: row.re,
  };
}

// ─── TTQC ─────────────────────────────────────────────────────────────────────
export const ttqc = {
  defectRate: (defectivePcs, totalInspected) =>
    (defectivePcs / totalInspected) * 100,
  dhu: (totalDefects, totalInspected) =>
    (totalDefects / totalInspected) * 100,
};
