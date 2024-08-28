import React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const ChartComponents = ({ data, type }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={400}
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid stroke="#404042" />
                <XAxis dataKey="date" hide />
                <YAxis dataKey={type} domain={["auto", "auto"]} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={type}
                    stroke="#3474ff"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ChartComponents;
