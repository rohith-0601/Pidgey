"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "motion/react";
import { FaGoogle, FaEnvelope, FaUser } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden">
      {/* Background World Map */}
      <div className="absolute inset-0 z-0">
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
            {
              start: { lat: 17.385, lng: 78.4867 }, // Hyderabad, India
              end: { lat: -12.4634, lng: 130.8456 }, // Darwin, Northern Territory, Australia
            },
            {
              start: { lat: 5.852, lng: -55.2038 }, // Paramaribo, Suriname (north of South America)
              end: { lat: -55.045, lng: -67.6572 }, // Puerto Williams, Chile (southern tip)
            },
          ]}
        />
      </div>

      {/* Foreground UI */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          className="flex items-center gap-3 text-5xl font-bold text-gray-900 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span>Pidgey</span>
          <img
            src="https://img.icons8.com/?size=100&id=BbDkxr2uDW9h&format=png&color=000000"
            alt="pidgey-icon"
            className="w-12 h-12"
          />
        </motion.div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button className="flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition">
            <FaGoogle className="text-xl" />
            Login with Google
          </button>
          <button className="flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition">
            <FaEnvelope className="text-xl" />
            Login with Email
          </button>
          <button className="flex items-center justify-center gap-3 bg-white text-gray-500 font-semibold py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
            <FaUser className="text-xl" />
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
