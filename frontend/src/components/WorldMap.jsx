import React, { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

function WorldMap({ lineColor = "#0ea5e9" }) {
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#00000040",
    shape: "circle",
    backgroundColor: "#ffffff",
  });

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const dots = [
    { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
    { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
    { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
    { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
   {
  start: { lat: 11.0041, lng: -74.8069 },   // Barranquilla, Colombia (top of mainland)
  end: { lat: -52.6813, lng: -68.3070 }     // Río Grande, Argentina (bottom of mainland)
},{
  start: { lat: -33.8688, lng: 151.2093 },  // Sydney, Australia
  end: { lat: 28.6139, lng: 77.2090 }       // New Delhi, India
}
  ];

  return (
    <div className="position-absolute w-100 h-100">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="world map"
        className="w-100 h-100"
        draggable={false}
        style={{
          objectFit: "cover",
          maskImage:
            "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
        }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="position-absolute top-0 start-0 w-100 h-100"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`line-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 * i }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => (
          <g key={`points-${i}`}>
            {["start", "end"].map((pos) => {
              const point = projectPoint(dot[pos].lat, dot[pos].lng);
              return (
                <g key={`${pos}-${i}`}>
                  <circle cx={point.x} cy={point.y} r="2" fill={lineColor} />
                  <circle cx={point.x} cy={point.y} r="2" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}

export default WorldMap;
