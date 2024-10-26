import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Schemes() {
  const [expandedScheme, setExpandedScheme] = useState(null)

  const schemes = [
    {
      id: 1,
      name: "Pradhan Mantri Jan Dhan Yojana",
      description: "Financial inclusion program to ensure access to financial services.",
      benefits: ["Zero balance savings account", "Accident insurance cover", "Overdraft facility"],
      icon: "🏦"
    },
    {
      id: 2,
      name: "Atal Pension Yojana",
      description: "Pension scheme for unorganized sector workers.",
      benefits: ["Guaranteed pension", "Low contribution", "Tax benefits"],
      icon: "👵"
    },
    {
      id: 3,
      name: "Pradhan Mantri Mudra Yojana",
      description: "Scheme to provide loans to micro and small enterprises.",
      benefits: ["Loans up to ₹10 lakh", "No collateral required", "Flexible repayment terms"],
      icon: "💼"
    }
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-extrabold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Government Schemes
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{scheme.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{scheme.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                <motion.div
                  initial={false}
                  animate={{ height: expandedScheme === scheme.id ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <h4 className="font-semibold mb-2 text-indigo-600">Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index} className="mb-1">{benefit}</li>
                    ))}
                  </ul>
                </motion.div>
                <div className="mt-4 flex justify-end">
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)
                    }}
                  >
                    {expandedScheme === scheme.id ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}