
import React from 'react';

interface TranscriptionBoxProps {
  transcript: string;
  finalTranscript: string;
}

const TranscriptionBox: React.FC<TranscriptionBoxProps> = ({ transcript, finalTranscript }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg border border-slate-700 flex flex-col min-h-[200px]">
      <h2 className="text-lg font-semibold text-cyan-400 mb-2">Interviewer's Question</h2>
      <div className="flex-grow text-slate-300">
        {finalTranscript ? (
            <p>{finalTranscript}</p>
        ) : transcript ? (
            <p className="text-slate-400">{transcript}</p>
        ) : (
            <p className="text-slate-500 italic">Waiting for question...</p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionBox;
