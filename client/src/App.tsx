import CropList from "./pages/CropList";
import Navbar from "./components/Navbar";
import CropDetails from "./pages/CropDetails";
import Weather from "./pages/Weather";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<CropList />} />
          <Route path="/crop/:id" element={<CropDetails />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
