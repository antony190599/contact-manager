import { 
    EnvelopeIcon, 
    PhoneIcon, 
    UserCircleIcon,
    TrashIcon,
    BriefcaseIcon,
    HomeIcon,
    UserGroupIcon,
    StarIcon
  } from '@heroicons/react/24/outline'
  import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
  
  export default function ContactItem({ contact, onDelete, onTogglePin }) {
    const getContactTypeIcon = (type) => {
      switch(type) {
        case 'familia':
          return <HomeIcon className="h-5 w-5 text-green-500" />
        case 'social':
          return <UserGroupIcon className="h-5 w-5 text-blue-500" />
        case 'trabajo':
          return <BriefcaseIcon className="h-5 w-5 text-purple-500" />
        default:
          return <UserCircleIcon className="h-5 w-5 text-gray-500" />
      }
    }
  
    const getBackgroundColor = (type, isPinned) => {
      const baseColors = {
        familia: 'bg-white',
        social: 'bg-white',
        trabajo: 'bg-white'
      }
      
      const pinnedColors = {
        familia: 'bg-green-100',
        social: 'bg-blue-100',
        trabajo: 'bg-purple-100'
      }
  
      return isPinned ? pinnedColors[type] || 'bg-gray-100' : baseColors[type] || 'bg-white'
    }
  
    return (
      <div className={`p-4 rounded-lg shadow hover:shadow-md transition-shadow ${getBackgroundColor(contact.contactType, contact.isPinned)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-10 w-10 text-gray-400" />
            <div>
              <h3 className="font-bold text-lg">{contact.firstName} {contact.lastName}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{contact.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {getContactTypeIcon(contact.contactType)}
            </div>
            <button
              onClick={() => onTogglePin(contact.id)}
              className={`p-2 rounded-full transition-colors ${contact.isPinned ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {contact.isPinned ? (
                <StarIconSolid className="h-5 w-5" />
              ) : (
                <StarIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }