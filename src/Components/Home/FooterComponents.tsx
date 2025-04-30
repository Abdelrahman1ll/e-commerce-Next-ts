"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiTiktok } from "react-icons/si";
import {
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

const FooterComponents = () => {
  useEffect(() => {
    // نظف السمات التي أضافتها الإضافات بعد التحميل
    const cleanAttributes = () => {
      document.querySelectorAll("img").forEach((img) => {
        img.removeAttribute("data--h-bstatus");
      });
    };

    window.addEventListener("load", cleanAttributes);
    return () => window.removeEventListener("load", cleanAttributes);
  }, []);

  return (
    <footer className="bg-gray-800 text-white border-t border-gray-700 max-[950px]:mb-16">
      <div className="container mx-auto px-6 py-8 flex flex-col min-[1027px]:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* الدعم الفني ووسائل التواصل */}
        <div className="flex flex-col max-[1027px]:mb-4 items-center  space-y-2">
          <div className="flex space-x-4">
            <Link href="https://tiktok.com" target="_blank">
              <SiTiktok
                size={24}
                className="cursor-pointer hover:text-gray-400"
              />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <FaYoutube
                size={24}
                className="cursor-pointer hover:text-red-600"
              />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaTwitter
                size={24}
                className="cursor-pointer hover:text-blue-400"
              />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <FaLinkedin
                size={24}
                className="cursor-pointer hover:text-blue-700"
              />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram
                size={24}
                className="cursor-pointer hover:text-pink-700"
              />
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <FaFacebookF
                size={24}
                className="cursor-pointer hover:text-blue-500"
              />
            </Link>
            <Link href="https://wa.me/1234567890" target="_blank">
              <FaWhatsapp
                size={24}
                className="cursor-pointer hover:text-green-400"
              />
            </Link>
          </div>
        </div>

        {/* شعارات الدفع */}
        <div className="flex flex-wrap max-[1027px]:mb-4 justify-center  items-center gap-4">
          <Image src="/fawry-en.svg" alt="Fawry" width={48} height={48} />
          <Image
            src="/master-card.svg"
            alt="MasterCard"
            width={48}
            height={48}
            className="uniform-class"
          />
          <Image
            src="/vcash-en.svg"
            alt="Vodafone Cash"
            width={48}
            height={48}
             className="uniform-class"
          />
          <Image src="/visa-en.svg" alt="Visa" width={48} height={48}  className="uniform-class" />
          {/* إذا أردت إضافة المزيد: */}
          <Image src="/paypal.svg" alt="PayPal" width={48} height={48}  className="uniform-class" />
        </div>

        {/* حقوق الملكية */}
        <div className="text-center  md:text-right text-sm">
          <p>جميع الحقوق محفوظة &copy; 2025 HeaterPro</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponents;
