import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!imageRef.current) return;

        // Select all images inside the container
        const images = imageRef.current.querySelectorAll("img");

        gsap.fromTo(
            images,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2, // one after another
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%", // start when container top hits 80% viewport
                    scrub: "top 70%",      // smooth scroll tie
                },
            }
        );
    });

    return (
        <div className="pl-10 pb-10 flex justify-between pt-10 bg-[#F4F4F4]">
            <div className="w-[37%]">
                <h1 className="font-[font10] text-2xl">OUR SERVICES</h1>
                <p className="font-[font3] mt-3 text-4xl">
                    We’ve built a suite of powerful, easy-to-use services that work together to make your entire operation smarter. From soil to sale, we’ve got you covered.
                </p>
            </div>

            <div>
                <div ref={imageRef} className="w-[63%] flex flex-row gap-7">
                    <img src="https://static.wixstatic.com/media/c837a6_dd4a0f7d40534faca1a836f94f2c143e~mv2.jpeg/v1/fill/w_371,h_548,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/AdobeStock_531607815.jpeg" />
               <img src="https://static.wixstatic.com/media/c837a6_511a98d66983426eb2008ca035ccf634~mv2.jpeg/v1/crop/x_2134,y_735,w_1487,h_2200/fill/w_371,h_548,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/AdobeStock_287251984.jpeg"/>
                </div>

                <p className="w-[320px] font-[font3] leading-6 text-[19px] mt-20">
                    This is the space to introduce visitors to your business or brand. Briefly explain who's behind it, what it does and what makes it unique. Share its core values and what your site has to offer.
                </p>

                <button className="bg-[#F3FFB2] mt-6 font-[font10] cursor-pointer text-[18px] hover:underline px-8 border rounded-4xl py-1.5">
                    ALL SERVICES
                </button>
            </div>
        </div>
    );
};

export default Services;