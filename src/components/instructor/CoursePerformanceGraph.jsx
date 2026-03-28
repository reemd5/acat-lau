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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const barsColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--secondary-color")
  .trim();

const CoursePerformanceGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [semester, setSemester] = useState("");

  const fetchCoursePerformance = async () => {
    return {
      semester: "Fall 2024",
      courses: [
        { course: "CSC243", avgScore: 78 },
        { course: "CSC101", avgScore: 82 },
        { course: "CSC305", avgScore: 85 },
      ],
    };
  };


  useEffect(() => {
    const loadData = async () => {
      const response = await fetchCoursePerformance();

      setSemester(response.semester);

      setChartData({
        labels: response.courses.map((item) => item.course),
        datasets: [
          {
            label: "Average Score",
            data: response.courses.map((item) => item.avgScore),
            backgroundColor: barsColor,
            borderRadius: 6,
          },
        ],
      });
    };

    loadData();
  }, []);

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
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          callback: (value) => `${value}%`,
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
    <div className="bg-white rounded-xl p-4 h-[200px]">
      <p className="text-(--primary-color) font-bold text-lg mb-5">
        Course Performance ({semester})
      </p>


      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CoursePerformanceGraph;
