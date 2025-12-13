import React from "react";
import { motion } from "framer-motion";

const sampleClubs = [
    { id: 1, name: "Photography Club", desc: "Capture the world with us!" },
    { id: 2, name: "Coding Society", desc: "Build apps, solve problems." },
    { id: 3, name: "Music Circle", desc: "Jam, learn, perform." },
];

console.log(motion)
const FeaturedClub = () => {
    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Featured Clubs</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sampleClubs.map((club, idx) => (
                    <motion.div
                        key={club.id}
                        className="bg-white shadow-xl rounded-md p-6"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: idx * 0.2, duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-2">{club.name}</h3>
                        <p className="text-gray-600">{club.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedClub;
