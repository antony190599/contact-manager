export default function RightModal({ isOpen, onClose, children }) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 transition-opacity"
            onClick={onClose}
          />
        )}
  
        {/* Modal */}
        <div 
          className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full p-6">
            {children}
          </div>
        </div>
      </>
    )
  }