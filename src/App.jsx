import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactGrid from './components/ContactGrid';
import ContactDetail from './components/ContactDetail';
import contacts from './data/contacts.json';

function App() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isCardView, setIsCardView] = useState(false);
  const [selectionHistory, setSelectionHistory] = useState([]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setSelectionHistory((prevHistory) => {
      const newHistory = [contact, ...prevHistory];
      return newHistory.slice(0, 3);
    });
  };

  const handleClearContact = () => {
    setSelectedContact(null);
  };

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div className="app-dashboard">
      <Header />
      
      <aside className="sidebar">
        {selectedContact ? (
          <ContactDetail contact={selectedContact} onClear={handleClearContact} />
        ) : (
          <p>Ningún contacto seleccionado</p>
        )}
      </aside>

      <main className="main-content">
        <div className='main-title'>
          <h3>Mis Contactos</h3>
          <button onClick={toggleView}>
            {isCardView ? 'Vista de Lista' : 'Vista de Tarjetas'}
          </button>
        </div>
        
        {isCardView ? (
          <ContactGrid contacts={contacts} />
        ) : (
          <ContactList contacts={contacts} onContactClick={handleContactClick} selectedContact={selectedContact} />
        )}

        <div className="selection-history">
          <h4>Historial de Selección</h4>
          <ul>
            {selectionHistory.map((contact, index) => (
              <li key={index}>{contact.fullname}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;