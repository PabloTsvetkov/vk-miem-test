import type React from "react";

import s from './Header.module.css';

import logo from './../../assets/Rick_and_Morty.svg';

export default function Header():React.ReactNode {
    return (
        <div className={s.headerMainContainer}>
            <img src={logo} alt='rick and morty logo'/>
        </div>
    );
}