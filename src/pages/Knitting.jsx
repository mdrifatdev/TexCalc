import { useState } from 'react';
import { Layers } from 'lucide-react';
import CalcPage, { InputPanel, ResultPanel } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { knitting } from '../utils/formulas';

const TABS = [
  { id: 'gsm', labelKey: 'gsmKnit' },
  { id: 'sl',  labelKey: 'stitchLength' },
];

// ─── Knitting GSM Calculator ──────────────────────────────────────────────────
function KnittingGSMCalc() {
  const { t } = useLang();
  const [wpi, setWpi] = useState('');
  const [cpi, setCpi] = useState('');
  const [sl, setSl]   = useState('');
  const [tex, setTex] = useState('');

  const v = [wpi, cpi, sl, tex].map(parseFloat);
  const valid = v.every((x) => x > 0);
  const gsm = valid ? knitting.gsm(...v) : null;

  const reset = () => { setWpi(''); setCpi(''); setSl(''); setTex(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('wpi')} value={wpi} onChange={setWpi} unit="WPI" placeholder="28" />
        <InputField label={t('cpi')} value={cpi} onChange={setCpi} unit="CPI" placeholder="36" />
        <InputField label={t('sl')}  value={sl}  onChange={setSl}  unit="cm"  placeholder="0.28" />
        <InputField label={t('tex')} value={tex} onChange={setTex} unit="Tex" placeholder="20" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('gsmKnitResult')} value={gsm} unit="g/m²" />
        <FormulaBox formula="GSM = (WPI × CPI × Stitch Length × Tex) ÷ 100" />
      </ResultPanel>
    </>
  );
}

// ─── Stitch Length Calculator ─────────────────────────────────────────────────
function StitchLengthCalc() {
  const { t } = useLang();
  const [wpi, setWpi] = useState('');
  const [cpi, setCpi] = useState('');

  const wpi_ = parseFloat(wpi), cpi_ = parseFloat(cpi);
  const valid = wpi_ > 0 && cpi_ > 0;
  const sl = valid ? knitting.stitchLength(wpi_, cpi_) : null;

  const reset = () => { setWpi(''); setCpi(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('wpi')} value={wpi} onChange={setWpi} unit="WPI" placeholder="28" />
        <InputField label={t('cpi')} value={cpi} onChange={setCpi} unit="CPI" placeholder="36" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('slResult')} value={sl} unit="cm" />
        <FormulaBox formula="Stitch Length = 1 ÷ (WPI × CPI)" />
      </ResultPanel>
    </>
  );
}

// ─── Knitting Page ────────────────────────────────────────────────────────────
export default function Knitting() {
  const [activeTab, setActiveTab] = useState('gsm');

  return (
    <CalcPage
      icon={Layers}
      titleKey="knittingTitle"
      descKey="knittingDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'gsm' && <KnittingGSMCalc />}
      {activeTab === 'sl'  && <StitchLengthCalc />}
    </CalcPage>
  );
}
