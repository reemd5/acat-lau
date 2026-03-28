import { NavLink } from "react-router-dom";

export default function NavItem({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-200
         hover:text-[var(--primary-color)] 
         ${
           isActive
             ? "text-[var(--primary-color)] border-l-4 border-[var(--primary-color)] pl-2"
             : "text-gray-500"
         }`
      }
    >
      {children}
    </NavLink>
  );
}
