import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Creative from "./components/Creative";
import Maternity from "./components/Maternity";
import Contact from "./components/Contact";
import Newborn from "./components/Newborn";
import ScrollToTop from "./components/ScrollToTop";
import Weddings from "./components/Weddings";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creative" element={<Creative />} />
        <Route path="/maternity" element={<Maternity />} />
        <Route path="/newborn" element={<Newborn />} />
        <Route path="/weddings" element={<Weddings />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
