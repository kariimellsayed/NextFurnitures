import React from "react";

const Loading = ({ screen }) => {
  return (
    <div className={`flex items-center justify-center ${screen}`}>
      <div className="relative">
        <div className="h-10 w-10 rounded-full border-t-8 border-b-8 border-primary"></div>
        <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-t-8 border-b-8 border-gray-500 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
