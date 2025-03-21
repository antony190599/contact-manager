import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SuccessAlert({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-scale-in">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center">
          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Success</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="px-6 py-3 bg-gray-50 flex justify-end gap-2 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}