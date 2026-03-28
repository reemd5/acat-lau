import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Forms from "./pages/admin/Forms";
import Staff from "./pages/admin/Staff";
import Reports from "./pages/admin/Reports";
import Assignment from "./pages/admin/Assignment";
import Reminders from "./pages/admin/Reminders";
import Notifications from "./pages/shared/Notifications";
import Account from "./pages/Account";
import InstructorLayout from "./layout/InstructorLayout";
import DashboardInstructor from "./pages/instructor/Dashboard"
import FormsInstructor from "./pages/instructor/Forms"

import CoordinatorLayout from "./layout/CoordinatorLayout";
import DashboardCoordinator from "./pages/coordinator/Dashboard"
import ImprovementsCoordinator from "./pages/coordinator/Improvements"
import ComparisonCoordinator from "./pages/coordinator/Comparison"
import Login from "./pages/auth/Login";
import Unauthorized from "./pages/Unauthorized";

import RequireRole from "./components/RequireRole";
import RequireAdminSettings from "./components/RequireAdminSettings";
import Courses from "./pages/admin/Courses";
import HelpAdmin from "./pages/admin/Help";
import HelpInstructor from "./pages/instructor/Help";
import HelpCoordinator from "./pages/coordinator/Help";
import Settings from "./pages/admin/Settings";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route path="/admin" element={
          <RequireRole role="admin">
            <RequireAdminSettings>
              <AdminLayout />
            </RequireAdminSettings>
          </RequireRole>}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="forms" element={<Forms />} />
          <Route path="staff" element={<Staff />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assignment" element={<Assignment />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
         
          <Route path="help" element={<HelpAdmin />} />
          
        </Route>

        <Route path="/instructor" element={
          <RequireRole role="instructor">
            <InstructorLayout />
          </RequireRole>}>
          <Route index element={<DashboardInstructor />} />
          <Route path="forms" element={<FormsInstructor />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
          <Route path="help" element={<HelpInstructor />} />
        </Route>

        <Route path="/coordinator" element={
          <RequireRole role="coordinator">
            <CoordinatorLayout />
          </RequireRole>}>
          <Route index element={<DashboardCoordinator />} />
          <Route path="improvements" element={<ImprovementsCoordinator />} />
          <Route path="comparison" element={<ComparisonCoordinator />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
          <Route path="help" element={<HelpCoordinator />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />


      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
