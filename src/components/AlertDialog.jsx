import { Fragment } from 'react';

export default function AlertDialog({ isOpen, onClose, title, children, actions }) {
  if (!isOpen) return null;
  
  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white rounded-lg shadow-xl max-w-md w-full animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          
          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>
          
          {/* Actions */}
          <div className="px-6 py-3 bg-gray-50 flex justify-end gap-2 rounded-b-lg">
            {actions}
          </div>
        </div>
      </div>
    </Fragment>
  );
}