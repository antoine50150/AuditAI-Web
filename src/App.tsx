import React, { useState, useCallback } from 'react';
import { Activity, Upload, BarChart3, AlertTriangle, CheckCircle, FileText, Brain, Shield, TrendingUp } from 'lucide-react';
import { DashboardHeader } from './components/DashboardHeader';
import { ModeSelector } from './components/ModeSelector';
import { DemoMode } from './components/DemoMode';
import { UploadMode } from './components/UploadMode';
import { ResultsDisplay } from './components/ResultsDisplay';

export type AppMode = 'demo' | 'upload';

export interface BenchmarkResult {
  metric: string;
  value: number;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
}

export interface RobustnessResult {
  test_type: string;
  noise_level: number;
  accuracy_drop: number;
  original_accuracy: number;
  perturbed_accuracy: number;
}

export interface SensitivityResult {
  column: string;
  importance: number;
  impact_score: number;
  missing_data_tolerance: number;
  bias_risk: 'low' | 'medium' | 'high';
}

export interface AnalysisResults {
  benchmark: BenchmarkResult[];
  robustness: RobustnessResult[];
  sensitivity: SensitivityResult[];
}

function App() {
  const [mode, setMode] = useState<AppMode>('demo');
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModeChange = useCallback((newMode: AppMode) => {
    setMode(newMode);
    setResults(null);
  }, []);

  const handleResultsGenerated = useCallback((newResults: AnalysisResults) => {
    setResults(newResults);
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-jgu-gray-50 via-white to-jgu-gray-100 font-sans">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-jgu-red-500 to-jgu-red-600 p-4 rounded-2xl shadow-lg">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-jgu-gray-900 mb-4">
            Nightingale AI Model Auditing Platform
          </h1>
          <p className="text-xl text-jgu-gray-600 max-w-3xl mx-auto leading-relaxed">
            Evaluate the robustness and reliability of predictive AI models in healthcare. 
            Interactive interface to understand model vulnerabilities and guide clinical decisions.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-jgu-gray-500">
            <span>Powered by</span>
            <span className="font-semibold text-jgu-red-600">Johannes Gutenberg University</span>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-jgu-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-jgu-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-jgu-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-jgu-gray-900 ml-3">Regulatory Validation</h3>
            </div>
            <p className="text-jgu-gray-600">
              Compliance with medical AI standards through detailed audits and explainable reports.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-jgu-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-jgu-blue-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-jgu-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-jgu-gray-900 ml-3">Robustness Analysis</h3>
            </div>
            <p className="text-jgu-gray-600">
              Stress testing against noise, missing data, and bias to evaluate model reliability.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-jgu-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-jgu-orange-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-jgu-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-jgu-gray-900 ml-3">Explainable Interface</h3>
            </div>
            <p className="text-jgu-gray-600">
              Intuitive visualizations for clinicians and data scientists without technical complexity.
            </p>
          </div>
        </div>

        {/* Mode Selection */}
        <ModeSelector 
          currentMode={mode} 
          onModeChange={handleModeChange}
          isLoading={isLoading}
        />

        {/* Content Area */}
        <div className="mt-8">
          {mode === 'demo' ? (
            <DemoMode 
              onResultsGenerated={handleResultsGenerated}
              onLoadingChange={handleLoadingChange}
            />
          ) : (
            <UploadMode 
              onResultsGenerated={handleResultsGenerated}
              onLoadingChange={handleLoadingChange}
            />
          )}
        </div>

        {/* Results Display */}
        {results && (
          <div className="mt-12">
            <ResultsDisplay results={results} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full mx-4">
              <div className="flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jgu-red-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-center text-jgu-gray-900 mb-2">
                Analysis in Progress...
              </h3>
              <p className="text-jgu-gray-600 text-center">
                Evaluating AI model robustness
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;