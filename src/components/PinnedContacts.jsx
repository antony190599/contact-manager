import { EnvelopeIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export function PinnedContact({contact}) {
    const getBackgroundColor = (type) => {
        
        const pinnedColors = {
          familia: 'bg-green-100',
          social: 'bg-blue-100',
          trabajo: 'bg-purple-100'
        }
    
        return pinnedColors[type] || 'bg-gray-100'
      }

    return (<div className={`p-4 rounded-lg shadow hover:shadow-md transition-shadow ${getBackgroundColor(contact.type)}`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div>
                    <h4 className="font-bold text-lg">{contact.firstName} {contact.lastName}</h4>
                    <div className="flex flex-col space-x-4 mt-2">
                    <div className="flex items-center text-gray-600">
                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{contact.phonenumber}</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default function PinnedContacts({pinnedContacts, onClearContact}) {

  return <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            Pinned Contacts
        </h3>
        <div className="space-y-3">
            {pinnedContacts.map((contact, index) => (
                <PinnedContact key={index} contact={contact} />
            ))}
            {pinnedContacts.length === 0 && (
                <p className="text-gray-500 text-center">No pinned contacts found.</p>
            )}
        </div>
        <button
          onClick={onClearContact}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear Pinned Contact
        </button>
    </div>
}