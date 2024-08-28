import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ coinsPage, setCoinsPage }) => {
    const previousHandler = () => {
        if (coinsPage <= 1) return;
        setCoinsPage(coinsPage - 1);
    };

    const nextHandler = () => {
        if (coinsPage >= 10) return;
        setCoinsPage(coinsPage + 1);
    };

    const clickHandler = (evt) => {
        setCoinsPage(evt.target.innerText);
    };

    return (
        <div className={styles.container}>
            <button onClick={previousHandler} className={coinsPage <= 1 ? styles.disable : ""}>
                Previous
            </button>
            <p onClick={clickHandler} className={coinsPage == 1 ? styles.active : ""}>
                1
            </p>
            <p onClick={clickHandler} className={coinsPage == 2 ? styles.active : ""}>
                2
            </p>
            {coinsPage > 2 && coinsPage < 9 && (
                <>
                    <span>...</span>
                    <p className={styles.active}>{coinsPage}</p>
                </>
            )}
            <span>...</span>
            <p onClick={clickHandler} className={coinsPage == 9 ? styles.active : ""}>
                9
            </p>
            <p onClick={clickHandler} className={coinsPage == 10 ? styles.active : ""}>
                10
            </p>
            <button onClick={nextHandler} className={coinsPage >= 10 ? styles.disable : ""}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
