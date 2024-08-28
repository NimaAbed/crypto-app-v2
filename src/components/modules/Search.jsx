import React, { useEffect, useState } from "react";
import { searchCoin } from "../../services/getCoins";
import { TbError404 } from "react-icons/tb";
import SearchLoader from "../modules/SearchLoader";
import styles from "./Search.module.css";

const Search = ({ currency, setCurrency }) => {
    const [text, setText] = useState("");
    const [pending, setPending] = useState({ error: false, loading: false });
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        setCoins([]);
        if (!text) return;

        const search = async () => {
            try {
                setPending((p) => ({ ...p, loading: true }));
                const res = await fetch(searchCoin(text), { signal: controller.signal });
                const json = await res.json();
                setCoins(json.coins || "");
                setPending({ error: false, loading: false });
            } catch (error) {
                if (error.name == "AbortError") return;
                setPending({ error: true, loading: false });
                console.log(error);
            }
        };

        search();

        return () => controller.abort();
    }, [text]);

    const selectHandler = (evt) => {
        setCurrency(evt.target.value);
    };

    const changeHandler = (evt) => {
        setText(evt.target.value);
    };

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Search..." value={text} onChange={changeHandler} />
            <select onChange={selectHandler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
                <option value="try">TRY</option>
            </select>
            <div className={`${styles.searchBox} ${!text ? styles.disable : ""}`}>
                {!pending.loading ? (
                    coins.length ? (
                        <ul>
                            {coins.map((coin) => (
                                <li key={coin.id}>
                                    <img src={coin.thumb} />
                                    <span>{coin.symbol}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={styles.notFound}>
                            {<TbError404 />}
                            <span>Not Found!</span>
                        </div>
                    )
                ) : (
                    <div>
                        <SearchLoader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
