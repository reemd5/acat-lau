import { useEffect, useState } from "react";

const SemesterCountdown = () => {
    const [semesterEndDate, setSemesterEndDate] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    const fetchSemesterEndDate = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ semesterEndDate: "2026-12-30" });
            }, 500);
        });
    };

    const calculateTimeLeft = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        
        // Calculate difference in milliseconds
        const diffTime = end - today;
        
        if (diffTime <= 0) {
            return { months: 0, days: 0 };
        }
        
        // Calculate months and days
        let months = end.getMonth() - today.getMonth() + 
                    (12 * (end.getFullYear() - today.getFullYear()));
        
        // Create a date that is 'months' after today
        const tempDate = new Date(today);
        tempDate.setMonth(today.getMonth() + months);
        
        // Adjust if we overshoot the end date
        if (tempDate > end) {
            months--;
            tempDate.setMonth(today.getMonth() + months);
        }
        
        // Calculate remaining days
        const days = Math.max(Math.ceil((end - tempDate) / (1000 * 60 * 60 * 24)), 0);
        
        return { 
            months: Math.max(months, 0), 
            days: days 
        };
    };

    useEffect(() => {
        const loadDate = async () => {
            const response = await fetchSemesterEndDate();
            setSemesterEndDate(response.semesterEndDate);
            setTimeLeft(calculateTimeLeft(response.semesterEndDate));
        };

        loadDate();
    }, []);

    useEffect(() => {
        if (!semesterEndDate) return;

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(semesterEndDate));
        }, 1000 * 60 * 60); // Update every hour

        return () => clearInterval(interval);
    }, [semesterEndDate]);

    return (
        <div className="flex items-center justify-center bg-white rounded-lg text-black p-5 text-center w-full h-full">
            {timeLeft === null ? (
                <p className="text-sm opacity-80">Loading semester info...</p>
            ) : (
                <div>
                    <p className="text-md uppercase tracking-wide opacity-90">
                        Semester ends in
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-2 p-3">
                        <p className="text-4xl md:text-5xl font-bold text-(--primary-color)">
                            {String(timeLeft.months).padStart(2, '0')}
                            <span className="text-xl ml-1">months</span>
                        </p>
                        <p className="text-4xl md:text-5xl font-bold text-(--primary-color) pl-2 md:pl-6">
                            {String(timeLeft.days).padStart(2, '0')}
                            <span className="text-xl ml-1">days</span>
                        </p>
                    </div>
                    <p className="pt-3">Fill the forms before this period!</p>
                </div>
            )}
        </div>
    );
};

export default SemesterCountdown;
