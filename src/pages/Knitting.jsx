import { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CalcPage, { InputPanel, ResultPanel, CalcCard, CardInputs, CardResults } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { knitting } from '../utils/formulas';
import { useAutoHistory } from '../hooks/useAutoHistory';

const TABS = [
  { id: 'gsm',        labelKey: 'gsmStitchTab'  },
  { id: 'production', labelKey: 'productionKTab' },
  { id: 'fabric',     labelKey: 'fabricTab'      },
];

// ─── GSM & Stitch Tab ─────────────────────────────────────────────────────────
function GSMStitchTab() {
  const { t } = useLang();
  const [wpi,setWpi]=useState(''); const [cpi,setCpi]=useState('');
  const [sl,setSl]=useState(''); const [tex,setTex]=useState('');
  const [wpiSL,setWpiSL]=useState(''); const [cpiSL,setCpiSL]=useState('');
  const [wpiLD,setWpiLD]=useState(''); const [cpiLD,setCpiLD]=useState('');

  const gsmV = [wpi,cpi,sl,tex].every(v=>parseFloat(v)>0)
    ? knitting.gsm(...[wpi,cpi,sl,tex].map(parseFloat)) : null;
  const slV  = parseFloat(wpiSL)>0 && parseFloat(cpiSL)>0
    ? knitting.stitchLength(parseFloat(wpiSL), parseFloat(cpiSL)) : null;
  const ldV  = parseFloat(wpiLD)>0 && parseFloat(cpiLD)>0
    ? knitting.loopDensity(parseFloat(wpiLD), parseFloat(cpiLD)) : null;

  useAutoHistory({ calcId:'kn-gsm', calcName:'Knitting GSM', category:'knitting', page:'/knitting', tabId:'gsm',
    resultLabel:'GSM', resultValue:gsmV, resultUnit:'g/m²' });

  return (
    <>
      <CalcCard titleKey="gsmKnit">
        <CardInputs onReset={()=>{setWpi('');setCpi('');setSl('');setTex('');}}>
          <InputField label={t('wpi')} value={wpi} onChange={setWpi} unit="WPI" placeholder="28" />
          <InputField label={t('cpi')} value={cpi} onChange={setCpi} unit="CPI" placeholder="36" />
          <InputField label={t('sl')}  value={sl}  onChange={setSl}  unit="cm"  placeholder="0.28" />
          <InputField label={t('tex')} value={tex} onChange={setTex} unit="Tex" placeholder="20" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('gsmKnitResult')} value={gsmV} unit="g/m²" />
          <FormulaBox formula="GSM = (WPI × CPI × SL × Tex) ÷ 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="stitchLength">
        <CardInputs onReset={()=>{setWpiSL('');setCpiSL('');}}>
          <InputField label={t('wpi')} value={wpiSL} onChange={setWpiSL} unit="WPI" placeholder="28" />
          <InputField label={t('cpi')} value={cpiSL} onChange={setCpiSL} unit="CPI" placeholder="36" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('slResult')} value={slV} unit="cm" />
          <FormulaBox formula="SL = 1 ÷ (WPI × CPI)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="loopDensity">
        <CardInputs onReset={()=>{setWpiLD('');setCpiLD('');}}>
          <InputField label={t('wpi')} value={wpiLD} onChange={setWpiLD} unit="WPI" placeholder="28" />
          <InputField label={t('cpi')} value={cpiLD} onChange={setCpiLD} unit="CPI" placeholder="36" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('loopResult')} value={ldV} unit="loops/in²" />
          <FormulaBox formula="Loop Density = WPI × CPI" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Production Tab ───────────────────────────────────────────────────────────
function ProductionTab() {
  const { t } = useLang();
  const [fKg,setFKg]=useState(''); const [wst,setWst]=useState('');
  const [rpm,setRpm]=useState(''); const [feed,setFeed]=useState('');
  const [slP,setSlP]=useState(''); const [texP,setTexP]=useState(''); const [hrs,setHrs]=useState('');

  const consV = parseFloat(fKg)>0 && parseFloat(wst)>=0
    ? knitting.yarnConsumptionKg(parseFloat(fKg), parseFloat(wst)) : null;
  const prodV = [rpm,feed,slP,texP,hrs].every(v=>parseFloat(v)>0)
    ? knitting.productionKgShift(...[rpm,feed,slP,texP,hrs].map(parseFloat)) : null;

  useAutoHistory({ calcId:'kn-prod', calcName:'Knitting Production', category:'knitting', page:'/knitting', tabId:'production',
    resultLabel:'Production', resultValue:prodV, resultUnit:'kg/shift' });

  return (
    <>
      <CalcCard titleKey="yarnConsumptionK">
        <CardInputs onReset={()=>{setFKg('');setWst('');}}>
          <InputField label={t('fabricKgWeight')} value={fKg} onChange={setFKg} unit="kg" placeholder="100" />
          <InputField label={t('wastePctK')}       value={wst} onChange={setWst} unit="%" placeholder="5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('yarnConsResult')} value={consV} unit="kg" />
          <FormulaBox formula="Yarn (kg) = Fabric (kg) × (1 + Waste% ÷ 100)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="productionKgShift">
        <CardInputs onReset={()=>{setRpm('');setFeed('');setSlP('');setTexP('');setHrs('');}}>
          <InputField label={t('rpmK')}       value={rpm}  onChange={setRpm}  unit="RPM" placeholder="30" />
          <InputField label={t('feeders')}     value={feed} onChange={setFeed} placeholder="96" />
          <InputField label={t('slCm')}        value={slP}  onChange={setSlP}  unit="cm"  placeholder="0.28" />
          <InputField label={t('texK')}        value={texP} onChange={setTexP} unit="Tex" placeholder="20" />
          <InputField label={t('hoursShift')}  value={hrs}  onChange={setHrs}  unit="hrs" placeholder="8" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('prodKgResult')} value={prodV} unit="kg" />
          <FormulaBox formula="Prod (kg) = RPM × Feeders × SL × Tex × 60 × Hrs ÷ 10⁹" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Fabric Properties Tab ────────────────────────────────────────────────────
function FabricTab() {
  const { t } = useLang();
  const [fw,setFw]=useState(''); const [shk,setShk]=useState('');
  const [dia,setDia]=useState(''); const [ga,setGa]=useState('');
  const [slTF,setSlTF]=useState(''); const [texTF,setTexTF]=useState('');
  const [gsmC,setGsmC]=useState(''); const [wpiC,setWpiC]=useState('');
  const [cpiC,setCpiC]=useState(''); const [slC,setSlC]=useState('');

  const saV   = parseFloat(fw)>0 && parseFloat(shk)>0 ? knitting.shrinkageAllowance(parseFloat(fw), parseFloat(shk)) : null;
  const wdV   = parseFloat(dia)>0 && parseFloat(ga)>0  ? knitting.fabricWidthCylinder(parseFloat(dia), parseFloat(ga)) : null;
  const tfV   = parseFloat(texTF)>0 && parseFloat(slTF)>0 ? knitting.tightnessFactor(parseFloat(texTF), parseFloat(slTF)) : null;
  const texGV = [gsmC,wpiC,cpiC,slC].every(v=>parseFloat(v)>0) ? knitting.yarnTexFromGSM(...[gsmC,wpiC,cpiC,slC].map(parseFloat)) : null;
  const neGV  = texGV ? knitting.yarnNeFromGSM(...[gsmC,wpiC,cpiC,slC].map(parseFloat)) : null;

  useAutoHistory({ calcId:'kn-fab', calcName:'Tightness Factor', category:'knitting', page:'/knitting', tabId:'fabric',
    resultLabel:'TF', resultValue:tfV, resultUnit:'' });

  return (
    <>
      <CalcCard titleKey="shrinkageAllowance">
        <CardInputs onReset={()=>{setFw('');setShk('');}}>
          <InputField label={t('finalWidth')}    value={fw}  onChange={setFw}  unit="in" placeholder="30" />
          <InputField label={t('shrinkagePctK')} value={shk} onChange={setShk} unit="%" placeholder="5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('shrinkAllowResult')} value={saV} unit="in" />
          <FormulaBox formula="Required Width = Finished Width ÷ (1 - Shrinkage%/100)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="fabricWidthCylinder">
        <CardInputs onReset={()=>{setDia('');setGa('');}}>
          <InputField label={t('cylinderDia')} value={dia} onChange={setDia} unit="in" placeholder="30" />
          <InputField label={t('gaugeAdj')}    value={ga}  onChange={setGa}  placeholder="1.0" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('fabricWidthResult')} value={wdV} unit="in" />
          <FormulaBox formula="Width = π × Cylinder Dia × Gauge Adjustment" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="tightnessFactor">
        <CardInputs onReset={()=>{setTexTF('');setSlTF('');}}>
          <InputField label={t('texTF')} value={texTF} onChange={setTexTF} unit="Tex" placeholder="20" />
          <InputField label={t('slTF')}  value={slTF}  onChange={setSlTF}  unit="cm"  placeholder="0.28" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('tfResult')} value={tfV} />
          <FormulaBox formula="TF = √Tex ÷ Stitch Length (cm)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="yarnCountFromGSM">
        <CardInputs onReset={()=>{setGsmC('');setWpiC('');setCpiC('');setSlC('');}}>
          <InputField label={t('gsmForCount')}  value={gsmC} onChange={setGsmC} unit="g/m²" placeholder="180" />
          <InputField label={t('wpiForCount')}  value={wpiC} onChange={setWpiC} unit="WPI"   placeholder="28" />
          <InputField label={t('cpiForCount')}  value={cpiC} onChange={setCpiC} unit="CPI"   placeholder="36" />
          <InputField label={t('slForCount')}   value={slC}  onChange={setSlC}  unit="cm"    placeholder="0.28" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('texFromGSMResult')} value={texGV} unit="Tex" />
          <ResultCard label={t('neFromGSMResult')}  value={neGV}  unit="Ne" />
          <FormulaBox formula={`Tex = (GSM × 100) ÷ (WPI × CPI × SL)\nNe  = 590.5 ÷ Tex`} />
        </CardResults>
      </CalcCard>
    </>
  );
}

export default function Knitting() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'gsm');
  useEffect(() => { if (location.state?.tab) setActiveTab(location.state.tab); }, [location.state]);

  return (
    <CalcPage icon={Layers} titleKey="knittingTitle" descKey="knittingDesc2"
      tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} calcPrefix="kn">
      {activeTab === 'gsm'        && <GSMStitchTab />}
      {activeTab === 'production' && <ProductionTab />}
      {activeTab === 'fabric'     && <FabricTab />}
    </CalcPage>
  );
}
