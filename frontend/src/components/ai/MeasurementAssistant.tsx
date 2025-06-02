import React, { useState } from 'react';
import { Camera, Upload, Check, AlertCircle } from 'lucide-react';

interface MeasurementAssistantProps {
  onMeasurementsComplete: (measurements: any) => void;
  onClose: () => void;
}

const MeasurementAssistant: React.FC<MeasurementAssistantProps> = ({ 
  onMeasurementsComplete, 
  onClose 
}) => {
  const [step, setStep] = useState<'intro' | 'upload' | 'processing' | 'results'>('intro');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.includes('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      setStep('processing');
      
      // Simulate AI processing
      setTimeout(() => {
        // Mock measurements that would come from AI model
        const mockMeasurements = {
          height: 175, // cm
          chest: 95, // cm
          waist: 80, // cm
          hips: 98, // cm
          inseam: 82, // cm
          shoulder: 45, // cm
          arm: 65, // cm
          neck: 38, // cm
        };
        
        setMeasurements(mockMeasurements);
        setStep('results');
      }, 3000);
    };
    
    reader.readAsDataURL(file);
  };

  const handleComplete = () => {
    onMeasurementsComplete(measurements);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {step === 'intro' && (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Camera className="h-6 w-6 text-indigo-600\" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    AI Measurement Assistant
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Our AI can help you take accurate body measurements from photos. Here's how it works:
                    </p>
                    <ul className="mt-3 list-disc pl-5 text-sm text-gray-500">
                      <li>Upload a full-body photo (front-facing)</li>
                      <li>Our AI will analyze your proportions</li>
                      <li>Review and adjust the measurements if needed</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-500">
                      Your privacy is important to us. Photos are processed locally and not stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setStep('upload')}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {step === 'upload' && (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Upload a Photo
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-4">
                      Please upload a full-body photo where you're standing straight with arms slightly away from your body.
                    </p>
                    
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    
                    {error && (
                      <div className="mt-2 text-sm text-red-600">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {error}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setStep('intro')}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Back
                </button>
              </div>
            </div>
          )}
          
          {step === 'processing' && (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Processing Your Image
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-4">
                      Our AI is analyzing your photo to determine your measurements. This will take just a moment...
                    </p>
                    
                    <div className="flex flex-col items-center">
                      {uploadedImage && (
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded" 
                          className="h-64 object-contain mb-4 rounded"
                        />
                      )}
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-indigo-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Detecting body landmarks...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 'results' && (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <div className="flex items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Your Measurements
                    </h3>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <Check className="h-4 w-4 mr-1" /> AI Analysis Complete
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {measurements && Object.entries(measurements).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-md">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key}
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="number"
                            name={key}
                            id={key}
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                            value={value as number}
                            onChange={(e) => {
                              const newMeasurements = { ...measurements };
                              newMeasurements[key] = parseFloat(e.target.value);
                              setMeasurements(newMeasurements);
                            }}
                          />
                          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            cm
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-500">
                    You can adjust these measurements if needed. These will be used to customize your garments for the perfect fit.
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleComplete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Measurements
                </button>
                <button
                  type="button"
                  onClick={() => setStep('upload')}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Try Another Photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasurementAssistant;