import { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import CalcPage, { InputPanel, ResultPanel } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { ttqc, getAQLResult } from '../utils/formulas';

const TABS = [
  { id: 'aql',     labelKey: 'aqlCalc' },
  { id: 'defect',  labelKey: 'defectRate' },
  { id: 'dhu',     labelKey: 'dhuCalc' },
];

const AQL_LEVELS = ['1.0', '1.5', '2.5', '4.0'];

// ─── AQL Calculator ───────────────────────────────────────────────────────────
function AQLCalc() {
  const { t } = useLang();
  const [lotSize, setLotSize]   = useState('');
  const [aqlLevel, setAqlLevel] = useState('2.5');

  const result = lotSize ? getAQLResult(lotSize, aqlLevel) : null;

  const reset = () => { setLotSize(''); setAqlLevel('2.5'); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField
          label={t('lotSize')}
          value={lotSize}
          onChange={setLotSize}
          unit="pcs"
          placeholder="5000"
        />
        {/* AQL Level dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-light-muted dark:text-dark-muted transition-colors duration-200">
            {t('aqlLevel')}
          </label>
          <select
            value={aqlLevel}
            onChange={(e) => setAqlLevel(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
          >
            {AQL_LEVELS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('sampleSize')} value={result ? result.sample : null} unit="pcs" />
        <ResultCard label={t('acceptNum')}  value={result ? result.accept : null} />
        <ResultCard label={t('rejectNum')}  value={result ? result.reject : null} />
        <FormulaBox formula={`ISO 2859-1 AQL Standard Table\nLot Range: ${result ? result.range : '—'}`} />
      </ResultPanel>
    </>
  );
}

// ─── Defect Rate Calculator ───────────────────────────────────────────────────
function DefectRateCalc() {
  const { t } = useLang();
  const [defective, setDefective]   = useState('');
  const [inspected, setInspected]   = useState('');

  const d_ = parseFloat(defective), i_ = parseFloat(inspected);
  const valid = d_ >= 0 && i_ > 0;
  const rate = valid ? ttqc.defectRate(d_, i_) : null;

  const reset = () => { setDefective(''); setInspected(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('defectivePcs')}  value={defective} onChange={setDefective} unit="pcs" placeholder="15" />
        <InputField label={t('totalInspected')} value={inspected} onChange={setInspected} unit="pcs" placeholder="500" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('defectRateResult')} value={rate} unit="%" />
        <FormulaBox formula="Defect% = (Defective ÷ Total Inspected) × 100" />
      </ResultPanel>
    </>
  );
}

// ─── DHU Calculator ───────────────────────────────────────────────────────────
function DHUCalc() {
  const { t } = useLang();
  const [defects, setDefects]   = useState('');
  const [inspected, setInspected] = useState('');

  const d_ = parseFloat(defects), i_ = parseFloat(inspected);
  const valid = d_ >= 0 && i_ > 0;
  const dhu = valid ? ttqc.dhu(d_, i_) : null;

  const reset = () => { setDefects(''); setInspected(''); };

  return (
    <>
      <InputPanel onReset={reset}>
        <InputField label={t('totalDefects')}   value={defects}   onChange={setDefects}   placeholder="42" />
        <InputField label={t('totalInspected')} value={inspected} onChange={setInspected} unit="pcs" placeholder="200" />
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('dhuResult')} value={dhu} />
        <FormulaBox formula="DHU = (Total Defects ÷ Total Inspected) × 100" />
      </ResultPanel>
    </>
  );
}

// ─── TTQC Page ────────────────────────────────────────────────────────────────
export default function TTQC() {
  const [activeTab, setActiveTab] = useState('aql');

  return (
    <CalcPage
      icon={ClipboardCheck}
      titleKey="ttqcTitle"
      descKey="ttqcDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'aql'    && <AQLCalc />}
      {activeTab === 'defect' && <DefectRateCalc />}
      {activeTab === 'dhu'    && <DHUCalc />}
    </CalcPage>
  );
}
