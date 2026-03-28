import React from "react";

const Card1 = ({ text1, text2, icon, iconColor = "text-(--primary-color)", shadow = false, bgColor = "bg-white", text1Color, text2Color = "text-black" }) => {
  return (
    <div className={`card1 flex flex-col rounded-lg ${bgColor} gap-2`}>
      <div className="flex flex-row justify-between items-center">
        <p className={`flex-1 text-lg font-semibold ${text1Color}`}>{text1}</p>
        <i className={`${icon} ${iconColor} text-lg`}></i>

      </div>
      <p className={`text-2xl font-semibold ${text2Color} ${shadow ? "shadow" : ""}`}>
        {text2}
      </p>
    </div>

  );
};

export default Card1;
