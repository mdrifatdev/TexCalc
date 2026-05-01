// TexCalc — Complete formula library
// Add new formulas here and reference them in the relevant page.

// ─── Spinning ────────────────────────────────────────────────────────────────
export const spinning = {
  // Count conversions (bidirectional)
  neTex:    (ne)     => 590.5 / ne,
  neDenier: (ne)     => 5315  / ne,
  neNm:     (ne)     => ne * 1.693,
  texNe:    (tex)    => 590.5 / tex,
  texNm:    (tex)    => 1000  / tex,
  texDenier:(tex)    => tex   * 9,
  denierNe: (d)      => 5315  / d,
  denierTex:(d)      => d     / 9,
  denierNm: (d)      => 9000  / d,
  nmNe:     (nm)     => nm    / 1.693,
  nmTex:    (nm)     => 1000  / nm,
  nmDenier: (nm)     => 9000  / nm,

  // Twist
  tpi:          (tf, ne)      => tf * Math.sqrt(ne),
  twistFactor:  (tpi, ne)     => tpi / Math.sqrt(ne),

  // Strength
  yarnRKM:      (strength, count) => strength / count,
  csp:          (count, strength) => count * strength,

  // Production
  productionSpindle: (hank, speed, efficiency) => (hank * speed * (efficiency / 100)) / 840,
  hankToKg:          (hanks, count)            => (hanks * 840) / (count * 1000),
  bobbinWeightG:     (lengthYards, count)       => (lengthYards / (840 * count)) * 453.592,

  // Draft & roving
  draft:        (feed, delivery)       => delivery / feed,
  rovingHank:   (weightG, lengthYards) => (weightG * lengthYards) / 1000,

  // Quality
  blendRatioPct:     (fiberA, total)   => (fiberA / total) * 100,
  yarnRealisationPct:(output, input)   => (output / input) * 100,
  wastePct:          (input, output)   => ((input - output) / input) * 100,
};

// ─── Weaving ─────────────────────────────────────────────────────────────────
export const weaving = {
  // GSM of woven fabric
  gsm:         (epi, warpNe, ppi, weftNe, crimp) => (epi / warpNe + ppi / weftNe) * 25.6 * crimp,
  reedCount:   (epi, epd)                          => epi / epd,
  coverFactor: (epi, warpNe, ppi, weftNe)          => epi / Math.sqrt(warpNe) + ppi / Math.sqrt(weftNe),

  // Dimensions
  clothWidthInch:  (totalEnds, epi)               => totalEnds / epi,
  warpLengthYards: (pieceLength, allowance, qty)  => (pieceLength + allowance) * qty,

  // Weight
  warpWeightKg:    (epi, width, length, count)    => (epi * width * length) / (count * 840 * 0.9144),
  weftWeightKg:    (ppi, width, length, count)    => (ppi * width * length) / (count * 840 * 0.9144),
  epiFromReed:     (reed, endsPerDent)            => reed * endsPerDent,

  // Quality
  crimpPct:        (yarnLen, fabricLen)           => ((yarnLen - fabricLen) / fabricLen) * 100,
  fabricShrinkage: (before, after)               => ((before - after) / before) * 100,

  // Efficiency & production
  loomEfficiency:     (actual, target)            => (actual / target) * 100,
  productionMeterDay: (ppm, hours, efficiency, ppi) => (ppm * 60 * hours * (efficiency / 100) / ppi) * 0.9144,
  warpBeamCount:      (totalEnds, creelCapacity)  => Math.ceil(totalEnds / creelCapacity),
  picksPerMinute:     (rpmSpeed, efficiency)      => rpmSpeed * (efficiency / 100),
};

// ─── Knitting ─────────────────────────────────────────────────────────────────
export const knitting = {
  gsm:               (wpi, cpi, sl, tex)              => (wpi * cpi * sl * tex) / 100,
  stitchLength:      (wpi, cpi)                       => 1 / (wpi * cpi),
  loopDensity:       (wpi, cpi)                       => wpi * cpi,
  yarnConsumptionKg: (fabricKg, wastePct)             => fabricKg * (1 + wastePct / 100),
  productionKgShift: (rpm, feeders, sl, tex, hours)   => (rpm * feeders * sl * tex * 60 * hours) / 1e9,
  shrinkageAllowance:(finalWidth, shrinkagePct)        => finalWidth / (1 - shrinkagePct / 100),
  fabricWidthCylinder:(diameter, gaugeAdj)            => Math.PI * diameter * gaugeAdj,
  tightnessFactor:   (tex, sl)                        => Math.sqrt(tex) / sl,
  yarnTexFromGSM:    (gsm, wpi, cpi, sl)              => (gsm * 100) / (wpi * cpi * sl),
  yarnNeFromGSM:     (gsm, wpi, cpi, sl)              => 590.5 / ((gsm * 100) / (wpi * cpi * sl)),
};

// ─── Dyeing ───────────────────────────────────────────────────────────────────
export const dyeing = {
  // Liquor ratio
  liquorRatio:        (waterL, fabricKg)               => waterL / fabricKg,
  waterLiters:        (fabricKg, lr)                   => fabricKg * lr,
  dilution:           (v1, c1, c2)                     => (v1 * c1) / c2,
  winchVolume:        (length, diameter)               => Math.PI * Math.pow(diameter / 2, 2) * length * 1000,

  // Chemical dosing
  chemConc:           (chemG, waterL)                  => chemG / waterL,
  dosageMl:           (density, owfPct, fabricKg)      => (fabricKg * owfPct * 1000) / (density * 100),
  chemDosing:         (pct, fabricKg, lr)              => (pct * fabricKg * lr) / 100,
  saltConcentration:  (saltG, waterL)                  => saltG / waterL,
  saltDosage:         (fabricKg, shadePct)             => fabricKg * (shadePct < 0.5 ? 40 : shadePct < 1 ? 60 : shadePct < 2 ? 80 : shadePct < 3 ? 100 : 120),
  auxiliaryKg:        (owfPct, fabricKg)               => fabricKg * owfPct / 100,

  // Recipe / batch
  dyeQuantityKg:      (dyeOwf, fabricKg)               => fabricKg * dyeOwf / 100,
  scouringBath:       (fabricKg, scourConc, lr)         => fabricKg * lr * scourConc,
  stripedRecalc:      (dye1Pct, dye2Pct, totalFabric)  => ({
    dye1: +(totalFabric * dye1Pct / 100).toFixed(4),
    dye2: +(totalFabric * dye2Pct / 100).toFixed(4),
  }),
  washingEfficiency:  (initialConc, finalConc)          => ((initialConc - finalConc) / initialConc) * 100,

  // Legacy helpers
  sodaAshG:           (pct, fabricKg)                  => (pct * fabricKg * 1000) / 100,
  owfPercent:         (dyeWeightG, fabricKg)            => (dyeWeightG / (fabricKg * 1000)) * 100,
  recipeScaling:      (chemical, oldBatch, newBatch)    => (chemical * newBatch) / oldBatch,
  fixationPct:        (dyed, washedOut)                 => ((dyed - washedOut) / dyed) * 100,
};

// ─── Garments ─────────────────────────────────────────────────────────────────
export const garments = {
  lineEfficiency:     (smv, workers, minutes, target)    => (smv / (workers * minutes * (target / 100))) * 100,
  fabricConsumption:  (length, width, allowL, allowW, gsm) => ((length + allowL) * (width + allowW) * gsm) / 10000000,
  piecesPerHour:      (smv)                              => 60 / smv,
  operatorEfficiency: (actual, target)                   => (actual / target) * 100,
  lineCapacity:       (efficiency, workers, hours, smv)  => (efficiency / 100 * workers * hours * 60) / smv,
  dailyTarget:        (workers, hours, smv, efficiency)  => (workers * hours * 60 * (efficiency / 100)) / smv,

  // Cost
  cmt:                (cutting, sewing, finishing)       => cutting + sewing + finishing,
  cm:                 (fabric, labour, overhead, profitPct) => (fabric + labour + overhead) * (1 + profitPct / 100),
  netProfit:          (salePrice, costPrice)              => ((salePrice - costPrice) / salePrice) * 100,
  labourCostPerPiece: (dailyWage, dailyTargetVal)         => dailyWage / dailyTargetVal,
  fabricReqYards:     (qty, gsm, widthIn)                => (qty * gsm * (widthIn * 0.0254)) / 1000,

  // Production planning
  attendancePct:      (present, total)                   => (present / total) * 100,
  minutesProduced:    (pieces, smv)                      => pieces * smv,
  markerEfficiency:   (patternArea, markerArea)          => (patternArea / markerArea) * 100,
  rejectionPct:       (rejected, total)                  => (rejected / total) * 100,
  wip:                (input, output)                    => input - output,
  cmCalculation:      (sam, minuteRate)                  => sam * minuteRate,
};

// ─── TTQC ─────────────────────────────────────────────────────────────────────
export const ttqc = {
  defectRate:          (defective, total)              => (defective / total) * 100,
  dhu:                 (totalDefects, totalInspected)  => (totalDefects / totalInspected) * 100,
  passRate:            (pass, total)                   => (pass / total) * 100,

  // Weighted DHU: Critical×3, Major×1.5, Minor×1
  weightedDHU:         (critical, major, minor, total) =>
    ((critical * 3 + major * 1.5 + minor * 1) / total) * 100,

  // Audit score: (1 - found / possible) × 100
  auditScore:          (found, possible)               => (1 - found / possible) * 100,

  // DPMO / Sigma
  dpmo:                (defects, sample)               => (defects / sample) * 1e6,
  firstPassYield:      (dpmoVal)                       => (1 - dpmoVal / 1e6) * 100,
  cpk:                 (sigmaLevel)                    => sigmaLevel / 3,
  pq:                  (quality, quantity)             => (quality + quantity) / 2,

  // Fabric 4-point
  fabric4point:        (penaltyPoints, totalYards)     => (penaltyPoints / totalYards) * 100,
  fabric4pointPer100m: (pts, linearYards, widthIn)     => (pts * 1000) / (linearYards * widthIn * 0.00254),
  gradeFromPoints:     (points)                        => points <= 20 ? 'A (Pass)' : points <= 40 ? 'B (Accept)' : 'C (Reject)',
  fabricGradeByGSM:    (gsm)                           => gsm < 150 ? 'Light' : gsm < 250 ? 'Medium' : 'Heavy',

  // Legacy
  shrinkagePct:        (before, after)                 => ((before - after) / before) * 100,
  gsmTolerancePct:     (actual, nominal)               => ((actual - nominal) / nominal) * 100,
  isPass:              (defects, rejectNum)             => defects < rejectNum,
};

// ─── AQL Table (ISO 2859-1) ───────────────────────────────────────────────────
export const AQL_RANGES = [
  { label: '2 – 8',         min: 2,     max: 8 },
  { label: '9 – 15',        min: 9,     max: 15 },
  { label: '16 – 25',       min: 16,    max: 25 },
  { label: '26 – 50',       min: 26,    max: 50 },
  { label: '51 – 90',       min: 51,    max: 90 },
  { label: '91 – 150',      min: 91,    max: 150 },
  { label: '151 – 280',     min: 151,   max: 280 },
  { label: '281 – 500',     min: 281,   max: 500 },
  { label: '501 – 1200',    min: 501,   max: 1200 },
  { label: '1201 – 3200',   min: 1201,  max: 3200 },
  { label: '3201 – 10000',  min: 3201,  max: 10000 },
  { label: '10001 – 35000', min: 10001, max: 35000 },
  { label: '35001+',        min: 35001, max: Infinity },
];

const SAMPLE_SIZES = {
  G1: [2,  2,  3,  5,  8,  13,  20,  32,  50,  80,  125, 200, 315],
  G2: [2,  3,  5,  8,  13, 20,  32,  50,  80, 125,  200, 315, 500],
  G3: [3,  5,  8,  13, 20, 32,  50,  80, 125, 200,  315, 500, 800],
};

const AQL_DATA = {
  '1.0': [
    {ac:0,re:1},{ac:0,re:1},{ac:0,re:1},{ac:0,re:1},{ac:0,re:1},
    {ac:0,re:1},{ac:1,re:2},{ac:1,re:2},{ac:2,re:3},{ac:3,re:4},
    {ac:5,re:6},{ac:7,re:8},{ac:10,re:11},
  ],
  '1.5': [
    {ac:0,re:1},{ac:0,re:1},{ac:0,re:1},{ac:0,re:1},{ac:0,re:1},
    {ac:1,re:2},{ac:1,re:2},{ac:2,re:3},{ac:3,re:4},{ac:5,re:6},
    {ac:7,re:8},{ac:10,re:11},{ac:14,re:15},
  ],
  '2.5': [
    {ac:0,re:1},{ac:0,re:1},{ac:0,re:1},{ac:0,re:1},{ac:1,re:2},
    {ac:1,re:2},{ac:2,re:3},{ac:3,re:4},{ac:5,re:6},{ac:7,re:8},
    {ac:10,re:11},{ac:14,re:15},{ac:21,re:22},
  ],
  '4.0': [
    {ac:0,re:1},{ac:0,re:1},{ac:0,re:1},{ac:1,re:2},{ac:1,re:2},
    {ac:2,re:3},{ac:3,re:4},{ac:5,re:6},{ac:7,re:8},{ac:10,re:11},
    {ac:14,re:15},{ac:21,re:22},{ac:21,re:22},
  ],
};

export function getAQLResult(lotSize, aqlLevel, inspectionLevel = 'G2') {
  const lot = parseInt(lotSize, 10);
  if (isNaN(lot) || lot < 2) return null;
  const rangeIdx = AQL_RANGES.findIndex((r) => lot >= r.min && lot <= r.max);
  if (rangeIdx === -1) return null;
  const samples = SAMPLE_SIZES[inspectionLevel] || SAMPLE_SIZES.G2;
  const row = AQL_DATA[aqlLevel]?.[rangeIdx];
  if (!row) return null;
  return {
    range:    AQL_RANGES[rangeIdx].label,
    sample:   samples[rangeIdx],
    accept:   row.ac,
    reject:   row.re,
  };
}
