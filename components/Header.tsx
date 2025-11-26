import React from 'react';
import { Mic, Video, Wand2 } from 'lucide-react';
import { APP_NAME, DESCRIPTION } from '../constants';

const Header: React.FC = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200">
           <Wand2 className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
        {APP_NAME}
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        {DESCRIPTION}
      </p>
    </div>
  );
};

export default Header;