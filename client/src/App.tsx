import CropList from "./pages/CropList";
import Navbar from "./components/Navbar";
import CropDetails from "./pages/CropDetails";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<CropList />} />
          <Route path="/crop/:id" element={<CropDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
