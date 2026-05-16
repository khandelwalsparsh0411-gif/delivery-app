import React, { useState } from 'react';
import { MapPin, Package, Phone, AlertCircle, CheckCircle, Loader, Truck, FileText } from 'lucide-react';

export default function DeliveryOrderForm() {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupCity: '',
    pickupPostalCode: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryPostalCode: '',
    packageType: '',
    packageWeight: '',
    packageDimensions: '',
    phoneNumber: '',
    senderName: '',
    recipientName: '',
    specialInstructions: '',
    deliveryDate: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const packageTypes = [
    { value: 'documents', label: 'Documents', description: 'Letters, envelopes' },
    { value: 'small', label: 'Small Package', description: 'Up to 2 kg' },
    { value: 'medium', label: 'Medium Package', description: '2-5 kg' },
    { value: 'large', label: 'Large Package', description: '5-10 kg' },
    { value: 'extra-large', label: 'Extra Large', description: '10+ kg' },
    { value: 'fragile', label: 'Fragile Items', description: 'Requires special handling' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateStep1 = () => {
    if (!formData.senderName.trim()) {
      setError('Sender name is required');
      return false;
    }
    if (!formData.pickupAddress.trim()) {
      setError('Pickup address is required');
      return false;
    }
    if (!formData.pickupCity.trim()) {
      setError('Pickup city is required');
      return false;
    }
    if (!formData.pickupPostalCode.trim()) {
      setError('Pickup postal code is required');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep2 = () => {
    if (!formData.recipientName.trim()) {
      setError('Recipient name is required');
      return false;
    }
    if (!formData.deliveryAddress.trim()) {
      setError('Delivery address is required');
      return false;
    }
    if (!formData.deliveryCity.trim()) {
      setError('Delivery city is required');
      return false;
    }
    if (!formData.deliveryPostalCode.trim()) {
      setError('Delivery postal code is required');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep3 = () => {
    if (!formData.packageType) {
      setError('Please select a package type');
      return false;
    }
    if (!formData.phoneNumber || !validatePhone(formData.phoneNumber)) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (!formData.deliveryDate) {
      setError('Please select a delivery date');
      return false;
    }
    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const orderData = {
        pickupAddress: `${formData.pickupAddress}, ${formData.pickupCity} ${formData.pickupPostalCode}`,
        deliveryAddress: `${formData.deliveryAddress}, ${formData.deliveryCity} ${formData.deliveryPostalCode}`,
        packageType: formData.packageType,
        phoneNumber: formData.phoneNumber,
        senderName: formData.senderName,
        recipientName: formData.recipientName,
        packageWeight: formData.packageWeight,
        packageDimensions: formData.packageDimensions,
        specialInstructions: formData.specialInstructions,
        deliveryDate: formData.deliveryDate,
      };

      console.log('Order submitted:', orderData);
      setSuccess('Order submitted successfully! Your tracking number is #DLV-2024-001234');
      
      setFormData({
        pickupAddress: '',
        pickupCity: '',
        pickupPostalCode: '',
        deliveryAddress: '',
        deliveryCity: '',
        deliveryPostalCode: '',
        packageType: '',
        packageWeight: '',
        packageDimensions: '',
        phoneNumber: '',
        senderName: '',
        recipientName: '',
        specialInstructions: '',
        deliveryDate: '',
      });
      setCurrentStep(1);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-full mb-4">
            <Truck size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Delivery</h1>
          <p className="text-gray-600">Send your package safely and quickly</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition ${
                    currentStep >= step
                      ? 'bg-white text-indigo-600'
                      : 'bg-indigo-400 text-white'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-2 transition ${
                      currentStep > step ? 'bg-white' : 'bg-indigo-400'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-white text-xs font-medium">
              <span>Pickup</span>
              <span>Delivery</span>
              <span>Details</span>
            </div>
          </div>

          <div className="p-8">
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800 mb-1">Order Confirmed!</p>
                  <p className="text-sm text-green-700">{success}</p>
                  <button
                    onClick={() => setSuccess('')}
                    className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Place another order
                  </button>
                </div>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit}>
                
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MapPin size={24} className="text-indigo-600" />
                        Pickup Details
                      </h2>
                    </div>

                    <div>
                      <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        id="senderName"
                        name="senderName"
                        type="text"
                        value={formData.senderName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Address
                      </label>
                      <textarea
                        id="pickupAddress"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleInputChange}
                        placeholder="Street address, building, apartment number"
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500 resize-none"
                        disabled={isLoading}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pickupCity" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          id="pickupCity"
                          name="pickupCity"
                          type="text"
                          value={formData.pickupCity}
                          onChange={handleInputChange}
                          placeholder="New York"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label htmlFor="pickupPostalCode" className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          id="pickupPostalCode"
                          name="pickupPostalCode"
                          type="text"
                          value={formData.pickupPostalCode}
                          onChange={handleInputChange}
                          placeholder="10001"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isLoading}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition"
                      >
                        Next: Delivery Address
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MapPin size={24} className="text-indigo-600" />
                        Delivery Details
                      </h2>
                    </div>

                    <div>
                      <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                        Recipient Name
                      </label>
                      <input
                        id="recipientName"
                        name="recipientName"
                        type="text"
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        id="deliveryAddress"
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                        placeholder="Street address, building, apartment number"
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500 resize-none"
                        disabled={isLoading}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          id="deliveryCity"
                          name="deliveryCity"
                          type="text"
                          value={formData.deliveryCity}
                          onChange={handleInputChange}
                          placeholder="Los Angeles"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label htmlFor="deliveryPostalCode" className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          id="deliveryPostalCode"
                          name="deliveryPostalCode"
                          type="text"
                          value={formData.deliveryPostalCode}
                          onChange={handleInputChange}
                          placeholder="90001"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        disabled={isLoading}
                        className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isLoading}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition"
                      >
                        Next: Package Details
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Package size={24} className="text-indigo-600" />
                        Package & Delivery Details
                      </h2>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Package Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {packageTypes.map(pkg => (
                          <label
                            key={pkg.value}
                            className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                              formData.packageType === pkg.value
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="packageType"
                              value={pkg.value}
                              checked={formData.packageType === pkg.value}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-indigo-600 mt-1"
                              disabled={isLoading}
                            />
                            <div className="ml-3">
                              <p className="font-semibold text-gray-900">{pkg.label}</p>
                              <p className="text-xs text-gray-500">{pkg.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="packageWeight" className="block text-sm font-medium text-gray-700 mb-2">
                          Weight (kg)
                        </label>
                        <input
                          id="packageWeight"
                          name="packageWeight"
                          type="number"
                          step="0.1"
                          value={formData.packageWeight}
                          onChange={handleInputChange}
                          placeholder="2.5"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label htmlFor="packageDimensions" className="block text-sm font-medium text-gray-700 mb-2">
                          Dimensions (L×W×H cm)
                        </label>
                        <input
                          id="packageDimensions"
                          name="packageDimensions"
                          type="text"
                          value={formData.packageDimensions}
                          onChange={handleInputChange}
                          placeholder="30×20×10"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Delivery Date
                      </label>
                      <input
                        id="deliveryDate"
                        name="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        min={getTomorrowDate()}
                        max={getMaxDate()}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        id="specialInstructions"
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        placeholder="Handle with care, leave at door, etc."
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition text-gray-900 placeholder-gray-500 resize-none"
                        disabled={isLoading}
                      ></textarea>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <FileText size={20} className="text-blue-600 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-semibold mb-1">Estimated Delivery Cost</p>
                          <p>Will be calculated based on package details and location</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        disabled={isLoading}
                        className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader size={18} className="animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Truck size={18} />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          By placing an order, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}