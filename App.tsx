
import React, { useState, useEffect, useCallback } from 'react';
import { useTranscription } from './hooks/useTranscription';
import { getInterviewAnswer, translateTextToSpanish } from './services/geminiService';
import Header from './components/Header';
import ContextBox from './components/ContextBox';
import Controls from './components/Controls';
import TranscriptionBox from './components/TranscriptionBox';
import AnswerBox from './components/AnswerBox';
import TranslatedQuestionBox from './components/TranslatedQuestionBox';
import TranslatedAnswerBox from './components/TranslatedAnswerBox';

const App: React.FC = () => {
  const [context, setContext] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [translatedQuestion, setTranslatedQuestion] = useState<string>('');
  const [translatedAnswer, setTranslatedAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    isListening,
    transcript,
    finalTranscript,
    startListening,
    stopListening,
    error: transcriptionError,
  } = useTranscription();

  const processNewQuestion = useCallback(async (question: string) => {
    if (!question) return;

    setIsLoading(true);
    setIsTranslating(true);
    setError(null);
    setTranslatedQuestion('');
    setAnswer('');
    setTranslatedAnswer('');

    try {
      const [generatedAnswer, translatedQuestionText] = await Promise.all([
        getInterviewAnswer(context, question),
        translateTextToSpanish(question)
      ]);

      setAnswer(generatedAnswer);
      setTranslatedQuestion(translatedQuestionText);
      setIsLoading(false);

      const translatedAnswerText = await translateTextToSpanish(generatedAnswer);
      setTranslatedAnswer(translatedAnswerText);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
    } finally {
      setIsTranslating(false);
    }
  }, [context]);

  useEffect(() => {
    if (finalTranscript) {
      processNewQuestion(finalTranscript);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalTranscript]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-7xl">
        <ContextBox value={context} onChange={setContext} disabled={isListening || isLoading || isTranslating} />
        
        <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg border border-slate-700">
            <Controls
                isListening={isListening}
                isLoading={isLoading || isTranslating}
                onStart={startListening}
                onStop={stopListening}
            />
        </div>
        
        {(transcriptionError || error) && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-lg p-4 text-center">
                <p className="font-semibold">Error</p>
                <p>{transcriptionError || error}</p>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <TranslatedQuestionBox translatedQuestion={translatedQuestion} isLoading={isTranslating} />
            <TranscriptionBox transcript={transcript} finalTranscript={finalTranscript} />
            <AnswerBox answer={answer} isLoading={isLoading} />
            <TranslatedAnswerBox translatedAnswer={translatedAnswer} isLoading={isTranslating} />
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-xs">
        <p>Interview Copilot | AI-Powered Assistance</p>
      </footer>
    </div>
  );
};

export default App;
