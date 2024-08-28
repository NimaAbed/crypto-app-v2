import React from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
    return (
        <>
            <header className={styles.header}>
                <h1>Crypto App</h1>
                <p>Botostart | React.js</p>
            </header>
            {children}
            <footer className={styles.footer}>
                <p>Developed by nima with ❤</p>
            </footer>
        </>
    );
};

export default Layout;
