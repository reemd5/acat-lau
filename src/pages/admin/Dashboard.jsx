import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getRemindersOverview } from "../../api/reminders";
import Card1 from "../../components/Card1";
import Card2 from "../../components/Card2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, } from "chart.js";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import { getTotalRemindersSent } from "../../api/reminders";
import { getTotalForms } from "../../api/forms";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationItem from "../../components/notification/NotificationItem";
import QuickActions from "../../components/QuickActions";
import FormCompletionChart from "../../components/FormCompletionChart";
import { getFormCompletionStats } from "../../api/data";

// *************  REMINDERS OVERVIEW  ************* 
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

// *************  DASHBOARD  ************* 
export default function Dashboard() {
  const [reminders, setReminders] = useState(0);
  const [forms, setForms] = useState(0);
  const { settings } = useSettings();
  const navigate = useNavigate();
  const currentSemester = settings?.current_semester;
  const currentYear = settings?.year_number;
  const { notifications } = useNotifications(currentSemester);

  const [chartData, setChartData] = useState([]);

  const chartConfig = [
    {
      key: "submitted",
      label: "Submitted",
      color: "var(--primary-color)",
    },
    {
      key: "in_progress",
      label: "In Progress",
      color: "var(--secondary-color)",
    },
    {
      key: "not_opened",
      label: "Unopened",
      color: "gray",
    },
  ];
  useEffect(() => {
    const fetchCompletionData = async () => {
      try {
        const res = await getFormCompletionStats();
        const dataFromApi = res.data;

        const formatted = chartConfig.map((item) => ({
          value: dataFromApi[item.key] || 0,
          label: item.label,
          labelMarkType: "square",
          color: item.color,
        }));

        setChartData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompletionData();
  }, []);

  useEffect(() => {
    const fetchTotalReminders = async () => {
      try {
        const res = await getTotalRemindersSent();
        setReminders(res.data.total_sent);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalReminders();
  }, []);

  useEffect(() => {
    const fetchTotalForms = async () => {
      try {
        const res = await getTotalForms();
        setForms(res.data.total_forms);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalForms();
  }, []);

  if (!settings) return <p>Loading...</p>;

  return (
    <div>
      <div className="pb-4 flex flex-col gap-3">
        <p className="text-(--primary-color) text-3xl font-bold">Dashboard</p>
        <p className="text-md">
          Here's an overview of your system for the current semester.
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-between py-4 gap-2">
        <Card1
          text1="Total Forms"
          text2={forms}
          text1Color="text-white"
          text2Color="text-white"
          iconColor="text-white"
          icon="fa-solid fa-file"
          bgColor="bg-(--primary-color)"
          shadow={true}
        />
        <Card1
          text1="Current Semester"
          text2={currentSemester}
          icon="fa-solid fa-clock"
        />
        <Card1
          text1="Current Year"
          text2={currentYear}
          icon="fa-solid fa-clock"
        />
        <Card1
          text1="Total Reminders"
          text2={reminders}
          icon="fa-solid fa-bell"
        />
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="flex-1 lg:flex-2 bg-white rounded-lg w-full min-w-0">
          <RemindersGraph />
        </div>

        <div className="flex-1 lg:flex-2 bg-white rounded-lg w-full min-w-0">
          <FormCompletionChart data={chartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 py-6">

        <Card2
          title="Help"
          description="Get help with the system."
          iconClass="fa-solid fa-info"
          primaryBtnText="View Steps"
          onClick={() => navigate("/admin/help")}
        />
        <Card2
          title="Settings"
          description="View settings set by you."
          iconClass="fa-solid fa-info"
          primaryBtnText="View"
          onClick={() => navigate("/admin/settings")}
        />
        <Card2
          title="Courses"
          description="Add courses and their SOs."
          iconClass="fa-solid fa-book"
          primaryBtnText="Add"
          onClick={() => navigate("/admin/courses")}
        />
        <Card2
          title="Staff"
          description="Add and remove staff."
          iconClass="fa-regular fa-user"
          primaryBtnText="Assign"
          onClick={() => navigate("/admin/staff")}
        />
        <Card2
          title="Assignment"
          description="Assign staff to courses."
          iconClass="fa-regular fa-user"
          primaryBtnText="Assign"
          onClick={() => navigate("/admin/assignment")}
        />
        <Card2
          title="Reports"
          description="Generate and view reports."
          iconClass="fa-solid fa-chart-bar"
          primaryBtnText="Generate"
          onClick={() => navigate("/admin/reports")}
        />

        <Card2
          title="Reminders"
          description="Set up and view reminders."
          iconClass="fa-solid fa-bell"
          primaryBtnText="Set Up"
          onClick={() => navigate("/admin/reminders")}
        />

        <Card2
          title="Forms"
          description="View and manage forms."
          iconClass="fa-solid fa-book"
          primaryBtnText="View"
          onClick={() => navigate("/admin/forms")}
        />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-5 h-[360px] overflow-y-auto">
          <div className="flex justify-between items-center">
            <p className="text-(--primary-color) font-bold text-lg mb-4">
              Most Recent Activity
            </p>

            <button
              onClick={() => navigate("/admin/notifications")}
              className="cursor-pointer soft-hover bg-white border p-2 border-(--primary-color) text-(--primary-color) rounded-full  text-sm"
            >
              View All
            </button>
          </div>

          {[...notifications]
            .reverse()
            .slice(0, 5)
            .map((n) => (
              <NotificationItem key={n.id} notification={n} variant="compact" />
            ))}
        </div>

        <div className="lg:col-span-1 bg-white rounded-lg p-5 h-[360px] overflow-y-auto">
          <div className="h-full">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}

