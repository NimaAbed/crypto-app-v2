import React from "react";
import TableRow from "./TableRow";
import Loader from "./Loader";
import styles from "./TableCoin.module.css";

const TableCoin = ({ coins, loading, currency, setChart, chartDay }) => {
    return (
        <div className={styles.container}>
            <table className={styles.main}>
                <thead>
                    <tr className={styles.header}>
                        <th>Coin</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Total Volume</th>
                    </tr>
                </thead>
                {!loading && (
                    <tbody>
                        {coins?.map((coin) => (
                            <TableRow
                                coin={coin}
                                currency={currency}
                                setChart={setChart}
                                key={coin.id}
                                chartDay={chartDay}
                            />
                        ))}
                    </tbody>
                )}
            </table>
            <div className={styles.loadContainer}>{loading && <Loader />}</div>
        </div>
    );
};

export default TableCoin;
