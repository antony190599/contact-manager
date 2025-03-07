import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactGrid from './components/ContactGrid';
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';
import contactsData from './data/contacts.json';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : contactsData;
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [isCardView, setIsCardView] = useState(false);
  const [selectionHistory, setSelectionHistory] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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

  const handleSaveContact = (newContact) => {
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.fullname.toLowerCase().includes(filter.toLowerCase())
  );

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
        
        <ContactForm onSave={handleSaveContact} />

        <input
          type="text"
          placeholder="Filtrar contactos"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />

        {isCardView ? (
          <ContactGrid contacts={filteredContacts} />
        ) : (
          <ContactList contacts={filteredContacts} onContactClick={handleContactClick} selectedContact={selectedContact} />
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