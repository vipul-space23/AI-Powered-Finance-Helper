import React, { useState } from 'react';
import { ChevronDown, DollarSign, Calendar, Percent } from 'lucide-react';

const productTypes = [
  "Personal Loans",
  "Credit Cards",
  "Mortgages",
  "Savings Accounts",
  "Investment Products"
];

const products = [
  {
    name: "Bank A Personal Loan",
    interestRate: 5.99,
    term: "3-5 years",
    minAmount: 5000,
    maxAmount: 50000,
    highlight: true
  },
  {
    name: "Bank B Personal Loan",
    interestRate: 6.49,
    term: "1-7 years",
    minAmount: 1000,
    maxAmount: 40000,
    highlight: false
  },
  {
    name: "Credit Union C Personal Loan",
    interestRate: 5.74,
    term: "2-5 years",
    minAmount: 2500,
    maxAmount: 30000,
    highlight: false
  }
];

const ProductComparison = () => {
  const [selectedType, setSelectedType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Compare Financial Products
        </h1>
        <p className="text-gray-600">
          Compare different financial products to find the best fit for you
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between hover:border-blue-500 transition-colors"
        >
          <span className="text-gray-700">
            {selectedType || "Select product type"}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            {productTypes.map((type) => (
              <button
                key={type}
                className="w-full p-3 text-left hover:bg-blue-50 text-gray-700 transition-colors"
                onClick={() => {
                  setSelectedType(type);
                  setIsDropdownOpen(false);
                }}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-t-xl border-b border-gray-200">
            <div className="font-semibold text-gray-700">Product Name</div>
            <div className="font-semibold text-gray-700">Interest Rate</div>
            <div className="font-semibold text-gray-700">Term</div>
            <div className="font-semibold text-gray-700">Min Amount</div>
            <div className="font-semibold text-gray-700">Max Amount</div>
          </div>

          {products.map((product, index) => (
            <div
              key={product.name}
              className={`grid grid-cols-5 gap-4 p-4 ${
                product.highlight ? 'bg-blue-50' : 'hover:bg-gray-50'
              } transition-colors ${
                index !== products.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-800">{product.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Percent className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">{product.interestRate}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">{product.term}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">${product.minAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">${product.maxAmount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
          Get Personalized Recommendations
        </button>
      </div>
    </div>
  );
};

export default ProductComparison;