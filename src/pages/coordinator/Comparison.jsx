import React, { useEffect, useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getCoordinatorComparison } from "../../api/coordinator";

const Comparison = () => {
  const [comparisonRecords, setComparisonRecords] = useState([]);
  const semesters = useMemo(
    () => [...new Set(comparisonRecords.map((item) => item.semester))],
    [comparisonRecords]
  );
  const courses = useMemo(() => {
    const map = new Map();
    comparisonRecords.forEach((item) => {
      if (!map.has(item.course_code)) {
        map.set(item.course_code, {
          course_code: item.course_code,
          course_name: item.course_name,
        });
      }
    });
    return [...map.values()];
  }, [comparisonRecords]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const res = await getCoordinatorComparison();
        setComparisonRecords(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComparison();
  }, []);

  useEffect(() => {
    if (!selectedSemester && semesters.length > 0) {
      setSelectedSemester(semesters[0]);
    }
  }, [semesters, selectedSemester]);

  const filtered = useMemo(() => {
    return comparisonRecords.filter(
      (item) =>
        item.course_code === selectedCourse && item.semester === selectedSemester
    );
  }, [comparisonRecords, selectedCourse, selectedSemester]);

  const selectedCourseInfo = courses.find((c) => c.course_code === selectedCourse);
  const soAxis = filtered[0]?.so_scores?.map((s) => s.so_code) || [];
  const palette = ["#0c796e", "#5ebab1", "#ef4444", "#f59e0b", "#6366f1"];
  const singleInstructor = filtered[0];
  const singleInstructorAvg = singleInstructor
    ? Math.round(
        singleInstructor.so_scores.reduce((sum, so) => sum + so.percentage, 0) /
          singleInstructor.so_scores.length
      )
    : 0;
  const singleInstructorMet = singleInstructorAvg >= 70;

  return (
    <div>
      <div className="mb-6">
        <p className="text-2xl font-bold text-(--primary-color)">Comparison</p>
        <p className="text-sm text-gray-500">
          Compare instructor performance by course and semester.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-6 pt-6">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500 mb-1 block">
                Course
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.course_code} value={course.course_code}>
                    {course.course_code} - {course.course_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-[200px]">
              <label className="text-sm font-medium text-gray-500 mb-1 block">
                Semester
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
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
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
          {!selectedCourse && (
            <p className="text-center text-gray-500 py-12">Select a course to start comparison.</p>
          )}

          {selectedCourse && filtered.length === 0 && (
            <p className="text-center text-gray-500 py-12">No data found for selected filters.</p>
          )}

          {selectedCourse && filtered.length === 1 && (
            <div className="text-center py-12 px-4">
              <ErrorOutlineIcon className="!h-10 !w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-lg font-medium">Can&apos;t Compare</p>
              <p className="text-gray-500 text-sm mb-4">
                Only one instructor record exists for this course and semester.
              </p>

              <div className="max-w-md mx-auto border border-gray-200 rounded-lg p-4 text-left">
                <p className="font-semibold mb-2">{singleInstructor.instructor_name}</p>
                <p className="text-sm mb-2">
                  Course average: <span className="font-semibold">{singleInstructorAvg}%</span>
                </p>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    singleInstructorMet ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {singleInstructorMet ? "Met Expectations" : "Did Not Meet Expectations"}
                </span>
              </div>
            </div>
          )}

          {selectedCourse && filtered.length >= 2 && (
            <>
              <p className="text-base font-semibold mb-4">
                {selectedCourseInfo?.course_code} - {selectedCourseInfo?.course_name} ({selectedSemester})
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {filtered.map((instructor) => {
                  const avg = Math.round(
                    instructor.so_scores.reduce((sum, so) => sum + so.percentage, 0) /
                      instructor.so_scores.length
                  );
                  const met = avg >= 70;
                  return (
                    <div
                      key={`summary-${instructor.id}`}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <p className="font-semibold text-sm">{instructor.instructor_name}</p>
                      <p className="text-sm mb-2">Overall: {avg}%</p>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          met ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {met ? "Met Expectations" : "Did Not Meet (<70%)"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-[320px]">
                <BarChart
                  xAxis={[{ scaleType: "band", data: soAxis }]}
                  series={filtered.map((instructor, idx) => ({
                    label: instructor.instructor_name,
                    data: soAxis.map(
                      (soCode) =>
                        instructor.so_scores.find((so) => so.so_code === soCode)?.percentage || 0
                    ),
                    color: palette[idx % palette.length],
                  }))}
                  yAxis={[{ min: 0, max: 100 }]}
                  height={320}
                  margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                />
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Comparison;
