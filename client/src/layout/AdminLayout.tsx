import Sidebar from "../components/ai/Sidebar";
import { Outlet } from "react-router-dom";

const AiLayout = () => {
    return (
        <div className="flex h-full overflow-hidden ">
            <Sidebar />
            <main className="flex-1 overflow-y-auto ">
                <Outlet />
            </main>
        </div>
    );
};

export default AiLayout;
