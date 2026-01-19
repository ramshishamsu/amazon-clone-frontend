import { useState, useEffect } from 'react';

const FirebaseToggle = () => {
  const [useRealApi, setUseRealApi] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('useRealApi');
    setUseRealApi(stored === 'true');
  }, []);

  const toggleApi = () => {
    const newValue = !useRealApi;
    setUseRealApi(newValue);
    localStorage.setItem('useRealApi', newValue.toString());
    window.location.reload(); // Reload to apply changes
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">
            API Mode:
          </span>
          <button
            onClick={toggleApi}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              useRealApi
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
            }`}
          >
            {useRealApi ? 'Real API' : 'Mock API'}
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {useRealApi ? 'Using real Firebase + Backend' : 'Using mock data'}
        </div>
      </div>
    </div>
  );
};

export default FirebaseToggle;
