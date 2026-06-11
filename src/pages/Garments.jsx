import { useState } from 'react';
import { Shirt } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CalcPage, { CalcCard, CardInputs, CardResults } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { garments } from '../utils/formulas';
import { useAutoHistory } from '../hooks/useAutoHistory';

const TABS = [
  { id: 'efficiency',  labelKey: 'lineEfficiencyTab' },
  { id: 'consumption', labelKey: 'consumptionTab'    },
  { id: 'target',      labelKey: 'targetTab'         },
];

// ─── Efficiency Tab ───────────────────────────────────────────────────────────
function EfficiencyTab() {
  const { t } = useLang();
  const [tSMV,setTSMV]=useState(''); const [wrk,setWrk]=useState(''); const [min,setMin]=useState(''); const [tgt,setTgt]=useState('');
  const [smv,setSmv]=useState('');
  const [act,setAct]=useState(''); const [tgtPcs,setTgtPcs]=useState('');
  const [eff2,setEff2]=useState(''); const [wrk2,setWrk2]=useState(''); const [hrs2,setHrs2]=useState(''); const [smv2,setSmv2]=useState('');

  const effV    = [tSMV,wrk,min,tgt].every(v=>parseFloat(v)>0) ? garments.lineEfficiency(...[tSMV,wrk,min,tgt].map(parseFloat)) : null;
  const pcsV    = parseFloat(smv)>0 ? garments.piecesPerHour(parseFloat(smv)) : null;
  const opEffV  = parseFloat(act)>0 && parseFloat(tgtPcs)>0 ? garments.operatorEfficiency(parseFloat(act), parseFloat(tgtPcs)) : null;
  const capV    = [eff2,wrk2,hrs2,smv2].every(v=>parseFloat(v)>0) ? garments.lineCapacity(parseFloat(eff2), parseFloat(wrk2), parseFloat(hrs2), parseFloat(smv2)) : null;

  useAutoHistory({ calcId:'gm-eff', calcName:'Line Efficiency', category:'garments', page:'/garments', tabId:'efficiency',
    resultLabel:'Efficiency', resultValue:effV, resultUnit:'%' });

  return (
    <>
      <CalcCard titleKey="lineEfficiency">
        <CardInputs onReset={()=>{setTSMV('');setWrk('');setMin('');setTgt('');}}>
          <InputField label={t('totalSMV')}  value={tSMV} onChange={setTSMV} placeholder="8400" />
          <InputField label={t('workers')}   value={wrk}  onChange={setWrk}  placeholder="30" />
          <InputField label={t('minutes')}   value={min}  onChange={setMin}  unit="min" placeholder="480" />
          <InputField label={t('targetEff')} value={tgt}  onChange={setTgt}  unit="%" placeholder="80" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('effResult')} value={effV} unit="%" />
          <FormulaBox formula="Eff% = (Total SMV ÷ (Workers × Minutes × Target%)) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="piecesPerHour">
        <CardInputs onReset={()=>{setSmv('');}}>
          <InputField label={t('smv')} value={smv} onChange={setSmv} unit="min" placeholder="1.5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('piecesResult')} value={pcsV} unit="pcs/hr" />
          <FormulaBox formula="Pieces/Hour = 60 ÷ SMV" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="operatorEfficiency">
        <CardInputs onReset={()=>{setAct('');setTgtPcs('');}}>
          <InputField label={t('actualPcs')} value={act}    onChange={setAct}    placeholder="320" />
          <InputField label={t('targetPcs')} value={tgtPcs} onChange={setTgtPcs} placeholder="400" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('opEffResult')} value={opEffV} unit="%" />
          <FormulaBox formula="Op Eff% = (Actual ÷ Target) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="lineCapacity">
        <CardInputs onReset={()=>{setEff2('');setWrk2('');setHrs2('');setSmv2('');}}>
          <InputField label={t('efficiency')} value={eff2} onChange={setEff2} unit="%" placeholder="75" />
          <InputField label={t('workers')}    value={wrk2} onChange={setWrk2} placeholder="30" />
          <InputField label={t('hoursDay')}   value={hrs2} onChange={setHrs2} unit="hrs" placeholder="8" />
          <InputField label={t('smv')}        value={smv2} onChange={setSmv2} unit="min" placeholder="1.5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('lineCapResult')} value={capV} unit="pcs/day" />
          <FormulaBox formula="Capacity = (Eff% × Workers × Hrs × 60) ÷ (SMV × 100)" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Consumption Tab ──────────────────────────────────────────────────────────
function ConsumptionTab() {
  const { t } = useLang();
  const [len,setLen]=useState(''); const [wid,setWid]=useState('');
  const [alL,setAlL]=useState(''); const [alW,setAlW]=useState(''); const [gsm,setGsm]=useState('');
  const [cut,setCut]=useState(''); const [sew,setSew]=useState(''); const [fin,setFin]=useState('');
  const [fabCM,setFabCM]=useState(''); const [labCM,setLabCM]=useState(''); const [ohCM,setOhCM]=useState('');
  const [profCM,setProfCM]=useState('');
  const [qty,setQty]=useState(''); const [gsmR,setGsmR]=useState(''); const [widR,setWidR]=useState('');

  const consV  = [len,wid,alL,alW,gsm].every(v=>!isNaN(parseFloat(v))) && parseFloat(gsm)>0
    ? garments.fabricConsumption(parseFloat(len),parseFloat(wid),parseFloat(alL),parseFloat(alW),parseFloat(gsm)) : null;
  const costV  = [cut,sew,fin].every(v=>parseFloat(v)>0) ? garments.cmt(parseFloat(cut),parseFloat(sew),parseFloat(fin)) : null;
  const cmV    = [fabCM,labCM,ohCM,profCM].every(v=>parseFloat(v)>=0)
    ? garments.cm(parseFloat(fabCM),parseFloat(labCM),parseFloat(ohCM),parseFloat(profCM)) : null;
  const yardV  = [qty,gsmR,widR].every(v=>parseFloat(v)>0) ? garments.fabricReqYards(parseFloat(qty),parseFloat(gsmR),parseFloat(widR)) : null;

  useAutoHistory({ calcId:'gm-cons', calcName:'Fabric Consumption', category:'garments', page:'/garments', tabId:'consumption',
    resultLabel:'Consumption', resultValue:consV, resultUnit:'kg' });

  return (
    <>
      <CalcCard titleKey="fabricConsumption">
        <CardInputs onReset={()=>{setLen('');setWid('');setAlL('');setAlW('');setGsm('');}}>
          <InputField label={t('length')}  value={len} onChange={setLen} unit="cm" placeholder="70" />
          <InputField label={t('width')}   value={wid} onChange={setWid} unit="cm" placeholder="56" />
          <InputField label={`${t('allowance')} (L)`} value={alL} onChange={setAlL} unit="cm" placeholder="5" />
          <InputField label={`${t('allowance')} (W)`} value={alW} onChange={setAlW} unit="cm" placeholder="5" />
          <InputField label={t('gsm')}     value={gsm} onChange={setGsm} unit="g/m²" placeholder="180" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('consumResult')} value={consV} unit="kg" />
          <FormulaBox formula="Consumption = (L+Allow) × (W+Allow) × GSM ÷ 10,000,000" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="cmtCost">
        <CardInputs onReset={()=>{setCut('');setSew('');setFin('');}}>
          <InputField label={t('cuttingCost')} value={cut} onChange={setCut} unit="৳" placeholder="5" />
          <InputField label={t('sewingCost')}  value={sew} onChange={setSew} unit="৳" placeholder="25" />
          <InputField label={t('finishCost')}  value={fin} onChange={setFin} unit="৳" placeholder="8" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('cmtResult')} value={costV} unit="৳" />
          <FormulaBox formula="CMT = Cutting + Sewing + Finishing" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="cmCost">
        <CardInputs onReset={()=>{setFabCM('');setLabCM('');setOhCM('');setProfCM('');}}>
          <InputField label={t('fabricCost')} value={fabCM}  onChange={setFabCM}  unit="৳" placeholder="120" />
          <InputField label={t('labourCost')} value={labCM}  onChange={setLabCM}  unit="৳" placeholder="30" />
          <InputField label={t('overheadCost')}value={ohCM}  onChange={setOhCM}  unit="৳" placeholder="10" />
          <InputField label={t('profitPct')}  value={profCM} onChange={setProfCM} unit="%" placeholder="15" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('cmResult')} value={cmV} unit="৳" />
          <FormulaBox formula="CM = (Fabric + Labour + Overhead) × (1 + Profit%/100)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="fabricReqYards">
        <CardInputs onReset={()=>{setQty('');setGsmR('');setWidR('');}}>
          <InputField label={t('qtyPcs')}      value={qty}  onChange={setQty}  unit="pcs" placeholder="1000" />
          <InputField label={t('gsmForFabReq')}value={gsmR} onChange={setGsmR} unit="g/m²" placeholder="180" />
          <InputField label={t('widthYards')}  value={widR} onChange={setWidR} unit="in" placeholder="60" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('fabReqResult')} value={yardV} unit="yards" />
          <FormulaBox formula="Yards = (Qty × GSM × Width) ÷ constant" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Target & Planning Tab ────────────────────────────────────────────────────
function TargetTab() {
  const { t } = useLang();
  const [wrkT,setWrkT]=useState(''); const [hrsT,setHrsT]=useState(''); const [smvT,setSmvT]=useState(''); const [effT,setEffT]=useState('');
  const [saleP,setSaleP]=useState(''); const [costP,setCostP]=useState('');
  const [attD,setAttD]=useState(''); const [totW,setTotW]=useState('');
  const [minT,setMinT]=useState(''); const [smvMin,setSmvMin]=useState('');

  const tgtV   = [wrkT,hrsT,smvT,effT].every(v=>parseFloat(v)>0) ? garments.dailyTarget(parseFloat(wrkT),parseFloat(hrsT),parseFloat(smvT),parseFloat(effT)) : null;
  const netPV  = parseFloat(saleP)>0 && parseFloat(costP)>0 ? garments.netProfit(parseFloat(saleP),parseFloat(costP)) : null;
  const attV   = parseFloat(attD)>0 && parseFloat(totW)>0 ? garments.attendancePct(parseFloat(attD),parseFloat(totW)) : null;
  const minPV  = parseFloat(minT)>0 && parseFloat(smvMin)>0 ? garments.minutesProduced(parseFloat(minT),parseFloat(smvMin)) : null;

  useAutoHistory({ calcId:'gm-tgt', calcName:'Daily Target', category:'garments', page:'/garments', tabId:'target',
    resultLabel:'Target', resultValue:tgtV, resultUnit:'pcs' });

  return (
    <>
      <CalcCard titleKey="dailyTarget">
        <CardInputs onReset={()=>{setWrkT('');setHrsT('');setSmvT('');setEffT('');}}>
          <InputField label={t('workers')}   value={wrkT} onChange={setWrkT} placeholder="30" />
          <InputField label={t('hoursDay')}  value={hrsT} onChange={setHrsT} unit="hrs" placeholder="8" />
          <InputField label={t('smv')}       value={smvT} onChange={setSmvT} unit="min" placeholder="1.5" />
          <InputField label={t('efficiency')}value={effT} onChange={setEffT} unit="%" placeholder="75" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('dailyTgtResult')} value={tgtV} unit="pcs" />
          <FormulaBox formula="Target = (Workers × Hrs × 60 × Eff%) ÷ (SMV × 100)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="netProfit">
        <CardInputs onReset={()=>{setSaleP('');setCostP('');}}>
          <InputField label={t('salePrice')} value={saleP} onChange={setSaleP} unit="৳" placeholder="500" />
          <InputField label={t('costPrice')} value={costP} onChange={setCostP} unit="৳" placeholder="380" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('netProfitResult')} value={netPV} unit="%" />
          <FormulaBox formula="Net Profit% = ((Sale - Cost) ÷ Sale) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="attendancePct">
        <CardInputs onReset={()=>{setAttD('');setTotW('');}}>
          <InputField label={t('presentWorkers')} value={attD} onChange={setAttD} placeholder="28" />
          <InputField label={t('totalWorkers')}   value={totW} onChange={setTotW} placeholder="30" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('attResult')} value={attV} unit="%" />
          <FormulaBox formula="Attendance% = (Present ÷ Total) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="minutesProduced">
        <CardInputs onReset={()=>{setMinT('');setSmvMin('');}}>
          <InputField label={t('piecesProduced')} value={minT}   onChange={setMinT}   placeholder="320" />
          <InputField label={t('smv')}             value={smvMin} onChange={setSmvMin} unit="min" placeholder="1.5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('minsProdResult')} value={minPV} unit="mins" />
          <FormulaBox formula="Minutes Produced = Pieces × SMV" />
        </CardResults>
      </CalcCard>
    </>
  );
}

export default function Garments() {
  const location = useLocation();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'efficiency');

  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }

  return (
    <CalcPage icon={Shirt} titleKey="garmentsTitle" descKey="garmentsDesc2"
      tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} calcPrefix="gm">
      {activeTab === 'efficiency'  && <EfficiencyTab />}
      {activeTab === 'consumption' && <ConsumptionTab />}
      {activeTab === 'target'      && <TargetTab />}
    </CalcPage>
  );
}
