import { useEffect, useRef, useState } from "react";

const stats = [
    {
        id: "01",
        bold: "40%",
        desc: "More Efficient Water & Nutrient Use",
        bg: "bg-[#dce8f0]",
        icon: <div className="w-full h-full bg-white/40 rounded-full" />,
    },
    {
        id: "02",
        bold: "Up to 25%",
        desc: "Higher Harvest Value",
        bg: "bg-[#e8f0dc]",
        icon: <div className="w-full h-full bg-white/40 rounded-full" />,
    },
    {
        id: "03",
        bold: "98%",
        desc: "Accuracy in Predictive Threat Detection",
        bg: "bg-[#ede8dc]",
        icon: <div className="w-full h-full bg-white/40 rounded-full" />,
    },
    {
        id: "04",
        bold: "Millions",
        desc: "of smart decisions made daily across our network",
        bg: "bg-[#dcede8]",
        icon: <div className="w-full h-full bg-white/40 rounded-full" />,
    },
];

function StatCard({ stat, index }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`flex items-start gap-4 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="flex-1">
        <span className="block mb-3 font-[font10] text-[20px] ">
          [{stat.id}]
        </span>

                <p className="text-sm mt-9 text-[#2d3a2a] leading-snug">
                    <span className="font-[medium] text-[22px]">{stat.bold}</span>
                    <br />
                    <span className="font-[font3] text-[19px]">
                    {stat.desc}
                        </span>
                </p>
            </div>

            <div
                className={`w-[88px] h-[88px] p-2 rounded-sm flex-shrink-0 ${stat.bg}`}
            >
                {stat.icon}
            </div>
        </div>
    );
}

export default function Smart() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="  flex justify-between mb-20 bg-[#FFFFFF] font-serif">

            {/* LEFT */}
            <div
                className={`hidden md:flex w-2/5 px-10 py-16 transition-opacity duration-700 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
            >
                <p className="font-[font10] text-[1.3rem] uppercase">
                    The Impact of Smarter Decisions
                </p>
            </div>

            {/* RIGHT (pushed fully right) */}
            <div className="w-full  mr-20 flex flex-col justify-center items-end">

                {/* Inner wrapper to control width */}
                <div className="max-w-[700px] mt-23 w-full ml-auto">


                    {/* Heading */}
                    <h2
                        className={`text-3xl w-full md:text-4xl mb-12 font-[font3] leading-tight text-[#1a2a18] transition-all duration-700
                        }`}
                    >
                        When intelligence guides your operation, the results speak for
                        themselves. From row crops to orchards and greenhouse, our clients
                        achieve:
                    </h2>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {stats.map((stat, i) => (
                            <StatCard key={stat.id} stat={stat} index={i} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}