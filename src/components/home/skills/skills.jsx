import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { useRef, useEffect, useState, useCallback, useMemo, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import dynamic from 'next/dynamic';

// Lazy load Float component only when needed
const Float = dynamic(() => import("@react-three/drei").then(mod => ({ default: mod.Float })), {
  ssr: false
});

// Optimized skill data with preloaded images
const SKILLS_DATA = [
  { title: "UI/UX Designing", img: "/ux.jpeg" },
  { title: "Branding", img: "/branding.jpeg" },
  { title: "Digital Marketing", img: "/dm.jpeg" },
  { title: "Photoshop", img: "/photoshop.jpeg" },
  { title: "Figma", img: "/figma.jpeg" },
  { title: "Canva", img: "/canva.jpeg" },
  { title: "Premiere Pro", img: "/premierepro.jpeg" },
  { title: "Corel Draw", img: "/coreldraw.jpeg" },
  { title: "MailChimp", img: "/mailchimp.jpeg" },
  { title: "WordPress", img: "/wordpress.jpeg" },
  { title: "WIx Studio", img: "/wixstudio.jpeg" },
  { title: "Da Vinci", img: "/davinci.jpeg" },
  { title: "Ubersuggest", img: "/10.jpg" },
  { title: "Semrush ", img: "/11.jpg" },
];

// Simplified mobile skill orb component
const MobileSkillOrb = ({ skill, position, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  if (!isVisible) return null;

  return (
    <group position={position} scale={0.8}>
      <Html center distanceFactor={8}>
        <div 
          className="w-24 h-28 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <div className="mb-2">
            <div className="bg-slate-800/50 p-2.5 rounded-lg">
              <img
                src={skill.img}
                alt={skill.title}
                className="w-8 h-8 object-contain mx-auto"
                loading="lazy"
              />
            </div>
          </div>
          <h3 className="text-white text-xs font-medium text-center mb-2">
            {skill.title}
          </h3>
          <div className="h-0.5 bg-slate-600/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Html>
    </group>
  );
};

// Enhanced mobile skill orbs with faster, continuous movement
function MobileSkillOrbs({ skills, manualRotation }) {
  const groupRef = useRef();
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const autoRotationRef = useRef(0);
  
  const positions = useMemo(() => {
    return skills.map((_, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const layer = Math.floor(index / 8);
      const layerRadius = 6 - layer * 2;
      const x = Math.cos(angle) * layerRadius;
      const z = Math.sin(angle) * layerRadius;
      const y = (Math.sin(angle * 1.5) * 3 * 0.4) + (layer * 1.5);
      return [x, y, z];
    });
  }, [skills.length]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      if (Math.abs(manualRotation) > 0.0001) {
        // Faster manual control with continuous movement
        velocityRef.current = manualRotation * 8; // Increased multiplier for faster movement
        rotationRef.current += velocityRef.current;
      } else {
        // Continue with momentum when joystick is released
        velocityRef.current *= 0.96; // Slower decay for continuous feel
        
        // Add subtle auto rotation when completely idle
        if (Math.abs(velocityRef.current) < 0.001) {
          autoRotationRef.current += delta * 0.1;
          rotationRef.current = autoRotationRef.current;
        } else {
          rotationRef.current += velocityRef.current;
          autoRotationRef.current = rotationRef.current;
        }
      }
      
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <DesktopSkillOrb
          key={skill.title}
          skill={skill}
          position={positions[index]}
          index={index}
          scale={0.85}
        />
      ))}
    </group>
  );
}

// Simplified desktop skill orb
const DesktopSkillOrb = ({ skill, position, index, scale }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <group position={position} scale={scale}>
      <Html center distanceFactor={10}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: index * 0.05, 
              duration: 0.4,
              type: "spring",
              stiffness: 80
            } 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ transform: isHovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)' }}
          className="transition-transform duration-200"
        >
          <div 
            className={`w-32 h-36 p-4 rounded-xl backdrop-blur-sm border transition-all duration-200 ${
              isHovered ? 'bg-white/15 border-blue-400/40' : 'bg-white/10 border-white/20'
            }`}
          >
            <div className="mb-3">
              <div className="bg-slate-800/60 p-3 rounded-lg border border-white/10">
                <img
                  src={skill.img}
                  alt={skill.title}
                  className="w-12 h-12 object-contain mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className="text-white text-xs font-medium text-center mb-2">
              {skill.title}
            </h3>
            <div className="h-0.5 bg-slate-600/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </motion.div>
      </Html>
    </group>
  );
};

// Optimized desktop skill orbs (unchanged)
function SkillOrbs({ skills, deviceSize }) {
  const groupRef = useRef();
  
  const { radius, verticalSpread, orbScale } = useMemo(() => {
    switch(deviceSize) {
      case "laptop":
        return { radius: 6, verticalSpread: 2.5, orbScale: 0.8 };
      case "small-desktop":
        return { radius: 7, verticalSpread: 3, orbScale: 0.9 };
      default:
        return { radius: 8, verticalSpread: 4, orbScale: 1.0 };
    }
  }, [deviceSize]);

  const positions = useMemo(() => {
    return skills.map((_, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const layer = Math.floor(index / 8);
      const layerRadius = radius - layer * 2;
      const x = Math.cos(angle) * layerRadius;
      const z = Math.sin(angle) * layerRadius;
      const y = (Math.sin(angle * 1.5) * verticalSpread * 0.4) + (layer * 1.5);
      return [x, y, z];
    });
  }, [skills.length, radius, verticalSpread]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <DesktopSkillOrb
          key={skill.title}
          skill={skill}
          position={positions[index]}
          index={index}
          scale={orbScale}
        />
      ))}
    </group>
  );
}

// Simplified lighting
const SimpleLighting = () => (
  <>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={0.6} />
  </>
);

// Loading fallback
const LoadingFallback = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-400 rounded-full border-t-transparent animate-spin" />
  </div>
);

// Enhanced joystick control with faster, more responsive movement
const JoystickControl = ({ onRotate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef(null);
  const animationRef = useRef(null);
  const velocityRef = useRef(0);

  const JOYSTICK_RADIUS = 28;
  const KNOB_RADIUS = 10;

  const handleStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    velocityRef.current = 0;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleMove = useCallback((e) => {
    if (!isDragging || !joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;
    
    // Constrain to circle
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > JOYSTICK_RADIUS) {
      deltaX = (deltaX / distance) * JOYSTICK_RADIUS;
      deltaY = (deltaY / distance) * JOYSTICK_RADIUS;
    }
    
    setKnobPosition({ x: deltaX, y: deltaY });
    
    // Faster rotation speed with better sensitivity
    const normalizedX = deltaX / JOYSTICK_RADIUS;
    const rotationSpeed = normalizedX * 0.008; // Increased from 0.002 to 0.008 for 4x faster movement
    velocityRef.current = rotationSpeed;
    onRotate(rotationSpeed);
  }, [isDragging, onRotate]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    
    // Enhanced momentum with longer continuation
    const decelerate = () => {
      velocityRef.current *= 0.98; // Slower decay for longer momentum (was 0.92)
      
      setKnobPosition(prev => {
        const newX = prev.x * 0.92; // Slightly faster knob return
        const newY = prev.y * 0.92;
        
        // Continue movement for longer
        if (Math.abs(newX) > 0.3 || Math.abs(newY) > 0.3 || Math.abs(velocityRef.current) > 0.0005) {
          onRotate(velocityRef.current);
          animationRef.current = requestAnimationFrame(decelerate);
        } else {
          velocityRef.current = 0;
        }
        
        return { x: newX, y: newY };
      });
    };
    
    animationRef.current = requestAnimationFrame(decelerate);
  }, [onRotate]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute bottom-3 right-3 z-10">
      <div 
        ref={joystickRef}
        className={`
          relative w-14 h-14 rounded-full transition-all duration-150 select-none cursor-pointer
          ${isDragging 
            ? 'bg-gradient-to-br from-blue-500/25 to-purple-600/25 shadow-lg shadow-blue-500/20' 
            : 'bg-gradient-to-br from-white/8 to-white/4'
          }
          backdrop-blur-sm border-2 
          ${isDragging ? 'border-blue-400/50' : 'border-white/15'}
        `}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{ 
          touchAction: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          willChange: isDragging ? 'transform' : 'auto'
        }}
      >
        {/* Joystick base */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-700/40 to-slate-800/40" />
        
        {/* Enhanced direction indicators */}
        <div className="absolute inset-0 rounded-full opacity-50">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1 rounded-full bg-white/60" />
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1 rounded-full bg-white/60" />
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-0.5 rounded-full bg-white/60" />
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-0.5 rounded-full bg-white/60" />
        </div>
        
        {/* Enhanced joystick knob */}
        <div
          className={`
            absolute top-1/2 left-1/2 w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2
            transition-shadow duration-100 shadow-lg border border-white/20
            ${isDragging 
              ? 'bg-gradient-to-br from-blue-400/95 to-blue-600/95 shadow-blue-400/50 border-blue-300/40' 
              : 'bg-gradient-to-br from-white/80 to-white/60 shadow-black/30'
            }
          `}
          style={{
            transform: `translate(${knobPosition.x - 10}px, ${knobPosition.y - 10}px)`,
            willChange: 'transform'
          }}
        >
          {/* Enhanced knob highlight */}
          <div className={`
            absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full
            ${isDragging ? 'bg-blue-100/70' : 'bg-white/90'}
          `} />
          
          {/* Active state indicator */}
          {isDragging && (
            <div className="absolute inset-0 rounded-full bg-blue-300/20 animate-pulse" />
          )}
        </div>
      </div>
      
      {/* Speed indicator */}
      {isDragging && (
        <div className="absolute bottom-16 right-0 text-xs text-blue-400 font-mono bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
          Active
        </div>
      )}
    </div>
  );
};

// Enhanced mobile experience with faster joystick control
function EnhancedMobile({ skills }) {
  const [manualRotation, setManualRotation] = useState(0);
  const lastUpdateRef = useRef(0);

  // Enhanced rotation handler with better responsiveness
  const handleRotate = useCallback((delta) => {
    const now = performance.now();
    if (now - lastUpdateRef.current > 8) { // Increased update frequency for smoother movement
      setManualRotation(delta);
      lastUpdateRef.current = now;
    }
  }, []);

  return (
    <div className="py-6 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          My Skills
        </h2>
        <p className="text-slate-400 text-xs">
          {skills.length} core technologies • Enhanced control
        </p>
      </div>

      {/* Optimized 3D Skills Container */}
      <div className="relative h-80 w-full mb-4">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 12], fov: 70 }}
            gl={{ 
              antialias: false,
              alpha: true,
              powerPreference: "low-power",
              preserveDrawingBuffer: false,
              stencil: false,
              depth: true
            }}
            dpr={[1, 1.5]} // Slightly higher for better quality on retina
            frameloop="always" // Changed from "demand" for smoother continuous movement
          >
            <SimpleLighting />
            <MobileSkillOrbs 
              skills={skills} 
              manualRotation={manualRotation}
            />
            <Stars 
              radius={80} 
              depth={40} 
              count={80}
              factor={1.5} 
              saturation={0} 
              fade 
              speed={0.2} 
            />
          </Canvas>
        </Suspense>
        
        {/* Enhanced joystick control */}
        <JoystickControl onRotate={handleRotate} />
      </div>

      {/* Enhanced help text */}
      <div className="text-center">
        <p className="text-slate-400 text-xs">
          Drag joystick for faster control • Release for momentum • Scroll freely
        </p>
      </div>
    </div>
  );
}

// Compact desktop experience (unchanged)
function CompactDesktop({ skills, deviceSize }) {
  const getCameraPosition = useMemo(() => {
    switch(deviceSize) {
      case "laptop": return [0, 0, 18];
      case "small-desktop": return [0, 0, 16];
      default: return [0, 0, 14];
    }
  }, [deviceSize]);

  return (
    <div className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
      </div>

      {/* 3D Skills Container */}
      <div className="relative h-96 w-full">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas 
            camera={{ position: getCameraPosition, fov: 60 }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: "high-performance"
            }}
            dpr={[1, 2]}
          >
            <SimpleLighting />
            <SkillOrbs skills={skills} deviceSize={deviceSize} />
            <Stars 
              radius={100} 
              depth={50} 
              count={200}
              factor={2} 
              saturation={0} 
              fade 
              speed={0.3} 
            />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={true}
              rotateSpeed={0.4}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Bottom description */}
      <div className="text-center mt-8 px-4">
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          These are the core technologies I work with daily. Each skill represents years of hands-on experience 
          building real-world applications and solving complex problems.
        </p>
      </div>
    </div>
  );
}

// Simple tablet view (no 3D for better performance)
function CompactTablet({ skills }) {
  return (
    <div className="py-16 px-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
      </div>
      
      {/* Compact grid */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: index * 0.03,
                duration: 0.3
              } 
            }}
            whileHover={{ y: -3 }}
          >
            <div className="p-4 bg-white/8 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 transition-colors duration-200 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-white/10">
                    <img
                      src={skill.img}
                      alt={skill.title}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="text-white font-medium text-sm text-center">
                  {skill.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Main component with Next.js optimizations
function Skills() {
  const [deviceType, setDeviceType] = useState("desktop");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else if (width < 1200) {
        setDeviceType("laptop");
      } else if (width < 1440) {
        setDeviceType("small-desktop");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    
    // Debounce resize events
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };
    
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Preload images
  useEffect(() => {
    SKILLS_DATA.forEach(skill => {
      const img = new Image();
      img.src = skill.img;
    });
  }, []);

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-8 h-8 border-2 border-blue-400 rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={deviceType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {deviceType === "mobile" && <EnhancedMobile skills={SKILLS_DATA} />}
        {deviceType === "tablet" && <CompactTablet skills={SKILLS_DATA} />}
        {(deviceType === "laptop" || deviceType === "small-desktop" || deviceType === "desktop") && 
          <CompactDesktop skills={SKILLS_DATA} deviceSize={deviceType} />
        }
      </motion.div>
    </AnimatePresence>
  );
}

// Export with Next.js dynamic loading for better performance
export default dynamic(() => Promise.resolve(Skills), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-8 h-8 border-2 border-blue-400 rounded-full border-t-transparent animate-spin" />
    </div>
  )
});

