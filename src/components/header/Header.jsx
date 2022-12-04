import React, { useState } from "react";
import sun from "../../images/icon-sun.svg";
import moon from "../../images/icon-moon.svg";
import { useGlobalState } from "../../context";

const Header = () => {
    const { isDark, setIsDark } = useGlobalState();
    const [themChangin, setThemeChangin] = useState(false);

    const changeTheme = () => {
        setThemeChangin(true);
        setTimeout(() => {
            setIsDark(!isDark);
            setThemeChangin(false);
        }, 200);
    };

    return (
        <header className="header">
            <h1 className="header__title">TODO</h1>
            <button
                aria-label="theme"
                onClick={changeTheme}
                className={
                    isDark && themChangin
                        ? "sun"
                        : !isDark && themChangin
                        ? "moon"
                        : ""
                }
            >
                <img src={isDark ? sun : moon} alt="theme" />
            </button>
        </header>
    );
};

export default Header;
