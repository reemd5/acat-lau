import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";


const instructorsData = [
  {
    id: 1,
    name: "John Doe",
    courses: ["Course A", "Course B"],
    submissions: { submitted: 3, assigned: 4 },
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Bill Smith",
    courses: ["Course C"],
    submissions: { submitted: 1, assigned: 1 },
    email: "bill@example.com",
  },
  {
    id: 3,
    name: "Adam Johnson",
    courses: ["Course A", "Course D"],
    submissions: { submitted: 2, assigned: 2 },
    email: "adam@example.com",
  },
];


const getCompletionPercentage = (submitted, assigned) =>
  assigned === 0 ? 0 : Math.round((submitted / assigned) * 100);

const InstructorTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState(instructorsData);

  const navigate = useNavigate();

  React.useEffect(() => setPage(0), [search]);


  const handleRequestSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };


  const handleChangePage = (_e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };


  const filtered = React.useMemo(() => {
    return [...data]
      .filter((inst) => inst.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return order === "asc" ? -1 : 1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
          return order === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, order, search]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


const [emailModalOpen, setEmailModalOpen] = React.useState(false);
const [selectedInstructor, setSelectedInstructor] = React.useState(null);
const [emailSubject, setEmailSubject] = React.useState("");
const [emailMessage, setEmailMessage] = React.useState("");

// Open modal
const handleOpenEmailModal = (instructor) => {
  setSelectedInstructor(instructor);
  setEmailSubject("");
  setEmailMessage("");
  setEmailModalOpen(true);
};

// Close modal
const handleCloseEmailModal = () => {
  setEmailModalOpen(false);
  setSelectedInstructor(null);
};

// Send email (just placeholder, you can integrate API later)
const handleSendEmail = () => {
  alert(`Email sent to ${instructor.email}`);
  handleCloseEmailModal();
};

  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex justify-between">
        <TextField
          label="Search for an instructor"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
    m: 1,
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-color)',
      },
      
    },
  }}
        />
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active direction={order} onClick={handleRequestSort}>
                  Instructor
                </TableSortLabel>
              </TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Submissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((inst, index) => {
              const completionPercent = getCompletionPercentage(
                inst.submissions.submitted,
                inst.submissions.assigned
              );
              return (
                <TableRow
                  key={inst.id}
                  hover
                  sx={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2" }}
                >
                  {/* Instructor Name */}
                  <TableCell>{inst.name}</TableCell>

                  {/* Courses */}
                  <TableCell>
                    {inst.courses.map((course, i) => (
                      <span
                        key={i}
                        className="mr-2 px-2 py-1 border rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </TableCell>

                  {/* Submissions */}
                  <TableCell>{`${inst.submissions.submitted}/${inst.submissions.assigned}`}</TableCell>

                 

                  {/* Actions */}
                  <TableCell>
                    <button
                      onClick={() => handleOpenEmailModal(inst)}
                      className="mr-2"
                      title="Send Email"
                    >
                      <i className="fas fa-envelope text-(--primary-color)) text-lg"></i>
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/improvements?view=instructor&instructorId=${inst.id}`)
                      }
                      title="View Details"
                    >
                      <i className="fas fa-eye text-(--secondary-color) text-lg"></i>
                    </button>
                    
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filtered.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

{/* <Dialog open={emailModalOpen} onClose={handleCloseEmailModal} fullWidth maxWidth="sm"  PaperProps={{ sx: {borderRadius: 5}}}>
  <DialogTitle>Send an Email to the Instructor</DialogTitle>
  <DialogContent dividers>
    {selectedInstructor && (
      <Box className="mb-3">
        Sending to: <strong>{selectedInstructor.name}</strong> ({selectedInstructor.email})
      </Box>
    )}
    <TextField
      fullWidth
      label="Subject"
      variant="outlined"
      size="small"
      value={emailSubject}
      onChange={(e) => setEmailSubject(e.target.value)}
      sx={{mb:2, '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-color)',
      },}}}
      
    />
    <TextField
      fullWidth
      label="Message"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      value={emailMessage}
      onChange={(e) => setEmailMessage(e.target.value)}
      sx={{'& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-color)',
      },}}}
    />
  </DialogContent>
  <DialogActions>
    <button onClick={handleCloseEmailModal} className="border rounded p-0.5">Cancel</button>
    <button onClick={handleSendEmail} className="bg-(--primary-color) text-white p-0.5 rounded">Send</button>
    
  </DialogActions>
</Dialog> */}
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
            value={selectedInstructor?.email || ""}
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
     
    </Box>
  );
};

export default InstructorTable;
