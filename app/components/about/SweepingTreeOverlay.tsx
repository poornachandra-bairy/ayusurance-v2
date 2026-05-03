'use client';

/**
 * Sweeping Stylized Tree
 * Placed on the left edge, branches sweeping over the top.
 * "Half tree (not realistic)", branches/leaves mostly on top, shadow cast on page.
 */
const SweepingTreeOverlay = () => (
  <div className="absolute top-0 left-0 w-[80vw] h-[60vh] max-w-[1200px] pointer-events-none z-0 overflow-visible opacity-90">
    <svg 
      className="w-full h-full" 
      viewBox="0 0 1000 600" 
      fill="none" 
      preserveAspectRatio="xMinYMin slice"
      style={{ filter: 'drop-shadow(10px 20px 30px rgba(60, 45, 30, 0.15))' }}
    >
      {/* Abstract Trunk - chopped at bottom/left */}
      <path 
        d="M-50,600 Q20,400 60,300 Q120,150 200,50 Q280,-50 400,-100" 
        stroke="#807262" 
        strokeWidth="45" 
        strokeLinecap="round" 
        opacity="0.4"
      />
      <path 
        d="M-20,600 Q40,420 80,300 Q150,120 280,30 Q400,-50 600,-80" 
        stroke="#8C7D6D" 
        strokeWidth="35" 
        strokeLinecap="round" 
        opacity="0.5"
      />

      {/* Sweeping Branches across the top */}
      <path d="M120,200 Q250,50 450,20 Q650,-10 850,30" stroke="#756A5B" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M180,180 Q320,10 550,60 Q750,110 900,100" stroke="#756A5B" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M80,280 Q250,200 400,220 Q550,240 700,200" stroke="#807262" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M220,90 Q400,150 650,80 Q800,40 950,60" stroke="#8A7E6F" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Stylized Leaves Layer (Gold / Olive tones) */}
      <g fill="#A39678" opacity="0.75">
        <circle cx="350" cy="50" r="45" />   <circle cx="500" cy="40" r="30" />
        <circle cx="650" cy="15" r="50" />   <circle cx="850" cy="55" r="35" />
        <circle cx="280" cy="120" r="25" />  <circle cx="180" cy="80" r="30" />
        <circle cx="420" cy="120" r="20" />  <circle cx="750" cy="130" r="40" />
        <circle cx="550" cy="15" r="22" />   <circle cx="950" cy="80" r="28" />
      </g>
      
      <g fill="#8B9173" opacity="0.85">
        <circle cx="400" cy="30" r="35" />   <circle cx="600" cy="70" r="45" />
        <circle cx="800" cy="40" r="40" />   <circle cx="300" cy="40" r="20" />
        <circle cx="500" cy="100" r="30" />  <circle cx="700" cy="60" r="35" />
        <circle cx="900" cy="110" r="25" />  <circle cx="200" cy="150" r="35" />
      </g>

      <g fill="#B4A88B" opacity="0.6">
        <circle cx="450" cy="65" r="25" />   <circle cx="550" cy="50" r="40" />
        <circle cx="750" cy="25" r="35" />   <circle cx="850" cy="105" r="22" />
        <circle cx="380" cy="150" r="18" />  <circle cx="650" cy="110" r="30" />
        <circle cx="150" cy="120" r="20" />  <circle cx="250" cy="190" r="15" />
        <circle cx="520" cy="150" r="20" />  <circle cx="800" cy="160" r="25" />
      </g>
    </svg>
  </div>
);

export default SweepingTreeOverlay;
