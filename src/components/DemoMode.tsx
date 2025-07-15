import React, { useEffect } from 'react';
import { Play, Database, BarChart3, Activity, CheckCircle } from 'lucide-react';
import type { AnalysisResults } from '../App';

interface DemoModeProps {
  onResultsGenerated: (results: AnalysisResults) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function DemoMode({ onResultsGenerated, onLoadingChange }: DemoModeProps) {
  const generateDemoResults = () => {
    onLoadingChange(true);
    
    // Simulate loading time
    setTimeout(() => {
      const demoResults: AnalysisResults = {
        benchmark: [
          { metric: 'Accuracy', value: 0.87, threshold: 0.85, status: 'good' },
          { metric: 'Precision', value: 0.82, threshold: 0.80, status: 'good' },
          { metric: 'Recall', value: 0.79, threshold: 0.75, status: 'good' },
          { metric: 'F1-Score', value: 0.80, threshold: 0.78, status: 'good' },
          { metric: 'AUC-ROC', value: 0.91, threshold: 0.85, status: 'good' },
          { metric: 'Specificity', value: 0.73, threshold: 0.75, status: 'warning' }
        ],
        robustness: [
          { test_type: 'Gaussian Noise', noise_level: 0.1, accuracy_drop: 0.03, original_accuracy: 0.87, perturbed_accuracy: 0.84 },
          { test_type: 'Gaussian Noise', noise_level: 0.2, accuracy_drop: 0.08, original_accuracy: 0.87, perturbed_accuracy: 0.79 },
          { test_type: 'Missing Data', noise_level: 0.1, accuracy_drop: 0.02, original_accuracy: 0.87, perturbed_accuracy: 0.85 },
          { test_type: 'Missing Data', noise_level: 0.2, accuracy_drop: 0.06, original_accuracy: 0.87, perturbed_accuracy: 0.81 },
          { test_type: 'Outliers', noise_level: 0.05, accuracy_drop: 0.04, original_accuracy: 0.87, perturbed_accuracy: 0.83 },
          { test_type: 'Outliers', noise_level: 0.1, accuracy_drop: 0.09, original_accuracy: 0.87, perturbed_accuracy: 0.78 }
        ],
        sensitivity: [
          { column: 'age', importance: 0.23, impact_score: 0.18, missing_data_tolerance: 0.85, bias_risk: 'low' },
          { column: 'cholesterol', importance: 0.19, impact_score: 0.22, missing_data_tolerance: 0.72, bias_risk: 'medium' },
          { column: 'blood_pressure', importance: 0.17, impact_score: 0.20, missing_data_tolerance: 0.78, bias_risk: 'low' },
          { column: 'bmi', importance: 0.15, impact_score: 0.16, missing_data_tolerance: 0.80, bias_risk: 'low' },
          { column: 'smoking_status', importance: 0.12, impact_score: 0.14, missing_data_tolerance: 0.65, bias_risk: 'high' },
          { column: 'family_history', importance: 0.08, impact_score: 0.12, missing_data_tolerance: 0.90, bias_risk: 'medium' },
          { column: 'exercise_frequency', importance: 0.06, impact_score: 0.08, missing_data_tolerance: 0.88, bias_risk: 'low' }
        ]
      };
      
      onResultsGenerated(demoResults);
      onLoadingChange(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Demo Description */}
      <div className="bg-gradient-to-r from-jgu-blue-50 to-jgu-blue-100 rounded-2xl p-8 border border-jgu-blue-200">
        <div className="flex items-start space-x-4">
          <div className="bg-jgu-blue-100 p-3 rounded-lg flex-shrink-0">
            <Database className="w-6 h-6 text-jgu-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-jgu-gray-900 mb-3">
              Demonstration Model: Cardiovascular Risk Prediction
            </h3>
            <p className="text-jgu-gray-700 mb-4">
              This RandomForest model was trained on a simulated clinical dataset of 10,000 patients 
              to predict 10-year cardiovascular risk. It uses 7 key clinical variables 
              and has been validated according to medical AI standards.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-jgu-blue-200">
                <div className="flex items-center mb-2">
                  <Activity className="w-4 h-4 text-jgu-green-600 mr-2" />
                  <span className="text-sm font-medium text-jgu-gray-900">Dataset</span>
                </div>
                <p className="text-sm text-jgu-gray-600">10,000 simulated patients</p>
                <p className="text-sm text-jgu-gray-600">7 clinical variables</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-jgu-blue-200">
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-4 h-4 text-jgu-blue-600 mr-2" />
                  <span className="text-sm font-medium text-jgu-gray-900">Performance</span>
                </div>
                <p className="text-sm text-jgu-gray-600">Accuracy: 87%</p>
                <p className="text-sm text-jgu-gray-600">AUC-ROC: 91%</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-jgu-blue-200">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-4 h-4 text-jgu-orange-600 mr-2" />
                  <span className="text-sm font-medium text-jgu-gray-900">Validation</span>
                </div>
                <p className="text-sm text-jgu-gray-600">5-fold cross-validation</p>
                <p className="text-sm text-jgu-gray-600">Robustness testing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variables Description */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-jgu-gray-200">
        <h4 className="text-lg font-semibold text-jgu-gray-900 mb-4">Clinical Variables Analyzed</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-jgu-blue-500 rounded-full mr-3"></div>
              <span className="text-sm"><strong>Age</strong> - Primary risk factor</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-jgu-green-500 rounded-full mr-3"></div>
              <span className="text-sm"><strong>Cholesterol</strong> - Blood level (mg/dL)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-jgu-orange-500 rounded-full mr-3"></div>
              <span className="text-sm"><strong>Blood Pressure</strong> - Systolic/Diastolic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-jgu-red-500 rounded-full mr-3"></div>
              <span className="text-sm"><strong>BMI</strong> - Body mass index</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm"><strong>Smoking Status</strong> - Smoker/Non-smoker</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
              <span className="text-sm"><strong>Family History</strong> - Genetic background</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
              <span className="text-sm"><strong>Exercise Frequency</strong> - Physical activity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Launch Demo Button */}
      <div className="text-center">
        <button
          onClick={generateDemoResults}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-jgu-red-600 to-jgu-red-700 text-white font-semibold rounded-xl shadow-lg hover:from-jgu-red-700 hover:to-jgu-red-800 transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-5 h-5 mr-3" />
          Launch Demonstration Analysis
        </button>
        <p className="text-sm text-jgu-gray-500 mt-3">
          Analysis will take a few seconds to simulate a complete audit
        </p>
      </div>
    </div>
  );
}