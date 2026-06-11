import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CalcPage, { InputPanel, ResultPanel } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { spinning } from '../utils/formulas';
import { useAutoHistory } from '../hooks/useAutoHistory';

const TABS = [
  { id: 'length',      labelKey: 'lengthTab' },
  { id: 'weight',      labelKey: 'weightTab' },
  { id: 'count',       labelKey: 'countTab' },
  { id: 'temperature', labelKey: 'tempTab' },
];

// ─── Length Conversion ────────────────────────────────────────────────────────
function LengthTab() {
  const { t } = useLang();
  const [f, setF] = useState({ inches: '', yards: '', meters: '', cm: '' });

  const handleChange = (field, value) => {
    const newF = { inches: '', yards: '', meters: '', cm: '' };
    newF[field] = value;
    const n = parseFloat(value);

    if (n >= 0) {
      if (field === 'inches') {
        newF.yards  = (n / 36).toFixed(4);
        newF.meters = (n * 0.0254).toFixed(4);
        newF.cm     = (n * 2.54).toFixed(4);
      } else if (field === 'yards') {
        newF.inches = (n * 36).toFixed(4);
        newF.meters = (n * 0.9144).toFixed(4);
        newF.cm     = (n * 91.44).toFixed(4);
      } else if (field === 'meters') {
        newF.inches = (n / 0.0254).toFixed(4);
        newF.yards  = (n / 0.9144).toFixed(4);
        newF.cm     = (n * 100).toFixed(4);
      } else if (field === 'cm') {
        newF.inches = (n / 2.54).toFixed(4);
        newF.yards  = (n / 91.44).toFixed(4);
        newF.meters = (n / 100).toFixed(4);
      }
    }
    setF(newF);
  };

  const reset = () => setF({ inches: '', yards: '', meters: '', cm: '' });

  const mNum = parseFloat(f.meters);
  useAutoHistory({
    calcId: 'co-length',
    calcName: 'Length Converter',
    category: 'converter',
    page: '/converter',
    tabId: 'length',
    resultLabel: 'Meters',
    resultValue: mNum >= 0 ? mNum : null,
    resultUnit: 'm',
  });

  return (
    <>
      <InputPanel onReset={reset}>
        <p className="text-xs text-light-muted dark:text-dark-muted pb-1">{t('bidirectionalHint')}</p>
        <InputField label={t('meters')} value={f.meters} onChange={(v) => handleChange('meters', v)} placeholder="1" />
        <InputField label={t('cm')}     value={f.cm}     onChange={(v) => handleChange('cm',     v)} placeholder="100" />
        <InputField label={t('inches')} value={f.inches} onChange={(v) => handleChange('inches', v)} placeholder="39.37" />
        <InputField label={t('yards')}  value={f.yards}  onChange={(v) => handleChange('yards',  v)} placeholder="1.0936" />
      </InputPanel>
      <ResultPanel>
        <FormulaBox formula={
`1 inch = 2.54 cm = 0.0254 m
1 yard = 36 inches = 0.9144 m
1 meter = 100 cm = 1.0936 yards = 39.37 inches`
        } />
      </ResultPanel>
    </>
  );
}

// ─── Weight Conversion ────────────────────────────────────────────────────────
function WeightTab() {
  const { t } = useLang();
  const [f, setF] = useState({ kg: '', grams: '', lbs: '', oz: '' });

  const handleChange = (field, value) => {
    const newF = { kg: '', grams: '', lbs: '', oz: '' };
    newF[field] = value;
    const n = parseFloat(value);

    if (n >= 0) {
      if (field === 'kg') {
        newF.grams = (n * 1000).toFixed(4);
        newF.lbs   = (n * 2.20462).toFixed(4);
        newF.oz    = (n * 35.274).toFixed(4);
      } else if (field === 'grams') {
        newF.kg    = (n / 1000).toFixed(4);
        newF.lbs   = (n * 0.00220462).toFixed(4);
        newF.oz    = (n * 0.035274).toFixed(4);
      } else if (field === 'lbs') {
        newF.kg    = (n / 2.20462).toFixed(4);
        newF.grams = (n * 453.59237).toFixed(4);
        newF.oz    = (n * 16).toFixed(4);
      } else if (field === 'oz') {
        newF.kg    = (n / 35.274).toFixed(4);
        newF.grams = (n * 28.349523).toFixed(4);
        newF.lbs   = (n / 16).toFixed(4);
      }
    }
    setF(newF);
  };

  const reset = () => setF({ kg: '', grams: '', lbs: '', oz: '' });

  const kgNum = parseFloat(f.kg);
  useAutoHistory({
    calcId: 'co-weight',
    calcName: 'Weight Converter',
    category: 'converter',
    page: '/converter',
    tabId: 'weight',
    resultLabel: 'Kilograms',
    resultValue: kgNum >= 0 ? kgNum : null,
    resultUnit: 'kg',
  });

  return (
    <>
      <InputPanel onReset={reset}>
        <p className="text-xs text-light-muted dark:text-dark-muted pb-1">{t('bidirectionalHint')}</p>
        <InputField label={t('kg')}    value={f.kg}    onChange={(v) => handleChange('kg',    v)} placeholder="1" />
        <InputField label={t('grams')} value={f.grams} onChange={(v) => handleChange('grams', v)} placeholder="1000" />
        <InputField label={t('lbs')}   value={f.lbs}   onChange={(v) => handleChange('lbs',   v)} placeholder="2.2046" />
        <InputField label={t('oz')}    value={f.oz}    onChange={(v) => handleChange('oz',    v)} placeholder="35.274" />
      </InputPanel>
      <ResultPanel>
        <FormulaBox formula={
`1 kg = 1000 g = 2.2046 lbs = 35.274 oz
1 lb = 16 oz = 453.59 g = 0.4536 kg`
        } />
      </ResultPanel>
    </>
  );
}

// ─── Yarn Count Conversion ────────────────────────────────────────────────────
function CountTab() {
  const { t } = useLang();
  const [f, setF] = useState({ ne: '', tex: '', denier: '', nm: '' });

  const handleChange = (field, value) => {
    const newF = { ne: '', tex: '', denier: '', nm: '' };
    newF[field] = value;
    const n = parseFloat(value);

    if (n > 0) {
      if (field === 'ne') {
        newF.tex    = spinning.neTex(n).toFixed(4);
        newF.denier = spinning.neDenier(n).toFixed(4);
        newF.nm     = spinning.neNm(n).toFixed(4);
      } else if (field === 'tex') {
        newF.ne     = spinning.texNe(n).toFixed(4);
        newF.nm     = spinning.texNm(n).toFixed(4);
        newF.denier = spinning.texDenier(n).toFixed(4);
      } else if (field === 'denier') {
        newF.ne  = spinning.denierNe(n).toFixed(4);
        newF.tex = spinning.denierTex(n).toFixed(4);
        newF.nm  = spinning.denierNm(n).toFixed(4);
      } else if (field === 'nm') {
        newF.ne     = spinning.nmNe(n).toFixed(4);
        newF.tex    = spinning.nmTex(n).toFixed(4);
        newF.denier = spinning.nmDenier(n).toFixed(4);
      }
    }
    setF(newF);
  };

  const reset = () => setF({ ne: '', tex: '', denier: '', nm: '' });

  const texNum = parseFloat(f.tex);
  useAutoHistory({
    calcId: 'co-count',
    calcName: 'Yarn Count Converter',
    category: 'converter',
    page: '/converter',
    tabId: 'count',
    resultLabel: 'Tex',
    resultValue: texNum > 0 ? texNum : null,
    resultUnit: 'Tex',
  });

  return (
    <>
      <InputPanel onReset={reset}>
        <p className="text-xs text-light-muted dark:text-dark-muted pb-1">{t('bidirectionalHint')}</p>
        <InputField label={t('neLabel')}     value={f.ne}     onChange={(v) => handleChange('ne',     v)} unit="Ne"  placeholder="30" />
        <InputField label={t('texLabel')}    value={f.tex}    onChange={(v) => handleChange('tex',    v)} unit="Tex" placeholder="19.68" />
        <InputField label={t('denierLabel')} value={f.denier} onChange={(v) => handleChange('denier', v)} unit="D"   placeholder="177.17" />
        <InputField label={t('nmLabel')}     value={f.nm}     onChange={(v) => handleChange('nm',     v)} unit="Nm"  placeholder="50.79" />
      </InputPanel>
      <ResultPanel>
        <FormulaBox formula={
`Ne  → Tex    = 590.5 ÷ Ne
Ne  → Denier = 5315  ÷ Ne
Ne  → Nm     = Ne × 1.693
Tex → Ne     = 590.5 ÷ Tex
Tex → Nm     = 1000  ÷ Tex
Tex → Denier = Tex × 9`
        } />
      </ResultPanel>
    </>
  );
}

// ─── Temperature Conversion ───────────────────────────────────────────────────
function TempTab() {
  const { t } = useLang();
  const [f, setF] = useState({ celsius: '', fahrenheit: '', kelvin: '' });

  const handleChange = (field, value) => {
    const newF = { celsius: '', fahrenheit: '', kelvin: '' };
    newF[field] = value;
    const n = parseFloat(value);

    if (!isNaN(n)) {
      if (field === 'celsius') {
        newF.fahrenheit = ((n * 9) / 5 + 32).toFixed(2);
        newF.kelvin     = (n + 273.15).toFixed(2);
      } else if (field === 'fahrenheit') {
        newF.celsius    = (((n - 32) * 5) / 9).toFixed(2);
        newF.kelvin     = (((n - 32) * 5) / 9 + 273.15).toFixed(2);
      } else if (field === 'kelvin') {
        newF.celsius    = (n - 273.15).toFixed(2);
        newF.fahrenheit = (((n - 273.15) * 9) / 5 + 32).toFixed(2);
      }
    }
    setF(newF);
  };

  const reset = () => setF({ celsius: '', fahrenheit: '', kelvin: '' });

  const cNum = parseFloat(f.celsius);
  useAutoHistory({
    calcId: 'co-temperature',
    calcName: 'Temperature Converter',
    category: 'converter',
    page: '/converter',
    tabId: 'temperature',
    resultLabel: 'Celsius',
    resultValue: !isNaN(cNum) ? cNum : null,
    resultUnit: '°C',
  });

  return (
    <>
      <InputPanel onReset={reset}>
        <p className="text-xs text-light-muted dark:text-dark-muted pb-1">{t('bidirectionalHint')}</p>
        <InputField label={t('celsius')}    value={f.celsius}    onChange={(v) => handleChange('celsius',    v)} placeholder="100" />
        <InputField label={t('fahrenheit')} value={f.fahrenheit} onChange={(v) => handleChange('fahrenheit', v)} placeholder="212" />
        <InputField label={t('kelvin')}     value={f.kelvin}     onChange={(v) => handleChange('kelvin',     v)} placeholder="373.15" />
      </InputPanel>
      <ResultPanel>
        <FormulaBox formula={
`°F = (°C × 9/5) + 32
K  = °C + 273.15
°C = (°F - 32) × 5/9`
        } />
      </ResultPanel>
    </>
  );
}

// ─── Main Converter Page ──────────────────────────────────────────────────────
export default function Converter() {
  const location = useLocation();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'length');

  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }

  return (
    <CalcPage
      icon={RefreshCw}
      titleKey="converterTitle"
      descKey="converterDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      calcPrefix="co"
    >
      {activeTab === 'length'      && <LengthTab />}
      {activeTab === 'weight'      && <WeightTab />}
      {activeTab === 'count'       && <CountTab />}
      {activeTab === 'temperature' && <TempTab />}
    </CalcPage>
  );
}
