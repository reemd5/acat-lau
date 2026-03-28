import api from "./axios";

//used for JSON server, not for real API
export const loginJSON = async (email, password) => {
  const res = await api.get(`/users?email=${encodeURIComponent(email)}`);
  const user = res.data[0]; //first object that matches the email (whole info of user)
  if (!user) throw { response: { data: { message: "Error" } } }; //user not found
  if (user.password !== password)
    throw { response: { data: { message: "Error" } } }; //wrong password
  return { data: { message: "Login successful", user } };
};

//used for real API, not for JSON server
export const loginAPI = async (email, password , role) => {
  //add email and password to the post request body, not as query params
  const res = await api.post('/login', { email, password, role });

  const user = res.data.user; // Extract user info from the response
  if (!user) throw { response: { data: { message: "Error" } } }; //user not found

  if(res.data.token) {
    // Store token in localStorage for future API requests
    localStorage.setItem("token", res.data.token);
  }

  return { data: { message: "Login successful", user } };
};

export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res;
};

export const logout = async () => {
  // client-side auth
  return { data: { message: "Logged out" } };
};

export const updatePassword = async (currentPassword, newPassword, id) => {
  const res = await api.get(`/users/${id}`);
  const user = res.data;
  if (user.password !== currentPassword)
    throw { response: { data: { message: "Current password incorrect" } } };

  await api.patch(`/users/${id}`, { password: newPassword });
  return { data: { message: "Password updated successfully" } };
};

export const resetPassword = async (email) => {
  const res = await api.get(`/users?email=${email}`);
  const user = res.data[0];
  if (!user) throw { response: { data: { message: "Error" } } }; //user not found

  return { data: { message: `Password reset link sent to ${email}` } };
};
