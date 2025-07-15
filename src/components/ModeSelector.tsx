import React from 'react';
import { Play, Upload, Sparkles } from 'lucide-react';
import type { AppMode } from '../App';

interface ModeSelectorProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  isLoading: boolean;
}

export function ModeSelector({ currentMode, onModeChange, isLoading }: ModeSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-jgu-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-jgu-gray-900 mb-3">Choose Your Analysis Mode</h2>
        <p className="text-jgu-gray-600">
          Start with our demo or upload your own models and data
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Demo Mode */}
        <button
          onClick={() => onModeChange('demo')}
          disabled={isLoading}
          className={`group relative p-8 rounded-xl border-2 transition-all duration-200 text-left ${
            currentMode === 'demo'
              ? 'border-jgu-blue-500 bg-jgu-blue-50 shadow-lg'
              : 'border-jgu-gray-200 hover:border-jgu-blue-300 hover:shadow-md'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-lg ${
              currentMode === 'demo' ? 'bg-jgu-blue-100' : 'bg-jgu-gray-100 group-hover:bg-jgu-blue-100'
            } transition-colors`}>
              <Play className={`w-6 h-6 ${
                currentMode === 'demo' ? 'text-jgu-blue-600' : 'text-jgu-gray-600 group-hover:text-jgu-blue-600'
              }`} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-jgu-gray-900">Demo Mode</h3>
              <div className="flex items-center mt-1">
                <Sparkles className="w-4 h-4 text-jgu-orange-500 mr-1" />
                <span className="text-sm text-jgu-orange-600 font-medium">Recommended</span>
              </div>
            </div>
          </div>
          
          <p className="text-jgu-gray-600 mb-4">
            Explore capabilities with pre-loaded demonstration data including 
            benchmark results, robustness tests, and sensitivity analysis.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-jgu-gray-500">
              <div className="w-2 h-2 bg-jgu-green-500 rounded-full mr-2"></div>
              Cardiovascular RandomForest model
            </div>
            <div className="flex items-center text-sm text-jgu-gray-500">
              <div className="w-2 h-2 bg-jgu-green-500 rounded-full mr-2"></div>
              Simulated clinical data
            </div>
            <div className="flex items-center text-sm text-jgu-gray-500">
              <div className="w-2 h-2 bg-jgu-green-500 rounded-full mr-2"></div>
              Complete audit results
            </div>
          </div>

          {currentMode === 'demo' && (
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 bg-jgu-blue-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </button>

        {/* Upload Mode */}
        <button
          onClick={() => onModeChange('upload')}
          disabled={isLoading}
          className={`group relative p-8 rounded-xl border-2 transition-all duration-200 text-left ${
            currentMode === 'upload'
              ? 'border-jgu-orange-500 bg-jgu-orange-50 shadow-lg'
              : 'border-jgu-gray-200 hover:border-jgu-orange-300 hover:shadow-md'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-lg ${
              currentMode === 'upload' ? 'bg-jgu-orange-100' : 'bg-jgu-gray-100 group-hover:bg-jgu-orange-100'
            } transition-colors`}>
              <Upload className={`w-6 h-6 ${
                currentMode === 'upload' ? 'text-jgu-orange-600' : 'text-jgu-gray-600 group-hover:text-jgu-orange-600'
              }`} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-jgu-gray-900">Upload Mode</h3>
              <span className="text-sm text-jgu-gray-500">Your own data</span>
            </div>
          </div>
          
          <p className="text-jgu-gray-600 mb-4">
            Upload your scikit-learn model (.pkl/.joblib) and data (.csv) 
            for personalized robustness and reliability analysis.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-jgu-gray-500">
              <div className="w-2 h-2 bg-jgu-blue-500 rounded-full mr-2"></div>
              Support .pkl, .joblib
            </div>
            <div className="flex items-center text-sm text-jgu-gray-500">
              <div className="w-2 h-2 bg-jgu-blue-500 rounded-full mr-2"></div>
              Custom CSV datasets
            </div>
            <div className="flex items-center text-sm text-jgu-gray-500">
              <div className="w-2 h-2 bg-jgu-blue-500 rounded-full mr-2"></div>
              Real-time analysis
            </div>
          </div>

          {currentMode === 'upload' && (
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 bg-jgu-orange-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}