import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  UserCircleIcon,
  ArrowLeftIcon,
  PencilIcon,
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import ContactService from '../api/ContactService';

const contactService = new ContactService();

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        setLoading(true);
        const data = await contactService.fetchContactById(id);
        setContact(data);
      } catch (err) {
        setError(err.message || 'Failed to load contact details');
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, [id]);

  const getContactTypeIcon = (type) => {
    switch(type) {
      case 'familia':
        return <HomeIcon className="h-5 w-5 text-green-500" />;
      case 'social':
        return <UserGroupIcon className="h-5 w-5 text-blue-500" />;
      case 'trabajo':
        return <BriefcaseIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <UserCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getContactTypeLabel = (type) => {
    switch(type) {
      case 'familia':
        return 'Family';
      case 'social':
        return 'Social';
      case 'trabajo':
        return 'Work';
      default:
        return 'Other';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center">
        <p>Contact not found</p>
        <button 
          onClick={() => navigate('/contacts')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Details</h1>
        <button
          onClick={() => navigate('/contacts')}
          className="px-4 py-2 me-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Contacts
        </button>
      </div>

      {/* Contact card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Contact header */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex items-start">
            <div className="bg-gray-200 rounded-full p-4">
              <UserCircleIcon className="h-16 w-16 text-gray-500" />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {contact.fullname || `${contact.firstName} ${contact.lastName}`}
              </h2>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                {getContactTypeIcon(contact.type)}
                <span className="ml-2">{getContactTypeLabel(contact.type)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                {contact.email && (
                  <div className="flex items-start">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-gray-900 hover:text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact.phonenumber && (
                  <div className="flex items-start">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <a 
                        href={`tel:${contact.phonenumber}`}
                        className="text-gray-900 hover:text-blue-600 hover:underline"
                      >
                        {contact.phonenumber}
                      </a>
                    </div>
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-gray-900">{contact.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              
              <div className="space-y-4">
                {contact.birthday && (
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Birthday</p>
                      <p className="text-gray-900">{new Date(contact.birthday).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                {contact.notes && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{contact.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex justify-end">
        
      </div>
    </div>
  );
}