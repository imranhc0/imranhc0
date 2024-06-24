"use client";

import { Typewriter } from "react-simple-typewriter";

import React from "react";

function TypeEffect() {
  return (
    <span className="text-blue-500 dark:text-blue-500">
      <Typewriter
        words={["Web App", "Your Dream", "Project"]}
        cursor
        loop={false}
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      ></Typewriter>
    </span>
  );
}

export default TypeEffect;
