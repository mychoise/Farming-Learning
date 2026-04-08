import MainDiv from "../components/Home/MainDiv.tsx";
import Smart from "../components/Home/Smart.tsx";
import Services from "../components/Home/Services.tsx";
import Build from "../components/Home/Build.tsx";
import Contact from "../components/Home/Contact.tsx";
import BigImage from "../components/Home/BigImage.tsx";
import Footer from "../components/Home/Footer.tsx";
import Lenis from "@studio-freight/lenis";
import {useEffect, useRef} from "react";

const HomePage = () => {
    const scrollRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 3, // scroll animation duration
        });

        scrollRef.current = lenis;

        // Animate scroll frame
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

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
            {/*<Footer/>*/}
        </div>
    )
}
export default HomePage
