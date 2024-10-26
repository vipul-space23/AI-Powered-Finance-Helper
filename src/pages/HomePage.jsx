import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [newsIndex, setNewsIndex] = useState(0)
  const navigate = useNavigate()

  const news = [
    "New government scheme announced for small businesses",
    "Interest rates expected to rise next month",
    "Stock market reaches all-time high",
    "New tax benefits for first-time homeowners"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prevIndex) => (prevIndex + 1) % news.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white relative">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FinanceHelper</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Your Personal Finance Guide</h2>
          <p className="text-xl text-gray-600 mb-8">Empowering you with financial knowledge and resources</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon="📚"
            title="FAQs"
            description="Learn how to open a bank account and more"
          />
          <FeatureCard
            icon="🏛️"
            title="Government Schemes"
            description="Explore various government financial programs"
            onClick={() => navigate("/schemes")}
          />
          <FeatureCard
            icon="🎓"
            title="Loan Information"
            description="Find loans for education, business, and more"
            onClick={() => navigate("/loans")}
          />
          <FeatureCard
            icon="👩"
            title="Women's Section"
            description="Discover schemes and benefits for women"
          />
          <FeatureCard
            icon="📰"
            title="Latest News"
            description="Stay updated with financial news and trends"
          />
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-between items-center w-full p-4 text-left"
            >
              <span>How do I open a bank account?</span>
              <svg
                className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="p-4 bg-gray-50">
                To open a bank account, you typically need to:
                <ol className="list-decimal list-inside mt-2">
                  <li>Choose a bank and the type of account you want</li>
                  <li>Gather necessary documents (ID, proof of address, etc.)</li>
                  <li>Visit the bank or apply online</li>
                  <li>Provide your information and documents</li>
                  <li>Make an initial deposit if required</li>
                  <li>Review and sign the account agreement</li>
                </ol>
              </div>
            )}
          </div>
        </section>

        <section className="bg-gray-100 p-4 rounded-lg overflow-hidden">
          <h3 className="text-xl font-semibold mb-2">Latest Financial News</h3>
          <div className="whitespace-nowrap overflow-hidden">
            <span className="inline-block animate-[marquee_10s_linear_infinite]">
              {news[newsIndex]}
            </span>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white mt-12 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 FinanceHelper. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot Button */}
      <button
        onClick={() => navigate("/chat")}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}

function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}