import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  LinearProgress,
} from "@mui/material";
import {
  Visibility,
  Edit,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ----------------------
   SAMPLE DATA
---------------------- */
const data = [
  {
    formName: "CSC243 Fall 2024 Course Evaluation",
    course: "CSC243",
    status: "Not Started",
    progress: 0,
  },
  {
    formName: "CSC101 Fall 2024 Course Evaluation",
    course: "CSC101",
    status: "In Progress",
    progress: 60,
  },
  {
    formName: "CSC243 Fall 2025 Course Evaluation",
    course: "CSC243",
    status: "In Progress",
    progress: 30,
  },
  {
    formName: "CSC305 Fall 2025 Course Evaluation",
    course: "CSC305",
    status: "Submitted",
    progress: 100,
  },
];

/* ----------------------
   STATUS COLOR
---------------------- */
const getStatusColor = (status) => {
  switch (status) {
    case "Submitted":
      return "var(--primary-color)";
    case "In Progress":
      return "var(--secondary-color)";
    case "Not Started":
      return "gray";
    default:
      return "lightgray";
  }
};

export default function InstructorFormTable() {
  const navigate = useNavigate();

  const [order, setOrder] = React.useState("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setPage(0);
  }, [search]);

  /* ----------------------
     SORT HANDLER
  ---------------------- */
  const handleRequestSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  /* ----------------------
     FILTER + SORT
  ---------------------- */
  const filtered = React.useMemo(() => {
    return [...data]
      .filter((row) => {
        const q = search.toLowerCase();
        return (
          row.formName.toLowerCase().includes(q) ||
          row.course.toLowerCase().includes(q) ||
          row.status.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (a.formName < b.formName) return order === "asc" ? -1 : 1;
        if (a.formName > b.formName) return order === "asc" ? 1 : -1;
        return 0;
      });
  }, [order, search]);  

  /* ----------------------
     PAGINATION
  ---------------------- */
  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%"}}>
      {/* HEADER */}
      <Box>
      <div className='pb-4 flex flex-col gap-3'>
        <h1 className="text-(--primary-color) text-3xl font-bold">Forms</h1>
        <p className="text-md">
          Manage and track your assigned forms
          </p>
        </div>
      </Box>

      <div className="bg-white p-2 rounded-lg">
        <p className="text-(--primary-color) font-bold text-lg mb-4">
          Current Assigned Forms
        </p>
        {/* SEARCH */}
        <TextField
          label="Search for a form"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* TABLE */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* SORTABLE FORM NAME */}
              <TableCell>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleRequestSort}
                >
                  Form Name
                </TableSortLabel>
              </TableCell>

              <TableCell>Course</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((row, index) => (
              <TableRow
                key={row.formName}
                hover
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <TableCell>{row.formName}</TableCell>
                <TableCell>{row.course}</TableCell>
               

                {/* STATUS PILL */}
                <TableCell>
                  <p
                    style={{
                      backgroundColor: getStatusColor(row.status),
                      padding: "5px 25px",
                      fontSize: "0.8rem",
                      borderRadius: "50px",
                      display: "inline-block",
                      color: "white",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    {row.status}
                  </p>
                </TableCell>

                {/* PROGRESS */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={row.progress}
                      sx={{
                        width: 80,
                        height: 6,
                        borderRadius: 3,
                      }}
                    />
                    <span className="text-xs">{row.progress}%</span>
                  </Box>
                </TableCell>

                {/* ACTION */}
                <TableCell align="right">
                  {row.status === "Submitted" ? (
                    <Visibility
                      className="cursor-pointer text-(--primary-color)"
                      onClick={() =>
                        navigate(`/instructor/form/view`)
                      }
                    />
                  ) : (
                    <Edit
                      className="cursor-pointer text-(--primary-color)"
                      onClick={() =>
                        navigate(`/instructor/form/edit`)
                      }
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      /> </div>
    </Box>
  );
}
