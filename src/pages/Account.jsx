import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { resetPassword, updatePassword } from "../api/auth";
import { showSnackbar } from "../utils/snackbar";
import CustomSnackbar from "../components/CustomSnackbar";

const Account = () => {
  const { auth } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
//hi

// hello test

  const handleResetPassword = async () => {
    try {
      await resetPassword(auth.user.email);
      showSnackbar(setSnackbar, "Password reset link sent to your email.", "success");
      setNewPass("");
      setCurrentPass("");
    } catch (error) {
      showSnackbar(setSnackbar, "Failed to send password reset link.", "error");
      setNewPass("");
      setCurrentPass("");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const res = await updatePassword(currentPass, newPass, auth.user.id);
      showSnackbar(setSnackbar, "Password updated successfully.", "success");


    }
    catch (error) {
      showSnackbar(setSnackbar, "Password update failed.", "error");
    }

  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className='pb-4 flex flex-col gap-3'>
        <p className='text-(--primary-color) text-3xl font-bold'>Your Account</p>
        <p className="text-md">View your account information and manage your password.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
        {/* Profile */}
        <div className="flex gap-4 items-center">
          <div className="bg-gray-200 w-20 h-20 flex items-center justify-center rounded-full">
            <i className="fa-solid fa-user text-4xl text-(--primary-color)"></i>
          </div>
          <div>
            <p className="font-semibold text-2xl">
              {auth?.user?.first_name} {auth?.user?.last_name}
            </p>
            <div className="flex gap-2 flex-wrap mt-1">
              {auth?.role?.map((r) => (
                <span
                  key={r}
                  className="text-xs text-gray-600 px-3 py-1 rounded-full bg-gray-200"
                >
                  {r.toUpperCase()}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">First Name</p>
            <p className="font-medium">{auth?.user?.first_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Last Name</p>
            <p className="font-medium">{auth?.user?.last_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{auth?.user?.email}</p>
          </div>

          {/* Password Section */}
          <div className="space-y-2">
            <p className="text-gray-500">Password</p>
            <p className="font-medium">••••••••</p>

            <p className="text-xs text-gray-500">
              ⚠️ You received your initial password by email.
              Please update it after first login.
            </p>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="text-sm text-(--primary-color) underline"
              >
                Update password
              </button>

              <button
                onClick={handleResetPassword}
                className="text-sm text-gray-600 underline"
              >
                Reset via email
              </button>
            </div>

            {showPasswordForm && (
              <form
                className="mt-2 space-y-2 max-w-xs"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordUpdate();
                }}
              >
                <input
                  required
                  type="password"
                  placeholder="Current password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="border rounded px-3 py-2 text-sm w-full"
                />
                <input
                  required
                  type="password"
                  placeholder="New password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="border rounded px-3 py-2 text-sm w-full"
                />
                <button
                  type="submit"
                  className="bg-(--primary-color) text-white px-4 py-2 rounded text-sm"
                >
                  Save password
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />


    </div>
  );
};

export default Account;
