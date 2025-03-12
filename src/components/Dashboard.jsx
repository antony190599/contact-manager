import { useEffect, useState } from 'react';
import { 
  UserGroupIcon, 
  StarIcon, 
  HomeIcon,
  BriefcaseIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    total: 0,
    pinned: 0,
    byType: {
      familia: 0,
      social: 0,
      trabajo: 0
    }
  });

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const pinnedContacts = contacts.filter(contact => contact.isPinned);
    
    const typeCount = contacts.reduce((acc, contact) => {
      acc[contact.type] = (acc[contact.type] || 0) + 1;
      return acc;
    }, {});

    setMetrics({
      total: contacts.length,
      pinned: pinnedContacts.length,
      byType: {
        familia: typeCount.familia || 0,
        social: typeCount.social || 0,
        trabajo: typeCount.trabajo || 0
      }
    });
  }, []);

  const MetricCard = ({ title, value, color }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          {/* Icon */}  
          <StarIcon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Contacts"
          value={metrics.total}
          color="bg-blue-500"
        />
        
        <MetricCard
          title="Pinned Contacts"
          value={metrics.pinned}
          color="bg-yellow-500"
        />

        <MetricCard
          title="Family Contacts"
          value={metrics.byType.familia}
          color="bg-green-500"
        />

        <MetricCard
          title="Social Contacts"
          value={metrics.byType.social}
          color="bg-purple-500"
        />

        <MetricCard
          title="Work Contacts"
          value={metrics.byType.trabajo}
          color="bg-indigo-500"
        />
      </div>
    </div>
  );
}