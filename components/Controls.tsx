import React from 'react';
import { MicIcon, StopCircleIcon } from './Icon';

interface ControlsProps {
  isListening: boolean;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isListening, isLoading, onStart, onStop }) => {
  // Allow stopping at any time. Only disable the 'Start' button if loading.
  const buttonDisabled = !isListening && isLoading;
  const buttonBaseClasses = "px-6 py-3 text-lg font-semibold rounded-full flex items-center justify-center gap-3 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 w-full md:w-auto";
  const startClasses = "bg-cyan-600 hover:bg-cyan-500 text-white focus:ring-cyan-400/50";
  const stopClasses = "bg-red-600 hover:bg-red-500 text-white focus:ring-red-400/50";
  const disabledClasses = "bg-slate-600 text-slate-400 cursor-not-allowed";

  return (
    <div className="flex flex-col items-center gap-4">
        <p className="text-slate-400 text-center">
            {isListening ? "Listening for the interviewer's question..." : "Press 'Start' to begin transcription."}
        </p>
        <button
            onClick={isListening ? onStop : onStart}
            disabled={buttonDisabled}
            className={`${buttonBaseClasses} ${buttonDisabled ? disabledClasses : (isListening ? stopClasses : startClasses)}`}
        >
            {isListening ? (
            <>
                <StopCircleIcon className="w-6 h-6" />
                <span>Stop Listening</span>
            </>
            ) : (
            <>
                <MicIcon className="w-6 h-6" />
                <span>Start Listening</span>
            </>
            )}
        </button>
    </div>
  );
};

export default Controls;