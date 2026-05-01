import { useState } from 'react';
import { Wind } from 'lucide-react';
import CalcPage, { InputPanel, ResultPanel } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { spinning } from '../utils/formulas';

const TABS = [
  { id: 'count',  labelKey: 'countConversion' },
  { id: 'tpi',    labelKey: 'tpi' },
  { id: 'tf',     labelKey: 'twistFactor' },
];

// ─── Count Conversion Calculator ─────────────────────────────────────────────
function CountConversionCalc() {
  const { t } = useLang();
  const [ne, setNe] = useState('');

  const ne_ = parseFloat(ne);
  const valid = ne_ > 0;
  const tex    = valid ? spinning.neTex(ne_)    : null;
  const denier = valid ? spinning.neDenier(ne_) : null;
  const nm     = valid ? spinning.neNm(ne_)     : null;

  const reset = () => setNe('');

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField
          label={t('neCount')}
          value={ne}
          onChange={setNe}
          unit="Ne"
          placeholder="30"
        />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('texValue')}    value={tex}    unit="Tex" />
        <ResultCard label={t('denierValue')} value={denier} unit="D" />
        <ResultCard label={t('nmValue')}     value={nm}     unit="Nm" />
        <FormulaBox formula={
          `Tex    = 590.5 ÷ Ne\nDenier = 5315  ÷ Ne\nNm     = Ne × 1.693`
        } />
      </ResultPanel>
    </>
  );
}

// ─── TPI Calculator ───────────────────────────────────────────────────────────
function TPICalc() {
  const { t } = useLang();
  const [tf, setTf] = useState('');
  const [ne, setNe] = useState('');

  const tf_ = parseFloat(tf), ne_ = parseFloat(ne);
  const valid = tf_ > 0 && ne_ > 0;
  const tpi = valid ? spinning.tpi(tf_, ne_) : null;

  const reset = () => { setTf(''); setNe(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('tfInput')}  value={tf} onChange={setTf} placeholder="4.5" />
        <InputField label={t('countNe')}  value={ne} onChange={setNe} unit="Ne" placeholder="30" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('tpiValue')} value={tpi} unit="TPI" />
        <FormulaBox formula="TPI = Twist Factor × √Ne" />
      </ResultPanel>
    </>
  );
}

// ─── Twist Factor Calculator ──────────────────────────────────────────────────
function TwistFactorCalc() {
  const { t } = useLang();
  const [tpi, setTpi] = useState('');
  const [ne, setNe]   = useState('');

  const tpi_ = parseFloat(tpi), ne_ = parseFloat(ne);
  const valid = tpi_ > 0 && ne_ > 0;
  const tf = valid ? spinning.twistFactor(tpi_, ne_) : null;

  const reset = () => { setTpi(''); setNe(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('tpiInput')} value={tpi} onChange={setTpi} unit="TPI" placeholder="24.7" />
        <InputField label={t('countNe')}  value={ne}  onChange={setNe}  unit="Ne"  placeholder="30" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('tfValue')} value={tf} />
        <FormulaBox formula="TF = TPI ÷ √Ne" />
      </ResultPanel>
    </>
  );
}

// ─── Spinning Page ────────────────────────────────────────────────────────────
export default function Spinning() {
  const [activeTab, setActiveTab] = useState('count');

  return (
    <CalcPage
      icon={Wind}
      titleKey="spinningTitle"
      descKey="spinningDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'count' && <CountConversionCalc />}
      {activeTab === 'tpi'   && <TPICalc />}
      {activeTab === 'tf'    && <TwistFactorCalc />}
    </CalcPage>
  );
}
