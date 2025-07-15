import React, { useState, useCallback } from 'react';
import { Upload, File, AlertCircle, CheckCircle, Brain, Database } from 'lucide-react';
import type { AnalysisResults } from '../App';

interface UploadModeProps {
  onResultsGenerated: (results: AnalysisResults) => void;
  onLoadingChange: (loading: boolean) => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  fileType: 'model' | 'dataset';
  status: 'uploaded' | 'processing' | 'completed' | 'error';
}

export function UploadMode({ onResultsGenerated, onLoadingChange }: UploadModeProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    let updatedFiles = [...uploadedFiles];
    
    Array.from(files).forEach(file => {
      let fileType: 'model' | 'dataset';
      
      if (file.name.endsWith('.pkl') || file.name.endsWith('.joblib')) {
        fileType = 'model';
        // Remove existing model if any
        updatedFiles = updatedFiles.filter(f => f.fileType !== 'model');
      } else if (file.name.endsWith('.csv')) {
        fileType = 'dataset';
        // Remove existing dataset if any
        updatedFiles = updatedFiles.filter(f => f.fileType !== 'dataset');
      } else {
        return; // Skip unsupported files
      }
      
      // Add the new file
      updatedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        fileType,
        status: 'uploaded'
      });
    });
    
    setUploadedFiles(updatedFiles);
  };

  const processFiles = () => {
    const hasModel = uploadedFiles.some(f => f.fileType === 'model');
    const hasDataset = uploadedFiles.some(f => f.fileType === 'dataset');
    
    if (!hasModel || !hasDataset) {
      alert('Please upload both a model file (.pkl/.joblib) and a dataset file (.csv)');
      return;
    }

    onLoadingChange(true);
    
    // Update file status to processing
    setUploadedFiles(prev => prev.map(file => ({ ...file, status: 'processing' })));

    // Simulate processing and generate results
    setTimeout(() => {
      const mockResults: AnalysisResults = {
        benchmark: [
          { metric: 'Accuracy', value: 0.84, threshold: 0.85, status: 'warning' },
          { metric: 'Precision', value: 0.88, threshold: 0.80, status: 'good' },
          { metric: 'Recall', value: 0.76, threshold: 0.75, status: 'good' },
          { metric: 'F1-Score', value: 0.82, threshold: 0.78, status: 'good' },
          { metric: 'AUC-ROC', value: 0.89, threshold: 0.85, status: 'good' },
          { metric: 'Specificity', value: 0.71, threshold: 0.75, status: 'critical' }
        ],
        robustness: [
          { test_type: 'Gaussian Noise', noise_level: 0.1, accuracy_drop: 0.05, original_accuracy: 0.84, perturbed_accuracy: 0.79 },
          { test_type: 'Gaussian Noise', noise_level: 0.2, accuracy_drop: 0.12, original_accuracy: 0.84, perturbed_accuracy: 0.72 },
          { test_type: 'Missing Data', noise_level: 0.1, accuracy_drop: 0.04, original_accuracy: 0.84, perturbed_accuracy: 0.80 },
          { test_type: 'Missing Data', noise_level: 0.2, accuracy_drop: 0.09, original_accuracy: 0.84, perturbed_accuracy: 0.75 }
        ],
        sensitivity: [
          { column: 'feature_1', importance: 0.28, impact_score: 0.24, missing_data_tolerance: 0.82, bias_risk: 'low' },
          { column: 'feature_2', importance: 0.21, impact_score: 0.19, missing_data_tolerance: 0.75, bias_risk: 'medium' },
          { column: 'feature_3', importance: 0.18, impact_score: 0.21, missing_data_tolerance: 0.68, bias_risk: 'high' },
          { column: 'feature_4', importance: 0.16, impact_score: 0.15, missing_data_tolerance: 0.79, bias_risk: 'low' },
          { column: 'feature_5', importance: 0.17, impact_score: 0.18, missing_data_tolerance: 0.73, bias_risk: 'medium' }
        ]
      };

      setUploadedFiles(prev => prev.map(file => ({ ...file, status: 'completed' })));
      onResultsGenerated(mockResults);
      onLoadingChange(false);
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.pkl') || filename.endsWith('.joblib')) {
      return <Brain className="w-5 h-5 text-jgu-orange-600" />;
    } else if (filename.endsWith('.csv')) {
      return <Database className="w-5 h-5 text-jgu-green-600" />;
    }
    return <File className="w-5 h-5 text-jgu-gray-600" />;
  };

  const getFileTypeLabel = (fileType: 'model' | 'dataset') => {
    return fileType === 'model' ? 'Model' : 'Dataset';
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="w-4 h-4 text-jgu-blue-600" />;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-jgu-orange-600 border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-jgu-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-jgu-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Instructions */}
      <div className="bg-gradient-to-r from-jgu-orange-50 to-jgu-orange-100 rounded-2xl p-8 border border-jgu-orange-200">
        <h3 className="text-xl font-semibold text-jgu-gray-900 mb-4">
          Upload Your Files for Analysis
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-jgu-gray-900 mb-3">Required Files:</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Brain className="w-4 h-4 text-jgu-orange-600 mr-2" />
                <span className="text-sm text-jgu-gray-700">
                  <strong>One Model:</strong> .pkl or .joblib (scikit-learn)
                </span>
              </div>
              <div className="flex items-center">
                <Database className="w-4 h-4 text-jgu-green-600 mr-2" />
                <span className="text-sm text-jgu-gray-700">
                  <strong>One Dataset:</strong> .csv (features only, no target)
                </span>
              </div>
            </div>
          </div>
          <div className="bg-jgu-blue-50 p-4 rounded-lg border border-jgu-blue-200">
            <h4 className="font-medium text-jgu-blue-900 mb-2">Upload Behavior:</h4>
            <ul className="text-sm text-jgu-blue-800 space-y-1">
              <li>• Uploading a new model will replace the existing one</li>
              <li>• Uploading a new dataset will replace the existing one</li>
              <li>• Only .pkl, .joblib, and .csv files are accepted</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
          dragActive
            ? 'border-jgu-orange-400 bg-jgu-orange-50'
            : 'border-jgu-gray-300 hover:border-jgu-orange-400 hover:bg-jgu-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pkl,.joblib,.csv"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-jgu-orange-100 p-4 rounded-full">
              <Upload className="w-8 h-8 text-jgu-orange-600" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-jgu-gray-900 mb-2">
              Drag and drop your files here
            </h3>
            <p className="text-jgu-gray-600">
              or <span className="text-jgu-orange-600 font-medium">click to browse</span>
            </p>
          </div>
          
          <p className="text-sm text-jgu-gray-500">
            Required: 1 model (.pkl/.joblib) + 1 dataset (.csv) • Max size: 100MB per file
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-jgu-gray-200">
          <h4 className="text-lg font-semibold text-jgu-gray-900 mb-4">Uploaded Files</h4>
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-jgu-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="text-sm font-medium text-jgu-gray-900">{file.name}</p>
                    <p className="text-xs text-jgu-gray-500">
                      {getFileTypeLabel(file.fileType)} • {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(file.status)}
                  <span className="text-xs text-jgu-gray-500 capitalize">{file.status}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={processFiles}
              disabled={
                uploadedFiles.some(f => f.status === 'processing') ||
                !uploadedFiles.some(f => f.fileType === 'model') ||
                !uploadedFiles.some(f => f.fileType === 'dataset')
              }
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-jgu-orange-600 to-jgu-orange-700 text-white font-semibold rounded-lg shadow-lg hover:from-jgu-orange-700 hover:to-jgu-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Brain className="w-4 h-4 mr-2" />
              {!uploadedFiles.some(f => f.fileType === 'model') || !uploadedFiles.some(f => f.fileType === 'dataset')
                ? 'Upload Model & Dataset Required'
                : 'Analyze Files'
              }
            </button>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-3 text-sm text-jgu-gray-600">
                Files uploaded: {uploadedFiles.filter(f => f.fileType === 'model').length}/1 model, {uploadedFiles.filter(f => f.fileType === 'dataset').length}/1 dataset
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}