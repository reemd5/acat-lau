import React, { useState, useEffect } from "react";

const OutcomesTable = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData;
        if (apiUrl) {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error("Failed to fetch outcome data");
          fetchedData = await response.json();
        } else {
          fetchedData = [
            { SO: "SO1", values: { "2020-2021": 75, "2023-2024": 80, "2026-2027": 82 } },
            { SO: "SO2", values: { "2020-2021": 68, "2023-2024": 70, "2026-2027": 76 } },
            { SO: "SO3", values: { "2020-2021": 72, "2023-2024": 74, "2026-2027": 78 } },
            { SO: "SO4", values: { "2020-2021": 63, "2023-2024": 74, "2026-2027": 80 } },
            { SO: "SO5", values: { "2020-2021": 70, "2023-2024": 72, "2026-2027": 81 } },
            { SO: "SO6", values: { "2020-2021": 65, "2023-2024": 68, "2026-2027": 75 } },
          ];
        }
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading outcome data");
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const calcChange = (a, b) => {
    if (a === null || b === null) return "-";
    const diff = ((b - a) / a) * 100;
    return `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`;
  };

  if (loading) return <div className="p-4">Loading table...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data.length) return <div className="p-4">No data available</div>;

  const allYears = Object.keys(data[0].values).sort();

  return (
    <div className="bg-white p-4 rounded-xl overflow-auto">
      <p className="text-(--primary-color) font-bold text-lg mb-4">
        10-year Process
      </p>

      <table className="min-w-full border border-gray-300 text-center">
        <thead className="bg-(--primary-color) text-white">
          <tr>
            <th className="border px-4 py-2">SO</th>
            {allYears.slice(1).map((year, i) => (
              <th key={year} className="border px-4 py-2">
                {allYears[i]} vs {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((so) => (
            <tr key={so.SO} className="hover:bg-gray-50">
              <td className="border px-4 py-2 font-semibold">{so.SO}</td>
              {allYears.slice(1).map((year, i) => {
                const fromYear = allYears[i];
                const toYear = year;
                const fromValue = so.values[fromYear];
                const toValue = so.values[toYear];
                const change = calcChange(fromValue, toValue);
                return (
                  <td
                    key={toYear}
                    className={`border px-4 py-2 ${
                      change.startsWith("+")
                        ? "text-(--primary-color)"
                        : change.startsWith("-")
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {fromValue}% → {toValue}% ({change})
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutcomesTable;
