import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const OutcomesGraph = ({ apiUrl }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const barsColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--secondary-color")
    .trim();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;

        if (apiUrl) {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error("Failed to fetch chart data");
          data = await response.json();
        } else {
          data = {
            SO1: [70, null, 80],
            SO2: [65, null, 78],
            SO3: [60, null, 72],
            SO4: [68, null, 79],
            SO5: [72, null, 82],
            SO6: [66, null, 77],
          };
        }

        setChartData({
          labels: ["Year1 - Year2", "Gap Year", "Year3 - Year4"],
          datasets: [
            { label: "SO1", data: data.SO1, backgroundColor: barsColor, borderRadius: 6 },
            { label: "SO2", data: data.SO2, backgroundColor: "#6b7280", borderRadius: 6 },
            { label: "SO3", data: data.SO3, backgroundColor: "#9ca3af", borderRadius: 6 },
            { label: "SO4", data: data.SO4, backgroundColor: "#d1d5db", borderRadius: 6 },
            { label: "SO5", data: data.SO5, backgroundColor: "#a5b4fc", borderRadius: 6 },
            { label: "SO6", data: data.SO6, backgroundColor: "#c7d2fe", borderRadius: 6 },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading chart data");
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { backgroundColor: "#1f2937", titleColor: "#fff", bodyColor: "#fff" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { callback: value => value + "%" },
        grid: { color: "#e5e7eb" },
      },
      x: { grid: { display: false } },
    },
  };

  if (loading) return <div className="p-4">Loading chart...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!chartData) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col h-[340px] md:h-[380px] xl:h-[420px]">
      <p className="text-(--primary-color) font-bold text-lg mb-5">5-year Process</p>
      <div className="flex-1">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OutcomesGraph;
