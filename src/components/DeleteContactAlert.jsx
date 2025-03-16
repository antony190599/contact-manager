import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import AlertDialog from './AlertDialog';

export default function DeleteContactAlert({ isOpen, onClose, onConfirm, contactName = 'this contact' }) {
  return (
    <AlertDialog 
      isOpen={isOpen} 
      onClose={onClose}
      title="Delete Contact"
      actions={
        <>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </>
      }
    >
      <div className="mt-2">
        <div className="flex items-center mb-4 bg-red-50 p-3 rounded-md">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-sm font-medium text-red-800">
            This action cannot be undone
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <span className="font-medium">{contactName}</span>? 
        </p>
      </div>
    </AlertDialog>
  );
}