// components/DropdownMenu.tsx
import React, { useRef, useState } from 'react';

const FilterMenu: React.FC<{
  onApply: (destination: string, departDateTime: string, avoidOptions: string[]) => void;
}> = ({ onApply }) => {
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('Now');
  const [departTime, setDepartTime] = useState('Now');
  const [avoidOptions, setAvoidOptions] = useState<string[]>([]);

  const handleApply = () => {
    const departDateTime =
      departDate === 'Now'
        ? 'Now'
        : `${departDate} ${departTime === 'Now' ? '00:00' : departTime}`;
    onApply(destination, departDateTime, avoidOptions);
  };

  const autocompleteRef = useRef<HTMLInputElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteService.current && autocompleteRef.current) {
      const placeInput = autocompleteRef.current;
      const placeService = autocompleteService.current;
      placeService.getPlacePredictions(
        { input: placeInput.value },
        (predictions: google.maps.places.AutocompletePrediction[] | null) => {
          if (predictions && predictions.length > 0) {
            console.log(predictions);
          }
        }
      );
    }
  };

  return (
    <div className="absolute top-0 right-0 m-4 bg-white p-4 rounded shadow">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Destination</label>
        <input
          ref={autocompleteRef}
          type="text"
          placeholder="Current Destination"
          value={destination}
          onFocus={(e) => {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
          }}
          onChange={handlePlaceChanged}
          className="p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Depart</label>
        <div className="flex">
          <select
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="p-2 border rounded mr-2"
          >
            <option value="Now">Now</option>
            {/* Options */}
          </select>
          <select
            value={departTime}
            onChange={(e) => setDepartTime(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Now">Now</option>
            {/* Options */}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Avoid Route</label>
        <div className="flex flex-wrap">
          <label className="mr-2">
            <input
              type="checkbox"
              checked={avoidOptions.includes('Highway')}
              onChange={() =>
                setAvoidOptions((options) =>
                  options.includes('Highway')
                    ? options.filter((option) => option !== 'Highway')

                    : [...options, 'Highway']
                )
              }
            />
            Highway
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={avoidOptions.includes('Ferries')}
              onChange={() =>
                setAvoidOptions((options) =>
                  options.includes('Ferries')
                    ? options.filter((option) => option !== 'Ferries')
                    : [...options, 'Ferries']
                )
              }
            />
            Ferries
          </label>
          <label>
            <input
              type="checkbox"
              checked={avoidOptions.includes('Tolls')}
              onChange={() =>
                setAvoidOptions((options) =>
                  options.includes('Tolls')
                    ? options.filter((option) => option !== 'Tolls')
                    : [...options, 'Tolls']
                )
              }
            />
            Tolls
          </label>
        </div>
      </div>

      <button onClick={handleApply} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Apply
      </button>
    </div>
  );
};

export default FilterMenu;
