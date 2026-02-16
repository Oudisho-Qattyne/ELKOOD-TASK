import { GiHamburgerMenu } from "react-icons/gi";
import { RiToothLine } from "react-icons/ri";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router";
import { FaBookmark, FaHome } from "react-icons/fa";

export default function Header() {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);

    return (
        <>
            <div className="fixed w-full h-20 bg-leight dark:bg-dark-foreground flex flex-row justify-between items-center px-5 z-10000">
                <div className='relative flex flex-row gap-3 justify-center items-center'>
                    <div onClick={() => setOpenSideBar(prev => !prev)} className='relative cursor-pointer'>
                        {openSideBar ?
                            <IoCloseSharp className="text-3xl dark:text-white text-dark" /> :
                            <GiHamburgerMenu className="text-3xl dark:text-white text-dark" />
                        }
                    </div>
                    <Link to={'/'} >
                        <RiToothLine className="text-4xl dark:text-white text-dark font-black" />
                    </Link>
                    <p>Dentist Reservation App</p>
                </div>
                <ThemeToggle />
            </div>

            {openSideBar && (
                <div
                    onClick={() => setOpenSideBar(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1000 transition-opacity duration-300"
                />
            )}

            <div className={`fixed top-20 left-0 w-80 h-full bg-leight/90 dark:bg-dark-foreground/90 backdrop-blur-md z-10000 transform transition-transform duration-300 ${openSideBar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col items-start gap-8 p-10">
                    <Link
                        to="/"
                        className="text-xl hover:text-primary hover:underline transition-colors select-none flex flex-row justify-center items-center gap-3"
                        onClick={() => setOpenSideBar(false)}
                    >
                        <FaHome />
                        Home
                    </Link>
                    <Link
                        to="/reservations"
                        className="text-xl hover:text-primary hover:underline transition-colors select-none flex flex-row justify-center items-center gap-3"
                        onClick={() => setOpenSideBar(false)}
                    >
                        <FaBookmark />
                        Reservations
                    </Link>

                </div>
            </div>
        </>
    );
}