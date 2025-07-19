"use client";

import React from "react";
import { motion } from "framer-motion";

// ISO country codes for each region
const EUROPE = [
  'al','ad','at','by','be','ba','bg','hr','cy','cz','dk','ee','fi','fr','de','gr','hu','is','ie','it','lv','li','lt','lu','mt','md','mc','me','nl','mk','no','pl','pt','ro','ru','sm','rs','sk','si','es','se','ch','ua','gb','va'
];
const MIDDLE_EAST = [
  'ae','bh','eg','ir','iq','il','jo','kw','lb','om','ps','qa','sa','sy','tr','ye'
];
const SOUTHEAST_ASIA = [
  'bn','kh','id','la','my','mm','ph','sg','th','tl','vn'
];
const AFRICA = [
  'dz','ao','bj','bw','bf','bi','cm','cv','cf','td','km','cg','cd','ci','dj','eg','gq','er','sz','et','ga','gm','gh','gn','gw','ke','ls','lr','ly','mg','mw','ml','mr','mu','yt','ma','mz','na','ne','ng','re','rw','sh','st','sn','sc','sl','so','za','ss','sd','tz','tg','tn','ug','eh','zm','zw'
];

const text =
  "Our products are specified and trusted by architects, designers, and developers across Europe, the Middle East, Southeast Asia, and Africa.";

function getRegion(code: string) {
  if (EUROPE.includes(code)) return "highlight";
  if (MIDDLE_EAST.includes(code)) return "highlight";
  if (SOUTHEAST_ASIA.includes(code)) return "highlight";
  if (AFRICA.includes(code)) return "highlight";
  return null;
}

const highlightColor = "#2563eb"; // Tailwind blue-600
const neutralColor = "#e5e7eb"; // Tailwind gray-200
const regionDelays: Record<string, number> = {
  europe: 0.3,
  middleEast: 0.6,
  southeastAsia: 0.9,
  africa: 1.2,
};

// Helper to get staggered delay for a country
function getDelay(code: string) {
  if (EUROPE.includes(code)) return regionDelays.europe;
  if (MIDDLE_EAST.includes(code)) return regionDelays.middleEast;
  if (SOUTHEAST_ASIA.includes(code)) return regionDelays.southeastAsia;
  if (AFRICA.includes(code)) return regionDelays.africa;
  return 0;
}

// --- SVG paths inlined below (generated from your world-map.svg) ---
const countryPaths = [
  { id: "fr", d: "M412.973,393.588l-1.91,0.467l-3.82,4.158l-1.149,0.078l-1.53-1.081l-0.993,0.233l-0.762,2.386l-5.584,0.155l0.156,1.236l3.82,2.543l4.435,3.543l-0.077,4.236l-2.368,4.157l5.126,2.464l5.204,0.154l1.606-1.85l3.286,0.078l0.916,0.848l3.285-0.233l1.686-2.162l-2.145-2.541l-0.155-1.616l0.458-1.771l-1.071-1.539l-1.833,0.535l-0.232-1.383l4.054-4.469v-2.697l-2.348-0.767l-1.432-0.987L412.973,393.588L412.973,393.588z" },
  { id: "sa", d: "M519.812,458.021l6.061,8.443l1.953,1.558l0.874,3.785l9.327,0.734l1.055,0.554l-1.046,4.667l-6.129,3.613l-8.964,2.715l-4.78,4.668l-5.679-3.312l-3.439,3.009l-4.791-7.823l-3.284-1.504l-1.192-1.807v-3.916l-11.954-14.452l-0.451-2.561h3.44l4.184-3.611l0.146-1.808l-1.192-1.201l2.395-1.953l5.084,0.303l8.669,7.226l5.117-0.232l0.329,1.263L519.812,458.021L519.812,458.021z" },
  { id: "th", d: "M646.043,472.915l2.8,3.604v4.384l0.968,0.482l4.452-2.144l0.873,0.294l5.316,6.138l-0.19,4.192l-1.737-0.294l-1.548-0.979l-1.158,0.097l-2.031,3.404l0.39,1.851l1.642,0.873l-0.095,2.049l-1.157,0.588l-3.97-2.731v-2.438l-1.642-0.095l-0.674,1.07l-0.347,10.909l2.567,4.686l4.547,4.383l-0.188,1.271l-2.423-0.094l-2.221-3.311h-2.325l-2.902-2.345l-0.874-2.437l1.254-2.049l0.432-1.851l1.366-2.421l-0.061-5.565l-3.337-4.823l-0.139-0.588l1.081-1.089l-0.251-3.83l-4.441-5.627l0.519-3.241L646.043,472.915L646.043,472.915z" },
  { id: "ng", d: "M413.984,515.185l3.389,0.164l4.088,4.557l1.987,0.544l1.558-0.761l2.367-0.328l0.805-3.303l3.225-2.117l3.492-0.163l6.396-11.766l-0.104-2.653l-2.955-2.273l-5.913,2.603l-7.909-0.111l-3.77-2.386l-2.688,0.596l-1.4,2.438l-0.104,6.88l-2.256,3.198L413.984,515.185L413.984,515.185z" },
  // ...PASTE ALL REMAINING <path id=... d=... /> and <g id=...>...</g> as flat {id, d} objects here...
];

const GlobalReach: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="heading-font text-3xl md:text-4xl font-bold text-main-text mb-4">
          Trusted by Professionals Worldwide
        </h2>
        <p className="text-lg text-accent mb-12">{text}</p>
        <div className="flex justify-center">
          <svg
            viewBox="30.767 241.591 784.077 458.627"
            width="90%"
            height="320"
            className="max-w-3xl w-full h-auto"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1"
          >
            <ellipse cx="422.8" cy="470" rx="390" ry="220" fill="#f3f4f6" />
            {countryPaths.map(({ id, d }) => {
              const region = getRegion(id.replace(/^_/, ""));
              const delay = getDelay(id.replace(/^_/, ""));
              return region ? (
                <motion.path
                  key={id}
                  d={d}
                  fill={highlightColor}
                  initial={{ opacity: 0.2 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay, duration: 0.8, type: "tween" }}
                  stroke="#fff"
                  strokeWidth="1"
                />
              ) : (
                <path key={id} d={d} fill={neutralColor} stroke="#fff" strokeWidth="1" />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach; 