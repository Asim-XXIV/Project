import React, { useState } from 'react';
import { X, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
}

interface TutorialGuideProps {
  topic: 'measurements' | 'customization' | 'ordering';
  onClose: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ topic, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const tutorials = {
    measurements: {
      title: 'How to Take Accurate Measurements',
      steps: [
        {
          title: 'Prepare',
          content: 'Wear form-fitting clothes and stand straight with feet together.',
          image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Chest/Bust',
          content: 'Measure around the fullest part of your chest/bust, keeping the tape parallel to the floor.',
          image: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Waist',
          content: 'Measure around your natural waistline, keeping the tape comfortably loose.',
          image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Hips',
          content: 'Measure around the fullest part of your hips, about 8 inches below your waist.',
          image: 'https://images.pexels.com/photos/6311158/pexels-photo-6311158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Inseam',
          content: 'Measure from the crotch to the bottom of the ankle.',
          image: 'https://images.pexels.com/photos/6311600/pexels-photo-6311600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      ]
    },
    customization: {
      title: 'Customizing Your Garment',
      steps: [
        {
          title: 'Select Base Product',
          content: 'Choose the type of garment you want to customize.',
          image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Choose Fabric & Color',
          content: 'Select from our range of premium fabrics and colors.',
          image: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Enter Measurements',
          content: 'Input your measurements or use our AI tool to help capture them.',
          image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Select Fit Preference',
          content: 'Choose between slim, regular, or relaxed fit based on your style preference.',
          image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Add Special Requirements',
          content: 'Include any additional notes or special requirements for your garment.',
          image: 'https://images.pexels.com/photos/6069242/pexels-photo-6069242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      ]
    },
    ordering: {
      title: 'The Order Process',
      steps: [
        {
          title: 'Add to Cart',
          content: 'Add your customized items to your shopping cart.',
          image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Review Customizations',
          content: 'Double-check all your customization choices before proceeding.',
          image: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Complete Checkout',
          content: 'Enter shipping and payment information to complete your order.',
          image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Track Production',
          content: 'Monitor your order status from production to shipping in your account.',
          image: 'https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          title: 'Receive Updates',
          content: 'Get notifications at each stage of the process via email or in-app messages.',
          image: 'https://images.pexels.com/photos/4498296/pexels-photo-4498296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      ]
    }
  };

  const currentTutorial = tutorials[topic];
  const steps = currentTutorial.steps;
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentTutorial.title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm text-gray-500">
                      {currentStep + 1}/{steps.length}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h4>
                    <p className="text-gray-600 mb-4">{steps[currentStep].content}</p>
                    
                    {steps[currentStep].image && (
                      <div className="mt-4 flex justify-center">
                        <img 
                          src={steps[currentStep].image} 
                          alt={steps[currentStep].title}
                          className="max-h-64 rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={currentStep === steps.length - 1 ? onClose : nextStep}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              {currentStep !== steps.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
            </button>
            
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </button>
            )}
            
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Skip Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialGuide;