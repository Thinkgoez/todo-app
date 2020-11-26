//@flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = (): React.Node => (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
        <div className="navbar-brand">
            Note App
        </div>

        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Главная</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/about">Информация</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/sign-up">Зарегистрироватся</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/sign-in">Логинизироваться</NavLink>
            </li>
        </ul>
    </nav>
)