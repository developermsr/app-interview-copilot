
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 border-b border-slate-700 p-4 shadow-md">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
          Interview Copilot
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-1">
          Your AI-powered interview assistant.
        </p>
      </div>
    </header>
  );
};

export default Header;
