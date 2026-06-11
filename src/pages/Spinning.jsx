import { useState } from 'react';
import { Wind } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CalcPage, { InputPanel, ResultPanel, CalcCard, CardInputs, CardResults } from '../components/ui/CalcPage';
import InputField from '../components/ui/InputField';
import ResultCard from '../components/ui/ResultCard';
import FormulaBox from '../components/ui/FormulaBox';
import { useLang } from '../context/LangContext';
import { spinning } from '../utils/formulas';
import { useAutoHistory } from '../hooks/useAutoHistory';

const TABS = [
  { id: 'count',      labelKey: 'countConversion' },
  { id: 'twist',      labelKey: 'twistTab' },
  { id: 'strength',   labelKey: 'strengthTab' },
  { id: 'production', labelKey: 'productionTab' },
  { id: 'quality',    labelKey: 'qualityTab' },
];

// ─── Count Conversion (Bidirectional fix #2) ─────────────────────────────────
function CountConversionCalc() {
  const { t } = useLang();
  const [f, setF] = useState({ ne: '', tex: '', denier: '', nm: '' });

  const handleChange = (field, value) => {
    const newF = { ne: '', tex: '', denier: '', nm: '' };
    newF[field] = value;
    const n = parseFloat(value);
    if (n > 0) {
      if (field === 'ne') {
        newF.tex    = spinning.neTex(n).toFixed(4);
        newF.denier = spinning.neDenier(n).toFixed(4);
        newF.nm     = spinning.neNm(n).toFixed(4);
      } else if (field === 'tex') {
        newF.ne     = spinning.texNe(n).toFixed(4);
        newF.nm     = spinning.texNm(n).toFixed(4);
        newF.denier = spinning.texDenier(n).toFixed(4);
      } else if (field === 'denier') {
        newF.ne  = spinning.denierNe(n).toFixed(4);
        newF.tex = spinning.denierTex(n).toFixed(4);
        newF.nm  = spinning.denierNm(n).toFixed(4);
      } else if (field === 'nm') {
        newF.ne     = spinning.nmNe(n).toFixed(4);
        newF.tex    = spinning.nmTex(n).toFixed(4);
        newF.denier = spinning.nmDenier(n).toFixed(4);
      }
    }
    setF(newF);
  };

  const reset = () => setF({ ne: '', tex: '', denier: '', nm: '' });

  // History: save ne→tex result
  const neNum = parseFloat(f.ne);
  useAutoHistory({ calcId:'sp-count', calcName:'Count Conversion', category:'spinning', page:'/spinning', tabId:'count',
    resultLabel:'Tex', resultValue: neNum > 0 ? spinning.neTex(neNum) : null, resultUnit:'Tex' });

  return (
    <>
      <InputPanel onReset={reset}>
        <p className="text-xs text-light-muted dark:text-dark-muted pb-1">{t('bidirectionalHint')}</p>
        <InputField label={t('neLabel')}     value={f.ne}     onChange={(v) => handleChange('ne',     v)} unit="Ne"  placeholder="30" />
        <InputField label={t('texLabel')}    value={f.tex}    onChange={(v) => handleChange('tex',    v)} unit="Tex" placeholder="19.68" />
        <InputField label={t('denierLabel')} value={f.denier} onChange={(v) => handleChange('denier', v)} unit="D"   placeholder="177.17" />
        <InputField label={t('nmLabel')}     value={f.nm}     onChange={(v) => handleChange('nm',     v)} unit="Nm"  placeholder="50.79" />
      </InputPanel>
      <ResultPanel>
        <FormulaBox formula={
`Ne  → Tex    = 590.5 ÷ Ne
Ne  → Denier = 5315  ÷ Ne
Ne  → Nm     = Ne × 1.693
Tex → Ne     = 590.5 ÷ Tex
Tex → Nm     = 1000  ÷ Tex
Tex → Denier = Tex × 9
Den → Ne     = 5315  ÷ Den
Den → Tex    = Den   ÷ 9
Den → Nm     = 9000  ÷ Den
Nm  → Ne     = Nm   ÷ 1.693
Nm  → Tex    = 1000  ÷ Nm
Nm  → Denier = 9000  ÷ Nm`
        } />
      </ResultPanel>
    </>
  );
}

// ─── Twist Tab (TPI + TF) ─────────────────────────────────────────────────────
function TwistTab() {
  const { t } = useLang();
  const [tf1, setTf1] = useState(''); const [ne1, setNe1] = useState('');
  const [tpi2, setTpi2] = useState(''); const [ne2, setNe2] = useState('');

  const tpiVal = (parseFloat(tf1) > 0 && parseFloat(ne1) > 0)
    ? spinning.tpi(parseFloat(tf1), parseFloat(ne1)) : null;
  const tfVal  = (parseFloat(tpi2) > 0 && parseFloat(ne2) > 0)
    ? spinning.twistFactor(parseFloat(tpi2), parseFloat(ne2)) : null;

  useAutoHistory({ calcId:'sp-twist', calcName:'TPI', category:'spinning', page:'/spinning', tabId:'twist',
    resultLabel:'TPI', resultValue: tpiVal, resultUnit:'TPI' });

  return (
    <>
      <CalcCard titleKey="tpi">
        <CardInputs onReset={() => { setTf1(''); setNe1(''); }}>
          <InputField label={t('tfInput')}  value={tf1} onChange={setTf1} placeholder="4.5" />
          <InputField label={t('countNe')}  value={ne1} onChange={setNe1} unit="Ne" placeholder="30" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('tpiResult')} value={tpiVal} unit="TPI" />
          <FormulaBox formula="TPI = Twist Factor × √Ne" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="twistFactor">
        <CardInputs onReset={() => { setTpi2(''); setNe2(''); }}>
          <InputField label={t('tpiInput')} value={tpi2} onChange={setTpi2} unit="TPI" placeholder="24.7" />
          <InputField label={t('countNe')}  value={ne2}  onChange={setNe2}  unit="Ne"  placeholder="30" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('tfResult')} value={tfVal} />
          <FormulaBox formula="TF = TPI ÷ √Ne" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Strength Tab (RKM + CSP) ─────────────────────────────────────────────────
function StrengthTab() {
  const { t } = useLang();
  const [str1, setStr1] = useState(''); const [cnt1, setCnt1] = useState('');
  const [cnt2, setCnt2] = useState(''); const [str2, setStr2] = useState('');

  const rkm = (parseFloat(str1) > 0 && parseFloat(cnt1) > 0)
    ? spinning.yarnRKM(parseFloat(str1), parseFloat(cnt1)) : null;
  const csp = (parseFloat(cnt2) > 0 && parseFloat(str2) > 0)
    ? spinning.csp(parseFloat(cnt2), parseFloat(str2)) : null;

  useAutoHistory({ calcId:'sp-strength', calcName:'Yarn RKM', category:'spinning', page:'/spinning', tabId:'strength',
    resultLabel:'RKM', resultValue: rkm, resultUnit:'' });

  return (
    <>
      <CalcCard titleKey="yarnRKM">
        <CardInputs onReset={() => { setStr1(''); setCnt1(''); }}>
          <InputField label={t('strength')}         value={str1} onChange={setStr1} unit="cN/tex" placeholder="18.5" />
          <InputField label={t('countForStrength')} value={cnt1} onChange={setCnt1} unit="Ne"     placeholder="30" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('rkmResult')} value={rkm} />
          <FormulaBox formula="RKM = Strength (cN/tex) ÷ Count (Ne)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="csp">
        <CardInputs onReset={() => { setCnt2(''); setStr2(''); }}>
          <InputField label={t('countForStrength')} value={cnt2} onChange={setCnt2} unit="Ne"     placeholder="30" />
          <InputField label={t('strength')}         value={str2} onChange={setStr2} unit="cN/tex" placeholder="18.5" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('cspResult')} value={csp} />
          <FormulaBox formula="CSP = Count (Ne) × Strength (cN/tex)" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Production Tab ───────────────────────────────────────────────────────────
function ProductionTab() {
  const { t } = useLang();
  const [hank, setHank] = useState(''); const [rpm, setRpm] = useState(''); const [eff, setEff] = useState('');
  const [hanks, setHanks] = useState(''); const [cnt, setCnt] = useState('');
  const [bLen, setBLen] = useState(''); const [bCnt, setBCnt] = useState('');

  const prod = ([hank,rpm,eff].every(v=>parseFloat(v)>0))
    ? spinning.productionSpindle(parseFloat(hank), parseFloat(rpm), parseFloat(eff)) : null;
  const kgs = ([hanks,cnt].every(v=>parseFloat(v)>0))
    ? spinning.hankToKg(parseFloat(hanks), parseFloat(cnt)) : null;
  const bobG = ([bLen,bCnt].every(v=>parseFloat(v)>0))
    ? spinning.bobbinWeightG(parseFloat(bLen), parseFloat(bCnt)) : null;

  useAutoHistory({ calcId:'sp-prod', calcName:'Production/Spindle', category:'spinning', page:'/spinning', tabId:'production',
    resultLabel:'Hank/day', resultValue: prod, resultUnit:'hanks' });

  return (
    <>
      <CalcCard titleKey="prodSpindle">
        <CardInputs onReset={() => { setHank(''); setRpm(''); setEff(''); }}>
          <InputField label={t('hank')}      value={hank} onChange={setHank} placeholder="1.2" />
          <InputField label={t('speedRPM')}  value={rpm}  onChange={setRpm}  unit="RPM" placeholder="18000" />
          <InputField label={t('efficiency')}value={eff}  onChange={setEff}  unit="%" placeholder="90" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('prodResult')} value={prod} unit="hanks" />
          <FormulaBox formula="Prod = (Hank × RPM × Efficiency%) ÷ 840" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="hankToKg">
        <CardInputs onReset={() => { setHanks(''); setCnt(''); }}>
          <InputField label={t('hanks')} value={hanks} onChange={setHanks} placeholder="100" />
          <InputField label={t('count')} value={cnt}   onChange={setCnt}   unit="Ne" placeholder="30" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('hankKgResult')} value={kgs} unit="kg" />
          <FormulaBox formula="Weight (kg) = (Hanks × 840) ÷ (Count × 1000)" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="bobbinWeight">
        <CardInputs onReset={() => { setBLen(''); setBCnt(''); }}>
          <InputField label={t('bobbinLength')} value={bLen} onChange={setBLen} unit="yds" placeholder="15000" />
          <InputField label={t('count')}         value={bCnt} onChange={setBCnt} unit="Ne"  placeholder="30" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('bobbinGResult')} value={bobG} unit="g" />
          <FormulaBox formula="Weight (g) = (Length ÷ (840 × Ne)) × 453.592" />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Quality Tab ──────────────────────────────────────────────────────────────
function QualityTab() {
  const { t } = useLang();
  const [feed, setFeed] = useState(''); const [del, setDel] = useState('');
  const [rWt, setRWt] = useState(''); const [rLen, setRLen] = useState('');
  const [fA, setFA] = useState(''); const [tot, setTot] = useState('');
  const [inp, setInp] = useState(''); const [out, setOut] = useState('');

  const draftVal  = ([feed,del].every(v=>parseFloat(v)>0)) ? spinning.draft(parseFloat(feed), parseFloat(del)) : null;
  const rovingVal = ([rWt,rLen].every(v=>parseFloat(v)>0)) ? spinning.rovingHank(parseFloat(rWt), parseFloat(rLen)) : null;
  const blendVal  = ([fA,tot].every(v=>parseFloat(v)>0))   ? spinning.blendRatioPct(parseFloat(fA), parseFloat(tot)) : null;
  const realVal   = ([inp,out].every(v=>parseFloat(v)>0))  ? spinning.yarnRealisationPct(parseFloat(out), parseFloat(inp)) : null;
  const wasteVal  = ([inp,out].every(v=>parseFloat(v)>0))  ? spinning.wastePct(parseFloat(inp), parseFloat(out)) : null;

  return (
    <>
      <CalcCard titleKey="draft">
        <CardInputs onReset={() => { setFeed(''); setDel(''); }}>
          <InputField label={t('feedCount')}     value={feed} onChange={setFeed} placeholder="0.12" />
          <InputField label={t('deliveryCount')} value={del}  onChange={setDel}  placeholder="30" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('draftResult')} value={draftVal} />
          <FormulaBox formula="Draft = Feed Count ÷ Delivery Count" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="rovingHank">
        <CardInputs onReset={() => { setRWt(''); setRLen(''); }}>
          <InputField label={t('rovingWeightG')}  value={rWt}  onChange={setRWt}  unit="g"   placeholder="20" />
          <InputField label={t('rovingLengthYd')} value={rLen} onChange={setRLen} unit="yds" placeholder="840" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('rovingResult')} value={rovingVal} />
          <FormulaBox formula="Roving Hank = (Weight × Length) ÷ 1000" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="blendRatio">
        <CardInputs onReset={() => { setFA(''); setTot(''); }}>
          <InputField label={t('fiberAWeight')} value={fA}  onChange={setFA}  unit="kg" placeholder="60" />
          <InputField label={t('totalWeight')}  value={tot} onChange={setTot} unit="kg" placeholder="100" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('blendResult')} value={blendVal} unit="%" />
          <FormulaBox formula="Blend% = (Fiber A ÷ Total Weight) × 100" />
        </CardResults>
      </CalcCard>

      <CalcCard titleKey="yarnRealisation">
        <CardInputs onReset={() => { setInp(''); setOut(''); }}>
          <InputField label={t('inputWeightKg')}  value={inp} onChange={setInp} unit="kg" placeholder="100" />
          <InputField label={t('outputWeightKg')} value={out} onChange={setOut} unit="kg" placeholder="92" />
        </CardInputs>
        <CardResults>
          <ResultCard label={t('realisationResult')} value={realVal}  unit="%" />
          <ResultCard label={t('wasteResult')}        value={wasteVal} unit="%" />
          <FormulaBox formula={`Realisation% = (Output ÷ Input) × 100\nWaste%       = ((Input - Output) ÷ Input) × 100`} />
        </CardResults>
      </CalcCard>
    </>
  );
}

// ─── Spinning Page ────────────────────────────────────────────────────────────
export default function Spinning() {
  const location = useLocation();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'count');

  // Respond to navigation state changes (from search/history/sidebar)
  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }

  return (
    <CalcPage
      icon={Wind}
      titleKey="spinningTitle"
      descKey="spinningDesc2"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      calcPrefix="sp"
    >
      {activeTab === 'count'      && <CountConversionCalc />}
      {activeTab === 'twist'      && <TwistTab />}
      {activeTab === 'strength'   && <StrengthTab />}
      {activeTab === 'production' && <ProductionTab />}
      {activeTab === 'quality'    && <QualityTab />}
    </CalcPage>
  );
}
