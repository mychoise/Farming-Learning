import {Navigate, Outlet} from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.tsx";
import {useAuth} from "../store/useAuth.tsx";

const AiLayout = () => {
    const {user} = useAuth();
    console.log("user is",user)
    if(!user){
        return <Navigate to={"/login"}/>
    }
    if (user?.role !== "admin") {
        return <Navigate to="/" />;
    }
    return (
        <div className="flex h-full overflow-hidden ">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto ">
                <Outlet />
            </main>
        </div>
    );
};

export default AiLayout;
