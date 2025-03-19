import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="h-screen flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/contacts/:id" element={<ContactDetail />} />
            <Route path="/contacts/:type/type" element={<ContactList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App