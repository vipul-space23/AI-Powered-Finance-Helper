
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState } from 'react';
import { Home, Loader2 } from 'lucide-react';
import ollama from 'ollama'
import Groq from "groq-sdk";
import VoiceAssistant from './components/VoiceAssistant';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Schemes from './pages/Schemes';
import ChatPage from './pages/ChatPage';
import Loans from './pages/Loans';


function App() {
  
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call with setTimeout
    const groq = new Groq({ apiKey: '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',dangerouslyAllowBrowser: true });

     async function main() {
      setLoading(true)
      const chatCompletion = await getGroqChatCompletion();
      // Print the completion returned by the LLM.
      console.log("main response",chatCompletion.choices[0]?.message?.content || "");
      console.log("full response: ",chatCompletion);
      
      setResponse(chatCompletion.choices[0]?.message?.content)
      setLoading(false)
    }
    
    async function getGroqChatCompletion() {
      return groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${inputValue}`,
          },
        ],
        model: "llama3-8b-8192",
      });
    }
    
    main()
 
  };
  return (
    <>
 
  <Router>
  <Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path="/schemes" element={<Schemes/>} />
  <Route path="/chat" element={<ChatPage/>} />
  <Route path="/loans" element={<Loans/>} />




  </Routes>




  </Router>

  
   
    </>
  )
}

export default App
