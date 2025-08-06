"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const ContactCard = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const socialLinks = [
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      url: "https://wa.me/917385841171",
      color: "text-green-400",
      hoverBg: "bg-green-500",
      label: "WhatsApp",
    },
    {
      id: "linkedin",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/shams-ali-shaikh-27194425a",
      color: "text-blue-400",
      hoverBg: "bg-blue-500",
      label: "LinkedIn",
    },
    {
      id: "github",
      icon: FaGithub,
      url: "https://github.com/Shaikhshams17",
      color: "text-purple-400",
      hoverBg: "bg-purple-500",
      label: "GitHub",
    },
    {
      id: "instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/shamsss_17",
      color: "text-pink-400",
      hoverBg: "bg-pink-500",
      label: "Instagram",
    },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      content: "shaikhshams59@gmail.com",
      isLink: true,
      url: "mailto:shaikhshams59@gmail.com",
      color: "text-indigo-300",
      label: "Email",
    },
    {
      icon: FaPhone,
      content: "+91 7385841171",
      isLink: false,
      color: "text-blue-300",
      label: "Phone",
    },
    {
      icon: FaMapMarkerAlt,
      content: "Lower Parel, Mumbai",
      isLink: false,
      color: "text-purple-300",
      label: "Address",
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center py-6 px-4 overflow-hidden relative mt-8"
      style={{ backgroundColor: "#1d1d46" }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          className="hidden sm:block absolute w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl -top-16 -left-16 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="hidden sm:block absolute w-72 h-72 rounded-full bg-purple-400/10 blur-3xl top-1/2 left-1/3 animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="hidden sm:block absolute w-64 h-64 rounded-full bg-blue-400/10 blur-3xl bottom-0 right-0 animate-pulse"
          style={{ animationDuration: "10s" }}
        />
      </div>

      <div
        className={`relative backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } z-10`}
        style={{ backgroundColor: "#1d1d46" }}
      >
        <div className="flex flex-col md:flex-row items-stretch relative z-10">
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Get in Touch
                </h2>
                <div className="w-20 h-1.5 bg-purple-500 rounded-full mb-4" />
                <p className="text-indigo-100 text-base sm:text-lg leading-relaxed">
                  Have questions, opportunities, or feedback? I'd love to hear from you and discuss how we can collaborate.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center group transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 backdrop-blur-sm mr-4 sm:mr-5 shadow-lg border border-indigo-500/20 group-hover:border-indigo-400/40 transition-all duration-300">
                      <item.icon className={`${item.color} text-xl`} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-indigo-300/70">
                        {item.label}
                      </span>
                      {item.isLink ? (
                        <Link
                          href={item.url}
                          className="block text-base sm:text-lg text-white group-hover:text-indigo-300 transition-all duration-300"
                        >
                          {item.content}
                        </Link>
                      ) : (
                        <p className="block text-base sm:text-lg text-white">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                Connect with me
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-start">
                {socialLinks.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    className="relative group"
                    onMouseEnter={() => setHoveredIcon(social.id)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <span
                      className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-0 transition-all duration-300 whitespace-nowrap ${
                        hoveredIcon === social.id ? "opacity-100 -bottom-4" : ""
                      }`}
                    >
                      {social.label}
                    </span>
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl border border-indigo-500/30 backdrop-blur-sm transition-all duration-500 ${
                        hoveredIcon === social.id
                          ? social.hoverBg
                          : "bg-white/10"
                      }`}
                    >
                      <social.icon
                        size={20}
                        className={`transition-all duration-300 ${
                          hoveredIcon === social.id
                            ? "text-white"
                            : social.color
                        }`}
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 border-t border-indigo-500/20 pt-4">
                <p className="text-indigo-200/60 text-xs sm:text-sm">
                  © {new Date().getFullYear()} | Shams Ali Shaikh
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-0 relative overflow-hidden">
            <div className="hidden sm:block absolute top-0 right-0 w-56 h-56 rounded-full bg-indigo-500/10 blur-2xl" />
            <div className="hidden sm:block absolute bottom-0 left-0 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl" />

            <div className="relative z-10 w-full max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-md transform -rotate-3 scale-105" />
              <div className="relative bg-white/5 p-2 sm:p-4 rounded-3xl border border-indigo-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="w-full h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-t-xl mb-2" />
                <div className="relative rounded-2xl overflow-hidden bg-black/20 aspect-square flex items-center justify-center">
                  <img
                    src="/contact.gif"
                    alt="Contact Illustration"
                    className="w-full h-full object-cover object-center"
                    onLoad={() => setIsLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
                </div>
                <div className="flex justify-center gap-1 mt-3 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;