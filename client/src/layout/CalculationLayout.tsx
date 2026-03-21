import { Outlet } from "react-router-dom";
import CalculatorsPanel from "../components/calculation/CalculatorsPanel";

export default function CalculationLayout() {
  return (
    <div className="flex">
      <CalculatorsPanel />
      <main className="flex-1 bg-[#f0ede6] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
