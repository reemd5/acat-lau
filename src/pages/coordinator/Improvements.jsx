import React, { useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import { getCoordinatorImprovements } from "../../api/coordinator";

const Improvements = () => {
  const [improvementRecords, setImprovementRecords] = useState([]);
  const semesters = useMemo(
    () => [...new Set(improvementRecords.map((item) => item.semester))],
    [improvementRecords]
  );

  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImprovements = async () => {
      try {
        const res = await getCoordinatorImprovements();
        setImprovementRecords(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImprovements();
  }, []);

  useEffect(() => {
    if (!selectedSemester && semesters.length > 0) {
      setSelectedSemester(semesters[0]);
    }
  }, [semesters, selectedSemester]);

  const filtered = useMemo(() => {
    if (!selectedSemester) return [];
    const q = searchTerm.toLowerCase();
    return improvementRecords.filter((item) => {
      const matchesSemester = item.semester === selectedSemester;
      const matchesSearch =
        `${item.course_code} ${item.course_name} ${item.instructor_name}`
          .toLowerCase()
          .includes(q);
      return matchesSemester && matchesSearch;
    });
  }, [selectedSemester, searchTerm]);

  const exportCsv = () => {
    const rows = filtered.map((item) => ({
      semester: item.semester,
      course_code: item.course_code,
      course_name: item.course_name,
      instructor_name: item.instructor_name,
      submitted_at: item.submitted_at || "",
      improvement_text:
        item.improvement_text || "No improvements submitted by this instructor.",
    }));

    const headers = [
      "semester",
      "course_code",
      "course_name",
      "instructor_name",
      "submitted_at",
      "improvement_text",
    ];

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => {
            const value = String(row[header] ?? "");
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `improvements-${selectedSemester}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-2xl font-bold text-(--primary-color)">Improvements</p>
          <p className="text-sm text-gray-500">
            Review improvement notes by semester, course, or instructor.
          </p>
        </div>

        <select
          className="w-[180px] border border-gray-300 rounded-md px-3 py-2 bg-white"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {semesters.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <TextField
            label="Search by course or instructor"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ m: 1 }}
          />

          <button
            className="bg-(--primary-color) text-white px-4 py-2 rounded-md hover:bg-(--primary-color-hover) transition-colors duration-300"
            onClick={exportCsv}
          >
            Export CSV
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <p className="text-center text-gray-500 py-12">No data for this semester.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3 pb-3">
                  <p className="text-base font-semibold">
                    {item.course_code} - {item.course_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Submitted Date: {item.submitted_at}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Instructor</p>
                    <p>{item.instructor_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Semester</p>
                    <p>{item.semester}</p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-line text-sm text-gray-700">
                    {item.improvement_text ||
                      "No improvements submitted by this instructor."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Improvements;
