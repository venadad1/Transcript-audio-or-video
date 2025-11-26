import React, { useState } from 'react';
import { Layout } from 'lucide-react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import LanguageSelector from './components/LanguageSelector';
import TranscriptDisplay from './components/TranscriptDisplay';
import { transcribeMedia } from './services/geminiService';
import { SupportedLanguage } from './types';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<'audio' | 'video' | null>(null);
  const [language, setLanguage] = useState<SupportedLanguage>(SupportedLanguage.ENGLISH);
  const [transcript, setTranscript] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File, type: 'audio' | 'video') => {
    setFile(selectedFile);
    setMediaType(type);
    setTranscript('');
    setError(null);
  };

  const handleTranscribe = async () => {
    if (!file || !mediaType) return;

    setIsProcessing(true);
    setError(null);
    setTranscript('');

    try {
      const result = await transcribeMedia(file, language);
      setTranscript(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during transcription. Please check your API key and file size (max 20MB for this demo).");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setMediaType(null);
    setTranscript('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <Header />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Upload Section */}
            {!file && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploader 
                  type="audio" 
                  onFileSelect={(f) => handleFileSelect(f, 'audio')} 
                />
                <FileUploader 
                  type="video" 
                  onFileSelect={(f) => handleFileSelect(f, 'video')} 
                />
              </div>
            )}

            {/* Selected File & Controls */}
            {file && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                      {mediaType === 'audio' ? 'MP3' : 'MP4'}
                    </div>
                    <div className="truncate">
                      <p className="font-medium text-slate-800 truncate">{file.name}</p>
                      <p className="text-sm text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium px-3 py-1 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    Change File
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                  <div className="flex-1">
                    <LanguageSelector 
                      selected={language} 
                      onChange={setLanguage} 
                    />
                  </div>
                  <button
                    onClick={handleTranscribe}
                    disabled={isProcessing}
                    className={`
                      h-12 px-8 rounded-xl font-semibold text-white transition-all shadow-md
                      flex items-center justify-center
                      ${isProcessing 
                        ? 'bg-purple-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                      }
                    `}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Transcribing...
                      </>
                    ) : (
                      'Start Transcription'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Transcript Output */}
            {transcript && (
              <div className="border-t border-slate-100 pt-8 animate-fade-in-up">
                <TranscriptDisplay text={transcript} />
              </div>
            )}
            
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm">
          Powered by Gemini 2.5 Flash • Secure & Private
        </p>
      </div>
    </div>
  );
};

export default App;