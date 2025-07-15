import React from 'react';
import { Activity, Github, FileText, Heart } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="bg-jgu-red-600 border-b border-jgu-red-700 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <Heart className="w-6 h-6 text-jgu-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Nightingale Project</h1>
              <p className="text-sm text-jgu-red-100">Healthcare AI Model Auditing Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-jgu-red-100 hover:text-white hover:bg-jgu-red-700 rounded-lg transition-colors">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Documentation</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-jgu-red-100 hover:text-white hover:bg-jgu-red-700 rounded-lg transition-colors">
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
            
            <div className="h-6 w-px bg-jgu-red-400"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-jgu-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-jgu-red-100">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}