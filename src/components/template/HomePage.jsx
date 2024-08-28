import React, { useEffect, useState } from "react";
import { getCoinsList } from "../../services/getCoins";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

const HomePage = () => {
    const [coins, setCoins] = useState([]);
    const [currency, setCurrency] = useState("usd");
    const [coinsPage, setCoinsPage] = useState(1);
    const [chart, setChart] = useState(null);
    const [chartDay, setChartDay] = useState(1);
    const [pending, setPending] = useState({ error: false, loading: false });

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setPending((p) => ({ ...p, loading: true }));
                const data = await fetch(getCoinsList(coinsPage, currency), {
                    signal: controller.signal,
                });
                const res = await data.json();
                setCoins(res);
                setPending({ loading: false, error: false });
            } catch (error) {
                if (error.name == "AbortError") return;
                console.log(error.name);
                setPending({ loading: false, error: true });
            }
        };
        fetchData();
        return () => controller.abort();
    }, [coinsPage, currency]);
    return (
        <div>
            <Search currency={currency} setCurrency={setCurrency} />
            <TableCoin
                coins={coins}
                loading={pending.loading}
                currency={currency}
                setChart={setChart}
                chartDay={chartDay}
            />
            <Pagination coinsPage={coinsPage} setCoinsPage={setCoinsPage} />
            {chart && (
                <Chart
                    chart={chart}
                    setChart={setChart}
                    chartDay={chartDay}
                    setChartDay={setChartDay}
                />
            )}
        </div>
    );
};

export default HomePage;
