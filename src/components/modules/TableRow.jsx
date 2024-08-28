import React, { useEffect } from "react";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import styles from "./TableRow.module.css";
import { marketChart } from "../../services/getCoins";
import { moneySymbol } from "../../helpers/convertData";

const TableRow = ({ coin, currency, setChart, chartDay }) => {
    const { id, image, symbol, name, current_price, price_change_percentage_24h, total_volume } =
        coin;

    const chartHandler = async () => {
        try {
            setChart({ chartData: {}, coin });
            const res = await fetch(marketChart(id, currency, chartDay));
            const json = await res.json();
            setChart({ chartData: { ...json }, coin: { ...coin, currency } });
        } catch (error) {
            setChart(null);
        }
    };

    return (
        <tr className={styles.container}>
            <td>
                <div className={styles.symbol} onClick={chartHandler}>
                    <img src={image} alt={name} />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td>
                <div className={styles.price}>
                    {moneySymbol(currency)}
                    {current_price.toLocaleString()}
                </div>
            </td>
            <td style={{ color: price_change_percentage_24h > 0 ? "#85bb65" : "#ff2929" }}>
                {price_change_percentage_24h.toFixed(2)}%
            </td>
            <td>{total_volume.toLocaleString()}</td>
            <td>
                <img src={price_change_percentage_24h > 0 ? chartUp : chartDown} alt={name} />
            </td>
        </tr>
    );
};

export default TableRow;
