import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-second items-center p-4 lg:px-30">
        <aside className="grid-flow-col items-center justify-center text-main">
          <Link to={"/"}>
            <img src={logo} alt="" className="w-40" />
          </Link>
          |
          <p>
            Copyright © {new Date().getFullYear()} - Yalla All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col justify-self-center gap-4 md:place-self-center md:justify-self-end">
          <a href="/" className="text-main hover:text-black transition-colors">
            <FaFacebook size={25} />
          </a>
          <a href="/" className="text-main hover:text-black transition-colors">
            <FaInstagram size={25} />
          </a>
          <a href="/" className="text-main hover:text-black transition-colors">
            <FaTwitter size={25} />
          </a>
          <a href="/" className="text-main hover:text-black transition-colors">
            <FaYoutube size={25} />
          </a>
        </nav>
      </footer>
    </>
  );
}

export default Footer