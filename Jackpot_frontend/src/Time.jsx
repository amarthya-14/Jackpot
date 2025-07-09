import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Time({ customers, onWinner, setTimerEnded }) {
    const initialTimeInSeconds = 15; // Change to 86400 for 24 hours
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

    const fireConfetti = () => {
        confetti({
            particleCount: 200,
            spread: 120,
            startVelocity: 50,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 180,
                startVelocity: 45,
                origin: { y: 0.7 }
            });
        }, 500);
        setTimeout(() => {
            confetti({
                particleCount: 180,
                spread: 150,
                startVelocity: 60,
                origin: { y: 0.5 }
            });
        }, 1000);
    };

    useEffect(() => {
        let endTime = localStorage.getItem("jackpotEndTime");
        if (!endTime) {
            endTime = Date.now() + initialTimeInSeconds * 1000;
            localStorage.setItem("jackpotEndTime", endTime);
        }

        let interval;

        const updateTimer = () => {
            const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
                localStorage.removeItem("jackpotEndTime");
                setTimerEnded(true);
                fireConfetti();

                if (customers.length > 0) {
                    const winner = customers[Math.floor(Math.random() * customers.length)];
                    onWinner(winner);
                }
            }
        };

        updateTimer();
        interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [customers, onWinner, setTimerEnded]);

    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className="time-container">
            <p className="time-heading">Next Jackpot In</p>
            <div className="timer-box">
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </div>
    );
}
