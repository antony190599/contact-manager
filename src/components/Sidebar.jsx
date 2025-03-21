import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  UsersIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0();
  const [contactsOpen, setContactsOpen] = useState(false);
  
  // Automatically expand contacts section if current path is under contacts
  useEffect(() => {
    if (location.pathname.includes('/contacts')) {
      setContactsOpen(true);
    }
  }, [location.pathname]);
  
  // Function to check if a path is active (either exact match or starts with the path)
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Navigation structure with first and second level items
  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { 
      name: 'Contacts', 
      path: '/contacts',
      icon: UserGroupIcon,
      children: [
        { name: 'All Contacts', path: '/contacts', icon: UserGroupIcon },
        { name: 'Family', path: '/contacts/familia/type', icon: UsersIcon },
        { name: 'Work', path: '/contacts/trabajo/type', icon: BriefcaseIcon },
        { name: 'Social', path: '/contacts/social/type', icon: UserGroupIcon }
      ]
    }
  ];

  if (!isAuthenticated) {
    return null; // Don't show sidebar if not authenticated
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Contact Manager</h1>
        {user && (
          <div className="mt-2 flex items-center">
            {user.picture && (
              <img 
                src={user.picture} 
                alt="Profile" 
                className="w-8 h-8 rounded-full mr-2" 
              />
            )}
            <span className="text-sm">{user.name}</span>
          </div>
        )}
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <div className="px-3">
                  {/* Parent item with children */}
                  <button
                    onClick={() => setContactsOpen(!contactsOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                      isActive(item.path) 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon 
                        className={`h-5 w-5 ${
                          isActive(item.path) ? 'text-blue-500' : 'text-gray-400'
                        } mr-3`} 
                      />
                      {item.name}
                    </div>
                    {contactsOpen ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </button>
                  
                  {/* Children items */}
                  {contactsOpen && (
                    <ul className="mt-2 space-y-1 ml-7 border-l border-gray-200 pl-3">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            to={child.path}
                            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                              location.pathname === child.path || 
                              (child.path !== '/contacts' && location.pathname.includes(child.path))
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <child.icon 
                              className={`h-4 w-4 ${
                                location.pathname === child.path || 
                                (child.path !== '/contacts' && location.pathname.includes(child.path))
                                  ? 'text-blue-500' 
                                  : 'text-gray-400'
                              } mr-2`} 
                            />
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                // Regular items without children
                <div className="px-3">
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-gray-600 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <item.icon 
                      className={`h-5 w-5 ${
                        isActive(item.path) ? 'text-blue-500' : 'text-gray-400'
                      } mr-3`} 
                    />
                    {item.name}
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 border-t border-gray-200 p-4">
        <Link
          to="/settings"
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/settings'
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Cog6ToothIcon className={`h-5 w-5 ${
            location.pathname === '/settings' ? 'text-blue-500' : 'text-gray-400'
          } mr-3`} />
          Settings
        </Link>
        <Link
          to="/logout"
          className="flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-3" />
          Logout
        </Link>
      </div>
    </div>
  );
}