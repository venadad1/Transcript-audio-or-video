import React from 'react';
import { Globe } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface LanguageSelectorProps {
  selected: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Transcript Language
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-purple-500" />
        </div>
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as SupportedLanguage)}
          className="block w-full pl-10 pr-10 py-3 text-base border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm rounded-xl bg-white shadow-sm border appearance-none cursor-pointer hover:border-purple-300 transition-colors text-slate-700"
        >
          {Object.values(SupportedLanguage).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;