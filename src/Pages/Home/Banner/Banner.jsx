import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";

import img1 from '../../../assets/Banner1.png'
import img2 from '../../../assets/Banner2.png'
import img3 from '../../../assets/Banner3.png'

const Banner = () => {
    const navigate = useNavigate();
    console.log(motion)

    return (
        <div className="relative">
            {/* Carousel */}
            <Carousel
                className="h-[600px] brightness-75"
                autoPlay
                infiniteLoop
                showStatus={false}
                showThumbs={false}
            >
                <div className="h-[600px]">
                    <img src={img1} alt="Hero 1" />
                </div>
                <div className="h-[600px]">
                    <img src={img2} alt="Hero 2" />
                </div>
                <div className="h-[600px]">
                    <img src={img3} alt="Hero 3" />
                </div>
            </Carousel>

            {/* Animated Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                
                {/* Title, continuously bouncing */}
                <motion.h1
                    className="text-5xl font-bold mb-4"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                >
                    Welcome to Club Sphere
                </motion.h1>

                {/* Subtitle / Description */}
                <motion.p
                    className="text-lg max-w-2xl mb-8"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                >
                    Discover clubs, create events, connect with members,
                    and make your community shine.
                </motion.p>

                {/* Buttons, gently floating too */}
                <motion.div
                    className="space-x-4"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                >
                    <button
                        onClick={() => navigate("/all-clubs")}
                        className="btn btn-secondary px-6 py-3 text-lg"
                    >
                        Join a Club
                    </button>

                    <button
                        onClick={() => navigate("/create-club")}
                        className="btn btn-secondary px-6 py-3 text-lg"
                    >
                        Create a Club
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
