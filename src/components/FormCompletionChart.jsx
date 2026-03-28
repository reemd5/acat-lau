import React, { useEffect, useState } from "react";

import { PieChart } from "@mui/x-charts/PieChart";
function HTMLDiamond({ className, color }) {
    return (
        <div
            className={className}
            style={{ transform: "scale(0.6, 0.75) rotate(45deg)", background: color }}
        />
    );
}

function SVGStar({ className, color }) {
    return (
        <svg viewBox="-7.423 -7.423 14.846 14.846">
            <path
                className={className}
                d="M0,-7.528L1.69,-2.326L7.16,-2.326L2.735,0.889L4.425,6.09L0,2.875L-4.425,6.09L-2.735,0.889L-7.16,-2.326L-1.69,-2.326Z"
                fill={color}
            />
        </svg>
    );
}

export default function FormCompletionChart({
    data = [],
    title = "Form Completion Overview",
    width = 300,
    height = 200,
    className = "",
}) {
    return (
        <div className={`bg-white rounded-xl p-4 ${className}`}>
            <p className="text-[var(--primary-color)] font-bold text-lg mb-4">
                {title}
            </p>
            {data.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: data.map((item) => ({
                                value: item.value,
                                label: item.label,
                                labelMarkType: item.labelMarkType || "square",
                                color: item.color,
                            })),
                        },
                    ]}
                    width={width}
                    height={height}
                />
            ) : (
                <div
                    style={{ width, height }}
                    className="flex items-center justify-center text-gray-400"
                >
                    No data available
                </div>
            )}
        </div>
    );
}

