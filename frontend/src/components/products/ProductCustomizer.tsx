import React, { useState } from 'react';
import { Save, RefreshCw, Ruler } from 'lucide-react';
import MeasurementAssistant from '../ai/MeasurementAssistant';

interface CustomizationOption {
  id: string;
  name: string;
  type: 'select' | 'color' | 'measurement' | 'text';
  options?: string[];
  defaultValue?: string;
}

interface ProductCustomizerProps {
  productId: string;
  productName: string;
  productImage: string;
  customizationOptions: CustomizationOption[];
  onSave: (customizations: Record<string, any>) => void;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  productId,
  productName,
  productImage,
  customizationOptions,
  onSave,
}) => {
  const [customizations, setCustomizations] = useState<Record<string, any>>({});
  const [showMeasurementAssistant, setShowMeasurementAssistant] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  
  const handleCustomizationChange = (optionId: string, value: any) => {
    setCustomizations({
      ...customizations,
      [optionId]: value,
    });
  };
  
  const handleMeasurementsComplete = (measurements: any) => {
    // Update all measurement-type customizations with the new measurements
    const newCustomizations = { ...customizations };
    
    customizationOptions
      .filter(option => option.type === 'measurement')
      .forEach(option => {
        const measurementKey = option.id.replace('measurement_', '');
        if (measurements[measurementKey]) {
          newCustomizations[option.id] = measurements[measurementKey];
        }
      });
    
    setCustomizations(newCustomizations);
  };
  
  const refreshPreview = () => {
    setPreviewLoading(true);
    // In a real app, this would call an API to generate a new preview
    setTimeout(() => {
      setPreviewLoading(false);
    }, 1500);
  };
  
  const handleSave = () => {
    onSave(customizations);
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Customize {productName}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personalize this product to your exact specifications.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowMeasurementAssistant(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Ruler className="h-4 w-4 mr-1" />
          Measurement Assistant
        </button>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="sm:col-span-1 p-4">
            <div className="relative">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-auto rounded-lg shadow-md"
              />
              {previewLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                  <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
                </div>
              )}
              <button
                type="button"
                onClick={refreshPreview}
                className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Preview
              </button>
            </div>
          </div>
          
          <div className="sm:col-span-2 p-4">
            <dl className="divide-y divide-gray-200">
              {customizationOptions.map((option) => (
                <div key={option.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">{option.name}</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {option.type === 'select' && option.options && (
                      <select
                        id={option.id}
                        name={option.id}
                        value={customizations[option.id] || option.defaultValue || ''}
                        onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select {option.name}</option>
                        {option.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {option.type === 'color' && option.options && (
                      <div className="flex flex-wrap gap-2">
                        {option.options.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                              customizations[option.id] === color ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleCustomizationChange(option.id, color)}
                            aria-label={`Select color ${color}`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {option.type === 'measurement' && (
                      <div className="flex rounded-md shadow-sm">
                        <input
                          type="number"
                          id={option.id}
                          name={option.id}
                          value={customizations[option.id] || ''}
                          onChange={(e) => handleCustomizationChange(option.id, parseFloat(e.target.value))}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                          placeholder="Enter measurement"
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          cm
                        </span>
                      </div>
                    )}
                    
                    {option.type === 'text' && (
                      <input
                        type="text"
                        id={option.id}
                        name={option.id}
                        value={customizations[option.id] || ''}
                        onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                        placeholder={`Enter ${option.name.toLowerCase()}`}
                      />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  Save Customization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showMeasurementAssistant && (
        <MeasurementAssistant
          onMeasurementsComplete={handleMeasurementsComplete}
          onClose={() => setShowMeasurementAssistant(false)}
        />
      )}
    </div>
  );
};

export default ProductCustomizer;