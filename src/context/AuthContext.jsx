import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    if (!stored) return null;
  
    const parsed = JSON.parse(stored);
  
    return {
      ...parsed,
      activeRole: parsed.activeRole || (Array.isArray(parsed.role) && parsed.role[0]) || null,
    };
  });
  

  const login = (user, defaultRole) => {
    const roles = Array.isArray(user.role) ? user.role : [];

    const activeRole = defaultRole && roles.includes(defaultRole) 
        ? defaultRole 
        : roles[0] || null;

       

    const data = {
      user,
      role: roles,
      activeRole: activeRole,
      isAuthenticated: true,
    };

    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };


  const switchRole = (role, navigateFn) => {
    setAuth(prev => {
      if (!prev || !prev.role.includes(role)) return prev;
  
      const updated = { ...prev, activeRole: role };
      localStorage.setItem("auth", JSON.stringify(updated));
  
      if (navigateFn) navigateFn(`/${role}`);
      return updated;
    });
  };
  

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
