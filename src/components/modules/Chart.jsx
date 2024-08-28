import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./Chart.module.css";
import { convertData, moneySymbol } from "../../helpers/convertData";
import ChartComponents from "./ChartComponents";
import { marketChart } from "../../services/getCoins";
import ChartLoader from "./ChartLoader";

const Chart = ({ setChart, chart, chart: { coin, chartData }, setChartDay, chartDay }) => {
    const [type, setType] = useState("prices");
    const buttonHandler = (evt) => {
        const { tagName, value, id } = evt.target;
        if (tagName != "BUTTON") return;
        if (id == "type") {
            setType(value);
        } else if (id == "day") {
            setChartDay(value);
            setChart({ ...chart, chartData: {} });
            const fetchData = async () => {
                try {
                    const res = await fetch(marketChart(coin.id, coin.currency, value));
                    const json = await res.json();
                    setChart({ chartData: { ...json }, coin });
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    };

    const closeHandler = () => {
        setChart(null);
        setChartDay("1");
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.name}>
                    <img src={coin.image} />
                    <h3>{coin.name}</h3>
                </div>
                <div className={styles.graph}>
                    {Object.keys(chartData).length ? (
                        <ChartComponents data={convertData(chart.chartData, type)} type={type} />
                    ) : (
                        <ChartLoader />
                    )}
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.types} onClick={buttonHandler}>
                        <button
                            id="type"
                            value="prices"
                            className={type == "prices" ? styles.active : ""}
                        >
                            Prices
                        </button>
                        <button
                            id="type"
                            value="market_caps"
                            className={type == "market_caps" ? styles.active : ""}
                        >
                            Market Caps
                        </button>
                        <button
                            id="type"
                            value="total_volumes"
                            className={type == "total_volumes" ? styles.active : ""}
                        >
                            Total Volume
                        </button>
                    </div>
                    <div className={styles.days} onClick={buttonHandler}>
                        <button id="day" className={chartDay == "1" ? styles.active : ""} value="1">
                            1 Day
                        </button>
                        <button id="day" className={chartDay == "7" ? styles.active : ""} value="7">
                            1 Week
                        </button>
                        <button
                            id="day"
                            className={chartDay == "30" ? styles.active : ""}
                            value="30"
                        >
                            1 Month
                        </button>
                    </div>
                </div>
                <div className={styles.details}>
                    <div>
                        <p>Prices:</p>
                        <span>
                            {moneySymbol(coin.currency)}
                            {coin.current_price.toLocaleString()}
                        </span>
                    </div>
                    <div>
                        <p>ATH:</p>
                        <span>
                            {moneySymbol(coin.currency)}
                            {coin.high_24h.toLocaleString()}
                        </span>
                    </div>
                    <div>
                        <p>Market cap:</p>
                        <span>
                            {moneySymbol(coin.currency)}
                            {coin.market_cap.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <button className={styles.close} onClick={closeHandler}>
                <IoCloseCircleOutline />
            </button>
        </div>
    );
};

export default Chart;
