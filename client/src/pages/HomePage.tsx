import MainDiv from "../components/Home/MainDiv.tsx";
import Smart from "../components/Home/Smart.tsx";
import Services from "../components/Home/Services.tsx";
import Build from "../components/Home/Build.tsx";
import Contact from "../components/Home/Contact.tsx";
import BigImage from "../components/Home/BigImage.tsx";
import Footer from "../components/Home/Footer.tsx";

const HomePage = () => {
    return (
        <div>
            {/*Main div*/}
            <MainDiv/>
            {/*Smart Board*/}
            <Smart/>
            {/*Our Services*/}
            <Services/>
            {/*Build*/}
            <Build/>
        {/*Contact*/}
            <Contact/>
            {/*IMage*/}
            <BigImage/>
            {/*Footer*/}
            <Footer/>
        </div>
    )
}
export default HomePage
