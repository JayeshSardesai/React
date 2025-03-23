import React from "react";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaTwitch,
} from "react-icons/fa";


const items = [
    { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
    { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
    { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
    { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
    { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
    return (
        <div className="w-full mt-24 bg-black text-gray-300 py-y px-2">
            <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-4">
                <div className="col-span-2 pt-1 md:pt-2">
                    <p className="font-bold uppercase mb-2">Subscribe to our newsletter</p>
                    <form className="flex flex-col sm:flex-row">
                        <input
                            className="w-full p-2 mr-4 rounded-md mb-1"
                            type="email"
                            placeholder="Enter email.."
                        />
                        <button className="p-2 mb-1">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
                <p className="py-4">2024 Jayesh React, LLC. All rights reserved</p>
                <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
                    {items.map((x, index) => {
                        return <x.icon key={index} className="hover:text-white" />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Footer;