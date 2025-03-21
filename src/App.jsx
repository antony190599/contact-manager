import { useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import ProtectedRoute from './components/ProtectedRoute';
import PinnedContacts from './components/PinnedContacts';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading } = useAuth0();
  const [pinnedContact, setPinnedContact] = useState(null);

  const handleClearPinnedContact = () => {
    setPinnedContact(null);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading Auth0...</div>;
  }

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="h-screen flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/contacts" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route 
              path="/contacts" 
              element={
                <ProtectedRoute>
                  <ContactList pinnedContact={pinnedContact} onClearContact={handleClearPinnedContact} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contacts/:type/type" 
              element={
                <ProtectedRoute>
                  <ContactList pinnedContact={pinnedContact} onClearContact={handleClearPinnedContact} />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact/:id"
              element={
                <ProtectedRoute>
                  <ContactDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;