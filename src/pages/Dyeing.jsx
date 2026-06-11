import { useState } from 'react';
import { Droplets } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CalcPage, { CalcCard, CardInputs, CardResults } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { dyeing } from '../utils/formulas';
import { useAutoHistory } from '../hooks/useAutoHistory';

const TABS = [
  { id: 'liquor',   labelKey: 'liquorRatioTab' },
  { id: 'chemical', labelKey: 'chemicalTab'    },
  { id: 'recipe',   labelKey: 'recipeTab'      },
];

// ─── Liquor Ratio Tab ─────────────────────────────────────────────────────────
function LiquorTab() {
  const { t } = useLang();
  const [fab,setFab]=useState(''); const [lr,setLr]=useState('');
  const [water,setWater]=useState(''); const [fabW,setFabW]=useState('');
  const [ml,setMl]=useState(''); const [c1,setC1]=useState(''); const [c2,setC2]=useState('');
  const [winch,setWinch]=useState(''); const [dia,setDia]=useState('');

  const wV   = parseFloat(fab)>0 && parseFloat(lr)>0 ? dyeing.waterLiters(parseFloat(fab), parseFloat(lr)) : null;
  const lrV  = parseFloat(water)>0 && parseFloat(fabW)>0 ? dyeing.liquorRatio(parseFloat(water), parseFloat(fabW)) : null;
  const dilV = [ml,c1,c2].every(v=>parseFloat(v)>0) ? dyeing.dilution(parseFloat(ml), parseFloat(c1), parseFloat(c2)) : null;
  const volV = parseFloat(winch)>0 && parseFloat(dia)>0 ? dyeing.winchVolume(parseFloat(winch), parseFloat(dia)) : null;

  useAutoHistory({ calcId:'dy-liq', calcName:'Water Volume', category:'dyeing', page:'/dyeing', tabId:'liquor',
    resultLabel:'Water', resultValue:wV, resultUnit:'L' });

  return (
    <>
      <CalcCard titleKey="waterVolume">
        <CardInputs onReset={()=>{setFab('');setLr('');}}>
          <InputField label={t('fabricWeightKg')} value={fab} onChange={setFab} unit="kg" placeholder="50" />
          <InputField label={t('liquorRatioIn')}  value={lr}  onChange={setLr}  placeholder="10" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('waterResult')} value={wV} unit="L" />
          <FormulaBox formula="Water (L) = Fabric × Liquor Ratio" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="liquorRatioCalc">
        <CardInputs onReset={()=>{setWater('');setFabW('');}}>
          <InputField label={t('totalWaterL')}    value={water} onChange={setWater} unit="L"  placeholder="500" />
          <InputField label={t('fabricWeightKg')} value={fabW}  onChange={setFabW}  unit="kg" placeholder="50" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('lrResult')} value={lrV} />
          <FormulaBox formula="Liquor Ratio = Total Water ÷ Fabric Weight" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="dilutionCalc">
        <CardInputs onReset={()=>{setMl('');setC1('');setC2('');}}>
          <InputField label={t('stockVolMl')} value={ml}  onChange={setMl}  unit="mL"  placeholder="100" />
          <InputField label={t('stockConc')}  value={c1}  onChange={setC1}  unit="g/L" placeholder="50" />
          <InputField label={t('targetConc')} value={c2}  onChange={setC2}  unit="g/L" placeholder="10" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('dilutionResult')} value={dilV} unit="mL" />
          <FormulaBox formula="Final Vol (mL) = (V1 × C1) ÷ C2" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="winchVolume">
        <CardInputs onReset={()=>{setWinch('');setDia('');}}>
          <InputField label={t('winchLength')} value={winch} onChange={setWinch} unit="m" placeholder="6" />
          <InputField label={t('winchDia')}    value={dia}   onChange={setDia}   unit="m" placeholder="0.5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('winchVolResult')} value={volV} unit="L" />
          <FormulaBox formula="Volume = π × r² × Length × 1000" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Chemical Dosing Tab ──────────────────────────────────────────────────────
function ChemicalTab() {
  const { t } = useLang();
  const [chm,setChm]=useState(''); const [water2,setWater2]=useState('');
  const [dep,setDep]=useState(''); const [owfPct,setOwfPct]=useState(''); const [fabOWF,setFabOWF]=useState('');
  const [salt1,setSalt1]=useState(''); const [shade1,setShade1]=useState('');
  const [auxPct,setAuxPct]=useState(''); const [batchKg,setBatchKg]=useState('');
  const [pOWF,setPOWF]=useState(''); const [pFab,setPFab]=useState(''); const [pLr,setPLr]=useState('');

  const concV  = parseFloat(chm)>0 && parseFloat(water2)>0 ? dyeing.chemConc(parseFloat(chm), parseFloat(water2)) : null;
  const dosV   = [dep,owfPct,fabOWF].every(v=>parseFloat(v)>0) ? dyeing.dosageMl(parseFloat(dep), parseFloat(owfPct), parseFloat(fabOWF)) : null;
  const saltV  = parseFloat(salt1)>0 && parseFloat(shade1)>0 ? dyeing.saltDosage(parseFloat(salt1), parseFloat(shade1)) : null;
  const auxV   = parseFloat(auxPct)>0 && parseFloat(batchKg)>0 ? dyeing.auxiliaryKg(parseFloat(auxPct), parseFloat(batchKg)) : null;
  const chemDV = [pOWF,pFab,pLr].every(v=>parseFloat(v)>=0) && parseFloat(pFab)>0 && parseFloat(pLr)>0
    ? dyeing.chemDosing(parseFloat(pOWF), parseFloat(pFab), parseFloat(pLr)) : null;

  useAutoHistory({ calcId:'dy-chem', calcName:'Chemical Concentration', category:'dyeing', page:'/dyeing', tabId:'chemical',
    resultLabel:'Concentration', resultValue:concV, resultUnit:'g/L' });

  return (
    <>
      <CalcCard titleKey="chemConc">
        <CardInputs onReset={()=>{setChm('');setWater2('');}}>
          <InputField label={t('chemicalGram')} value={chm}    onChange={setChm}    unit="g" placeholder="200" />
          <InputField label={t('totalWaterL')}  value={water2} onChange={setWater2} unit="L" placeholder="100" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('concResult')} value={concV} unit="g/L" />
          <FormulaBox formula="Concentration = Chemical (g) ÷ Water (L)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="dosingML">
        <CardInputs onReset={()=>{setDep('');setOwfPct('');setFabOWF('');}}>
          <InputField label={t('density')}     value={dep}    onChange={setDep}    unit="g/mL" placeholder="1.1" />
          <InputField label={t('owfPct')}       value={owfPct} onChange={setOwfPct} unit="%"    placeholder="2" />
          <InputField label={t('fabricForOwf')} value={fabOWF} onChange={setFabOWF} unit="kg"   placeholder="50" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('dosingResult')} value={dosV} unit="mL" />
          <FormulaBox formula="Dosage (mL) = (Fabric × OWF% × 1000) ÷ (Density × 100)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="saltDosage">
        <CardInputs onReset={()=>{setSalt1('');setShade1('');}}>
          <InputField label={t('fabricSalt')}  value={salt1}  onChange={setSalt1}  unit="kg" placeholder="50" />
          <InputField label={t('shadePercent')}value={shade1} onChange={setShade1} unit="%"  placeholder="1.5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('saltResult')} value={saltV} unit="kg" />
          <FormulaBox formula="Salt (kg) = Fabric × Salt Factor (shade based)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="auxiliaryKg">
        <CardInputs onReset={()=>{setAuxPct('');setBatchKg('');}}>
          <InputField label={t('auxOWF')}  value={auxPct}  onChange={setAuxPct}  unit="%" placeholder="2" />
          <InputField label={t('batchKg')} value={batchKg} onChange={setBatchKg} unit="kg" placeholder="50" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('auxKgResult')} value={auxV} unit="kg" />
          <FormulaBox formula="Auxiliary (kg) = Fabric × OWF% ÷ 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="chemDosingLR">
        <CardInputs onReset={()=>{setPOWF('');setPFab('');setPLr('');}}>
          <InputField label={t('chemPercent')} value={pOWF}  onChange={setPOWF}  unit="%" placeholder="2" />
          <InputField label={t('fabricKg')}    value={pFab}  onChange={setPFab}  unit="kg" placeholder="50" />
          <InputField label={t('lrResult')}    value={pLr}   onChange={setPLr}   placeholder="10" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('chemResult')} value={chemDV} unit="g" />
          <FormulaBox formula="Chemical (g) = (% × Fabric × LR) ÷ 100" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Recipe/Batch Tab ─────────────────────────────────────────────────────────
function RecipeTab() {
  const { t } = useLang();
  const [dyeOWF,setDyeOWF]=useState(''); const [dyeFab,setDyeFab]=useState('');
  const [batch,setBatch]=useState(''); const [scour,setScour]=useState(''); const [lrR,setLrR]=useState('');
  const [pct1,setPct1]=useState(''); const [pct2,setPct2]=useState(''); const [total,setTotal]=useState('');
  const [wash1,setWash1]=useState(''); const [wash2,setWash2]=useState('');
  const [temp1,setTemp1]=useState(''); const [temp2,setTemp2]=useState('');

  const dyeV   = parseFloat(dyeOWF)>0 && parseFloat(dyeFab)>0 ? dyeing.dyeQuantityKg(parseFloat(dyeOWF), parseFloat(dyeFab)) : null;
  const bathV  = [batch,scour,lrR].every(v=>parseFloat(v)>0) ? dyeing.scouringBath(parseFloat(batch), parseFloat(scour), parseFloat(lrR)) : null;
  const stripV = [pct1,pct2,total].every(v=>parseFloat(v)>0) ? dyeing.stripedRecalc(parseFloat(pct1), parseFloat(pct2), parseFloat(total)) : null;
  const washV  = parseFloat(wash1)>0 && parseFloat(wash2)>0 ? dyeing.washingEfficiency(parseFloat(wash1), parseFloat(wash2)) : null;
  const tempDiff= parseFloat(temp1)>0 && parseFloat(temp2)>0 ? Math.abs(parseFloat(temp1)-parseFloat(temp2)) : null;

  useAutoHistory({ calcId:'dy-rec', calcName:'Dye Quantity', category:'dyeing', page:'/dyeing', tabId:'recipe',
    resultLabel:'Dye', resultValue:dyeV, resultUnit:'kg' });

  return (
    <>
      <CalcCard titleKey="dyeQuantity">
        <CardInputs onReset={()=>{setDyeOWF('');setDyeFab('');}}>
          <InputField label={t('dyeOWF')}      value={dyeOWF} onChange={setDyeOWF} unit="%" placeholder="2" />
          <InputField label={t('fabricWeight')}value={dyeFab} onChange={setDyeFab} unit="kg" placeholder="50" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('dyeQtyResult')} value={dyeV} unit="kg" />
          <FormulaBox formula="Dye (kg) = Fabric × Dye% ÷ 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="scouringBath">
        <CardInputs onReset={()=>{setBatch('');setScour('');setLrR('');}}>
          <InputField label={t('batchKg')}      value={batch} onChange={setBatch} unit="kg"  placeholder="50" />
          <InputField label={t('scourConc')}     value={scour} onChange={setScour} unit="g/L" placeholder="2" />
          <InputField label={t('liquorRatioIn')} value={lrR}   onChange={setLrR}  placeholder="10" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('scourResult')} value={bathV} unit="g" />
          <FormulaBox formula="Scouring Agent (g) = Water (L) × Conc (g/L)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="stripedRecalc">
        <CardInputs onReset={()=>{setPct1('');setPct2('');setTotal('');}}>
          <InputField label={t('dye1Pct')}    value={pct1}  onChange={setPct1}  unit="%" placeholder="1.5" />
          <InputField label={t('dye2Pct')}    value={pct2}  onChange={setPct2}  unit="%" placeholder="0.8" />
          <InputField label={t('totalFabric')}value={total} onChange={setTotal} unit="kg" placeholder="50" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('dye1Result')} value={stripV?.dye1} unit="kg" />
          <ResultCard label={t('dye2Result')} value={stripV?.dye2} unit="kg" />
          <FormulaBox formula={`Dye1 (kg) = Total × Dye1%/100\nDye2 (kg) = Total × Dye2%/100`} />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="washingEff">
        <CardInputs onReset={()=>{setWash1('');setWash2('');}}>
          <InputField label={t('initialDye')} value={wash1} onChange={setWash1} unit="g/L" placeholder="10" />
          <InputField label={t('finalDye')}   value={wash2} onChange={setWash2} unit="g/L" placeholder="0.5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('washEffResult')} value={washV} unit="%" />
          <FormulaBox formula="Wash Eff% = ((Initial - Final) ÷ Initial) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="tempDiff">
        <CardInputs onReset={()=>{setTemp1('');setTemp2('');}}>
          <InputField label={t('initTemp')}  value={temp1} onChange={setTemp1} unit="°C" placeholder="40" />
          <InputField label={t('finalTemp')} value={temp2} onChange={setTemp2} unit="°C" placeholder="80" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('tempDiffResult')} value={tempDiff} unit="°C" />
          <FormulaBox formula="ΔT = |T2 − T1|" />
        </CardResults>
      </CalcCard>
    </>
  );
}

export default function Dyeing() {
  const location = useLocation();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'liquor');

  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }

  return (
    <CalcPage icon={Droplets} titleKey="dyeingTitle" descKey="dyeingDesc2"
      tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} calcPrefix="dy">
      {activeTab === 'liquor'   && <LiquorTab />}
      {activeTab === 'chemical' && <ChemicalTab />}
      {activeTab === 'recipe'   && <RecipeTab />}
    </CalcPage>
  );
}
