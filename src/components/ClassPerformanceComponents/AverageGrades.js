import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Typography, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AverageGrades = ({ selectedClass }) => {
    const [averageGrades, setAverageGrades] = useState([]);

    const fetchAverageGrades = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/performance/get_all_average_grades_by_class/${selectedClass}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
            setAverageGrades(data);
        } catch (error) {
            console.error("Failed to fetch average grades:", error);
            // Handle errors here
        }
    };

    useEffect(() => {
        if (selectedClass) {
            fetchAverageGrades();
        }
    }, [selectedClass]);

    const CustomAxisTick = (props) => {
        const { x, y, stroke, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)" fontSize={10}>
                    {payload.value}
                </text>
            </g>
        );
    };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className="custom-tooltip"
                    style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}
                >
                    <p className="label">{`${label}`}</p>
                    <p className="intro" style={{ color: "#82ca9d" }}>{`Average Grade: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    // Inside your BarChart component
    <Tooltip content={<CustomTooltip />} />;

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Average Grades of Past Homeworks
            </Typography>

            {/* BarChart to visualize average grades */}
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ResponsiveContainer
                    width={averageGrades.length > 5 ? averageGrades.length * 150 : "100%"}
                    height={350}
                >
                    <BarChart
                        data={averageGrades}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 1,
                            bottom: 20,
                        }}
                        layout={averageGrades.length > 5 ? "vertical" : "horizontal"}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            interval={0}
                            tick={<CustomAxisTick />}
                            height={100} // Adjust this value as needed to provide enough space for labels
                        />

                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend payload={[]} />

                        <Bar dataKey="averageGrade" fill="#82ca9d" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    );
};

export default AverageGrades;
