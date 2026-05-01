import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider } from './context/LangContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Spinning from './pages/Spinning';
import Weaving from './pages/Weaving';
import Knitting from './pages/Knitting';
import Dyeing from './pages/Dyeing';
import Garments from './pages/Garments';
import TTQC from './pages/TTQC';

// App — root component with providers and routing
// To add a new page: add a <Route> here + a new page file + sidebar entry
export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="spinning" element={<Spinning />} />
              <Route path="weaving"  element={<Weaving />} />
              <Route path="knitting" element={<Knitting />} />
              <Route path="dyeing"   element={<Dyeing />} />
              <Route path="garments" element={<Garments />} />
              <Route path="ttqc"     element={<TTQC />} />
            </Route>
          </Routes>
        </HashRouter>
      </LangProvider>
    </ThemeProvider>
  );
}
