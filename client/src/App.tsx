import CropList from "./pages/CropList"
import Navbar from "./components/Navbar"
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        <CropList />
      </div>
    </div>
  )
}

export default App