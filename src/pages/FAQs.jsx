import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      id: 1,
      question: "How do I open a bank account?",
      answer: "To open a bank account, you typically need to: 1) Choose a bank and account type, 2) Gather necessary documents (ID, proof of address), 3) Visit the bank or apply online, 4) Provide your information and documents, 5) Make an initial deposit if required, 6) Review and sign the account agreement.",
      category: "Banking"
    },
    {
      id: 2,
      question: "What is a credit score and why is it important?",
      answer: "A credit score is a numerical expression of your creditworthiness, typically ranging from 300 to 850. It's important because it affects your ability to get loans, credit cards, and even rent apartments. A higher score can lead to better interest rates and terms on loans.",
      category: "Credit"
    },
    {
      id: 3,
      question: "How can I start investing in stocks?",
      answer: "To start investing in stocks: 1) Educate yourself about the stock market, 2) Determine your investment goals and risk tolerance, 3) Choose a brokerage and open an account, 4) Start with a small amount and diversify your investments, 5) Consider starting with index funds or ETFs for beginners.",
      category: "Investing"
    },
    {
      id: 4,
      question: "What's the difference between a savings account and a checking account?",
      answer: "A savings account is designed for storing money and earning interest, while a checking account is for everyday transactions. Savings accounts typically have higher interest rates but limited withdrawals, whereas checking accounts offer more flexibility for frequent use but usually have lower or no interest rates.",
      category: "Banking"
    },
    {
      id: 5,
      question: "How can I improve my credit score?",
      answer: "To improve your credit score: 1) Pay all bills on time, 2) Reduce your credit card balances, 3) Don't close old credit accounts, 4) Limit new credit applications, 5) Regularly check your credit report for errors and dispute any inaccuracies.",
      category: "Credit"
    }
  ]

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-4xl font-extrabold text-center text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full p-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div 
              key={faq.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="flex justify-between items-center w-full p-4 text-left hover:bg-blue-50 transition duration-300"
              >
                <span className="font-semibold text-lg text-gray-800">{faq.question}</span>
                <div className="flex items-center">
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full mr-2">
                    {faq.category}
                  </span>
                  <svg
                    className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${openFAQ === faq.id ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 bg-blue-50 border-t border-blue-100">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        {filteredFAQs.length === 0 && (
          <motion.p 
            className="text-center text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No FAQs found. Try a different search term.
          </motion.p>
        )}
      </div>
    </div>
  )
}