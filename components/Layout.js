import Link from "next/link";
import { useState } from "react";
import {
  RiAddCircleLine,
  RiExchangeDollarLine,
  RiUserLine,
} from "react-icons/ri";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/logo.png";

function Layout(props) {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSetActive = (option) => {
    setActive(option);
    setIsOpen(false);
  };
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-white text-2xl font-bold">
                <Image src={logo} height={50} width={60} alt="logo" />
              </Link>
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <NavLink
                  icon={<RiAddCircleLine />}
                  text="Add"
                  active={active === "add"}
                  onClick={() => {
                    handleSetActive("add");
                    router.push("/addForm");
                  }}
                />
                <NavLink
                  icon={<RiExchangeDollarLine />}
                  text="Transactions"
                  active={active === "transactions"}
                  onClick={() => {
                    handleSetActive("transactions");
                    router.push("/transactions");
                  }}
                />
                <NavLink
                  icon={<RiUserLine />}
                  text="Profile"
                  active={active === "profile"}
                  onClick={() => {
                    handleSetActive("profile");
                    router.push("/");
                  }}
                />
              </div>
            </div>
            <div className="flex sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="sm:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavLink
                  icon={<RiAddCircleLine />}
                  text="Add"
                  active={active === "add"}
                  onClick={() => {
                    handleSetActive("add");
                    router.push("/addForm");
                  }}
                />
                <NavLink
                  icon={<RiExchangeDollarLine />}
                  text="Transactions"
                  active={active === "transactions"}
                  onClick={() => {
                    handleSetActive("transactions");
                    router.push("/transactions");
                  }}
                />
                <NavLink
                  icon={<RiUserLine />}
                  text="Profile"
                  active={active === "profile"}
                  onClick={() => {
                    handleSetActive("profile");
                    router.push("/");
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </nav>
      <div>{props.children}</div>
    </>
  );
}

const NavLink = ({ icon, text, active, onClick }) => {
  const baseClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex align-items-center";

  const activeClasses = active ? "bg-gray-900 text-white" : "";

  return (
    <button className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      <span className="mr-2 text-xl">{icon}</span>
      <span> {text}</span>
    </button>
  );
};

export default Layout;
