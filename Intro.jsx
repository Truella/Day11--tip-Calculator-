import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

// Dummy components to show behind the curtain
const DummyNav = () => (
  <nav style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "80px",
    backgroundColor: "rgba(26, 26, 26, 0.9)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    zIndex: 10,
    color: "white"
  }}>
    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
      Turah Suleiman
    </div>
    <div style={{ display: "flex", gap: "2rem" }}>
      <a href="#about" style={{ color: "white", textDecoration: "none" }}>About</a>
      <a href="#work" style={{ color: "white", textDecoration: "none" }}>Work</a>
      <a href="#contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
    </div>
  </nav>
);

const DummyHeroSection = () => (
  <section style={{
    height: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
    padding: "0 2rem"
  }}>
    <h1 style={{
      fontSize: "4rem",
      fontWeight: "800",
      marginBottom: "1rem",
      opacity: 0.9
    }}>
      Creative Developer
    </h1>
    <p style={{
      fontSize: "1.5rem",
      maxWidth: "600px",
      lineHeight: 1.6,
      opacity: 0.8
    }}>
      Building digital experiences that inspire and engage through innovative design and technology
    </p>
    <button style={{
      marginTop: "2rem",
      padding: "1rem 2rem",
      fontSize: "1.1rem",
      backgroundColor: "transparent",
      border: "2px solid white",
      color: "white",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease"
    }}>
      View My Work
    </button>
  </section>
);

export default function Intro({ onFinish }) {
  const textRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const split = new SplitType(textRef.current, { types: "chars" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
    })
      .to(textRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
      })
      .to(curtainRef.current, {
        y: "-100%",
        duration: 2.5,
        ease: "power2.inOut",
      })
      .to({}, { duration: 0.1, onComplete: onFinish }); // unmount

    return () => split.revert();
  }, [onFinish]);

  return (
    <>
      {/* Background content that will be revealed when curtain moves up */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998, // Behind the intro overlay
      }}>
        <DummyNav />
        <DummyHeroSection />
      </div>

      {/* Intro overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: "transparent",
          color: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          ref={curtainRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#f8f9fa", // Changed from red to a light background
            zIndex: 40,
            transform: "translateY(0%)",
          }}
        ></div>
        <h2
          ref={textRef}
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            zIndex: 50,
            maxWidth: "90%",
            lineHeight: 1.3,
            opacity: 1,
          }}
        >
          Welcome to Turah Suleiman's Portfolio
        </h2>
      </div>
    </>
  );
}