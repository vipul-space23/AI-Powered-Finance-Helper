import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ArrowLeft } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you with your financial questions today?", sender: "bot" }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const navigate = useNavigate()

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim() === "") return

    const newMessage = { id: messages.length + 1, text: inputMessage, sender: "user" }
    setMessages([...messages, newMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: "Thank you for your question. I'm processing it and will respond shortly.", sender: "bot" }
      setMessages(prevMessages => [...prevMessages, botResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <button
            onClick={() => navigate("/")}
            className="mr-4 hover:bg-blue-700 p-2 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">FinanceHelper Chat</h1>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${
                message.sender === "bot"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-white text-gray-800 ml-auto"
              } max-w-[80%]`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Send message"
          >
            <Send size={24} />
          </button>
        </form>
      </footer>
    </div>
  )
}