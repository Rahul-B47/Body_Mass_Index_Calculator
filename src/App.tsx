import React, { useState, useEffect } from 'react';
import { Calculator, Scale, Heart, TrendingUp, History, AlertCircle } from 'lucide-react';

interface BMIResult {
  weight: number;
  height: number;
  bmi: number;
  category: string;
  idealWeight: number;
  isMetric: boolean;
  timestamp: Date;
}

function App() {
  const [isMetric, setIsMetric] = useState(true);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState<BMIResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('bmiHistory');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults.map((result: any) => ({
        ...result,
        timestamp: new Date(result.timestamp)
      })));
    }
  }, []);

  // Save history to localStorage whenever results change
  useEffect(() => {
    localStorage.setItem('bmiHistory', JSON.stringify(results));
  }, [results]);

  const calculateBMI = (weight: number, height: number, isMetric: boolean): number => {
    if (isMetric) {
      // Metric: weight in kg, height in cm
      return weight / Math.pow(height / 100, 2);
    } else {
      // Imperial: weight in lbs, height in inches
      return (weight * 703) / Math.pow(height, 2);
    }
  };

  const calculateIdealWeight = (height: number, isMetric: boolean): number => {
    const heightInMeters = isMetric ? height / 100 : height * 0.0254;
    return 22 * Math.pow(heightInMeters, 2);
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
  };

  const getBMICategoryColor = (category: string): string => {
    switch (category) {
      case 'Underweight': return 'text-blue-600';
      case 'Normal weight': return 'text-green-600';
      case 'Overweight': return 'text-yellow-600';
      case 'Obesity': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBMICategoryBg = (category: string): string => {
    switch (category) {
      case 'Underweight': return 'bg-blue-50 border-blue-200';
      case 'Normal weight': return 'bg-green-50 border-green-200';
      case 'Overweight': return 'bg-yellow-50 border-yellow-200';
      case 'Obesity': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getHealthRisks = (bmi: number): string => {
    if (bmi < 18.5) {
      return "Your BMI indicates that you are underweight. Health risks may include malnutrition and weakened immune system.";
    } else if (bmi < 25) {
      return "Your BMI indicates that you are within a healthy weight range. Keep up the good work!";
    } else if (bmi < 30) {
      return "Your BMI indicates that you are overweight. Health risks may include high blood pressure, heart disease, and type 2 diabetes.";
    } else {
      return "Your BMI indicates that you are obese. Health risks may include coronary artery disease, stroke, and sleep apnea.";
    }
  };

  const getSuggestions = (bmi: number): string => {
    if (bmi < 18.5) {
      return "Consider consulting with a healthcare professional to ensure you are getting adequate nutrition.";
    } else if (bmi < 25) {
      return "Continue maintaining a balanced diet and regular exercise routine to stay within a healthy weight range.";
    } else if (bmi < 30) {
      return "Focus on adopting healthier eating habits and increasing physical activity to manage your weight.";
    } else {
      return "It's important to seek medical advice and develop a comprehensive plan to address your weight and overall health.";
    }
  };

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter valid weight and height values.');
      return;
    }

    const bmi = calculateBMI(weightNum, heightNum, isMetric);
    const category = getBMICategory(bmi);
    const idealWeight = calculateIdealWeight(heightNum, isMetric);

    const newResult: BMIResult = {
      weight: weightNum,
      height: heightNum,
      bmi,
      category,
      idealWeight,
      isMetric,
      timestamp: new Date()
    };

    setResults([newResult, ...results]);
    setShowSuggestions(true);
  };

  const clearHistory = () => {
    setResults([]);
    localStorage.removeItem('bmiHistory');
  };

  const latestResult = results[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">BMI Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Calculate your Body Mass Index and get personalized health insights</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Scale className="w-6 h-6 mr-2 text-blue-600" />
                Calculate BMI
              </h2>

              {/* Unit Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Unit System</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsMetric(true)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      isMetric
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Metric (kg, cm)
                  </button>
                  <button
                    onClick={() => setIsMetric(false)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      !isMetric
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Imperial (lbs, in)
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight ({isMetric ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Enter weight in ${isMetric ? 'kilograms' : 'pounds'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height ({isMetric ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Enter height in ${isMetric ? 'centimeters' : 'inches'}`}
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
              >
                Calculate BMI
              </button>
            </div>

            {/* Results Card */}
            {latestResult && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-red-500" />
                  Your Results
                </h2>

                {/* BMI Result */}
                <div className={`p-6 rounded-xl border-2 mb-6 ${getBMICategoryBg(latestResult.category)}`}>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 mb-2">
                      {latestResult.bmi.toFixed(1)}
                    </div>
                    <div className={`text-xl font-semibold ${getBMICategoryColor(latestResult.category)}`}>
                      {latestResult.category}
                    </div>
                  </div>
                </div>

                {/* Ideal Weight */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-gray-700">Ideal Weight</span>
                  </div>
                  <div className="text-2xl font-semibold text-green-600">
                    {latestResult.idealWeight.toFixed(1)} kg
                  </div>
                </div>

                {/* Health Risks */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="font-medium text-gray-700">Health Information</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {getHealthRisks(latestResult.bmi)}
                  </p>
                </div>

                {/* Suggestions */}
                {showSuggestions && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Personalized Suggestion</h4>
                    <p className="text-blue-700 text-sm">
                      {getSuggestions(latestResult.bmi)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* History Section */}
          {results.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <History className="w-6 h-6 mr-2 text-purple-600" />
                  Calculation History
                </h2>
                <div className="space-x-2">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {showHistory ? 'Hide' : 'Show'} History
                  </button>
                  <button
                    onClick={clearHistory}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Clear History
                  </button>
                </div>
              </div>

              {showHistory && (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-6">
                        <div className={`w-3 h-3 rounded-full ${
                          result.category === 'Normal weight' ? 'bg-green-500' :
                          result.category === 'Overweight' ? 'bg-yellow-500' :
                          result.category === 'Underweight' ? 'bg-blue-500' :
                          'bg-red-500'
                        }`}></div>
                        <div>
                          <span className="font-medium">BMI: {result.bmi.toFixed(1)}</span>
                          <span className="text-gray-500 ml-2">({result.category})</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {result.weight} {result.isMetric ? 'kg' : 'lbs'} × {result.height} {result.isMetric ? 'cm' : 'in'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {result.timestamp.toLocaleDateString()} {result.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;