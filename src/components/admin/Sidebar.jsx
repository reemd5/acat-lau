import { useState } from "react";
import NavItem from "../NavItem";
import { replace, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { logout } from "../../api/auth";

const LogoutDialog = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    }
    return (
        <Dialog open={open} onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "95%", sm: "450px", md: "500px" },
                    borderRadius: "10px",
                    padding: "5px",

                }
            }}>
            <DialogTitle className="text-(--primary-color)">Confirm Logout</DialogTitle>
            <DialogContent>Are you sure you want to log out?</DialogContent>
            <DialogActions>
                <button className="bg-(--primary-color) text-white p-1 rounded w-16 hover:bg-(--primary-color-hover) hover:transition-colors hover:duration-500 cursor-pointer" onClick={handleLogout}>Yes</button>
                <button className="border border-gray-400 p-1 rounded w-16 hover:bg-gray-200 hover:transition-colors hover:duration-500 cursor-pointer" onClick={onClose}>No</button>
            </DialogActions>
        </Dialog>
    );

}
const Sidebar = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <>
            {/* HAMBURGER BUTTON */}
            <button
                className="lg:hidden bg-white  w-full fixed top-0 left-0 text-left p-3 z-50 text-(--primary-color)"
                onClick={() => setOpen(true)}
            >
                <i className="fa-solid fa-bars text-2xl"></i>
            </button>

            {/* OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/25 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed top-0 left-0 max-h-screen h-screen w-56 bg-gray-100 text-gray-500
        flex flex-col justify-between border-r border-gray-300
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            >
                {/* CLOSE BUTTON */}
                <button
                    className="lg:hidden absolute top-4 right-4 text-xl"
                    onClick={() => setOpen(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* TOP SECTION */}
                <div>
                    {/* LOGO */}
                    <div className="flex flex-col items-start p-4">
                        <button className="text-xl font-bold text-black cursor-pointer" onClick={() => navigate("/admin")}>ACAT</button>
                        <p className="text-xs text-gray-500">ABET Course Assessment Tool</p>
                    </div>

                    <hr className="border-gray-200" />

                    {/* NAV */}
                    <ul className="flex flex-col gap-2 mt-2 px-2">
                        <p className="text-xs text-gray-400 px-3">Navigation</p>

                        <NavItem to="/admin" end>
                            <i className="fa-solid fa-grip text-sm"></i>
                            <span className="text-sm">Dashboard</span>
                        </NavItem>


                        <NavItem to="/admin/courses">
                            <i className="fa-solid fa-book text-sm"></i>
                            <span className="text-sm">Courses</span>
                        </NavItem>
                        
                        <NavItem to="/admin/staff">
                            <i className="fa-solid fa-users text-sm"></i>
                            <span className="text-sm">Staff</span>
                        </NavItem>


                        <NavItem to="/admin/assignment">
                            <i className="fa-solid fa-users text-sm"></i>
                            <span className="text-sm">Assignment</span>
                        </NavItem>

                        <NavItem to="/admin/forms">
                            <i className="fa-brands fa-wpforms text-sm"></i>
                            <span className="text-sm">Forms</span>
                        </NavItem>

                        <NavItem to="/admin/reminders">
                            <i className="fa-solid fa-clock text-sm"></i>
                            <span className="text-sm">Reminders</span>
                        </NavItem>

                        <NavItem to="/admin/reports">
                            <i className="fa-solid fa-file-invoice text-sm"></i>
                            <span className="text-sm">Reports</span>
                        </NavItem>

                        <p className="text-xs text-gray-400 px-3">More Actions</p>

                        <NavItem to="/admin/notifications">
                            <i className="fa-solid fa-bell text-sm"></i>
                            <span className="text-sm">Notifications</span>
                        </NavItem>

                        <NavItem to="/admin/account">
                            <i className="fa-solid fa-user text-sm"></i>
                            <span className="text-sm">Account</span>
                        </NavItem>
                        <NavItem to="/admin/help">
                            <i className="fa-solid fa-info-circle text-sm"></i>
                            <span className="text-sm">Help</span>
                        </NavItem>

                        {/* SWITCH TO COORDINATOR */}
                        {Array.isArray(auth?.role) && auth.role.includes("coordinator") && (
                        <NavItem
                            to="/coordinator"
                            onClick={() => switchRole("coordinator", navigate)}
                            isActive={() => auth.activeRole === "coordinator"}
                        >
                            <i className="fa-solid fa-repeat text-sm"></i>
                            <span className="text-sm">Coordinator Portal</span>
                      </NavItem>
                      
                        )}

                        {/* SWITCH TO INSTRUCTOR */}
                        {Array.isArray(auth?.role) && auth.role.includes("instructor") && (
                        <NavItem
                            to="/instructor"
                            onClick={() => switchRole("instructor", navigate)}
                            isActive={() => auth.activeRole === "instructor"}
                        >
                            <i className="fa-solid fa-repeat text-sm"></i>
                            <span className="text-sm">Instructor Portal</span>
                        </NavItem>
                      
                        )}


                        <div className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200
         hover:text-(--primary-color) cursor-pointer" onClick={() => setLogoutOpen(true)}>
                            <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                            <span className="text-sm">Logout</span>
                        </div>
                        <LogoutDialog
                            open={logoutOpen}
                            onClose={() => setLogoutOpen(false)}
                        />
                    </ul>
                </div>
            <hr className="border-gray-200" />

                <div className="m-4 cursor-pointer" onClick={() => navigate(`/${auth?.activeRole}/account`)}>
                    <div className="flex gap-2">
                        <div className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full">
                            <i className="fa-solid fa-user text-lg text-(--primary-color)"></i>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-sm text-black">{auth?.user?.first_name} {auth?.user?.last_name}</p>
                            <p className="text-xs">Admin</p>
                        </div>
                    </div>

                </div>
            </aside>
        </>
    );
};

export default Sidebar;

