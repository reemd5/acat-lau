import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Portal */}
      <div className="action-card group">
        <a
          href="https://www.lau.edu.lb/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="action-btn">
            <span className="action-left">
              <i className="fa-solid fa-door-open"></i>
              Portal
            </span>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </a>
        <span className="action-hover"></span>
      </div>

      {/* Outlook */}
      <div className="action-card group">
        <a
          href="https://www.outlook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="action-btn">
            <span className="action-left">
              <i className="fa-solid fa-envelope"></i>
              Outlook
            </span>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </a>
        <span className="action-hover"></span>
      </div>

      {/* Account */}
      <div className="action-card group">
        <button
          className="action-btn"
          onClick={() => navigate("/admin/account")}
        >
          <span className="action-left">
            <i className="fa-solid fa-user"></i>
            Account
          </span>
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <span className="action-hover"></span>
      </div>
    </div>
  );
};

export default QuickActions;