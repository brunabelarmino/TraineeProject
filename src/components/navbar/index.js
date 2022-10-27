import React from "react";
import styles from "./navbar.module.css";
import { Link } from 'react-router-dom'

export default props => {
    const navbarColor = {
        backgroundColor: props.colorfinal 
    }
    return (
        <div className={styles.navbar} style = {navbarColor}>
            <h1 class="logo">
            <span class="text-primary"> Trainee </span>Project
            </h1>
            <nav>
                <ul>
                    <Link to = "/home" ><li>Home</li></Link>
                    <Link to = "/login" ><li>Login</li></Link>
                </ul>
            </nav>
        </div>
    )
}