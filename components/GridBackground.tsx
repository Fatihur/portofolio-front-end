
import React from "react";

const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-white">
      <div className="h-full w-full bg-white  bg-grid-black/[0.04] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <style>{`
        .bg-grid-black\\/\\[0\\.04\\] {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}

export default GridBackground;
