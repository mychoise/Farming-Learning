import CropList from "./pages/CropList";
import Navbar from "./components/Navbar";
import CropDetails from "./pages/CropDetails";
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        {/* <CropList /> */}
        <CropDetails />
      </div>
    </div>
  );
};

export default App;
