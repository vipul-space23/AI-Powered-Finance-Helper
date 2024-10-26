import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ArrowLeft, Mic, MicOff } from 'lucide-react'
import { Groq } from 'groq-sdk'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you with your financial questions today?", sender: "bot" }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const navigate = useNavigate()

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        
        setInputMessage(transcript)
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognition)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.')
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (inputMessage.trim() === "" || isLoading) return

    // Add user message
    const userMessage = { id: messages.length + 1, text: inputMessage, sender: "user" }
    setMessages(prevMessages => [...prevMessages, userMessage])
    
    // Add loading message
    const loadingMessage = { 
      id: messages.length + 2, 
      text: "Processing your question...", 
      sender: "bot",
      isLoading: true 
    }
    setMessages(prevMessages => [...prevMessages, loadingMessage])
    
    setIsLoading(true)
    const messageText = inputMessage
    setInputMessage("") // Clear input field

    try {
      const groq = new Groq({ 
        apiKey: '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',
        dangerouslyAllowBrowser: true 
      })

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: messageText,
          },
        ],
        model: "llama3-8b-8192",
      })

      const botResponse = chatCompletion.choices[0]?.message?.content || "I apologize, I couldn't process your request."

      // Remove loading message and add actual response
      setMessages(prevMessages => {
        const messagesWithoutLoading = prevMessages.filter(msg => !msg.isLoading)
        return [...messagesWithoutLoading, {
          id: messages.length + 3,
          text: botResponse,
          sender: "bot"
        }]
      })
    } catch (error) {
      console.error('Error calling Llama model:', error)
      // Remove loading message and add error message
      setMessages(prevMessages => {
        const messagesWithoutLoading = prevMessages.filter(msg => !msg.isLoading)
        return [...messagesWithoutLoading, {
          id: messages.length + 3,
          text: "I apologize, but I encountered an error processing your request. Please try again.",
          sender: "bot"
        }]
      })
    } finally {
      setIsLoading(false)
    }
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
              } max-w-[80%] ${message.isLoading ? "animate-pulse" : ""}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-4">
          <div className="flex-grow flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              disabled={isLoading}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
          </div>
          <button
            type="submit"
            className={`bg-blue-600 text-white p-2 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={isLoading}
            aria-label="Send message"
          >
            <Send size={24} />
          </button>
        </form>
      </footer>
    </div>
  )
}