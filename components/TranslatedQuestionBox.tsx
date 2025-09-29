
import React from 'react';

interface TranslatedQuestionBoxProps {
  translatedQuestion: string;
  isLoading: boolean;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
);

const TranslatedQuestionBox: React.FC<TranslatedQuestionBoxProps> = ({ translatedQuestion, isLoading }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg border border-slate-700 flex flex-col min-h-[200px]">
      <h2 className="text-lg font-semibold text-sky-400 mb-2">Pregunta (Traducción)</h2>
      <div className="flex-grow text-slate-300">
        {isLoading && !translatedQuestion ? (
            <SkeletonLoader />
        ) : translatedQuestion ? (
            <p>{translatedQuestion}</p>
        ) : (
            <p className="text-slate-500 italic">Esperando traducción...</p>
        )}
      </div>
    </div>
  );
};

export default TranslatedQuestionBox;
