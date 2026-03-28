import React, { useEffect, useState } from 'react'
import Card1 from '../../components/Card1'
import { useNavigate } from 'react-router-dom'
import { useSettings } from "../../context/SettingsContext";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationItem from "../../components/notification/NotificationItem";
import QuickActions from '../../components/QuickActions';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  getCoordinatorDashboardStats,
  getCoordinatorImprovements,
} from "../../api/coordinator";

const getBadgeColor = (hasImprovements) =>
  hasImprovements ? "var(--secondary-color)" : "var(--primary-color)";

const RecentSubmissionsTable = ({ submissions }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = submissions;

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex flex-row justify-between">
        <p className="text-xl pb-2 font-semibold text-(--primary-color)">
          Recent Submissions
        </p>
        <button
          className="text-[var(--primary-color)] border rounded-full p-2 soft-hover"
          onClick={() => navigate("/coordinator/improvements")}
        >
          View all Improvements
        </button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Instructor</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Form</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Improvements</TableCell>
              <TableCell>View Form</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((row) => {
              const hasImprovements =
                row.improvements && row.improvements.trim() !== "";

              return (
                <TableRow
                  key={row.id}
                  className="even:bg-white odd:bg-gray-100"
                >
                  <TableCell>{row.instructor}</TableCell>
                  <TableCell>{row.course}</TableCell>
                  <TableCell>{row.form}</TableCell>
                  <TableCell>{row.submitted}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        backgroundColor: getBadgeColor(hasImprovements),
                        color: "white",
                        padding: "4px 14px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        display: "inline-block",
                      }}
                    >
                      {hasImprovements ? "Has Improvements" : "None"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        className="cursor-pointer"
                        onClick={() => navigate(`/coordinator/improvements/${row.id}`)}
                      >
                        <i className="fa-solid fa-eye text-lg"></i>
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => navigate(`/coordinator/improvements/${row.id}`)}
                      >
                        <i className="fa-solid fa-mail text-lg"></i>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filtered.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const currentSemester = settings?.current_semester;
  const { notifications } = useNotifications(currentSemester);
  const [stats, setStats] = useState({
    form_submissions: 0,
    my_instructors: 0,
    number_of_improvements: 0,
    no_improvements: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  useEffect(() => {
    const fetchCoordinatorData = async () => {
      try {
        const [statsRes, improvementsRes] = await Promise.all([
          getCoordinatorDashboardStats(currentSemester),
          getCoordinatorImprovements(),
        ]);
        setStats((statsRes.data && statsRes.data[0]) || {});
        const mappedSubmissions = (improvementsRes.data || [])
          .filter((row) => row.semester === currentSemester)
          .sort((a, b) => {
            const bTime = Number.isNaN(new Date(b.submitted_at).getTime())
              ? 0
              : new Date(b.submitted_at).getTime();
            const aTime = Number.isNaN(new Date(a.submitted_at).getTime())
              ? 0
              : new Date(a.submitted_at).getTime();
            return bTime - aTime;
          })
          .map((row) => ({
            id: row.id,
            instructor: row.instructor_name,
            course: `${row.course_code} - ${row.course_name}`,
            form: "Course Assessment Form",
            submitted: row.submitted_at,
            improvements: row.improvement_text || "",
          }));
        setRecentSubmissions(mappedSubmissions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCoordinatorData();
  }, [currentSemester]);

  return (
    <div>
      <div className='pb-5'>
        <p className='text-[var(--primary-color)] text-3xl font-bold'>Dashboard</p>
        <p className="text-[var(--primary-color)] text-md">Here's an overview of your system.
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-between py-4 gap-2">
        <Card1
          text1="Form Submissions"
          text2={stats.form_submissions || 0}
          icon="fa-solid fa-file"
          shadow={true}
          bgColor="bg-[var(--primary-color)]"
          text1Color="text-white"
          text2Color="text-white"
          iconColor="text-white"
        />
        <Card1
          text1="My Instructors"
          text2={stats.my_instructors || 0}
          icon="fa-solid fa-users"
          shadow={false}
        />
        <Card1
          text1="Number of Improvements"
          text2={stats.number_of_improvements || 0}
          icon="fa-solid fa-check"
          shadow={false}
        />
        <Card1
          text1="No Improvements"
          text2={stats.no_improvements || 0}
          icon="fa-solid fa-x"
          shadow={false}
        />

      </div>

      <div className='flex w-full bg-white rounded p-5'>
        <RecentSubmissionsTable submissions={recentSubmissions} />

      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-5 h-[360px] overflow-y-auto">
          <div className='flex justify-between '>
            <p className="text-[var(--primary-color)] font-bold text-lg mb-4">Recent Activity</p>
            <button onClick={() => navigate("/coordinator/notifications")}
              className="cursor-pointer soft-hover bg-white border p-2 border-(--primary-color) text-(--primary-color) rounded-full transition-colors duration-500 text-sm">View All</button>


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
  )
}

export default Dashboard
