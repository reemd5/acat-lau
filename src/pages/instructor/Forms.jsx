import React, { useEffect, useState } from "react";
import InstructorFormTable from "../../components/instructor/InstructorFormTable";
import SemesterCountdown from "../../components/SemesterCountdown";
import { useLocation } from "react-router-dom";
import FormCompletionChart from "../../components/FormCompletionChart";

const OldForms = () => {
  const [selectedCourse, setSelectedCourse] = useState("Any");
  const [selectedSemester, setSelectedSemester] = useState("Any");
  const [results, setResults] = useState(null);

  // Fake data
  const fakeForms = [
    { id: 1, courseName: "CSC123", semester: "Fall 2024", name: "Course Evaluation" },
    { id: 2, courseName: "CSC123", semester: "Fall 2024", name: "Midterm Feedback" },
    { id: 3, courseName: "CSC201", semester: "Spring 2024", name: "Project Evaluation" },
    { id: 4, courseName: "MAT101", semester: "Fall 2023", name: "Final Course Survey" },
  ];

  // Unique dropdown values
  const courseOptions = ["Any", ...new Set(fakeForms.map(f => f.courseName))];
  const semesterOptions = ["Any", ...new Set(fakeForms.map(f => f.semester))];

  const handleChoose = () => {
    const filtered = fakeForms.filter((form) => {
      const courseMatch =
        selectedCourse === "Any" || form.courseName === selectedCourse;

      const semesterMatch =
        selectedSemester === "Any" || form.semester === selectedSemester;

      return courseMatch && semesterMatch;
    });

    setResults(filtered);
  };

  const handleView = (form) => {
    alert(`Opening form: ${form.name}`);
  };

  return (
    <div className="w-full mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch" id="old-forms">
      <div className="bg-white p-4 rounded-lg h-[320px] overflow-y-auto">
        <p className="text-(--primary-color) font-bold text-lg mb-4">
          Old Forms
        </p>

        <label className="block mb-3">
          Choose a semester and/or a course to view old forms
        </label>

        <div className="flex flex-col md:flex-row gap-4">
          <label className="w-full">Course:
            <select
              className="w-full border rounded-md p-2 mb-3"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>

          <label className="w-full">Semester:
            <select
              className="w-full border rounded-md p-2 mb-3"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {semesterOptions.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleChoose}
            className="bg-(--primary-color) hover:transition hover:bg-(--primary-color-hover) hover:duration-300 text-white px-4 py-2 rounded-md"
          >
            Choose
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg h-[320px] overflow-y-auto">
        <p className="text-(--primary-color) font-bold text-lg mb-4">Results</p>
        {results && results.length > 0 ? (
          <div className="space-y-3">
            {results.map((form) => (
              <div
                key={form.id}
                className="border border-gray-300 rounded-md p-3 flex justify-between items-center soft-hover"
              >
                <div>
                  <p className="font-semibold">{form.name}</p>
                  <p className="text-sm text-gray-500">
                    {form.courseName} | {form.semester}
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <i className="fa-solid fa-eye"></i>
                  <i className="fa-solid fa-download text-(--primary-color)"></i>
                </div>
              </div>
            ))}
          </div>
        ) : results && results.length === 0 ? (
          <p className="text-gray-500 mt-2">No forms found.</p>
        ) : (
          <p className="text-gray-500 mt-2">Choose filters, then click Choose to view results.</p>
        )}
      </div>
    </div>
  );
};


const Forms = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
     const chartData = [
    { value: 10, label: 'Submitted', labelMarkType: 'square', color: 'var(--primary-color)' },
    { value: 20, label: 'In Progress', labelMarkType: 'square', color: 'var(--secondary-color)' },
    { value: 30, label: 'Unopened', labelMarkType: 'square', color: 'gray' },
  ]; 

  return (
    <div className="rounded-lg">
        <InstructorFormTable />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="min-h-[220px]">
            <SemesterCountdown />
          </div>
          <FormCompletionChart
            data={chartData}
            width={280}
            height={180}
            className="h-full"
          />
        </div>

        <OldForms />

      
      </div>
  )
}

export default Forms
