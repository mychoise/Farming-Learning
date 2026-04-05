import MainDiv from "../components/Home/MainDiv.tsx";
import Smart from "../components/Home/Smart.tsx";
import Services from "../components/Home/Services.tsx";
import Build from "../components/Home/Build.tsx";

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
        </div>
    )
}
export default HomePage
