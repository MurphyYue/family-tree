import React from 'react';

const PersonDetail = ({ person, onClose }) => {
  if (!person) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl focus:outline-none" 
            onClick={onClose}
          >
            &times;
          </button>
          
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 pr-8">{person.name}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="w-24 font-medium text-gray-600 dark:text-gray-400">家庭排行:</span>
              <span className="text-gray-800 dark:text-white">{person.value}</span>
            </div>
            
            {person.children && (
              <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="w-24 font-medium text-gray-600 dark:text-gray-400">子女数量:</span>
                <span className="text-gray-800 dark:text-white">{person.children.length}</span>
              </div>
            )}
            
            {person.children && person.children.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">子女:</h3>
                <ul className="bg-gray-50 dark:bg-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-600">
                  {person.children.map((child, index) => (
                    <li key={index} className="px-4 py-2 text-gray-700 dark:text-gray-300">{child.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;