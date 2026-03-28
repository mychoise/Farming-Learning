import CropList from "./pages/CropList";
import Navbar from "./components/Navbar";
import CropDetails from "./pages/CropDetails";
import Weather from "./pages/Weather";
import { Routes, Route } from "react-router-dom";
import FertilizerEngine from "./pages/FertilizerEngine";
import InorganicFertilizer from "./pages/InorganicFertilizer";
import CalculationLayout from "./layout/CalculationLayout";
import AnimalWeightEstimator from "./pages/AnimalWeightEstimator";
import UnitConversion from "./pages/UnitConversion";
import CropCalendar from "./pages/CropCalender";
import AiChatDescription from "./pages/AiChatDescription";
import AiLayout from "./layout/AiLayout";
import AiNewChat from "./pages/AiNewChat";
import AiDiseaseDetection from "./pages/AiDiseaseDetection";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div>
        <Toaster />
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/crops" element={<CropList />} />
          <Route path="/crop/:id" element={<CropDetails />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/calculate" element={<CalculationLayout />}>
            <Route path="organic" element={<FertilizerEngine />} />
            <Route path="inorganic" element={<InorganicFertilizer />} />
            <Route path="animal" element={<AnimalWeightEstimator />} />
            <Route path="unit-conversion" element={<UnitConversion />} />
          </Route>
          <Route path="/crop-calendar" element={<CropCalendar />} />
          <Route path="/ai" element={<AiLayout />}>
            <Route index element={<AiNewChat />} />
            <Route path="text/:id" element={<AiChatDescription />} />
            <Route path="disease" element={<AiDiseaseDetection/>} />
          </Route>
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
