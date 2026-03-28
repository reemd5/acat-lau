import * as React from "react";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { getCourses, deleteCourseById, updateCourseById, addCourse, } from "../../api/courses";
import { getSOs } from "../../api/so";

const emptyCourse = {
  course_code: "",
  course_title: "",
  so_ids: [],
};

const CoursesTable = () => {
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  const [SOs, setSOs] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("course_code");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [courseData, setCourseData] = React.useState(emptyCourse);

  const normalizeCourse = (course) => {
    return {
      ...course,
      so_ids: course.so_ids || [],
    };
  };

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [coursesRes, soRes] = await Promise.all([getCourses(), getSOs()]);

        const normalizedCourses = coursesRes.data.map(normalizeCourse);
        setCourses(normalizedCourses);
        setSOs(soRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  const names = SOs.map((so) => so.so_code);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  function MultipleSelectChip() {
    const theme = useTheme();

    const handleChange = (event) => {
      const { value } = event.target;
      const selectedCodes =
        typeof value === "string" ? value.split(",") : value;

      const selectedSOs = SOs.filter((so) =>
        selectedCodes.includes(so.so_code),
      ).map((so) => so.id);

      setCourseData((prev) => ({
        ...prev,
        so_ids: selectedSOs,
      }));
    };

    const currentValues = courseData.so_ids
      .map((id) => {
        const so = SOs.find((so) => String(so.id) === String(id));
        return so?.so_code;
      })
      .filter(Boolean);

    return (
      <div>
        <FormControl fullWidth>
          <Select
            id="demo-multiple-chip"
            multiple
            value={currentValues}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" notched={false} />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value, index) => (
                  <Chip key={`${value}-${index}`} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, currentValues, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  const filtered = React.useMemo(() => {
    return [...courses]
      .filter(
        (c) =>
          c?.course_code.toLowerCase().includes(search.toLowerCase()) ||
          c?.course_title.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        const aVal = a[orderBy]?.toLowerCase();
        const bVal = b[orderBy]?.toLowerCase();
        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
      });
  }, [courses, search, order, orderBy]);

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleUpdate = async () => {
    const res = await updateCourseById(selectedId, courseData);

    setCourses((prev) => prev.map((c) => (c.id === selectedId ? res.data : c)));
    setOpenEdit(false);
    setCourseData(emptyCourse);
    setSelectedId(null);
  };

  const handleAdd = async () => {
    const res = await addCourse(courseData);
    setCourses((prev) => [...prev, res.data]);
    setOpenAdd(false);
    setCourseData(emptyCourse);
  };


  const handleDelete = async (id) => {
    await deleteCourseById(id);
    setCourses((prev) => prev.filter((c) => c?.id !== id));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex justify-between p-3">
        <TextField
          label="Search by course name or code"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => {
            setCourseData(emptyCourse);
            setSelectedId(null);
            setOpenAdd(true);
          }}
          className="bg-(--primary-color) text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-300"
        >
          Add Course
        </button>
      </div>

      {/* EDIT DIALOG */}
      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setCourseData(emptyCourse);
          setSelectedId(null);
        }}
        fullWidth
        PaperProps={{ sx: { borderRadius: "10px" } }}
      >
        <DialogTitle className="text-(--primary-color)">
          Edit Course
        </DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label>Course Code: </label>
              <input
                type="text"
                placeholder="eg. CSC XXX"
                value={courseData.course_code}
                onChange={(e) =>
                  setCourseData({ ...courseData, course_code: e.target.value })
                }
                className="border border-gray-400 rounded p-1 w-64"
              />
            </div>
            <div className="flex flex-col">
              <label>Course Name: </label>
              <input
                type="text"
                value={courseData.course_name}
                onChange={(e) =>
                  setCourseData({ ...courseData, course_name: e.target.value })
                }
                className="border border-gray-400 rounded p-1 w-64"
              />
            </div>
          </div>
          <div className="">
            <label>Student Outcome/s:</label>
            <MultipleSelectChip />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setOpenEdit(false)}
            className="border border-gray-400 p-1 rounded w-16 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-(--primary-color) text-white p-1 rounded w-16 cursor-pointer"
          >
            Update
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          setCourseData(emptyCourse);
        }}
        fullWidth
        PaperProps={{ sx: { borderRadius: "10px" } }}
      >
        <DialogTitle className="text-(--primary-color)">Add Course</DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label>Course Code: </label>
              <input
                type="text"
                placeholder="eg. CSC XXX"
                value={courseData.course_code}
                onChange={(e) =>
                  setCourseData({ ...courseData, course_code: e.target.value })
                }
                className="border border-gray-400 rounded p-1 w-64"
              />
            </div>
            <div className="flex flex-col">
              <label>Course Name: </label>
              <input
                type="text"
                value={courseData.course_name}
                onChange={(e) =>
                  setCourseData({ ...courseData, course_name: e.target.value })
                }
                className="border border-gray-400 rounded p-1 w-64"
              />
            </div>
          </div>
          <div className="">
            <label>Student Outcome/s:</label>
            <MultipleSelectChip />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setOpenAdd(false)}
            className="border border-gray-400 p-1 rounded w-16 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-(--primary-color) text-white p-1 rounded w-16 cursor-pointer"
          >
            Add
          </button>
        </DialogActions>
      </Dialog>

      {/* TABLE */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["course_code", "course_title"].map((head) => (
                <TableCell key={head}>
                  <TableSortLabel
                    active={orderBy === head}
                    direction={orderBy === head ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, head)}
                  >
                    {head === "course_code" ? "Course Code" : "Course Name"}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>SOs</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((course) => (
              <TableRow
                key={course.id}
               
                className="even:bg-white odd:bg-gray-100"
              >
                <TableCell>{course.course_code}</TableCell>
                <TableCell>{course.course_name}</TableCell>

                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    {SOs.length === 0 ? (
                      <span className="text-gray-500">Loading SOs...</span>
                    ) : (
                      course.sos.map((so) => {
                      

                        return (
                          <span
                            key={so.id}
                            className="rounded-full px-2 text-sm bg-(--secondary-color)"
                          >
                            {so.so_code}
                          </span>
                        );
                      })
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <i
                    className="fas fa-edit mr-3 cursor-pointer text-(--primary-color)"
                    onClick={() => {
                      setSelectedId(course.id);
                      setCourseData(normalizeCourse(course));
                      setOpenEdit(true);
                    }}
                  />
                  <i
                    className="fas fa-trash cursor-pointer"
                    onClick={() => handleDelete(course.id)}
                  />
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No courses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </Box>
  );
};


const Courses = () => {
  return (
    <div>

      <div className='pb-4 flex flex-col gap-3'>
        <p className='text-(--primary-color) text-3xl font-bold'>Course Management</p>
        <p className="text-md">Add or remove courses and manage their details.
        </p>
      </div>

      <div className='w-full graph-container bg-white rounded flex flex-row justify-between'>
        <CoursesTable />
      </div>
    </div>
  )
}
export default Courses
