import { Link } from 'react-router-dom'
import { HomeIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <div className="text-xl font-bold mb-8">Contact Manager</div>
      <nav className="space-y-2">
        <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link to="/contacts" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <UserGroupIcon className="h-5 w-5" />
          <span>Contacts</span>
        </Link>
      </nav>
    </div>
  )
}