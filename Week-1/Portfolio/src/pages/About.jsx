import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = () => {
  const container = useRef();
  const spotlightRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(".reveal", { y: 20, opacity: 0 });
    gsap.set(".vertical-line", { scaleY: 0, transformOrigin: "top" });

    tl.to(".reveal", { 
      y: 0, 
      opacity: 1, 
      stagger: 0.1, 
      duration: 0.8, 
      ease: "power3.out" 
    })
    .to(".vertical-line", {
      scaleY: 1,
      duration: 1,
      ease: "expo.inOut"
    }, "-=0.5");

    const handleMouseMove = (e) => {
      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  return (
    <section ref={container} style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Space+Grotesk:wght@300;400;500&display=swap');
        
        .font-sync { font-family: 'Syncopate', sans-serif; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }

        .header-text {
          font-size: clamp(2rem, 5vw, 4.5rem);
          color: #fff;
          line-height: 1;
          margin-bottom: 30px;
        }

        .bio-para {
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          color: rgba(255,255,255,0.6);
          max-width: 600px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .highlight { color: #fff; font-weight: 500; }
        .green { color: #7cfc00; }
      `}</style>

      {/* --- BACKGROUND --- */}
      <div style={styles.gridLayer} />
      <div ref={spotlightRef} style={styles.spotlight} />

      {/* --- MAIN CONTENT --- */}
      <div style={styles.contentWrapper}>
        <div style={styles.flexLayout}>
          
          <div className="vertical-line" style={styles.line} />

          <div style={styles.textBlock}>
            <div className="reveal">
              <h1 className="font-sync header-text">
                I AM <span className="green">SHREYANSH JADHAO</span>
              </h1>
            </div>

            <div className="reveal">
              <p className="font-space bio-para">
                I’m a web developer. I started with the basics and gradually learned how the web works behind the scenes. Over time, I focused on writing <span className="highlight">clean, efficient code</span> and building fast, smooth experiences.
              </p>
            </div>

            <div className="reveal">
              <p className="font-space bio-para">
                I prefer simplicity—cutting out anything unnecessary so the visuals feel <span className="highlight">strong and intentional</span>.
              </p>
            </div>

            <div className="reveal">
              <p className="font-space bio-para" style={{color: '#7cfc00'}}>
                Now, I build cinematic, performance-focused web experiences with clean logic and no filler—just digital spaces that feel alive.
              </p>
            </div>

            <div className="reveal" style={styles.statusGrid}>
              <div style={styles.statusItem}>
                <span style={styles.label}>BASE</span>
                <span style={styles.val}>INDIA</span>
              </div>
              <div style={styles.statusItem}>
                <span style={styles.label}>DISCIPLINE</span>
                <span style={styles.val}>WEB ARCHITECTURE</span>
              </div>
              <div style={styles.statusItem}>
                <span style={styles.label}>STATUS</span>
                <span style={styles.val}>SYSTEM_ACTIVE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    width: "100vw", height: "100vh", backgroundColor: "#020202",
    position: "relative", overflow: "hidden", display: "flex", alignItems: "center"
  },
  contentWrapper: {
    width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 60px", zIndex: 10
  },
  flexLayout: { display: "flex", gap: "40px" },
  line: { width: "1px", height: "400px", backgroundColor: "rgba(124, 252, 0, 0.3)" },
  textBlock: { display: "flex", flexDirection: "column" },
  statusGrid: { display: "flex", gap: "50px", marginTop: "40px" },
  statusItem: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontFamily: "'Space Grotesk'", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px" },
  val: { fontFamily: "'Space Grotesk'", fontSize: "11px", color: "#fff", fontWeight: "700" },
  gridLayer: {
    position: "absolute", inset: 0,
    backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
    backgroundSize: "80px 80px", zIndex: 1
  },
  spotlight: {
    position: "fixed", width: "800px", height: "800px",
    background: "radial-gradient(circle, rgba(124, 252, 0, 0.04) 0%, transparent 70%)",
    top: 0, left: 0, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 2
  }
};

export default About;