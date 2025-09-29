
import React from 'react';

interface ContextBoxProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const ContextBox: React.FC<ContextBoxProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="context" className="text-lg font-semibold text-slate-300">
        Context
      </label>
      <p className="text-sm text-slate-400">
        Paste your resume, job description, and any other relevant info here. This will help the AI tailor its answers.
      </p>
      <textarea
        id="context"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g., Senior Frontend Developer with 5 years of React experience..."
        className="w-full h-48 p-3 bg-slate-800 border border-slate-700 rounded-lg resize-y focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:opacity-50"
      />
    </div>
  );
};

export default ContextBox;
