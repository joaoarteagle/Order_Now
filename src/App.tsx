import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './screens';
import PizzaCount from './screens/pizzaCount';

function App() {
  return (
    <BrowserRouter basename='/Order_Now/'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pizzaCount" element={<PizzaCount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;