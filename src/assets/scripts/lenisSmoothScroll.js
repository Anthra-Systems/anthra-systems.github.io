import "@styles/lenis.css";

import Lenis from "lenis";

// Script to handle Lenis library settings for smooth scrolling
// https://github.com/darkroomengineering/lenis
const lenis = new Lenis({
    autoRaf: true,
    duration: 1.25,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
});

window.lenis = lenis;
