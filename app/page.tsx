"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Home() {
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesClicked, setYesClicked] = useState(false);
  const [showMissedToast, setShowMissedToast] = useState(false);

  // Function to move the "No" button randomly, avoiding the center image
  const moveNoButton = () => {
    // Show toast
    setShowMissedToast(true);
    setTimeout(() => setShowMissedToast(false), 2000);

    const buttonWidth = 150;
    const buttonHeight = 50;

    // Approximated center area where the image and text are
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Define a "forbidden zone" around the center (approx 400x500px area)
    const restrictedX1 = centerX - 200;
    const restrictedX2 = centerX + 200;
    const restrictedY1 = centerY - 250;
    const restrictedY2 = centerY + 250;

    let x, y;
    let safe = false;
    let attempts = 0;

    while (!safe && attempts < 50) {
      x = Math.random() * (window.innerWidth - buttonWidth);
      y = Math.random() * (window.innerHeight - buttonHeight);

      // Check if the random position is inside the forbidden zone
      const insideRestricted =
        x + buttonWidth > restrictedX1 &&
        x < restrictedX2 &&
        y + buttonHeight > restrictedY1 &&
        y < restrictedY2;

      if (!insideRestricted) {
        safe = true;
      }
    }

    setNoButtonStyle({ left: `${x}px`, top: `${y}px`, position: "absolute" });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-pink-200 overflow-hidden font-serif">
      {/* Toast Message */}
      {showMissedToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="absolute top-10 z-50 px-6 py-2 bg-red-500 text-white rounded-full font-bold shadow-lg"
        >
          You missed! 😝
        </motion.div>
      )}

      {/* Background Bubbling Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 text-pink-400 opacity-50"
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: -1000,
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            <Heart fill="currentColor" size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </div>

      {yesClicked ? (
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4 animate-bounce">
            Yay! You made me the happiest! ❤️
          </h1>
          <div className="relative inline-block">
            {/* Placeholder for Happy Image */}
            <div className="w-64 h-64 bg-white rounded-lg shadow-lg flex items-center justify-center border-4 border-red-400 overflow-hidden">
              <img src="/us.jpeg" alt="Happy Valentine's Day!" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="z-10 flex flex-col items-center">
          {/* Main Image Container with Heart Effects */}
          <div className="relative mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 bg-red-400/30 rounded-full blur-xl"
            />
            {/* Placeholder for Asking Image */}
            <div className="relative w-64 h-64 bg-white rounded-lg shadow-xl flex items-center justify-center border-4 border-pink-500 overflow-hidden z-20">
              <img src="/ashley.jpeg" alt="Please be my valentine" className="object-cover w-full h-full" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
            Will you be my Valentine?
          </h1>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setYesClicked(true)}
              className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transform hover:scale-110 transition-all duration-200 text-xl cursor-pointer"
            >
              Yes! ❤️
            </button>
            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={noButtonStyle} // Apply absolute positioning here
              className="px-8 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 text-xl cursor-pointer"
            >
              No 😢
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
