import { useState } from 'react';
import { Shirt } from 'lucide-react';
import CalcPage, { InputPanel, ResultPanel } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { garments } from '../utils/formulas';

const TABS = [
  { id: 'eff',     labelKey: 'lineEfficiency' },
  { id: 'consum',  labelKey: 'fabricConsumption' },
  { id: 'smv',     labelKey: 'smvToPieces' },
];

// ─── Line Efficiency Calculator ───────────────────────────────────────────────
function LineEfficiencyCalc() {
  const { t } = useLang();
  const [totalSMV, setTotalSMV]   = useState('');
  const [workers, setWorkers]     = useState('');
  const [minutes, setMinutes]     = useState('');
  const [target, setTarget]       = useState('');

  const v = [totalSMV, workers, minutes, target].map(parseFloat);
  const valid = v.every((x) => x > 0);
  const eff = valid ? garments.lineEfficiency(...v) : null;

  const reset = () => { setTotalSMV(''); setWorkers(''); setMinutes(''); setTarget(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('totalSMV')}  value={totalSMV} onChange={setTotalSMV} placeholder="8400" />
        <InputField label={t('workers')}   value={workers}  onChange={setWorkers}  placeholder="30" />
        <InputField label={t('minutes')}   value={minutes}  onChange={setMinutes}  unit="min" placeholder="480" />
        <InputField label={t('targetEff')} value={target}   onChange={setTarget}   unit="%" placeholder="80" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('effResult')} value={eff} unit="%" />
        <FormulaBox formula={`Efficiency (%) = [Total SMV ÷ (Workers × Minutes × Target%)] × 100`} />
      </ResultPanel>
    </>
  );
}

// ─── Fabric Consumption Calculator ────────────────────────────────────────────
function FabricConsumptionCalc() {
  const { t } = useLang();
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [allowL, setAllowL]     = useState('');
  const [allowW, setAllowW]     = useState('');
  const [gsm, setGsm]           = useState('');

  const v = [length, width, allowL, allowW, gsm].map(parseFloat);
  const valid = v.every((x) => !isNaN(x)) && parseFloat(gsm) > 0;
  const consum = valid ? garments.fabricConsumption(...v) : null;

  const reset = () => { setLength(''); setWidth(''); setAllowL(''); setAllowW(''); setGsm(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('length')}   value={length} onChange={setLength} unit="cm" placeholder="70" />
        <InputField label={t('width')}    value={width}  onChange={setWidth}  unit="cm" placeholder="56" />
        <InputField label={`${t('allowance')} (L)`} value={allowL} onChange={setAllowL} unit="cm" placeholder="5" />
        <InputField label={`${t('allowance')} (W)`} value={allowW} onChange={setAllowW} unit="cm" placeholder="5" />
        <InputField label={t('gsm')}      value={gsm}    onChange={setGsm}    unit="g/m²" placeholder="180" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('consumResult')} value={consum} unit="kg" />
        <FormulaBox formula={`Consumption (kg) =\n(Length + Allow) × (Width + Allow) × GSM ÷ 10,000,000`} />
      </ResultPanel>
    </>
  );
}

// ─── SMV to Pieces/Hour Calculator ───────────────────────────────────────────
function SMVCalc() {
  const { t } = useLang();
  const [smv, setSmv] = useState('');

  const smv_ = parseFloat(smv);
  const valid = smv_ > 0;
  const pieces = valid ? garments.piecesPerHour(smv_) : null;

  const reset = () => setSmv('');

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('smv')} value={smv} onChange={setSmv} unit="min" placeholder="1.5" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('piecesResult')} value={pieces} unit="pcs/hr" />
        <FormulaBox formula="Pieces/Hour = 60 ÷ SMV" />
      </ResultPanel>
    </>
  );
}

// ─── Garments Page ────────────────────────────────────────────────────────────
export default function Garments() {
  const [activeTab, setActiveTab] = useState('eff');

  return (
    <CalcPage
      icon={Shirt}
      titleKey="garmentsTitle"
      descKey="garmentsDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'eff'    && <LineEfficiencyCalc />}
      {activeTab === 'consum' && <FabricConsumptionCalc />}
      {activeTab === 'smv'    && <SMVCalc />}
    </CalcPage>
  );
}
