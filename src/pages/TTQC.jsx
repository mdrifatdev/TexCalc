import { useState, useEffect } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CalcPage, { InputPanel, ResultPanel, CalcCard, CardInputs, CardResults } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { ttqc, getAQLResult } from '../utils/formulas';
import { useAutoHistory } from '../hooks/useAutoHistory';

const TABS = [
  { id: 'aql',     labelKey: 'aqlCalc'    },
  { id: 'defect',  labelKey: 'defectTab'  },
  { id: 'quality', labelKey: 'qualityQTab'},
  { id: 'fabric',  labelKey: 'fabricQTab' },
];

const AQL_LEVELS = ['1.0', '1.5', '2.5', '4.0'];

// ─── AQL Tab ──────────────────────────────────────────────────────────────────
function AQLTab() {
  const { t } = useLang();
  const [lotSize, setLotSize] = useState('');
  const [aqlLevel, setAqlLevel] = useState('2.5');
  const [inspLevel, setInspLevel] = useState('G2');

  const result = lotSize ? getAQLResult(lotSize, aqlLevel, inspLevel) : null;

  useAutoHistory({ calcId:'tt-aql', calcName:'AQL Sample Size', category:'ttqc', page:'/ttqc', tabId:'aql',
    resultLabel:'Sample', resultValue: result?.sample ?? null, resultUnit:'pcs' });

  return (
    <>
      <InputPanel onReset={() => { setLotSize(''); setAqlLevel('2.5'); }}>
        <InputField label={t('lotSize')} value={lotSize} onChange={setLotSize} unit="pcs" placeholder="5000" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-light-muted dark:text-dark-muted">{t('aqlLevel')}</label>
          <select value={aqlLevel} onChange={(e) => setAqlLevel(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200">
            {AQL_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-light-muted dark:text-dark-muted">{t('inspLevel')}</label>
          <select value={inspLevel} onChange={(e) => setInspLevel(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200">
            {['G1','G2','G3'].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </InputPanel>
      <ResultPanel>
        <ResultCard label={t('sampleSize')} value={result?.sample ?? null} unit="pcs" />
        <ResultCard label={t('acceptNum')}  value={result?.accept ?? null} />
        <ResultCard label={t('rejectNum')}  value={result?.reject ?? null} />
        <FormulaBox formula={`ISO 2859-1 AQL Standard\nLot Range: ${result?.range ?? '—'}\nInspection Level: ${inspLevel}`} />
      </ResultPanel>
    </>
  );
}

// ─── Defect Tab ───────────────────────────────────────────────────────────────
function DefectTab() {
  const { t } = useLang();
  const [def,setDef]=useState(''); const [insp,setInsp]=useState('');
  const [defects,setDefects]=useState(''); const [insp2,setInsp2]=useState('');
  const [total,setTotal]=useState(''); const [pass,setPass]=useState('');
  const [critD,setCritD]=useState(''); const [majorD,setMajorD]=useState(''); const [minorD,setMinorD]=useState('');

  const drV    = parseFloat(def)>=0 && parseFloat(insp)>0 ? ttqc.defectRate(parseFloat(def), parseFloat(insp)) : null;
  const dhuV   = parseFloat(defects)>=0 && parseFloat(insp2)>0 ? ttqc.dhu(parseFloat(defects), parseFloat(insp2)) : null;
  const passV  = parseFloat(total)>0 && parseFloat(pass)>0 ? ttqc.passRate(parseFloat(pass), parseFloat(total)) : null;
  const wDhuV  = [critD,majorD,minorD].every(v=>parseFloat(v)>=0) && parseFloat(insp)>0
    ? ttqc.weightedDHU(parseFloat(critD), parseFloat(majorD), parseFloat(minorD), parseFloat(insp)) : null;

  useAutoHistory({ calcId:'tt-def', calcName:'Defect Rate', category:'ttqc', page:'/ttqc', tabId:'defect',
    resultLabel:'Defect%', resultValue:drV, resultUnit:'%' });

  return (
    <>
      <CalcCard titleKey="defectRate">
        <CardInputs onReset={()=>{setDef('');setInsp('');}}>
          <InputField label={t('defectivePcs')}  value={def}  onChange={setDef}  unit="pcs" placeholder="15" />
          <InputField label={t('totalInspected')}value={insp} onChange={setInsp} unit="pcs" placeholder="500" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('defectRateResult')} value={drV} unit="%" />
          <FormulaBox formula="Defect% = (Defective ÷ Total) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="dhuCalc">
        <CardInputs onReset={()=>{setDefects('');setInsp2('');}}>
          <InputField label={t('totalDefects')}  value={defects} onChange={setDefects} placeholder="42" />
          <InputField label={t('totalInspected')}value={insp2}   onChange={setInsp2}   unit="pcs" placeholder="200" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('dhuResult')} value={dhuV} />
          <FormulaBox formula="DHU = (Total Defects ÷ Total Inspected) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="passRate">
        <CardInputs onReset={()=>{setTotal('');setPass('');}}>
          <InputField label={t('passPcs')}  value={pass}  onChange={setPass}  unit="pcs" placeholder="485" />
          <InputField label={t('totalPcs')} value={total} onChange={setTotal} unit="pcs" placeholder="500" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('passRateResult')} value={passV} unit="%" />
          <FormulaBox formula="Pass% = (Pass Pcs ÷ Total) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="weightedDHU">
        <CardInputs onReset={()=>{setCritD('');setMajorD('');setMinorD('');}}>
          <InputField label={t('criticalDefects')} value={critD}  onChange={setCritD}  placeholder="2" />
          <InputField label={t('majorDefects')}    value={majorD} onChange={setMajorD} placeholder="10" />
          <InputField label={t('minorDefects')}    value={minorD} onChange={setMinorD} placeholder="30" />
          <p className="text-xs text-light-muted dark:text-dark-muted">{t('usesInspectedCount')} ({insp || '—'} pcs)</p>
        </CardInputs>
        <CardResults>
          <ResultCard label={t('wDhuResult')} value={wDhuV} />
          <FormulaBox formula="W-DHU = ((C×3 + M×1.5 + m×1) ÷ Inspected) × 100" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Quality Audit Tab ────────────────────────────────────────────────────────
function QualityTab() {
  const { t } = useLang();
  const [found,setFound]=useState(''); const [poss,setPoss]=useState('');
  const [smpSz,setSmpSz]=useState(''); const [defF,setDefF]=useState('');
  const [pVal,setPVal]=useState(''); const [qVal,setQVal]=useState('');
  const [sigma,setSigma]=useState('');

  const auditV = parseFloat(found)>=0 && parseFloat(poss)>0 ? ttqc.auditScore(parseFloat(found), parseFloat(poss)) : null;
  const cpkV   = parseFloat(sigma)>0 ? ttqc.cpk(parseFloat(sigma)) : null;
  const dpmoV  = parseFloat(smpSz)>0 && parseFloat(defF)>=0 ? ttqc.dpmo(parseFloat(defF), parseFloat(smpSz)) : null;
  const yieldV = parseFloat(dpmoV)!=null ? ttqc.firstPassYield(dpmoV) : null;
  const pqV    = parseFloat(pVal)>0 && parseFloat(qVal)>0 ? ttqc.pq(parseFloat(pVal), parseFloat(qVal)) : null;

  useAutoHistory({ calcId:'tt-aud', calcName:'Audit Score', category:'ttqc', page:'/ttqc', tabId:'quality',
    resultLabel:'Audit%', resultValue:auditV, resultUnit:'%' });

  return (
    <>
      <CalcCard titleKey="auditScore">
        <CardInputs onReset={()=>{setFound('');setPoss('');}}>
          <InputField label={t('defectsFound')}   value={found} onChange={setFound} placeholder="5" />
          <InputField label={t('possibleDefects')}value={poss}  onChange={setPoss}  placeholder="100" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('auditResult')} value={auditV} unit="%" />
          <FormulaBox formula="Audit% = (1 - Found ÷ Possible) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="dpmo">
        <CardInputs onReset={()=>{setSmpSz('');setDefF('');}}>
          <InputField label={t('sampleSizeDPMO')} value={smpSz} onChange={setSmpSz} placeholder="500" />
          <InputField label={t('defectsFoundD')}  value={defF}  onChange={setDefF}  placeholder="3" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('dpmoResult')}   value={dpmoV}  />
          <ResultCard label={t('fpyResult')}    value={yieldV} unit="%" />
          <FormulaBox formula={`DPMO = (Defects ÷ Sample) × 1,000,000\nFPY  = (1 - DPMO/1,000,000) × 100`} />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="cpkCalc">
        <CardInputs onReset={()=>{setSigma('');}}>
          <InputField label={t('sigmaLevel')} value={sigma} onChange={setSigma} placeholder="3" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('cpkResult')} value={cpkV} />
          <FormulaBox formula="Cpk ≈ Sigma Level ÷ 3" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="pqCalc">
        <CardInputs onReset={()=>{setPVal('');setQVal('');}}>
          <InputField label={t('qualityPoint')}   value={pVal} onChange={setPVal} placeholder="8" />
          <InputField label={t('quantityPoint')}  value={qVal} onChange={setQVal} placeholder="9" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('pqResult')} value={pqV} />
          <FormulaBox formula="PQ Score = (Quality + Quantity) ÷ 2" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Fabric 4-Point Tab ───────────────────────────────────────────────────────
function FabricTab() {
  const { t } = useLang();
  const [pts,setPts]=useState(''); const [yd2,setYd2]=useState('');
  const [pts2,setPts2]=useState(''); const [linYd,setLinYd]=useState(''); const [fabW,setFabW]=useState('');
  const [fabW2,setFabW2]=useState(''); const [gsm,setGsm]=useState('');

  const fp4V  = parseFloat(pts)>=0 && parseFloat(yd2)>0 ? ttqc.fabric4point(parseFloat(pts), parseFloat(yd2)) : null;
  const fp100V= [pts2,linYd,fabW].every(v=>parseFloat(v)>0) ? ttqc.fabric4pointPer100m(parseFloat(pts2), parseFloat(linYd), parseFloat(fabW)) : null;
  const gradeV= fp4V != null ? ttqc.gradeFromPoints(fp4V) : null;
  const gsm4V = parseFloat(fabW2)>0 && parseFloat(gsm)>0 ? ttqc.fabricGradeByGSM(parseFloat(gsm)) : null;

  useAutoHistory({ calcId:'tt-fab', calcName:'Fabric 4-Point', category:'ttqc', page:'/ttqc', tabId:'fabric',
    resultLabel:'Points/100yd²', resultValue:fp4V, resultUnit:'' });

  return (
    <>
      <CalcCard titleKey="fabric4Point">
        <CardInputs onReset={()=>{setPts('');setYd2('');}}>
          <InputField label={t('totalPoints')} value={pts}  onChange={setPts}  placeholder="48" />
          <InputField label={t('yardInspected')}value={yd2} onChange={setYd2}  unit="yd²" placeholder="100" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('fp4Result')}   value={fp4V}   unit="pts/100yd²" />
          <ResultCard label={t('fp4GradeResult')} value={gradeV} />
          <FormulaBox formula="Points/100yd² = (Total Points ÷ Yards Inspected) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="fabric4PointPer100m">
        <CardInputs onReset={()=>{setPts2('');setLinYd('');setFabW('');}}>
          <InputField label={t('totalPoints')}  value={pts2}  onChange={setPts2}  placeholder="60" />
          <InputField label={t('linearYards')}  value={linYd} onChange={setLinYd} unit="yds" placeholder="50" />
          <InputField label={t('fabricWidth')}  value={fabW}  onChange={setFabW}  unit="in"  placeholder="60" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('fp100mResult')} value={fp100V} unit="pts/100m" />
          <FormulaBox formula="Per 100m = (Pts × 1000) ÷ (Linear yd × Width in × 0.00254)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="fabricGradeGSM">
        <CardInputs onReset={()=>{setFabW2('');setGsm('');}}>
          <InputField label={t('fabricWeight')} value={fabW2} onChange={setFabW2} unit="kg" placeholder="50" />
          <InputField label={t('gsmForGrade')}  value={gsm}   onChange={setGsm}   unit="g/m²" placeholder="180" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('gsmGradeResult')} value={gsm4V} />
          <FormulaBox formula="Grade based on GSM range: Light/Medium/Heavy" />
        </CardResults>
      </CalcCard>
    </>
  );
}

export default function TTQC() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'aql');
  useEffect(() => { if (location.state?.tab) setActiveTab(location.state.tab); }, [location.state]);

  return (
    <CalcPage icon={ClipboardCheck} titleKey="ttqcTitle" descKey="ttqcDesc2"
      tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} calcPrefix="tt">
      {activeTab === 'aql'     && <AQLTab />}
      {activeTab === 'defect'  && <DefectTab />}
      {activeTab === 'quality' && <QualityTab />}
      {activeTab === 'fabric'  && <FabricTab />}
    </CalcPage>
  );
}
