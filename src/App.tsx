import './index.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cotizar from "./pages/Cotizar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cotizar" element={<Cotizar />} />
    </Routes>
  );
}

export default App;
