import { Info, Phone } from "lucide-react";
import React, { useState } from "react";

type touchState = {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phone?: boolean;
    message?: boolean;
}

const Contact = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });

    const [touched, setTouched] = useState<touchState>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBlur = (e:React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    return (
        <div className="bg-[#F3FFB2] pb-30 flex gap-50 p-10">

            {/* LEFT */}
            <div className="w-[60%]  tracking-wide leading-11">
                <h1 className="text-3xl font-[font10]">CONTACT US</h1>
                <p className="font-[font4] mt-2 text-[35px]"> The best technology is built on a great partnership. Our team is ready to work with you to integrate and master the tools of modern, smarter agriculture. </p>
            </div>

            {/* RIGHT */}
            <div className="w-full mt-70 flex items-center justify-center">
                <div className="w-full  max-w-4xl">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* First Name */}
                        <div>
                            <label className="text-[15px] mb-2 font-[font4] block">First name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full bg-transparent border-b font-[font4] border-black py-2 outline-none"
                            />
                            {touched.firstName && !form.firstName && (
                                <p className="flex font-[font5] items-center gap-2 text-sm mt-2">
                                    <Info size={16} />
                                    Enter a first name.
                                </p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="text-[15px] font-[font4] mb-2 block">Last name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full bg-transparent border-b font-[font4] border-black py-2 outline-none"
                            />
                            {touched.lastName && !form.lastName && (
                                <p className="flex font-[font5] items-center gap-2 text-sm mt-2">
                                    <Info size={16} />
                                    Enter a last name.
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-[15px] font-[font4] mb-2 block">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full bg-transparent border-b font-[font4] border-black py-2 outline-none"
                            />
                            {touched.email && !form.email && (
                                <p className="flex font-[font5] items-center gap-2 text-sm mt-2">
                                    <Info size={16} />
                                    Enter an email.
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-[15px] font-[font4] mb-2 block">Phone</label>
                            <div className="flex items-center border-b border-black py-2">
                                <Phone size={16} className="mr-2" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full font-[font4] bg-transparent outline-none"
                                    placeholder="+977"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2">
                            <label className="text-[15px] font-[font4] mb-2 block">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className="w-full bg-transparent font-[font4] border-b border-black py-2 outline-none resize-none"
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-10">
                        <button className="w-full border font-[font10] cursor-pointer border-[#07260D] rounded-full py-3 hover:bg-[#07260D] hover:text-white transition">
                            Submit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;