import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const container = useRef();
  const spotlightRef = useRef();
  const textRef = useRef();
  const [index, setIndex] = useState(0);
  
  const adjectives = ["BOLD", "INTERACTIVE", "SEAMLESS", "SCALABLE", "MODERN"];

  // Handle the word-swapping logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % adjectives.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset positions
    gsap.set(".nav-item", { y: -20, opacity: 0 });
    gsap.set(".reveal-text", { y: "110%" });
    gsap.set(".sub-text", { opacity: 0, y: 20 });

    // Entrance sequence
    tl.to(".nav-item", { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" })
      .to(".reveal-text", { y: "0%", stagger: 0.2, duration: 1.2, ease: "expo.out" }, "-=0.4")
      .to(".sub-text", { opacity: 0.5, y: 0, duration: 1 }, "-=0.8");

    // Mouse movement effects
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xNorm = (clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (clientY / window.innerHeight - 0.5) * 2;

      // Move spotlight
      gsap.to(spotlightRef.current, { x: clientX, y: clientY, duration: 0.6 });
      
      // Parallax effect on main text
      gsap.to(textRef.current, {
        rotateY: xNorm * 15,
        rotateX: -yNorm * 10,
        x: xNorm * 20,
        y: yNorm * 10,
        duration: 1,
        ease: "power2.out"
      });

      // Move grid background slightly
      gsap.to(".grid-bg", {
        x: xNorm * -30,
        y: yNorm * -30,
        duration: 1.5
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  return (
    <section ref={container} style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Space+Grotesk:wght@300;700&display=swap');
        
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }

        .mask { overflow: hidden; display: block; line-height: 1; }
        
        .font-sync { font-family: 'Syncopate', sans-serif; text-transform: uppercase; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }

        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          transition: 0.5s;
        }
        .outline-text:hover { -webkit-text-stroke: 1px #7cfc00; }

        .accent-word {
          color: #7cfc00;
          text-shadow: 0 0 30px rgba(124, 252, 0, 0.4);
          display: inline-block;
          min-width: 300px;
          text-align: left;
        }

        .project-btn {
          background: #fff; color: #000; border: none;
          padding: 12px 30px; border-radius: 50px;
          font-weight: 700; cursor: pointer; transition: 0.3s;
        }
        .project-btn:hover { background: #7cfc00; transform: scale(1.05); }

        .brand-logo { cursor: pointer; letter-spacing: 5px; }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.navGroup}>
          <span className="nav-item" style={styles.navLink}>PROJECTS</span>
          <span className="nav-item" style={styles.navLink}>ARCHIVE</span>
        </div>
        
        <div className="brand-logo font-sync nav-item" style={styles.logo}>SHREYANSH</div>
        
        <div style={{...styles.navGroup, justifyContent: 'flex-end'}}>
          <span className="nav-item" style={styles.navLink}>INFO</span>
          <button className="nav-item project-btn font-space">LET'S TALK</button>
        </div>
      </nav>

      {/* --- BACKGROUND --- */}
      <div className="grid-bg" style={styles.gridLayer} />
      <div ref={spotlightRef} style={styles.spotlight} />

      {/* --- CENTERED KINETIC TEXT --- */}
      <div style={styles.contentWrapper}>
        <div ref={textRef} style={styles.textContainer}>
          
          <div className="mask">
            <h1 className="reveal-text font-sync outline-text" style={styles.mainTitle}>
              CRAFTING
            </h1>
          </div>

          <div className="mask">
            <h1 className="reveal-text font-sync" style={styles.mainTitle}>
              <span className="accent-word">{adjectives[index]}</span>
            </h1>
          </div>

          <div className="mask">
            <h1 className="reveal-text font-sync outline-text" style={styles.mainTitle}>
              EXPERIENCES
            </h1>
          </div>

          <p className="sub-text font-space" style={styles.description}>
            // SPECIALIZING IN HIGH-END FRONTEND ARCHITECTURE & INTERACTIVE DESIGN
          </p>
        </div>
      </div>

      {/* --- HUD FOOTER --- */}
      <div style={styles.footer}>
        <div className="font-space" style={styles.footerItem}>[ VERSION_2026 ]</div>
        <div className="font-space" style={styles.footerItem}>AVAILABLE FOR WORK ⬤</div>
        <div className="font-space" style={styles.footerItem}>LOC: 19.0760° N, 72.8777° E</div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    width: "100vw", height: "100vh", backgroundColor: "#020202",
    overflow: "hidden", position: "relative", perspective: "1000px"
  },
  navbar: {
    position: "fixed", top: "0", left: "0", width: "100%", height: "100px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 60px", zIndex: 100
  },
  navGroup: { display: "flex", gap: "40px", flex: 1, alignItems: "center" },
  navLink: { fontSize: "11px", color: "#666", letterSpacing: "3px", cursor: "pointer" },
  logo: { color: "#fff", fontSize: "20px", fontWeight: "900" },
  contentWrapper: {
    width: "100%", height: "100%", display: "flex", 
    alignItems: "center", justifyContent: "center", zIndex: 10
  },
  textContainer: { 
    textAlign: "center", transformStyle: "preserve-3d",
    display: "flex", flexDirection: "column", alignItems: "center"
  },
  mainTitle: {
    fontSize: "clamp(3rem, 10vw, 9rem)", margin: "0",
    letterSpacing: "-2px"
  },
  description: {
    marginTop: "40px", fontSize: "12px", color: "#fff", 
    letterSpacing: "4px", maxWidth: "600px", opacity: 0.5
  },
  gridLayer: {
    position: "absolute", inset: "-10%",
    backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "80px 80px", zIndex: 1
  },
  spotlight: {
    position: "fixed", width: "800px", height: "800px",
    background: "radial-gradient(circle, rgba(124, 252, 0, 0.07) 0%, transparent 70%)",
    top: 0, left: 0, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 2
  },
  footer: {
    position: "absolute", bottom: "40px", width: "100%", 
    padding: "0 60px", display: "flex", justifyContent: "space-between"
  },
  footerItem: { fontSize: "9px", color: "#444", letterSpacing: "2px" }
};

export default Hero;