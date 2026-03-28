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
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { createStaff, deleteStaff, getStaff, updateStaff } from "../../api/staff";
import { getCampuses } from "../../api/campuses";
import { getDepartments } from "../../api/departments";


const getRoleColor = (role) => {
  if (role === "coordinator") return "var(--secondary-color)";
  if (role === "instructor") return "var(--primary-color)";
  return "gray";
};


const emptyStaff = {
  first_name: "",
  last_name: "",
  campus: [],
  department: "Computer Science and Mathematics",
  email: "",
  role: [],
};

const StaffDetailsTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("fullName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");

  const [staff, setStaff] = React.useState([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [staffData, setStaffData] = React.useState(emptyStaff);
  const [selectedId, setSelectedId] = React.useState(null);
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const [emailedStaff, setEmailedStaff] = React.useState(null);
  const [emailSubject, setEmailSubject] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");


  const [campuses, setCampuses] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);



  // GET STAFF
  React.useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await getStaff();
        setStaff(
          res.data.filter(
            (s) =>
              s.role?.includes("instructor") ||
              s.role?.includes("coordinator")
          )
        );
      } catch (error) {
        console.log(error);
      }
    };


    fetchStaff();

    const fetchCampuses = async () => {
      try {
        const res = await getCampuses();
        setCampuses(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCampuses();

    const fetchDepartments = async () => {
      try {
        const res = await getDepartments();
        setDepartments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDepartments();
  }, []);

  React.useEffect(() => {
    setPage(0);
  }, [search]);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = React.useMemo(() => {
    return [...staff]
      .filter((s) =>
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal =
          orderBy === "fullName"
            ? `${a.first_name} ${a.last_name}`.toLowerCase()
            : a[orderBy]?.toString().toLowerCase();

        const bVal =
          orderBy === "fullName"
            ? `${b.first_name} ${b.last_name}`.toLowerCase()
            : b[orderBy]?.toString().toLowerCase();

        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
      });

  }, [staff, order, orderBy, search]);

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // EDIT STAFF
  const handleUpdate = async () => {
    try {
      const res = await updateStaff(selectedId, staffData);
      setStaff((prev) =>
        prev.map((s) => (s.id === selectedId ? res.data : s))
      );
      setOpenEdit(false);
      setStaffData(emptyStaff);
    }
    catch (error) { console.log(error) }
  }

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      setStaff((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  // ADD STAFF
  const handleSaveStaff = async () => {
    try {
      const res = await createStaff(staffData);
      setStaff((prev) => [...prev, res.data]);
      setOpenAdd(false);
      setStaffData(emptyStaff);
    } catch (error) {
      console.log(error);
    }
  };

  // OPEN EMAIL MODAL
  const handleOpenEmailModal = (staffMember) => {
    setEmailedStaff(staffMember);
    setEmailSubject("");
    setEmailMessage("");
    setEmailModalOpen(true);
  };

  // CLOSE EMAIL MODAL
  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
    setEmailedStaff(null);
  };

  // SEND EMAIL (placeholder for now)
  const handleSendEmail = async () => {
    try {
      console.log("Sending email to:", emailedStaff.email);
      console.log("Subject:", emailSubject);
      console.log("Message:", emailMessage);

      alert(`Email sent to ${emailedStaff.email}`);
      handleCloseEmailModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
        }}
      >
        <TextField
          label="Search for a staff member"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-(--primary-color) px-4 py-2 text-white rounded-lg hover:bg-(--primary-color-hover) transition-colors duration-500"
        >
          Add a Member
        </button>
      </div>

      {/* ADD STAFF DIALOG */}
      <Dialog
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          setStaffData(emptyStaff);
        }}
        fullWidth
        PaperProps={{ sx: { borderRadius: "10px", height: "45vh", } }}
      >
        <DialogTitle className="text-(--primary-color)">Add Staff Member</DialogTitle>

        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 3, overflowY: "auto", }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              label="First Name"
              size="small"
              fullWidth
              value={staffData.first_name}
              onChange={(e) =>
                setStaffData({ ...staffData, first_name: e.target.value })
              }
            />

            <TextField
              label="Last Name"
              size="small"
              fullWidth
              value={staffData.last_name}
              onChange={(e) =>
                setStaffData({ ...staffData, last_name: e.target.value })
              }
            />
          </Box>

          {/* Email */}
          <TextField
            label="Email"
            size="small"
            fullWidth
            type="email"
            value={staffData.email}
            onChange={(e) =>
              setStaffData({ ...staffData, email: e.target.value })
            }
          />

          {/* Campus + Department */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Campus</InputLabel>
              <Select
                multiple
                value={staffData.campus || []}
                label="Campus"
                onChange={(e) =>
                  setStaffData({
                    ...staffData,
                    campus: e.target.value,
                  })
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {campuses.map((campus) => (
                  <MenuItem key={campus.id} value={campus.name}>
                    {campus.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select
                value={staffData.department}
                label="Department"
                onChange={(e) =>
                  setStaffData({ ...staffData, department: e.target.value })
                }
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.name}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Role (No Admin, Multi Select with Chips) */}
          <FormControl fullWidth size="small">
            <InputLabel>Role</InputLabel>
            <Select
              multiple
              value={staffData.role}
              label="Role"
              onChange={(e) =>
                setStaffData({ ...staffData, role: e.target.value })
              }
              input={<OutlinedInput label="Role" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="coordinator">Coordinator</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <button
            className="border border-gray-400 p-1 rounded w-16"
            onClick={() => {
              setOpenAdd(false);
              setStaffData(emptyStaff);
            }}
          >
            Cancel
          </button>

          <button
            className="bg-(--primary-color) text-white p-1 rounded w-16 rounded hover:bg-(--primary-color-hover) transition-colors duration-500"
            onClick={handleSaveStaff}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>

      {/* UPDATE STAFF DIALOG*/}
      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setStaffData(emptyStaff);
          setSelectedId(null);
        }}
        fullWidth
        PaperProps={{ sx: { borderRadius: "10px", height: "45vh", } }}
      >
        <DialogTitle className="text-(--primary-color)">Update Details</DialogTitle>

        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 3, overflowY: "auto", }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              label="First Name"
              size="small"
              fullWidth
              value={staffData.first_name}
              onChange={(e) =>
                setStaffData({ ...staffData, first_name: e.target.value })
              }
            />

            <TextField
              label="Last Name"
              size="small"
              fullWidth
              value={staffData.last_name}
              onChange={(e) =>
                setStaffData({ ...staffData, last_name: e.target.value })
              }
            />
          </Box>

          {/* Email */}
          <TextField
            label="Email"
            size="small"
            fullWidth
            type="email"
            value={staffData.email}
            onChange={(e) =>
              setStaffData({ ...staffData, email: e.target.value })
            }
          />

          {/* Campus + Department */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Campus</InputLabel>
              <Select
                multiple
                value={staffData.campus || []}
                label="Campus"
                onChange={(e) =>
                  setStaffData({
                    ...staffData,
                    campus: e.target.value,
                  })
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {campuses.map((campus) => (
                  <MenuItem key={campus.id} value={campus.name}>
                    {campus.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select
                value={staffData.department}
                label="Department"
                onChange={(e) =>
                  setStaffData({ ...staffData, department: e.target.value })
                }
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.name}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Role (No Admin, Multi Select with Chips) */}
          <FormControl fullWidth size="small">
            <InputLabel>Role</InputLabel>
            <Select
              multiple
              value={staffData.role}
              label="Role"
              onChange={(e) =>
                setStaffData({ ...staffData, role: e.target.value })
              }
              input={<OutlinedInput label="Role" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="coordinator">Coordinator</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <button
            className="border border-gray-400 p-1 rounded w-16"
            onClick={() => {
              setOpenEdit(false);
              setStaffData(emptyStaff);
              setSelectedId(null);
            }}
          >
            Cancel
          </button>

          <button
            className="bg-(--primary-color) text-white p-1 rounded w-16 rounded hover:bg-(--primary-color-hover) transition-colors duration-500"
            onClick={handleUpdate}
          >
            Update
          </button>
        </DialogActions>
      </Dialog>

      {/* DELETE DIALOG*/}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeleteId(null);
        }}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: "10px" } }}
      >
        <DialogTitle className="text-(--primary-color)">
          Confirm Deletion
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 1 }}>
            Are you sure you want to remove{" "}
            <strong>
              {staff.find((s) => s.id === deleteId)
                ? `${staff.find((s) => s.id === deleteId)?.first_name} ${staff.find((s) => s.id === deleteId)?.last_name
                }`
                : "this staff member"}
            </strong>
            ?
            <br />
            This action cannot be undone.
          </Box>
        </DialogContent>

        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <button
            className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => {
              setDeleteDialogOpen(false);
              setDeleteId(null);
            }}
          >
            Cancel
          </button>

          <button
            className="bg-(--primary-color) text-white px-4 py-1 rounded hover:bg-(--primary-color-hover) transition-colors duration-500"
            onClick={async () => {
              await handleDelete(deleteId);
              setDeleteDialogOpen(false);
              setDeleteId(null);
            }}
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>

      {/* EMAIL DIALOG */}
      <Dialog
        open={emailModalOpen}
        onClose={handleCloseEmailModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "10px" } }}
      >
        <DialogTitle className="text-(--primary-color)">
          Send Email
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="To"
            value={emailedStaff?.email || ""}
            disabled
            fullWidth
            size="small"
          />

          <TextField
            label="Subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            fullWidth
            size="small"
          />

          <TextField
            label="Message"
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>

        <DialogActions>
          <button
            className="border border-gray-400 px-4 py-1 rounded"
            onClick={handleCloseEmailModal}
          >
            Cancel
          </button>

          <button
            className="bg-(--primary-color) text-white px-4 py-1 rounded hover:bg-(--primary-color-hover) transition-colors duration-500"
            onClick={handleSendEmail}
            disabled={!emailSubject || !emailMessage}
          >
            Send
          </button>
        </DialogActions>
      </Dialog>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["fullName", "campus", "department", "email", "role"].map((head) => (
                <TableCell key={head}>
                  <TableSortLabel
                    active={orderBy === head}
                    direction={orderBy === head ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, head)}
                  >
                    {head === "fullName" ? "Name" : head.charAt(0).toUpperCase() + head.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((staff) => (
              <TableRow key={staff.id} className="even:bg-white odd:bg-gray-100">
                <TableCell>{staff.first_name} {staff.last_name}</TableCell>
                <TableCell>
                  {Array.isArray(staff.campus)
                    ? staff.campus.join(", ")
                    : staff.campus}
                </TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {staff.role
                      .filter((r) => r !== "admin")
                      .map((r) => (
                        <p
                          key={r}
                          style={{
                            backgroundColor: getRoleColor(r),
                            padding: "5px 25px",
                            fontSize: "0.8rem",
                            borderRadius: "50px",
                            color: "white",
                            width: "130px",
                            textAlign: "center",
                            margin: 0,
                          }}
                        >
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </p>
                      ))}
                  </div>
                </TableCell>

                <TableCell>
                  <i className="fas fa-envelope" style={{ color: "gray", cursor: "pointer", marginRight: "12px" }} onClick={() => handleOpenEmailModal(staff)} />
                  <i className="fas fa-edit" style={{ color: "var(--primary-color)", cursor: "pointer", marginRight: "12px" }} onClick={() => {
                    setSelectedId(staff.id);
                    setStaffData({
                      ...staff,
                      role: staff.role?.filter((r) => r !== "admin") || [],
                    });
                    setOpenEdit(true);
                  }}
                  />
                  <i className="fas fa-trash" style={{ cursor: "pointer" }} onClick={() => {
                    setDeleteId(staff.id);
                    setDeleteDialogOpen(true);
                  }}
                  />
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No staff found
                </TableCell>
              </TableRow>
            )}
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

const Staff = () => {
  return (
    <div>

      <div className='pb-4 flex flex-col gap-3'>
        <p className='text-(--primary-color) text-3xl font-bold'>Staff Management</p>
        <p className="text-md">Add or remove staff and manage their details.
        </p>
      </div>

      <div className='w-full graph-container bg-white rounded flex flex-row justify-between'>
        <StaffDetailsTable />
      </div>
    </div>
  )
}
export default Staff
