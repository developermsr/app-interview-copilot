
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './Icon';

interface AnswerBoxProps {
  answer: string;
  isLoading: boolean;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    </div>
);

const AnswerBox: React.FC<AnswerBoxProps> = ({ answer, isLoading }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if(copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        if (answer) {
            navigator.clipboard.writeText(answer);
            setCopied(true);
        }
    };

    return (
        <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg border border-slate-700 flex flex-col min-h-[200px] max-h-[50vh] relative">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-emerald-400">Suggested Answer</h2>
                {answer && !isLoading && (
                    <button onClick={handleCopy} className="text-slate-400 hover:text-emerald-400 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <CopyIcon className="w-5 h-5" />
                        <span className="sr-only">{copied ? 'Copied!' : 'Copy to clipboard'}</span>
                    </button>
                )}
            </div>
            <div className="flex-grow text-slate-300 whitespace-pre-wrap overflow-y-auto pr-2">
                 {isLoading && !answer && (
                    <div className="p-3 rounded-md">
                        <SkeletonLoader />
                    </div>
                )}

                {!answer && !isLoading && (
                    <p className="text-slate-500 italic">AI will generate an answer here...</p>
                )}

                {answer && (
                    <div className="p-3 rounded-md">
                        <p>{answer}</p>
                    </div>
                )}
            </div>
            {copied && <div className="absolute bottom-4 right-4 text-xs bg-emerald-500/80 text-white px-2 py-1 rounded-md">Copied!</div>}
        </div>
    );
};

export default AnswerBox;
