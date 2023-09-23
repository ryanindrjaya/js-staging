import React from "react";
import Link from "next/link";
import siteConfig from "@iso/config/site.config";
import { IoIosFlash } from "react-icons/io";
import Image from "next/image";
import logo from "../../public/images/logopanjang.jpeg";
import logoKeelola from "../../public/images/keelola_logo.png";

export default function LogoNext({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link href="/dashboard">
              <a>
                <center>
                  <IoIosFlash className="mt-3 text-black" size={27} />
                </center>
              </a>
            </Link>
          </h3>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <img src={logoKeelola} alt="logo" width="full" />
          {/*<Link href="/dashboard">*/}
          {/*  <a  className="text-black"> KEELOLA </a>*/}
          {/*</Link>*/}
        </div>
      )}
    </div>
  );
}
