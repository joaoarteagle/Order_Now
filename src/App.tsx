import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './screens';
import PizzaCount from './screens/PizzaCount';
import SalesHistory from './screens/SalesHistory';
import Revenue from './screens/Revenue';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PizzaCount" element={<PizzaCount />} />
        <Route path="/SalesHistory" element={<SalesHistory />} />
        <Route path="/Revenue" element={<Revenue />} />
      </Routes>
    </HashRouter>
  );
}

export default App;