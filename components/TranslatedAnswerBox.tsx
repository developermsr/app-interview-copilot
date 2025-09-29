
import React from 'react';

interface TranslatedAnswerBoxProps {
  translatedAnswer: string;
  isLoading: boolean;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    </div>
);

const TranslatedAnswerBox: React.FC<TranslatedAnswerBoxProps> = ({ translatedAnswer, isLoading }) => {
    return (
        <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg border border-slate-700 flex flex-col min-h-[200px] max-h-[50vh] relative">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-lime-400">Respuesta (Traducción)</h2>
            </div>
            <div className="flex-grow text-slate-300 whitespace-pre-wrap overflow-y-auto pr-2">
                 {isLoading && !translatedAnswer && (
                    <div className="p-3 rounded-md">
                        <SkeletonLoader />
                    </div>
                )}

                {!translatedAnswer && !isLoading && (
                    <p className="text-slate-500 italic">La traducción de la IA aparecerá aquí...</p>
                )}

                {translatedAnswer && (
                    <div className="p-3 rounded-md">
                        <p>{translatedAnswer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TranslatedAnswerBox;
