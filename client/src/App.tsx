import CropList from "./pages/CropList";
import Navbar from "./components/Navbar";
import CropDetails from "./pages/CropDetails";
import Weather from "./pages/Weather";
import { Routes, Route,Navigate } from "react-router-dom";
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
import SignUpPage from "./pages/SignUpPage";
import {useEffect, useState} from "react";
import { refreshToken } from "./api/api";
import {useAuth} from "./store/useAuth";
import NoticesPage from "./pages/NoticesPage";
import NoticeDetail from "./pages/NoticeDetail";
import Post from "./pages/Post";
import Video from "./pages/Video";
import VideoDetail from "./pages/VideoDetail";
import HomePage from "./pages/HomePage.tsx";
import Footer from "./components/Home/Footer.tsx";
import { useLocation } from "react-router-dom";
import CreatePost from "./components/post/CreatePost.tsx";
import PostLayout from "./layout/PostLayout.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import UploadVideo from "./components/admin/UploadVideo.tsx";
import PublishNotice from "./components/admin/PublishNotice.tsx";
import AddCrop from "./components/admin/AddCrop.tsx";
const App = () => {

    const {user} = useAuth();
    const NoFotterPage = ["/login","/signup","/post","/admin","/crop"]
    const [showFotter, setShowFotter] = useState<boolean>(true);
    const location = useLocation();


    useEffect(() => {
        // check path whenever location changes
        if (NoFotterPage.some((path) => location.pathname.includes(path))) {
            setShowFotter(false);
        } else {
            setShowFotter(true);
        }
    }, [location.pathname]);

     useEffect(() => {
    const init = async () => {
      try {
        const res = await refreshToken();
        useAuth.getState().setToken(res.token);
        useAuth.getState().setUser(res.user);
        console.log("Token set successfully", res.token);
      } catch {
        // user not logged in
      }
    };

    init();
  }, []);

  return (
    <div>
        <Toaster />
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        <Routes>
            <Route path="/"  element={<HomePage/>} />
          <Route path="/crops" element={<CropList />} />
          <Route path="/crop/:id" element={<CropDetails />} />
          <Route path="/weather" element={user?<Weather />:<LoginPage/>} />
          <Route path="/calculate" element={user?<CalculationLayout />:<LoginPage/>}>
            <Route path="organic" element={<FertilizerEngine />} />
            <Route path="inorganic" element={<InorganicFertilizer />} />
            <Route path="animal" element={<AnimalWeightEstimator />} />
            <Route path="unit-conversion" element={<UnitConversion />} />
          </Route>
          <Route path="/crop-calendar" element={user?<CropCalendar />:<LoginPage/>} />
          <Route path="/ai" element={user?<AiLayout />:<LoginPage/>}>
            <Route index element={<AiNewChat />} />
            <Route path="text/:id" element={<AiChatDescription />} />
            <Route path="disease" element={<AiDiseaseDetection/>} />
          </Route>
          <Route path="/auth">
              <Route
                  path="login"
                  element={
                      !user ? (
                          <LoginPage />
                      ) : user.role === "admin" ? (
                          <Navigate to="/admin/addCrop" />
                      ) : (
                          <Navigate to="/" />
                      )
                  }
              />
              <Route path="signup" element={!user?<SignUpPage/>:<HomePage/>} />
          </Route>
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/post" element={user?<PostLayout/> :<LoginPage/>} >
                  <Route index element={<Post/>}/>
            <Route path="create" element={<CreatePost/>}/>
          </Route>
                  <Route path="/video" element={<Video/>} />
                  <Route path="/video/:id" element={<VideoDetail/>} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route index path={"addVideo"} element={<UploadVideo/>} />
                <Route path={"addNotice"} element={<PublishNotice/>} />
                <Route path={"addCrop"} element={<AddCrop/>} />
            </Route>
        </Routes>

          <Footer showFotter={showFotter} />
      </div>

    </div>
  );
};

export default App;
