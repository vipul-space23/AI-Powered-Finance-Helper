import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, ChevronDown } from 'lucide-react'

// Create Language Context
const LanguageContext = createContext();

// Language translations
const translations = {
  english: {
    navHome: "Home",
    navAbout: "About",
    navContact: "Contact",
    title: "FinanceHelper",
    mainHeading: "Your Personal Finance Guide",
    mainSubheading: "Empowering you with financial knowledge and resources",
    getStarted: "Get Started",
    faqsTitle: "FAQs",
    faqsDesc: "Learn how to open a bank account and more",
    schemesTitle: "Government Schemes",
    schemesDesc: "Explore various government financial programs",
    loansTitle: "Loan Information",
    loansDesc: "Find loans for education, business, and more",
    womenTitle: "Women's Section",
    womenDesc: "Discover schemes and benefits for women",
    newsTitle: "Latest News",
    newsDesc: "Stay updated with financial news and trends",
    latestNews: "Latest Financial News",
    footer: "All rights reserved.",
  },
  hindi: {
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क करें",
    title: "फाइनेंस हेल्पर",
    mainHeading: "आपका व्यक्तिगत वित्त मार्गदर्शक",
    mainSubheading: "वित्तीय ज्ञान और संसाधनों के साथ आपको सशक्त बनाना",
    getStarted: "शुरू करें",
    faqsTitle: "सामान्य प्रश्न",
    faqsDesc: "बैंक खाता कैसे खोलें और अधिक जानें",
    schemesTitle: "सरकारी योजनाएं",
    schemesDesc: "विभिन्न सरकारी वित्तीय कार्यक्रमों का पता लगाएं",
    loansTitle: "ऋण जानकारी",
    loansDesc: "शिक्षा, व्यवसाय और अधिक के लिए ऋण खोजें",
    womenTitle: "महिला विभाग",
    womenDesc: "महिलाओं के लिए योजनाएं और लाभ जानें",
    newsTitle: "ताज़ा खबर",
    newsDesc: "वित्तीय समाचार और रुझानों से अपडेट रहें",
    latestNews: "नवीनतम वित्तीय समाचार",
    footer: "सर्वाधिकार सुरक्षित।",
  },
  marathi: {
    navHome: "मुख्यपृष्ठ",
    navAbout: "आमच्याबद्दल",
    navContact: "संपर्क",
    title: "फायनान्स हेल्पर",
    mainHeading: "तुमचा वैयक्तिक वित्त मार्गदर्शक",
    mainSubheading: "आर्थिक ज्ञान आणि संसाधनांसह तुम्हाला सक्षम करणे",
    getStarted: "सुरू करा",
    faqsTitle: "सामान्य प्रश्न",
    faqsDesc: "बँक खाते कसे उघडावे आणि अधिक शिका",
    schemesTitle: "सरकारी योजना",
    schemesDesc: "विविध सरकारी आर्थिक कार्यक्रम शोधा",
    loansTitle: "कर्ज माहिती",
    loansDesc: "शिक्षण, व्यवसाय आणि अधिक कर्जे शोधा",
    womenTitle: "महिला विभाग",
    womenDesc: "महिलांसाठी योजना आणि फायदे शोधा",
    newsTitle: "ताज्या बातम्या",
    newsDesc: "आर्थिक बातम्या आणि ट्रेंड्सशी अपडेट रहा",
    latestNews: "नवीनतम आर्थिक बातम्या",
    footer: "सर्व हक्क राखीव.",
  },
  bengali: {
    navHome: "হোম",
    navAbout: "আমাদের সম্পর্কে",
    navContact: "যোগাযোগ",
    title: "ফাইন্যান্স হেল্পার",
    mainHeading: "আপনার ব্যক্তিগত অর্থ গাইড",
    mainSubheading: "আর্থিক জ্ঞান এবং সংস্থান দিয়ে আপনাকে ক্ষমতায়ন",
    getStarted: "শুরু করুন",
    faqsTitle: "সাধারণ প্রশ্ন",
    faqsDesc: "ব্যাংক অ্যাকাউন্ট খোলার পদ্ধতি এবং আরও জানুন",
    schemesTitle: "সরকারি প্রকল্প",
    schemesDesc: "বিভিন্ন সরকারি আর্থিক প্রোগ্রাম অন্বেষণ করুন",
    loansTitle: "ঋণ তথ্য",
    loansDesc: "শিক্ষা, ব্যবসা এবং আরও অনেক কিছুর জন্য ঋণ খুঁজুন",
    womenTitle: "মহিলা বিভাগ",
    womenDesc: "মহিলাদের জন্য প্রকল্প এবং সুবিধা আবিষ্কার করুন",
    newsTitle: "সর্বশেষ খবর",
    newsDesc: "আর্থিক খবর এবং প্রবণতা সম্পর্কে আপডেট থাকুন",
    latestNews: "সর্বশেষ আর্থিক খবর",
    footer: "সর্বস্বত্ব সংরক্ষিত।",
  }
};

// Language Provider Component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('english');
  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
function useLanguage() {
  return useContext(LanguageContext);
}

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);
  const navigate = useNavigate();
  const { language, setLanguage, translations } = useLanguage();
  const t = translations[language];

  const news = [
    "New government scheme announced for small businesses",
    "Interest rates expected to rise next month",
    "Stock market reaches all-time high",
    "New tax benefits for first-time homeowners"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white relative">
      
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

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t.mainHeading}</h2>
          <p className="text-xl text-gray-600 mb-8">{t.mainSubheading}</p>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/chat")}
          >
            {t.getStarted}
          </button>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon="📚"
            title={t.faqsTitle}
            description={t.faqsDesc}
            onClick={() => navigate("/faqs")}
          />
          <FeatureCard
            icon="🏛️"
            title={t.schemesTitle}
            description={t.schemesDesc}
            onClick={() => navigate("/schemes")}
          />
          <FeatureCard
            icon="🎓"
            title={t.loansTitle}
            description={t.loansDesc}
            onClick={() => navigate("/loans")}
          />
          <FeatureCard
            icon="👩‍💼"
            title={t.womenTitle}
            description={t.womenDesc}
            onClick={() => navigate("/women")}
          />
          <FeatureCard
            icon="📰"
            title={t.newsTitle}
            description={t.newsDesc}
          />
        </div>

        <section>
          <h3 className="text-2xl font-bold mb-4">{t.latestNews}</h3>
          <p className="text-lg text-gray-700">{news[newsIndex]}</p>
        </section>
      </main>
    </div>
  );
}

// FeatureCard Component with Click Hover Effect
function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}