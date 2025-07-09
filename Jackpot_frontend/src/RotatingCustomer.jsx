import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RotatingCustomer({ customers }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (customers.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % customers.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [customers]);

    const handleHover = () => {
        setCurrentIndex((prev) => (prev + 1) % customers.length);
    };

    return (
        <div className="rotating-customer">
            <AnimatePresence mode="wait">
                <motion.p
                    key={customers[currentIndex]?.id || "loading"}
                    className="current-name"
                    onMouseEnter={handleHover}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ display: "inline-block" }}
                >
                    {customers.length > 0 ? customers[currentIndex].name : "Loading..."}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}
