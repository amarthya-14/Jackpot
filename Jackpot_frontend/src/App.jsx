import Header from './ReactBits/Glitch/Header.jsx';
import Time from './Time.jsx';
import RotatingCustomer from './RotatingCustomer.jsx';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import AddCustomer from "./AddCustomer.jsx";

export default function App() {
    const [customers, setCustomers] = useState([]);
    const [winner, setWinner] = useState(null);
    const [timerEnded, setTimerEnded] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/details`)
            .then((res) => res.json())
            .then((data) => setCustomers(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Header />
            <AddCustomer timerEnded={timerEnded} />
            {!timerEnded && (
                <Time customers={customers} onWinner={setWinner} setTimerEnded={setTimerEnded} />
            )}
            {!timerEnded && <RotatingCustomer customers={customers} />}
            <AnimatePresence>
                {winner && timerEnded && (
                    <motion.div
                        className="winner-announcement premium-winner"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <span className="glow-text">{winner.name}</span> Won The Jackpot! 🎉
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
