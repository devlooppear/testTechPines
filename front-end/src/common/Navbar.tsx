import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoTiaoEPardinho from "../assets/imgs/logo/logo-tiao-e-pardinho.jpeg";
import { FaCompactDisc, FaHome, FaMusic } from "react-icons/fa"; // Importe o ícone

const Navbar = () => {
  const [showAplicationName, setShowAplicationName] = useState(
    window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setShowAplicationName(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="bg-neutral-200 flex justify-between p-2">
        <div className="flex items-center">
          <img
            src={logoTiaoEPardinho}
            className="rounded-md shadow-md max-w-[70px] mr-3"
            alt="logo-tiao-carreiro-e-pardinho"
          />
          {showAplicationName && (
            <h4 className="font-semibold text-[18px]">
              Tião Carreiro & Pardinho
            </h4>
          )}
        </div>
        <ul className="flex items-center">
          <li
            className="bg-neutral-300 rounded-sm px-3 py-1 mx-2 hover:cursor-pointer hover:bg-neutral-100 shadow-md font-semibold text-neutral-700"
            title="Home"
          >
            <Link
              to="/"
              className="flex justify-center align-middle items-center"
            >
              <FaHome className="mr-2" />
              Home
            </Link>
          </li>
          <li
            className="bg-neutral-300 rounded-sm px-3 py-1 mx-2 hover:cursor-pointer hover:bg-neutral-100 shadow-md font-semibold text-neutral-700 flex items-center"
            title="Discografias"
          >
            <FaCompactDisc className="mr-2" />
            <Link
              to="/discographies"
              className="flex justify-center align-middle items-center"
            >
              Discografias
            </Link>
          </li>
          <li
            className="bg-neutral-300 rounded-sm px-3 py-1 mx-2 hover:cursor-pointer hover:bg-neutral-100 shadow-md font-semibold text-neutral-700"
            title="Faixas"
          >
            <Link
              to="/tracks"
              className="flex justify-center align-middle items-center"
            >
              <FaMusic className="mr-2" />
              Faixas
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
