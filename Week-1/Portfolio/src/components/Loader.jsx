import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as Icons from "react-icons/si"; 

const ICON_POOL = [ 
  Icons.SiNextdotjs, Icons.SiReact, Icons.SiTailwindcss, Icons.SiFramer,
  Icons.SiNodedotjs, Icons.SiRust, Icons.SiPython, Icons.SiDocker, 
  Icons.SiKubernetes, Icons.SiGithub, Icons.SiVercel, Icons.SiMongodb, 
  Icons.SiPostgresql, Icons.SiFirebase, Icons.SiTypescript, Icons.SiJavascript, 
  Icons.SiCplusplus, Icons.SiThreedotjs, Icons.SiSvelte, Icons.SiOpenai, 
  Icons.SiGooglecloud, Icons.SiAmazonwebservices, Icons.SiLinux, Icons.SiVite, 
  Icons.SiExpress, Icons.SiRedis, Icons.SiSupabase];

const Loader = ({ setFinished }) => {
  const loaderRef = useRef(null);

  const iconSet = useMemo(() => {
    const shuffled = [...ICON_POOL]
      .sort(() => Math.random() - 0.5)
      .slice(0, 7)
      .map(Icon => ({ Icon, className: "w-[100px] h-[100px] md:w-[150px] md:h-[150px]" })); 
    
    return [...shuffled, { Icon: Icons.SiGo, className: "w-[140px] h-[140px] md:w-[200px] md:h-[200px]" }]; 
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions;
      const tl = gsap.timeline({ 
        onComplete: () => {
          if (setFinished) setFinished(true);
          // SIGNAL TO NAVBAR: Start your animation now
          window.dispatchEvent(new Event("loaderFinished"));
          
          if (loaderRef.current) loaderRef.current.style.display = "none";
        }
      });

      tl.set(".stair", { scaleY: 0, transformOrigin: "top" });

      // 1. ENTRANCE
      tl.to(".stair", { scaleY: 1, duration: 0.5, ease: "expo.inOut", stagger: { amount: 0.2 } });

      // 2. THE GLITCH SEQUENCE
      iconSet.forEach((iconObj, i) => {
        const group = `.icon-group-${i}`;
        const ghosts = `${group} .ghost`;
        const isLast = i === iconSet.length - 1;

        const rangeX = isMobile ? 20 : 40;
        const rangeY = isMobile ? 8 : 12;

        tl.to(".glitch-box", {
          x: () => Math.random() * (isLast ? rangeX * 1.5 : rangeX) - (isLast ? rangeX * 0.75 : rangeX / 2), 
          y: () => Math.random() * (isLast ? rangeY * 1.5 : rangeY) - (isLast ? rangeY * 0.75 : rangeY / 2),
          duration: 0.04,
          repeat: isLast ? 5 : 3,
          yoyo: true,
          onStart: () => {
            gsap.set(".icon-layer", { display: "none" });
            gsap.set(group, { display: "block" });
          }
        });

        tl.fromTo(ghosts, 
          { opacity: 0.8, x: (idx) => idx === 0 ? -(rangeX * 1.5) : (rangeX * 1.5), skewX: 25 },
          { opacity: 0, x: 0, skewX: 0, duration: 0.15, ease: "power2.out" },
          "-=0.1"
        );
        tl.to({}, { duration: isLast ? 0.5 : 0.2 });
      });

      // 3. EXIT
      tl.to(".main-icon", { scale: 0.2, opacity: 0, filter: "blur(20px)", duration: 0.4, ease: "power4.in" }, "+=0.1");
      tl.to(".stair", { yPercent: 100, duration: 0.6, ease: "expo.inOut", stagger: { amount: 0.2 } }, "-=0.2");
    });

    return () => mm.revert();
  }, { scope: loaderRef });

  return (
    <div ref={loaderRef} className="fixed inset-0 z-1000 flex overflow-hidden bg-transparent">
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="stair h-full w-1/5 bg-[#050505]" 
            style={{ 
              border: "none", 
              outline: "none", 
              marginRight: "-1px" // Fixes the white line/gap between stairs
            }} 
          />
        ))}
      </div>
      
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="glitch-box relative w-250px h-250px md:w-400px md:h-400px flex items-center justify-center">
          {iconSet.map(({ Icon, className }, i) => (
            <div key={i} className={`icon-group-${i} icon-layer absolute hidden`}>
              <Icon className={`ghost absolute inset-0 text-[#FF0044] mix-blend-screen ${className}`} />
              <Icon className={`ghost absolute inset-0 text-[#00FFFF] mix-blend-screen ${className}`} />
              <Icon className={`main-icon relative text-white ${className}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;