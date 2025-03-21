import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ContactItem from './ContactItem';
import RightModal from './RightModal';
import PinnedContacts from './PinnedContacts';
import ContactForm from './ContactForm';
import ContactService from '../api/ContactService';
import SuccessAlert from './SuccessAlert';

export default function ContactList({ pinnedContact, onClearContact }) {
  const { type } = useParams();
  const { getAccessTokenSilently, user } = useAuth0();

  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPinnedVisible, setIsPinnedVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize contact service with token getter
  const contactService = new ContactService(async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {
      console.error('Error getting token', error);
      return null;
    }
  });

  const loadContacts = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await contactService.fetchContacts();
      setContacts(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [user]); // Reload when user changes

  useEffect(() => {
    const hasPinnedContacts = contacts.filter(contact => contact.isPinned).length > 0;
    if (hasPinnedContacts) {
      setIsPinnedVisible(true);
    } else {
      setIsPinnedVisible(false);
    }
  }, [contacts]);

  const handleDeleteContact = async (id) => {
    try {
      await contactService.deleteContact(id);
      loadContacts();
      const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      const updatedContacts = existingContacts.filter(contact => contact.id !== id);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } catch (error) {
      setErrorMessage(`Failed to delete contact: ${error.message}`);
    }
  };

  const togglePin = (id) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, isPinned: !contact.isPinned } : contact
    );
    setContacts(updatedContacts);
  };

  const handleSubmitLogic = async (contactData) => {
    try {
      setIsLoading(true);
      await contactService.addContact({
        fullname: `${contactData.firstName} ${contactData.lastName}`,
        email: contactData.email,
        phonenumber: contactData.phonenumber,
        type: contactData.type
      });

      // Close modal and reload contacts after successful addition
      setIsModalOpen(false);
      loadContacts();
    } catch (error) {
      setErrorMessage(`Failed to add contact: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContactsToLocalStorage = () => {
    try {
      // Get existing contacts from localStorage
      const existingContactsInLocal = JSON.parse(localStorage.getItem('contacts')) || [];
      
      // Create a map of current contact IDs for quick lookup
      const currentContactIds = new Set(contacts.map(contact => contact.id));
      
      // Filter out contacts from localStorage that no longer exist in current contacts
      const filteredContacts = existingContactsInLocal.filter(contact => 
        currentContactIds.has(contact.id)
      );
      
      // Update existing contacts with current data and add new ones
      const updatedContacts = contacts.reduce((acc, contact) => {
        const index = acc.findIndex(c => c.id === contact.id);
        if (index !== -1) {
          acc[index] = contact;
        } else {
          acc.push(contact);
        }
        return acc;
      }, filteredContacts);
      
      // Save updated list to localStorage
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setSuccessMessage('Contacts saved to LocalStorage successfully!');
      setIsSuccessAlertOpen(true);
    } catch (error) {
      setErrorMessage(`Failed to save contacts: ${error.message}`);
    }
  };

  const loadContactsFromLocalStorage = () => {
    try {
      const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      setContacts(storedContacts);
    } catch (error) {
      setErrorMessage(`Failed to load contacts from LocalStorage: ${error.message}`);
    }
  };

  const syncContacts = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await contactService.fetchContacts();
      setContacts(data);
      localStorage.setItem('contacts', JSON.stringify(data));
      setSuccessMessage('Synchronization successful!');
      setIsSuccessAlertOpen(true);
    } catch (error) {
      setErrorMessage(`Failed to synchronize contacts: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load contacts from LocalStorage when the component mounts
  useEffect(() => {
    loadContactsFromLocalStorage();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    `${contact.fullname}`.toLowerCase().includes(filter.toLowerCase()) &&
    (type ? contact.type === type : true)
  );

  return (
    <div className="flex gap-6 p-6">
      {/* Left Side - Pinned Section */}
      {contacts.filter(contact => contact.isPinned).length > 0 && (
        <div className={`w-80 shrink-0 transition-all duration-300 ease-in-out transform 
          ${isPinnedVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-full'
          }`}>
          <PinnedContacts pinnedContacts={contacts.filter(contact => contact.isPinned) ?? []} onClearContact={onClearContact} />
        </div>
      )}

      {/* Right Side - Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contact List</h2>
          <div>
            <button
              onClick={() => loadContacts()}
              className="px-4 py-2 me-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retrieve contacts
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 me-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add New Contact
            </button>
            <button
              onClick={saveContactsToLocalStorage}
              className="px-4 py-2 me-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Save Contacts
            </button>
            <button
              onClick={syncContacts}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Sync Contacts
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter contacts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 rounded-lg bg-white border border-gray-300"
          />
        </div>

        {isLoading ? (
          <p>Loading contacts...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <div className="grid gap-4">
            {filteredContacts.map((contact) => (
              <ContactItem 
                key={contact.id}
                contact={contact}
                onDelete={handleDeleteContact}
                onTogglePin={togglePin}
              />
            ))}
            {filteredContacts.length === 0 && (
              <p className="text-gray-500">No contacts found.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal remains the same */}
      <RightModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Contact</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
          <ContactForm setIsModalOpen={setIsModalOpen} handleSubmitLogic={handleSubmitLogic}/>
      </RightModal>

      {/* Success Alert */}
      <SuccessAlert 
        isOpen={isSuccessAlertOpen} 
        onClose={() => setIsSuccessAlertOpen(false)} 
        message={successMessage} 
      />
    </div>
  );
}