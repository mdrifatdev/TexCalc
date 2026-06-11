import { useState } from 'react';
import { Grid3x3 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CalcPage, { CalcCard, CardInputs, CardResults } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { weaving } from '../utils/formulas';
import { useAutoHistory } from '../hooks/useAutoHistory';

const TABS = [
  { id: 'gsm',        labelKey: 'gsmCoverTab'  },
  { id: 'dimension',  labelKey: 'dimensionTab'  },
  { id: 'efficiency', labelKey: 'effProdTab'    },
];

// ─── GSM & Cover Tab ──────────────────────────────────────────────────────────
function GSMCoverTab() {
  const { t } = useLang();
  const [epi,setEpi]=useState(''); const [wNe,setWNe]=useState('');
  const [ppi,setPpi]=useState(''); const [vtNe,setVtNe]=useState('');
  const [cmp,setCmp]=useState('');
  const [epiC,setEpiC]=useState(''); const [epd,setEpd]=useState('');
  const [epiCF,setEpiCF]=useState(''); const [wNeC,setWNeC]=useState('');
  const [ppiCF,setPpiCF]=useState(''); const [vtNeC,setVtNeC]=useState('');

  const gsmV = [epi,wNe,ppi,vtNe,cmp].every(v=>parseFloat(v)>0)
    ? weaving.gsm(...[epi,wNe,ppi,vtNe,cmp].map(parseFloat)) : null;
  const reedV = parseFloat(epiC)>0 && parseFloat(epd)>0
    ? weaving.reedCount(parseFloat(epiC), parseFloat(epd)) : null;
  const coverV = [epiCF,wNeC,ppiCF,vtNeC].every(v=>parseFloat(v)>0)
    ? weaving.coverFactor(...[epiCF,wNeC,ppiCF,vtNeC].map(parseFloat)) : null;

  useAutoHistory({ calcId:'wv-gsm', calcName:'Weaving GSM', category:'weaving', page:'/weaving', tabId:'gsm',
    resultLabel:'GSM', resultValue:gsmV, resultUnit:'g/m²' });

  return (
    <>
      <CalcCard titleKey="gsmCalc">
        <CardInputs onReset={() => { setEpi('');setWNe('');setPpi('');setVtNe('');setCmp(''); }}>
          <InputField label={t('epi')}        value={epi}  onChange={setEpi}  unit="EPI" placeholder="60" />
          <InputField label={t('warpCount')}  value={wNe}  onChange={setWNe}  unit="Ne"  placeholder="40" />
          <InputField label={t('ppi')}        value={ppi}  onChange={setPpi}  unit="PPI" placeholder="56" />
          <InputField label={t('weftCount')}  value={vtNe} onChange={setVtNe} unit="Ne"  placeholder="40" />
          <InputField label={t('crimpFactor')}value={cmp}  onChange={setCmp}  placeholder="1.03" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('gsmResult')} value={gsmV} unit="g/m²" />
          <FormulaBox formula="GSM = (EPI/Warp Ne + PPI/Weft Ne) × 25.6 × Crimp" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="reedCount">
        <CardInputs onReset={() => { setEpiC('');setEpd(''); }}>
          <InputField label={t('epi')}         value={epiC} onChange={setEpiC} unit="EPI" placeholder="60" />
          <InputField label={t('endsPerDent')}  value={epd}  onChange={setEpd}  placeholder="2" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('reedResult')} value={reedV} />
          <FormulaBox formula="Reed Count = EPI ÷ Ends Per Dent" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="coverFactor">
        <CardInputs onReset={() => { setEpiCF('');setWNeC('');setPpiCF('');setVtNeC(''); }}>
          <InputField label={t('epi')}       value={epiCF} onChange={setEpiCF} unit="EPI" placeholder="60" />
          <InputField label={t('warpCount')} value={wNeC}  onChange={setWNeC}  unit="Ne"  placeholder="40" />
          <InputField label={t('ppi')}       value={ppiCF} onChange={setPpiCF} unit="PPI" placeholder="56" />
          <InputField label={t('weftCount')} value={vtNeC} onChange={setVtNeC} unit="Ne"  placeholder="40" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('coverResult')} value={coverV} />
          <FormulaBox formula="CF = (EPI ÷ √Warp Ne) + (PPI ÷ √Weft Ne)" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Dimension & Weight Tab ───────────────────────────────────────────────────
function DimensionTab() {
  const { t } = useLang();
  const [tEnds,setTEnds]=useState(''); const [epiW,setEpiW]=useState('');
  const [pLen,setPLen]=useState(''); const [pAllow,setPAllow]=useState(''); const [nPcs,setNPcs]=useState('');
  const [epiWt,setEpiWt]=useState(''); const [wid,setWid]=useState(''); const [lenYd,setLenYd]=useState(''); const [warpNe,setWarpNe]=useState('');
  const [ppiWt,setPpiWt]=useState(''); const [widW,setWidW]=useState(''); const [lenYdW,setLenYdW]=useState(''); const [weftNe,setWeftNe]=useState('');
  const [reedE,setReedE]=useState(''); const [epd,setEpd]=useState('');
  const [yLen,setYLen]=useState(''); const [fLen,setFLen]=useState('');
  const [bef,setBef]=useState(''); const [aft,setAft]=useState('');

  const cwV  = parseFloat(tEnds)>0 && parseFloat(epiW)>0 ? weaving.clothWidthInch(parseFloat(tEnds),parseFloat(epiW)) : null;
  const wlV  = [pLen,pAllow,nPcs].every(v=>parseFloat(v)>0) ? weaving.warpLengthYards(...[pLen,pAllow,nPcs].map(parseFloat)) : null;
  const wwV  = [epiWt,wid,lenYd,warpNe].every(v=>parseFloat(v)>0) ? weaving.warpWeightKg(...[epiWt,wid,lenYd,warpNe].map(parseFloat)) : null;
  const wftV = [ppiWt,widW,lenYdW,weftNe].every(v=>parseFloat(v)>0) ? weaving.weftWeightKg(...[ppiWt,widW,lenYdW,weftNe].map(parseFloat)) : null;
  const epiV = parseFloat(reedE)>0 && parseFloat(epd)>0 ? weaving.epiFromReed(parseFloat(reedE),parseFloat(epd)) : null;
  const crV  = parseFloat(yLen)>0 && parseFloat(fLen)>0 ? weaving.crimpPct(parseFloat(yLen),parseFloat(fLen)) : null;
  const shrV = parseFloat(bef)>0 && parseFloat(aft)>0 ? weaving.fabricShrinkage(parseFloat(bef),parseFloat(aft)) : null;

  useAutoHistory({ calcId:'wv-dim', calcName:'Warp Weight', category:'weaving', page:'/weaving', tabId:'dimension',
    resultLabel:'Warp Weight', resultValue:wwV, resultUnit:'kg' });

  return (
    <>
      <CalcCard titleKey="clothWidth">
        <CardInputs onReset={()=>{setTEnds('');setEpiW('');}}>
          <InputField label={t('totalEnds')} value={tEnds} onChange={setTEnds} placeholder="3600" />
          <InputField label={t('epi')}       value={epiW}  onChange={setEpiW}  unit="EPI" placeholder="60" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('clothWidthResult')} value={cwV} unit="inches" />
          <FormulaBox formula="Width (in) = Total Ends ÷ EPI" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="warpLength">
        <CardInputs onReset={()=>{setPLen('');setPAllow('');setNPcs('');}}>
          <InputField label={t('pieceLength')}    value={pLen}   onChange={setPLen}   unit="yds" placeholder="20" />
          <InputField label={t('pieceAllowance')} value={pAllow} onChange={setPAllow} unit="yds" placeholder="0.5" />
          <InputField label={t('numPieces')}       value={nPcs}   onChange={setNPcs}   placeholder="100" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('warpLenResult')} value={wlV} unit="yards" />
          <FormulaBox formula="Warp Length = (Piece Length + Allowance) × Qty" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="warpWeightKg">
        <CardInputs onReset={()=>{setEpiWt('');setWid('');setLenYd('');setWarpNe('');}}>
          <InputField label={t('epi')}         value={epiWt}  onChange={setEpiWt}  unit="EPI" placeholder="60" />
          <InputField label={t('widthInches')} value={wid}    onChange={setWid}    unit="in"  placeholder="44" />
          <InputField label={t('lengthYards')} value={lenYd}  onChange={setLenYd}  unit="yds" placeholder="2000" />
          <InputField label={t('warpCount')}   value={warpNe} onChange={setWarpNe} unit="Ne"  placeholder="40" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('warpWtResult')} value={wwV} unit="kg" />
          <FormulaBox formula="Warp Wt (kg) = (EPI × Width × Length) ÷ (Ne × 840 × 0.9144)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="weftWeightKg">
        <CardInputs onReset={()=>{setPpiWt('');setWidW('');setLenYdW('');setWeftNe('');}}>
          <InputField label={t('ppi')}         value={ppiWt}  onChange={setPpiWt}  unit="PPI" placeholder="56" />
          <InputField label={t('widthInches')} value={widW}   onChange={setWidW}   unit="in"  placeholder="44" />
          <InputField label={t('lengthYards')} value={lenYdW} onChange={setLenYdW} unit="yds" placeholder="2000" />
          <InputField label={t('weftCount')}   value={weftNe} onChange={setWeftNe} unit="Ne"  placeholder="40" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('weftWtResult')} value={wftV} unit="kg" />
          <FormulaBox formula="Weft Wt (kg) = (PPI × Width × Length) ÷ (Ne × 840 × 0.9144)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="epiFromReed">
        <CardInputs onReset={()=>{setReedE('');setEpd('');}}>
          <InputField label={t('reedCount')}   value={reedE} onChange={setReedE} placeholder="30" />
          <InputField label={t('endsPerDent')} value={epd}   onChange={setEpd}   placeholder="2" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('epiResult')} value={epiV} unit="EPI" />
          <FormulaBox formula="EPI = Reed × Ends Per Dent" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="crimpPct">
        <CardInputs onReset={()=>{setYLen('');setFLen('');}}>
          <InputField label={t('yarnLengthCm')}   value={yLen} onChange={setYLen} unit="cm" placeholder="105" />
          <InputField label={t('fabricLengthCm')} value={fLen} onChange={setFLen} unit="cm" placeholder="100" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('crimpResult')} value={crV} unit="%" />
          <FormulaBox formula="Crimp% = ((Yarn - Fabric) ÷ Fabric) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="fabricShrinkage">
        <CardInputs onReset={()=>{setBef('');setAft('');}}>
          <InputField label={t('beforeLength')} value={bef} onChange={setBef} placeholder="100" />
          <InputField label={t('afterLength')}  value={aft} onChange={setAft} placeholder="97" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('shrinkResult')} value={shrV} unit="%" />
          <FormulaBox formula="Shrinkage% = ((Before - After) ÷ Before) × 100" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Efficiency & Production Tab ──────────────────────────────────────────────
function EfficiencyTab() {
  const { t } = useLang();
  const [act,setAct]=useState(''); const [tgt,setTgt]=useState('');
  const [ppm,setPpm]=useState(''); const [hrs,setHrs]=useState(''); const [effP,setEffP]=useState(''); const [ppiE,setPpiE]=useState('');
  const [tEndsB,setTEndsB]=useState(''); const [creel,setCreel]=useState('');
  const [rpmS,setRpmS]=useState(''); const [effPPM,setEffPPM]=useState('');

  const leV   = parseFloat(act)>0 && parseFloat(tgt)>0 ? weaving.loomEfficiency(parseFloat(act),parseFloat(tgt)) : null;
  const prodV = [ppm,hrs,effP,ppiE].every(v=>parseFloat(v)>0) ? weaving.productionMeterDay(...[ppm,hrs,effP,ppiE].map(parseFloat)) : null;
  const beamV = parseFloat(tEndsB)>0 && parseFloat(creel)>0 ? weaving.warpBeamCount(parseFloat(tEndsB),parseFloat(creel)) : null;
  const ppmV  = parseFloat(rpmS)>0 && parseFloat(effPPM)>0 ? weaving.picksPerMinute(parseFloat(rpmS),parseFloat(effPPM)) : null;

  useAutoHistory({ calcId:'wv-eff', calcName:'Loom Efficiency', category:'weaving', page:'/weaving', tabId:'efficiency',
    resultLabel:'Efficiency', resultValue:leV, resultUnit:'%' });

  return (
    <>
      <CalcCard titleKey="loomEfficiency">
        <CardInputs onReset={()=>{setAct('');setTgt('');}}>
          <InputField label={t('actualProd')} value={act} onChange={setAct} placeholder="180" />
          <InputField label={t('targetProd')} value={tgt} onChange={setTgt} placeholder="200" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('loomEffResult')} value={leV} unit="%" />
          <FormulaBox formula="Efficiency% = (Actual ÷ Target) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="productionMeterDay">
        <CardInputs onReset={()=>{setPpm('');setHrs('');setEffP('');setPpiE('');}}>
          <InputField label={t('ppm')}        value={ppm}  onChange={setPpm}  placeholder="450" />
          <InputField label={t('hoursPerDay')}value={hrs}  onChange={setHrs}  unit="hrs" placeholder="8" />
          <InputField label={t('efficiency')} value={effP} onChange={setEffP} unit="%"   placeholder="85" />
          <InputField label={t('ppi')}        value={ppiE} onChange={setPpiE} unit="PPI" placeholder="56" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('prodMResult')} value={prodV} unit="m" />
          <FormulaBox formula="Prod (m) = PPM × 60 × Hrs × Eff% ÷ PPI ÷ 100 × 0.9144" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="warpBeam">
        <CardInputs onReset={()=>{setTEndsB('');setCreel('');}}>
          <InputField label={t('totalEnds')}    value={tEndsB} onChange={setTEndsB} placeholder="3600" />
          <InputField label={t('creelCapacity')}value={creel}  onChange={setCreel}  placeholder="400" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('beamCountResult')} value={beamV} unit="beams" />
          <FormulaBox formula="Beams = ⌈Total Ends ÷ Creel Capacity⌉" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="picksPerMinute">
        <CardInputs onReset={()=>{setRpmS('');setEffPPM('');}}>
          <InputField label={t('speedRPM')}   value={rpmS}   onChange={setRpmS}   unit="RPM" placeholder="500" />
          <InputField label={t('efficiency')} value={effPPM} onChange={setEffPPM} unit="%"   placeholder="90" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('ppmResult')} value={ppmV} unit="picks/min" />
          <FormulaBox formula="PPM = RPM × Efficiency%" />
        </CardResults>
      </CalcCard>
    </>
  );
}

export default function Weaving() {
  const location = useLocation();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'gsm');

  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }

  return (
    <CalcPage icon={Grid3x3} titleKey="weavingTitle" descKey="weavingDesc2"
      tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} calcPrefix="wv">
      {activeTab === 'gsm'        && <GSMCoverTab />}
      {activeTab === 'dimension'  && <DimensionTab />}
      {activeTab === 'efficiency' && <EfficiencyTab />}
    </CalcPage>
  );
}
