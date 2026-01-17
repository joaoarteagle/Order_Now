import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './screens';
import PizzaCount from './screens/pizzaCount';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PizzaCount" element={<PizzaCount />} />
      </Routes>
    </HashRouter>
  );
}

export default App;