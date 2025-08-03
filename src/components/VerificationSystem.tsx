import React, { useState } from 'react';
import { Shield, Camera, FileText, CheckCircle, AlertCircle, Upload, X } from 'lucide-react';

interface VerificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'user' | 'model';
}

export const VerificationSystem: React.FC<VerificationSystemProps> = ({ 
  isOpen, 
  onClose, 
  userType 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationData, setVerificationData] = useState({
    idType: '',
    idNumber: '',
    idPhoto: null,
    selfiePhoto: null,
    phoneNumber: '',
    verificationCode: '',
    address: '',
    dateOfBirth: ''
  });

  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);

  const idTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'drivers_license', label: 'Driver\'s License' },
    { value: 'national_id', label: 'National ID Card' },
    { value: 'state_id', label: 'State ID Card' }
  ];

  const handleSubmit = () => {
    setVerificationStatus('pending');
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus('approved');
    }, 3000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Identity Verification</h2>
        <p className="text-gray-400">
          {userType === 'model' 
            ? 'Verify your identity to start earning as a model'
            : 'Verify your identity for enhanced security and features'
          }
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">ID Document Type</label>
          <select
            value={verificationData.idType}
            onChange={(e) => setVerificationData({...verificationData, idType: e.target.value})}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            required
          >
            <option value="">Select ID type</option>
            {idTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">ID Number</label>
          <input
            type="text"
            value={verificationData.idNumber}
            onChange={(e) => setVerificationData({...verificationData, idNumber: e.target.value})}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="Enter your ID number"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            value={verificationData.dateOfBirth}
            onChange={(e) => setVerificationData({...verificationData, dateOfBirth: e.target.value})}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Address</label>
          <textarea
            value={verificationData.address}
            onChange={(e) => setVerificationData({...verificationData, address: e.target.value})}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            rows={3}
            placeholder="Enter your full address"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Upload Documents</h2>
        <p className="text-gray-400">Upload clear photos of your ID document</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-3">ID Document Photo</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Upload a clear photo of your ID</p>
            <p className="text-gray-400 text-sm mb-4">JPG, PNG up to 5MB</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
              <Upload className="w-4 h-4 inline mr-2" />
              Choose File
            </button>
          </div>
          <div className="text-gray-400 text-sm mt-2 space-y-1">
            <p>• Ensure all text is clearly visible</p>
            <p>• No glare or shadows</p>
            <p>• All corners of the document should be visible</p>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-3">Selfie with ID</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Take a selfie holding your ID</p>
            <p className="text-gray-400 text-sm mb-4">Both your face and ID should be clearly visible</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
              <Camera className="w-4 h-4 inline mr-2" />
              Take Photo
            </button>
          </div>
          <div className="text-gray-400 text-sm mt-2 space-y-1">
            <p>• Hold your ID next to your face</p>
            <p>• Ensure good lighting</p>
            <p>• Look directly at the camera</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Phone Verification</h2>
        <p className="text-gray-400">Verify your phone number for additional security</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={verificationData.phoneNumber}
            onChange={(e) => setVerificationData({...verificationData, phoneNumber: e.target.value})}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="+1 234 567 8900"
            required
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
          Send Verification Code
        </button>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Verification Code</label>
          <input
            type="text"
            value={verificationData.verificationCode}
            onChange={(e) => setVerificationData({...verificationData, verificationCode: e.target.value})}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest"
            placeholder="000000"
            maxLength={6}
          />
        </div>
      </div>
    </div>
  );

  const renderStatus = () => (
    <div className="text-center py-8">
      {verificationStatus === 'pending' && (
        <>
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Verification in Progress</h2>
          <p className="text-gray-400">Please wait while we verify your documents...</p>
        </>
      )}

      {verificationStatus === 'approved' && (
        <>
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Verification Approved!</h2>
          <p className="text-gray-400 mb-6">Your identity has been successfully verified.</p>
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue
          </button>
        </>
      )}

      {verificationStatus === 'rejected' && (
        <>
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
          <p className="text-gray-400 mb-6">Please check your documents and try again.</p>
          <button
            onClick={() => {
              setVerificationStatus(null);
              setCurrentStep(1);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Verification Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Identity Verification</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          {verificationStatus === null && (
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Step {currentStep} of 3</span>
                <span className="text-gray-400">{Math.round((currentStep / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {verificationStatus ? (
              renderStatus()
            ) : (
              <>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </>
            )}
          </div>

          {/* Footer */}
          {verificationStatus === null && (
            <div className="flex items-center justify-between p-6 border-t border-gray-700/50">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all"
                >
                  Submit for Verification
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};