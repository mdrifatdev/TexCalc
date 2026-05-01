import { useState } from 'react';
import { Grid3x3 } from 'lucide-react';
import CalcPage, { InputPanel, ResultPanel } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { weaving } from '../utils/formulas';

const TABS = [
  { id: 'gsm',    labelKey: 'gsmCalc' },
  { id: 'reed',   labelKey: 'reedCount' },
  { id: 'cover',  labelKey: 'coverFactor' },
];

// ─── GSM Calculator ───────────────────────────────────────────────────────────
function GSMCalc() {
  const { t } = useLang();
  const [epi, setEpi]         = useState('');
  const [ppi, setPpi]         = useState('');
  const [warpNe, setWarpNe]   = useState('');
  const [weftNe, setWeftNe]   = useState('');
  const [crimp, setCrimp]     = useState('');

  const v = [epi, ppi, warpNe, weftNe, crimp].map(parseFloat);
  const valid = v.every((x) => x > 0);
  const gsm = valid ? weaving.gsm(...v) : null;

  const reset = () => { setEpi(''); setPpi(''); setWarpNe(''); setWeftNe(''); setCrimp(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('epi')}        value={epi}    onChange={setEpi}    unit="EPI"  placeholder="60" />
        <InputField label={t('warpCount')}  value={warpNe} onChange={setWarpNe} unit="Ne"   placeholder="40" />
        <InputField label={t('ppi')}        value={ppi}    onChange={setPpi}    unit="PPI"  placeholder="56" />
        <InputField label={t('weftCount')}  value={weftNe} onChange={setWeftNe} unit="Ne"   placeholder="40" />
        <InputField label={t('crimpFactor')}value={crimp}  onChange={setCrimp}  placeholder="1.03" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('gsmResult')} value={gsm} unit="g/m²" />
        <FormulaBox formula={`GSM = (EPI/Warp Ne + PPI/Weft Ne) × 25.6 × Crimp Factor`} />
      </ResultPanel>
    </>
  );
}

// ─── Reed Count Calculator ────────────────────────────────────────────────────
function ReedCountCalc() {
  const { t } = useLang();
  const [epi, setEpi]       = useState('');
  const [epd, setEpd]       = useState('');

  const epi_ = parseFloat(epi), epd_ = parseFloat(epd);
  const valid = epi_ > 0 && epd_ > 0;
  const reed = valid ? weaving.reedCount(epi_, epd_) : null;

  const reset = () => { setEpi(''); setEpd(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('epi')}         value={epi} onChange={setEpi} unit="EPI" placeholder="60" />
        <InputField label={t('endsPerDent')}  value={epd} onChange={setEpd} placeholder="2" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('reedResult')} value={reed} />
        <FormulaBox formula="Reed Count = EPI ÷ Ends Per Dent" />
      </ResultPanel>
    </>
  );
}

// ─── Cover Factor Calculator ──────────────────────────────────────────────────
function CoverFactorCalc() {
  const { t } = useLang();
  const [epi, setEpi]       = useState('');
  const [ppi, setPpi]       = useState('');
  const [warpNe, setWarpNe] = useState('');
  const [weftNe, setWeftNe] = useState('');

  const v = [epi, warpNe, ppi, weftNe].map(parseFloat);
  const valid = v.every((x) => x > 0);
  const cover = valid ? weaving.coverFactor(...v) : null;

  const reset = () => { setEpi(''); setPpi(''); setWarpNe(''); setWeftNe(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('epi')}        value={epi}    onChange={setEpi}    unit="EPI" placeholder="60" />
        <InputField label={t('warpCount')}  value={warpNe} onChange={setWarpNe} unit="Ne"  placeholder="40" />
        <InputField label={t('ppi')}        value={ppi}    onChange={setPpi}    unit="PPI" placeholder="56" />
        <InputField label={t('weftCount')}  value={weftNe} onChange={setWeftNe} unit="Ne"  placeholder="40" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('coverResult')} value={cover} />
        <FormulaBox formula={`Cover = (EPI ÷ √Warp Ne) + (PPI ÷ √Weft Ne)`} />
      </ResultPanel>
    </>
  );
}

// ─── Weaving Page ─────────────────────────────────────────────────────────────
export default function Weaving() {
  const [activeTab, setActiveTab] = useState('gsm');

  return (
    <CalcPage
      icon={Grid3x3}
      titleKey="weavingTitle"
      descKey="weavingDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'gsm'   && <GSMCalc />}
      {activeTab === 'reed'  && <ReedCountCalc />}
      {activeTab === 'cover' && <CoverFactorCalc />}
    </CalcPage>
  );
}
