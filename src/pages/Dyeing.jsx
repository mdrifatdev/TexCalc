import { useState } from 'react';
import { Droplets } from 'lucide-react';
import CalcPage, { InputPanel, ResultPanel } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { dyeing } from '../utils/formulas';

const TABS = [
  { id: 'lr',   labelKey: 'liquorRatio' },
  { id: 'chem', labelKey: 'chemDosing' },
  { id: 'salt', labelKey: 'saltCalc' },
];

// ─── Liquor Ratio Calculator ──────────────────────────────────────────────────
function LiquorRatioCalc() {
  const { t } = useLang();
  const [water, setWater]   = useState('');
  const [fabric, setFabric] = useState('');

  const w_ = parseFloat(water), f_ = parseFloat(fabric);
  const valid = w_ > 0 && f_ > 0;
  const lr = valid ? dyeing.liquorRatio(w_, f_) : null;

  const reset = () => { setWater(''); setFabric(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('waterL')}   value={water}  onChange={setWater}  unit="L"  placeholder="500" />
        <InputField label={t('fabricKg')} value={fabric} onChange={setFabric} unit="kg" placeholder="50" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('lrResult')} value={lr} unit=":1" />
        <FormulaBox formula="Liquor Ratio = Water (L) ÷ Fabric (kg)" />
      </ResultPanel>
    </>
  );
}

// ─── Chemical Dosing Calculator ───────────────────────────────────────────────
function ChemDosingCalc() {
  const { t } = useLang();
  const [percent, setPercent] = useState('');
  const [fabric, setFabric]   = useState('');
  const [lr, setLr]           = useState('');

  const p_ = parseFloat(percent), f_ = parseFloat(fabric), lr_ = parseFloat(lr);
  const valid = p_ >= 0 && f_ > 0 && lr_ > 0;
  const chem = valid ? dyeing.chemDosing(p_, f_, lr_) : null;

  const reset = () => { setPercent(''); setFabric(''); setLr(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('chemPercent')} value={percent} onChange={setPercent} unit="%" placeholder="2" />
        <InputField label={t('fabricKg')}    value={fabric}  onChange={setFabric}  unit="kg" placeholder="50" />
        <InputField label={t('lrResult')}    value={lr}      onChange={setLr}      placeholder="10" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('chemResult')} value={chem} unit="g" />
        <FormulaBox formula="Chemical (g) = (% × Fabric kg × LR) ÷ 100" />
      </ResultPanel>
    </>
  );
}

// ─── Salt Calculation ─────────────────────────────────────────────────────────
function SaltCalc() {
  const { t } = useLang();
  const [salt, setSalt]   = useState('');
  const [water, setWater] = useState('');

  const s_ = parseFloat(salt), w_ = parseFloat(water);
  const valid = s_ >= 0 && w_ > 0;
  const conc = valid ? dyeing.saltConcentration(s_, w_) : null;

  const reset = () => { setSalt(''); setWater(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('requiredSalt')} value={salt}  onChange={setSalt}  unit="g" placeholder="5000" />
        <InputField label={t('totalWater')}   value={water} onChange={setWater} unit="L" placeholder="500" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('saltResult')} value={conc} unit="g/L" />
        <FormulaBox formula="Salt (g/L) = Required Salt (g) ÷ Total Water (L)" />
      </ResultPanel>
    </>
  );
}

// ─── Dyeing Page ──────────────────────────────────────────────────────────────
export default function Dyeing() {
  const [activeTab, setActiveTab] = useState('lr');

  return (
    <CalcPage
      icon={Droplets}
      titleKey="dyeingTitle"
      descKey="dyeingDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'lr'   && <LiquorRatioCalc />}
      {activeTab === 'chem' && <ChemDosingCalc />}
      {activeTab === 'salt' && <SaltCalc />}
    </CalcPage>
  );
}
