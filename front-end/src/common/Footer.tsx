import { FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";

const Footer = () => {
  return (
    <div>
      <header className="bg-neutral-400 text-neutral-600 text-center p-2 font-semibold">
        Tião Carreiro & Pardinho
      </header>
      <footer className="bg-neutral-200 min-h-[20vh] flex flex-col items-center gap-8 pt-8">
        <h2 className="font-semibold text-neutral-500">
          Gostou do Site? Entre em contato comigo
        </h2>
        <div className="flex justify-center items-center">
          <ul className="flex gap-8">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500"
              >
                <ImGithub size={40} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500"
              >
                <FaLinkedin size={40} />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
