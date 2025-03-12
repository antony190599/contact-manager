import { useEffect, useState } from 'react'
import ContactItem from './ContactItem'
import RightModal from './RightModal'
import PinnedContacts from './PinnedContacts'
import ContactForm from './ContactForm'
import { fetchContacts } from '../api/contacts'

export default function ContactList() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPinnedVisible, setIsPinnedVisible] = useState(false)
  const [filter, setFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const data = await fetchContacts()
        setContacts(data)
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadContacts()
  }, [])

  useEffect(() => {
    const hasPinnedContacts = contacts.filter(contact => contact.isPinned).length > 0
    if (hasPinnedContacts) {
      setIsPinnedVisible(true)
    } else {
      setIsPinnedVisible(false)
    }
  }, [contacts])

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updatedContacts)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
  }

  const togglePin = (id) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === id ? { ...contact, isPinned: !contact.isPinned } : contact
    )
    setContacts(updatedContacts)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
  }

  const handleSubmitLogic = (contacts) => {
    setContacts(contacts)
    localStorage.setItem('contacts', JSON.stringify(contacts))
    setIsModalOpen(false)
  }

  const filteredContacts = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="flex gap-6 p-6">
      {/* Left Side - Pinned Section */}

      {contacts.filter(contact => contact.isPinned).length > 0 && (
        <div className={`w-80 shrink-0 transition-all duration-300 ease-in-out transform 
          ${isPinnedVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-full'
          }`}>
          <PinnedContacts pinnedContacts={contacts.filter(contact => contact.isPinned) ?? []}/>
        </div>
      )}

      {/* Right Side - Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contact List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add New Contact
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter contacts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 border rounded-lg"
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
                onDelete={deleteContact}
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
    </div>
  )
}