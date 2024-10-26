import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, ChevronDown } from 'lucide-react'



const Navbar = () => {

    const LanguageContext = createContext();
     
            

   
  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">{t.navHome}</a></li>
            <li><a href="#" className="hover:underline">{t.navAbout}</a></li>
            <li><a href="#" className="hover:underline">{t.navContact}</a></li>
          </ul>
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-1 bg-blue-700 px-3 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
              <ChevronDown size={16} />
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 text-gray-700">
                {Object.keys(translations).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
