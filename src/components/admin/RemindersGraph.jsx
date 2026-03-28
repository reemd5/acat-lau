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
import { getRemindersOverview } from "../../api/reminders";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const barsColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--secondary-color")
  .trim();

const RemindersGraph = ({ semester = "Fall 2024" }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await getRemindersOverview(semester);

      setChartData({
        labels: res.data.map((item) => item.month),
        datasets: [
          {
            label: "Reminders Sent",
            data: res.data.map((item) => item.reminders_sent),
            backgroundColor: barsColor,
            borderRadius: 6,
          },
        ],
      });
    };

    loadData();
  }, [semester]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (!chartData) return null;

  return (
    <div className="bg-white rounded-xl p-4 h-[300px]">
      <p className="text-(--primary-color) font-bold text-lg mb-5">
        Reminders Overview
      </p>
      <div className="h-[calc(100%-3rem)]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RemindersGraph;