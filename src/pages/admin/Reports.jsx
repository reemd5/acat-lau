import React, { useEffect, useState } from 'react'
import OutcomesGraph from '../../components/admin/OutcomesGraph'
import Card1 from '../../components/Card1'
import { createReport, getReports } from '../../api/reports'
import CustomSnackbar from '../../components/CustomSnackbar'
import { showSnackbar } from '../../utils/snackbar'

const coursePerformanceData = [
  { course: "MTH207", so: "SO.1", pc: "PC1.1", curr: 10 },
  { course: "CSC380", so: "SO.1", pc: "PC1.2", curr: 75 },
  { course: "CSC322", so: "SO.2", pc: "PC2.2", curr: 45 },
  { course: "CSC430", so: "SO.2", pc: "PC2.3", curr: 90 },
  { course: "CSC490", so: "SO.3", pc: "PC3.1", curr: 71 },
  { course: "CSC490", so: "SO.3", pc: "PC3.2", curr: 55 },
  { course: "LAS204", so: "SO.4", pc: "PC4.1", curr: 100 },
  { course: "LAS204", so: "SO.4", pc: "PC4.2", curr: 99 },
  { course: "CSC375", so: "SO.5", pc: "PC5.1", curr: 70 },
  { course: "CSC599", so: "SO.6", pc: "PC6.3", curr: 89 },
  { course: "CSC123", so: "SO.6", pc: "PC6.2", curr: 70 },
]

const rarelyAchievedData = [
  { pc: "PC1.1", description: "Struggle with mathematical modeling and proofs" },
  { pc: "PC1.2", description: "Difficulty classifying formal languages (regular, context-free, recursive)" },
  { pc: "PC1.3", description: "Challenge solving recurrence relations mathematically" },
  { pc: "PC1.4", description: "Graph algorithm implementation and analysis" },
  { pc: "PC1.5", description: "Dynamic programming problem-solving" },
  { pc: "PC1.6", description: "NP-completeness proofs and reductions" },
  { pc: "PC1.7", description: "Asymptotic notation analysis and complexity calculations" },
  { pc: "PC2.1", description: "Parallel algorithm design and implementation" },
  { pc: "PC2.2", description: "Computer architecture simulation and trade-off analysis" },
  { pc: "PC2.3", description: "Network design with quality attribute trade-offs" },
  { pc: "PC2.4", description: "Database design and implementation with proper normalization" },
  { pc: "PC3.1", description: "Effective visual communication of technical concepts" },
  { pc: "PC3.2", description: "Technical writing with proper grammar and mechanics" },
  { pc: "PC3.3", description: "Audience analysis and tailored communication" },
  { pc: "PC3.4", description: "Effective multimedia presentation skills" },
  { pc: "PC4.1", description: "Understanding and application of ACM/IEEE codes of ethics" },
  { pc: "PC4.2", description: "Critiquing ethical scenarios in computing" },
  { pc: "PC4.3", description: "Articulating ethical tradeoffs in technical decisions" },
  { pc: "PC4.4", description: "Understanding societal impact and legal aspects of computing" },
  { pc: "PC5.1", description: "Project management principles application" },
  { pc: "PC5.2", description: "Group development and team dynamics" },
  { pc: "PC5.3", description: "Conflict management in team settings" },
  { pc: "PC6.1", description: "Complex software solution development" },
  { pc: "PC6.2", description: "Algorithm and data structure selection for computational problems" },
  { pc: "PC6.3", description: "Full software system design and implementation lifecycle" },
]

const getRarelyAchieved = (pc) => {
  const found = rarelyAchievedData.find((item) => item.pc === pc)
  return found ? found.description : "No specific data available"
}

const getBadCourses = () => {
  return coursePerformanceData
    .filter((c) => c.curr < 70)
    .sort((a, b) => a.curr - b.curr)
    .map((c) => ({
      course: c.course,
      so: c.so,
      pc: c.pc,
      percentage: c.curr,
      rarelyAchieved: getRarelyAchieved(c.pc)
    }))
}

const getTopPerformingCourse = () => {
  const allCourses = coursePerformanceData.map((c) => ({
    course: c.course,
    percentage: c.curr
  }))
  const best = allCourses.reduce((max, course) =>
    course.percentage > max.percentage ? course : max
  )
  return { course: best.course, percentage: best.percentage }
}

const getLowestPerformingCourse = () => {
  const allCourses = coursePerformanceData.map((c) => ({
    course: c.course,
    percentage: c.curr
  }))
  const lowest = allCourses.reduce((min, course) =>
    course.percentage < min.percentage ? course : min
  )
  return { course: lowest.course, percentage: lowest.percentage }
}

const calculateAverageScore = () => {
  const total = coursePerformanceData.reduce((sum, course) => sum + course.curr, 0)
  return `${Math.round(total / coursePerformanceData.length)}%`
}

const BadPerformanceCard = () => {
  const badCourses = getBadCourses()

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-[340px] md:h-[380px] xl:h-[420px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <i className="fa-solid fa-circle-exclamation text-(--primary-color) text-xl"></i>
        <h3 className="text-lg font-semibold ">Courses Below Expectations</h3>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1">
        {badCourses.map((c, i) => (
          <div key={i} className="bg-red-100 border border-gray-300 rounded-md px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="font-semibold text-sm">{c.course}</span>
                <span className="text-xs ml-2">{c.so} - {c.pc}</span>
              </div>
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full">
                  {c.percentage}%
                </span>
              </div>
            </div>
            <p className="text-xs">
              <span className="font-medium">Rarely achieved:</span> {c.rarelyAchieved}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const Reports = () => {
  const [processOptions, setProcessOptions] = useState([])
  const [selectedProcess, setSelectedProcess] = useState("")
  const [reportData, setReportData] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const bestCourse = getTopPerformingCourse()
  const lowestCourse = getLowestPerformingCourse()

  useEffect(() => {
    const options = []
    for (let startYear = 2020; startYear <= 2040; startYear += 4) {
      options.push({
        id: `${startYear}-${startYear + 2}`,
        label: `${startYear}-${startYear + 2}`,
      })
    }
    setProcessOptions(options)
  }, [])

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await getReports()
        const reports = Array.isArray(res.data) ? res.data : []
        const sorted = [...reports].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        setReportData(sorted)
      } catch (err) {
        console.error(err)
      }
    }

    loadReports()
  }, [])

  const handleGenerate = async () => {
    if (!selectedProcess) {
      showSnackbar(setSnackbar, "Please select a certain period.", "error")
      return
    }

    try {
      const newReport = {
        id: Date.now(),
        name: `Course Assessment Report - (${selectedProcess})`,
        created_at: new Date().toISOString(),
      }

      const res = await createReport(newReport)
      setReportData((prev) => [res.data, ...prev])
      showSnackbar(setSnackbar, "Report generated successfully.", "success")
    } catch (err) {
      console.error(err)
      showSnackbar(setSnackbar, "Failed to generate report.", "error")
    }
  }

  function ReportRow({ item }) {
    const date = new Date(item.created_at)
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })

    return (
      <div className="flex justify-between border border-gray-300 rounded-lg p-2 mb-2 soft-hover">
        <div className="flex flex-col">
          <p>{item.name}</p>
          <p className="text-xs text-gray-500">Generated on: {formattedDate}</p>
        </div>
        <div className="flex gap-5">
          <button><p className='text-sm bg-(--primary-color) text-white rounded-lg p-1 hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-500'>Download</p></button>
          <button><p className='text-sm border border-gray-300 rounded-lg p-1 soft-hover'>View as PDF</p></button>
        </div>
      </div>
    )
  }

  const ReportHistory = () => reportData.map((item) => <ReportRow key={item.id} item={item} />)

  return (
    <div>
      <div className="pb-4 flex flex-col gap-3">
        <p className="text-(--primary-color) text-3xl font-bold">Reports and Statistics</p>
        <p className="text-md">Generate and view a report accross 2 years. View courses' statistics.</p>
      </div>

      <div className="w-full flex flex-wrap justify-between py-4 gap-2">
        <Card1
          text1="Total Courses"
          text2={coursePerformanceData.length.toString()}
          text1Color="text-white"
          text2Color="text-white"
          iconColor="text-white"
          icon="fa-solid fa-book"
          bgColor="bg-(--primary-color)"
          shadow={true}
        />

        <Card1
          text1="Average Score"
          text2={calculateAverageScore()}
          icon="fa-solid fa-percent"
        />

        <Card1
          text1="Best Performing Course"
          text2={`${bestCourse.course} - ${bestCourse.percentage}%`}
          icon="fa-solid fa-trophy"
        />

        <Card1
          text1="Least Performing Course"
          text2={`${lowestCourse.course} - ${lowestCourse.percentage}%`}
          icon="fa-solid fa-face-frown"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5 lg:h-[310px]">
        <div className="bg-white rounded p-4 col-span-2 flex flex-col">
          <p className="text-lg font-semibold text-(--primary-color)">Generate a report</p>

          <p className="text-sm text-gray-500">Generate a report for two consecutive years.</p>

          <div className="my-6 flex flex-col gap-6 flex-1">
            <div>
              <label className="block mb-1">Academic Years:</label>
              <select
                className="border rounded p-1 w-full"
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
              >
                <option value="">Select process</option>
                {processOptions.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="bg-(--primary-color) text-white hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-500 rounded p-2 w-full mt-auto"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>

        <div className="bg-white rounded-lg p-5 overflow-y-auto col-span-3 lg:h-[310px]">
          <p className="text-lg font-semibold text-(--primary-color) mb-4">Report History</p>
          <ReportHistory />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">
        <OutcomesGraph />
        <BadPerformanceCard />
      </div>

      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </div>
  )
}

export default Reports
