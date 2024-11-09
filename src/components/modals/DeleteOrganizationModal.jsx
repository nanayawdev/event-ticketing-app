import { AlertCircle } from 'lucide-react';

const DeleteOrganizationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      
      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
          {/* Modal Header */}
          <div className="p-6 bg-red-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Organization</h3>
                <p className="text-sm text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <p className="text-gray-600">
              Are you sure you want to delete your organization? All of your data will be permanently 
              removed. This action cannot be undone.
            </p>
            
            {/* Warning List */}
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                All events and tickets will be deleted
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                All financial records will be removed
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                All user data will be permanently deleted
              </li>
            </ul>
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-gray-50/80 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 
                rounded-lg border border-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                hover:bg-red-700 rounded-lg shadow-sm transition-colors"
            >
              Delete Organization
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteOrganizationModal; 