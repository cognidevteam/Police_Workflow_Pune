const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Blob 1 - Top Right - Muted Purple */}
      <div 
        className="absolute top-10 right-32 w-[500px] h-[500px] rounded-full blur-[80px] animate-float"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.05))",
        }}
      />
      
      {/* Blob 2 - Bottom Left - Dark Blue */}
      <div 
        className="absolute bottom-20 left-20 w-[600px] h-[600px] rounded-full blur-[100px] animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(30, 64, 175, 0.15), rgba(30, 64, 175, 0.03))",
        }}
      />
      
      {/* Blob 3 - Center Right - Muted Violet */}
      <div 
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[90px] animate-pulse-soft"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.18), rgba(124, 58, 237, 0.04))",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
