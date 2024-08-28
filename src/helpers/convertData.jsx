import { LuJapaneseYen } from "react-icons/lu";
import { LuRussianRuble } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";
import { FaLiraSign } from "react-icons/fa";

const convertData = (data, type) => {
    const convertedData = data[type]?.map((item) => {
        return {
            date: item[0],
            [type]: item[1],
        };
    });
    return convertedData;
};

const moneySymbol = (data) => {
    const convertData = {
        usd: <LuDollarSign />,
        eur: <LuRussianRuble />,
        jpy: <LuJapaneseYen />,
        try: <FaLiraSign />,
    };
    return convertData[data];
};

export { convertData, moneySymbol };
