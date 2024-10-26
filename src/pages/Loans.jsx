import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Loans() {
  const [expandedLoan, setExpandedLoan] = useState(null)

  const loans = [
    {
      id: 1,
      type: "Education Loan",
      description: "Invest in your future with our education loans.",
      features: ["Competitive interest rates", "Flexible repayment options", "Cover tuition and living expenses"],
      icon: "🎓",
      color: "bg-blue-100",
      interestRate: "8.5%",
      maxAmount: "₹50,00,000"
    },
    {
      id: 2,
      type: "Business Loan",
      description: "Fuel your business growth with our flexible business loans.",
      features: ["Quick approval process", "Minimal documentation", "No collateral for small loans"],
      icon: "💼",
      color: "bg-green-100",
      interestRate: "11%",
      maxAmount: "₹2,00,00,000"
    },
    {
      id: 3,
      type: "Home Loan",
      description: "Make your dream home a reality with our affordable home loans.",
      features: ["Long repayment tenure", "Tax benefits", "Option for balance transfer"],
      icon: "🏠",
      color: "bg-yellow-100",
      interestRate: "7.5%",
      maxAmount: "₹5,00,00,000"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-extrabold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Loan Options
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan, index) => (
            <motion.div
              key={loan.id}
              className={`${loan.color} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedLoan(expandedLoan === loan.id ? null : loan.id)}
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{loan.icon}</span>
                  <h3 className="text-2xl font-semibold text-gray-900">{loan.type}</h3>
                </div>
                <p className="text-gray-700 mb-4">{loan.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-semibold text-indigo-600">{loan.interestRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Max Amount</p>
                    <p className="text-lg font-semibold text-indigo-600">{loan.maxAmount}</p>
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: expandedLoan === loan.id ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <h4 className="font-semibold mb-2 text-indigo-600">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {loan.features.map((feature, index) => (
                      <li key={index} className="mb-1">{feature}</li>
                    ))}
                  </ul>
                  <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                    Apply Now
                  </button>
                </motion.div>
                <div className="mt-4 flex justify-end">
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedLoan(expandedLoan === loan.id ? null : loan.id)
                    }}
                  >
                    {expandedLoan === loan.id ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <img 
  src="loan.png"
  alt="Loans illustration"
  style={{ width: '90%', height: '10%' }} // Resize image to 50% width, maintaining aspect ratio
  className="mx-auto mt-12"
/>

    </div>

  )
}