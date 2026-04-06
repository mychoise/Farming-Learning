import React from "react";

const LogoIcon = () => (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
        <path d="M4 8 L14 4 L24 8 L14 12 Z" stroke="#c8e0bc" strokeWidth="1.5" />
        <path d="M4 8 L4 20 L14 24 L14 12 Z" stroke="#c8e0bc" strokeWidth="1.5" />
        <path d="M24 8 L24 20 L14 24 L14 12 Z" stroke="#c8e0bc" strokeWidth="1.5" />
    </svg>
);

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="w-8 h-8 border border-[#c8e0bc] rounded-full flex items-center justify-center hover:bg-[#c8e0bc22] hover:border-white cursor-pointer transition">
        {children}
    </div>
);

const Footer = ({showFotter}) => {
    return (
        <footer className={`bg-[#0a1f0f] pb-20 text-[#c8e0bc] px-10 py-12 flex flex-col justify-between font-[DM_Sans] ${
            showFotter ? "block" : "hidden"
        }`}>

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left */}
                <div>
                    <div className="flex items-center gap-2 mb-10">
                        <LogoIcon />
                        <span className="font-[medium] uppercase text-[30px] font-bold tracking-widest">
              agrilearn
            </span>
                    </div>

                    <p className="font-[font9] text-[25px] mb-5">Keep in touch</p>

                    <div className="text-[20px] font-[font5] mb-4 space-y-1">
                        <p>9899898898</p>
                        <p>info@agrilearn.com</p>
                    </div>

                    <div className="text-[20px] font-[font5] mb-6 space-y-1">
                        <p>500 Nepal</p>
                        <p>Pokhara, NP 33700</p>
                    </div>

                    <div className="flex font-[font5] gap-2">
                        <SocialIcon>in</SocialIcon>
                        <SocialIcon>ig</SocialIcon>
                        <SocialIcon>fb</SocialIcon>
                        <SocialIcon>yt</SocialIcon>
                    </div>
                </div>

                {/* Middle */}
                <div className="md:pt-16">
                    <p className="font-[font5] text-[25px] mb-5">Company</p>
                    <nav className="space-y-2 text-[18px] font-[font10]">
                        <a href="#" className="underline">About</a>
                        <a href="#" className="block hover:text-white">Services</a>
                        <a href="#" className="block hover:text-white">Technology</a>
                        <a href="#" className="block hover:text-white">Blog</a>
                    </nav>
                </div>

                {/* Right */}
                <div className="md:pt-16">
                    <p className="font-[font7] text-[25px] mb-5">Trust and compliance</p>
                    <nav className="space-y-2 font-[font3] text-[20px]">
                        <a href="#" className="underline">Privacy Policy</a>
                        <br/>
                        <a href="#" className="underline">Accessibility Statement</a>
                    </nav>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-[#1e3a22] pt-6 mt-10 text-[20px] font-[font3]">
                <p>
                    © 2026 by Agrilearn.<br/> Powered and secured by Government of Nepal
                </p>
            </div>
        </footer>
    );
};

export default Footer;