import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import { getDetails } from "../../api/forms";
import { useSettings } from "../../context/SettingsContext";

// Instructor Forms Overview Table Component
const InstructorFormsOverviewTable = () => {
  const { settings } = useSettings();
  const current_semester = settings?.current_semester;
  
  const [order, setOrder] = useState("asc"); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);

  // Fetch forms data
  useEffect(() => {
    if (!current_semester) return;
    
    
    const fetchData = async () => {
      try {
        const formsRes = await getDetails(settings.current_semester);
        setDetails(formsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [current_semester]);


  // Filter by current semester
  const filteredBySemester = React.useMemo(() => {
    return details.filter((d) => d.semester === current_semester);
  }, [details, current_semester]);

  // Sorting and search
  const filtered = React.useMemo(() => {
    return filteredBySemester
      .filter((d) =>
        d.instructor_name?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aName = a.instructor_name?.toLowerCase() || "";
        const bName = b.instructor_name?.toLowerCase() || "";
        if (aName < bName) return order === "asc" ? -1 : 1;
        if (aName > bName) return order === "asc" ? 1 : -1;
        return 0;
      });
  }, [filteredBySemester, search, order]);

  // Group forms by instructor for rowspan
  const grouped = React.useMemo(() => {
    const map = {};
    filtered.forEach((form) => {
      const instructor = form.instructor_name;
      if (!map[instructor]) map[instructor] = [];
      map[instructor].push(form);
    });
    return Object.entries(map);
  }, [filtered]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "var(--primary-color)";
      case "In Progress":
        return "var(--secondary-color)";
      case "Not Opened":
        return "gray";
      default:
        return "white";
    }
  };

  const handleRequestSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (_e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <div className="p-4">        
        {/* Search bar */}
          <TextField
            label="Search for an instructor"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleRequestSort}
                >
                  Instructor
                </TableSortLabel>
              </TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {grouped.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" className="py-8">
                  No forms found for the current semester.
                </TableCell>
              </TableRow>
            ) : grouped.map(([instructor, forms], groupIndex) =>
              forms.map((form, index) => {
                const groupRowClass = groupIndex % 2 === 0 ? "bg-gray-100" : "bg-white";
                
                return (
                  <TableRow key={form.id} className={groupRowClass}>
                    {/* Instructor cell only on first row of group */}
                    {index === 0 && (
                      <TableCell rowSpan={forms.length}>
                        {instructor}
                      </TableCell>
                    )}

                    <TableCell>
                      <div>
                        <p >{form.course_code || form.form_name}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p
                        style={{
                          backgroundColor: getStatusColor(form.status),
                          padding: "5px 25px",
                          fontSize: "0.8rem",
                          borderRadius: "50px",
                          color: "white",
                          width: "130px",
                          textAlign: "center",
                        }}
                      >
                        {form.status}
                      </p>
                    </TableCell>

                    <TableCell>
                      {form.status === "Submitted" && form.document ? (
                        <a href={form.document} target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-eye text-(--primary-color) cursor-pointer text-lg"></i>
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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

// Main Forms Component
export default function Forms() {
  return (
    <div>
      {/* Header Section */}
      <div className='pb-4 flex flex-col gap-3'>
        <p className='text-(--primary-color) text-3xl font-bold'>Forms Management</p>
        <p className="text-md">
          View instructor submissions for course assessment forms.
        </p>
      </div>

      {/* Instructor Forms Section */}
      <div className='w-full bg-white rounded-lg shadow-sm p-1'>
        <InstructorFormsOverviewTable />
      </div>
    </div>
  );
}
