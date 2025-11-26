import React, { useRef } from 'react';
import { UploadCloud, Music, Video } from 'lucide-react';
import { FileUploadProps } from '../types';

const FileUploader: React.FC<FileUploadProps> = ({ type, onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const acceptType = type === 'audio' ? 'audio/*' : 'video/*';
  const label = type === 'audio' ? 'Upload Audio' : 'Upload Video';
  const subLabel = type === 'audio' ? 'MP3, WAV, M4A, AAC' : 'MP4, MOV, AVI, WEBM';
  
  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer relative overflow-hidden rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-500 bg-purple-50/50 hover:bg-purple-50 transition-all duration-300 p-8 flex flex-col items-center justify-center text-center h-48 sm:h-56"
    >
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        accept={acceptType} 
        onChange={handleChange}
      />
      
      <div className="mb-4 p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
        {type === 'audio' ? (
          <Music className="w-8 h-8 text-purple-600" />
        ) : (
          <Video className="w-8 h-8 text-purple-600" />
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{label}</h3>
      <p className="text-sm text-slate-500">{subLabel}</p>
      
      <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default FileUploader;