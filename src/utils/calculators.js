// Flat list of all calculators — used by the search feature
// Each entry: id (unique), page (route), tabId, category, labelKeyBn, labelKeyEn
// To add a calculator: add a tab in the relevant page AND add an entry here

export const ALL_CALCULATORS = [
  // ── Spinning ──────────────────────────────────────────────────────────────
  { id: 'sp-count',    page: '/spinning', tabId: 'count',     category: 'spinning', bn: 'কাউন্ট কনভার্সন',           en: 'Count Conversion' },
  { id: 'sp-twist',    page: '/spinning', tabId: 'twist',     category: 'spinning', bn: 'টুইস্ট (TPI & TF)',           en: 'Twist (TPI & TF)' },
  { id: 'sp-strength', page: '/spinning', tabId: 'strength',  category: 'spinning', bn: 'স্ট্রেনথ (RKM & CSP)',         en: 'Strength (RKM & CSP)' },
  { id: 'sp-prod',     page: '/spinning', tabId: 'production',category: 'spinning', bn: 'প্রডাকশন ও হাংক',              en: 'Production & Hank' },
  { id: 'sp-quality',  page: '/spinning', tabId: 'quality',   category: 'spinning', bn: 'ড্রাফট, ব্লেন্ড ও ওয়েস্ট',  en: 'Draft, Blend & Waste' },

  // ── Weaving ───────────────────────────────────────────────────────────────
  { id: 'wv-gsm',      page: '/weaving',  tabId: 'gsm',       category: 'weaving',  bn: 'জিএসএম ও কভার ফ্যাক্টর',       en: 'GSM & Cover Factor' },
  { id: 'wv-dim',      page: '/weaving',  tabId: 'dimension', category: 'weaving',  bn: 'ওয়ার্প, ওয়েফট ও মাপ',         en: 'Warp, Weft & Dimensions' },
  { id: 'wv-eff',      page: '/weaving',  tabId: 'efficiency',category: 'weaving',  bn: 'এফিশিয়েন্সি ও প্রডাকশন',       en: 'Efficiency & Production' },

  // ── Knitting ──────────────────────────────────────────────────────────────
  { id: 'kn-gsm',      page: '/knitting', tabId: 'gsm',       category: 'knitting', bn: 'জিএসএম ও স্টিচ লেংথ',           en: 'GSM & Stitch Length' },
  { id: 'kn-prod',     page: '/knitting', tabId: 'production',category: 'knitting', bn: 'প্রডাকশন ও কনসাম্পশন',           en: 'Production & Consumption' },
  { id: 'kn-fab',      page: '/knitting', tabId: 'fabric',    category: 'knitting', bn: 'ফ্যাব্রিক প্রপার্টি',              en: 'Fabric Properties' },

  // ── Dyeing ────────────────────────────────────────────────────────────────
  { id: 'dy-liquor',   page: '/dyeing',   tabId: 'liquor',    category: 'dyeing',   bn: 'লিকার রেশিও ও লবণ',              en: 'Liquor Ratio & Salt' },
  { id: 'dy-chem',     page: '/dyeing',   tabId: 'chemical',  category: 'dyeing',   bn: 'কেমিক্যাল ডোজিং',                en: 'Chemical Dosing' },
  { id: 'dy-recipe',   page: '/dyeing',   tabId: 'recipe',    category: 'dyeing',   bn: 'রেসিপি স্কেলিং ও ব্যাচ',          en: 'Recipe Scaling & Batch' },

  // ── Garments ──────────────────────────────────────────────────────────────
  { id: 'ga-eff',      page: '/garments', tabId: 'efficiency',category: 'garments', bn: 'লাইন ও অপারেটর এফিশিয়েন্সি',   en: 'Line & Operator Efficiency' },
  { id: 'ga-cons',     page: '/garments', tabId: 'consumption',category:'garments', bn: 'ফ্যাব্রিক কনসাম্পশন ও মার্কার',  en: 'Fabric Consumption & Marker' },
  { id: 'ga-target',   page: '/garments', tabId: 'target',    category: 'garments', bn: 'টার্গেট, কস্ট ও WIP',             en: 'Targets, Cost & WIP' },

  // ── TTQC ──────────────────────────────────────────────────────────────────
  { id: 'tt-aql',      page: '/ttqc',     tabId: 'aql',       category: 'ttqc',     bn: 'AQL স্যাম্পলিং',                  en: 'AQL Sampling' },
  { id: 'tt-defect',   page: '/ttqc',     tabId: 'defect',    category: 'ttqc',     bn: 'ডিফেক্ট মেট্রিক্স',              en: 'Defect Metrics' },
  { id: 'tt-quality',  page: '/ttqc',     tabId: 'quality',   category: 'ttqc',     bn: 'কোয়ালিটি মেট্রিক্স',             en: 'Quality Metrics' },
  { id: 'tt-fabric',   page: '/ttqc',     tabId: 'fabric',    category: 'ttqc',     bn: 'ফ্যাব্রিক টেস্ট',                 en: 'Fabric Tests' },
];
