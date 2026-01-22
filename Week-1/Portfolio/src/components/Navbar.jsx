import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Navbar({ isLoaded: propIsLoaded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalLoaded, setInternalLoaded] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (propIsLoaded) {
      setInternalLoaded(true);
    } else {
      const timer = setTimeout(() => setInternalLoaded(true), 4500); // Reduced delay for better UX
      return () => clearTimeout(timer);
    }
  }, [propIsLoaded]);

  useGSAP(() => {
    if (!internalLoaded) return;

    const tl = gsap.timeline();
    const isDesktop = window.innerWidth > 1024;

    gsap.set(navRef.current, { visibility: "visible", width: "0%", opacity: 0 });
    gsap.set(".nav-item-reveal", { opacity: 0, y: 10 });

    tl.to(navRef.current, {
      opacity: 1,
      width: isDesktop ? "85%" : "92%",
      duration: 1.2,
      ease: "expo.inOut",
    })
    .to(".nav-item-reveal", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.2");

    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    glitchTl
      .add(() => logoRef.current?.classList.add("active-glitch"))
      .to(logoRef.current, { x: 1, y: -1, duration: 0.05 })
      .to(logoRef.current, { x: -1, y: 1, duration: 0.05 })
      .to(logoRef.current, { x: 0, y: 0, duration: 0.05 })
      .to({}, { duration: 0.5 }) 
      .add(() => logoRef.current?.classList.remove("active-glitch"));

  }, { dependencies: [internalLoaded], scope: navRef });

  useGSAP(() => {
    if (isOpen) {
      gsap.to(".stair-segment", { scaleY: 1, stagger: 0.07, duration: 0.5, ease: "power4.inOut" });
      gsap.to(".mobile-link", { opacity: 1, y: 0, stagger: 0.1, delay: 0.2 });
    } else {
      gsap.to(".stair-segment", { scaleY: 0, stagger: -0.05, duration: 0.5, ease: "power4.inOut" });
      gsap.to(".mobile-link", { opacity: 0, y: 20 });
    }
  }, [isOpen]);

  const logoText = "SHREYANSH";

  return (
    <>
      <nav ref={navRef} style={navStyles}>
        {/* Left Section */}
        <div className="desktop-only nav-item-reveal" style={sideSectionStyles}>
          <span className="link-hover">Work</span>
          <span className="link-hover">About</span>
        </div>

        {/* Logo Section */}
        <div className="nav-item-reveal" style={logoWrapperStyles}>
          <div ref={logoRef} className="glitch-logo" data-text={logoText}>
            {logoText}
          </div>
        </div>

        {/* Right Section */}
        <div className="nav-item-reveal" style={{ ...sideSectionStyles, justifyContent: "flex-end" }}>
          <span className="desktop-only link-hover" style={{ marginRight: "20px" }}>Contact</span>
          
          {/* Desktop Only Projects Button */}
          <button className="desktop-only projects-btn">
            Projects
          </button>

          {/* Mobile Only Toggle */}
          <div className="mobile-only mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={iconContainerStyles}>
            <div style={{ ...lineBase, width: "26px", transform: isOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
            <div style={{ ...lineBase, width: "16px", opacity: isOpen ? 0 : 1 }} />
            <div style={{ ...lineBase, width: "26px", transform: isOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
          </div>
        </div>
      </nav>

      {/* Mobile Overlay (Unchanged) */}
      <div className="mobile-menu-overlay" style={{ ...overlayStyles, pointerEvents: isOpen ? "all" : "none" }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="stair-segment" style={stairStyles} />
        ))}
        <div style={linkContainerStyles}>
          {["Projects", "Vision", "History", "Contact"].map((text) => (
            <h1 key={text} className="mobile-link" data-text={text} style={mobileLinkStyles}>
              {text}
            </h1>
          ))}
        </div>
      </div>

      <style>{`
        /* RESPONSIVE VISIBILITY */
        @media (max-width: 1023px) { 
            .desktop-only { display: none !important; } 
        }
        @media (min-width: 1024px) { 
            .mobile-only { display: none !important; } 
        }

        .glitch-logo {
          position: relative;
          font-size: 44px; /* Applied your size preference from earlier */
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: white;
        }

        .projects-btn {
            background: white;
            color: black;
            border: none;
            padding: 10px 24px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            cursor: pointer;
            transition: 0.3s;
        }

        .projects-btn:hover {
            background: #7cfc00;
            transform: scale(1.05);
        }

        .active-glitch::before, .active-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
        }

        .active-glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff0044;
          clip-path: inset(44% 0 56% 0);
          animation: glitch-anim 0.2s infinite;
        }

        .active-glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00ffff;
          clip-path: inset(10% 0 80% 0);
          animation: glitch-anim 0.2s infinite reverse;
        }

        @keyframes glitch-anim {
          0% { clip-path: inset(10% 0 30% 0); }
          100% { clip-path: inset(20% 0 70% 0); }
        }

        .link-hover {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0.6;
          transition: 0.3s;
          cursor: pointer;
        }
        .link-hover:hover { opacity: 1; color: #7cfc00; }
      `}</style>
    </>
  );
}

// --- STYLES ---

const navStyles = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  top: "30px",
  height: "90px", // Adjusted for the 44px logo
  backgroundColor: "rgba(10, 10, 10, 0.4)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 35px",
  zIndex: 9999,
  color: "white",
  overflow: "hidden",
  visibility: "hidden",
  opacity: 0
};

const sideSectionStyles = { flex: 1, display: "flex", gap: "30px", alignItems: "center", whiteSpace: "nowrap" };
const logoWrapperStyles = { position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", justifyContent: "center" };
const iconContainerStyles = { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "6px", cursor: "pointer" };
const lineBase = { height: "2px", backgroundColor: "white", transition: "0.4s ease" };
const overlayStyles = { position: "fixed", inset: 0, zIndex: 9998, display: "flex" };
const stairStyles = { flex: 1, backgroundColor: "#070707", transformOrigin: "top", transform: "scaleY(0)", marginRight: "-1px" };
const linkContainerStyles = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" };
const mobileLinkStyles = { fontSize: "3.5rem", fontWeight: "900", opacity: 0, transform: "translateY(30px)", color: "white", textTransform: "uppercase" };

export default Navbar;