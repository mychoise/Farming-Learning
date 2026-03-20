import CropList from "./pages/CropList";
import Navbar from "./components/Navbar";
import CropDetails from "./pages/CropDetails";
import Weather from "./pages/Weather";
import { Routes, Route } from "react-router-dom";
import FertilizerEngine from "./pages/FertilizerEngine";
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<CropList />} />
          <Route path="/crop/:id" element={<CropDetails />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/calculate" element={<FertilizerEngine/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
