import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

function App() {
  const [pinnedContact, setPinnedContact] = useState(null);

  const handleClearContact = () => {
    setPinnedContact(null);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="h-screen flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<ContactList onClearContact={handleClearContact} />} />
            <Route path="/contacts/:id" element={<ContactDetail />} />
            <Route path="/contacts/:type/type" element={<ContactList onClearContact={handleClearContact} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App