import React from "react";
import Link from "next/link";
import siteConfig from "@iso/config/site.config";
import { IoIosFlash } from "react-icons/io";
import Image from "next/image";
import logo from "../../public/images/logo.jpeg";

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
        <h3>
          <Image
            src={logo}
            alt="logo"
            width="70px"
            height="70px"
          />
          {/* <Link href="/dashboard">
            <a className="text-black">JAYA SEHAT</a>
          </Link> */}
        </h3>
      )}
    </div>
  );
}
