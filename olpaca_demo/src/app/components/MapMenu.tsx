// components/DropdownMenu.tsx
import React, { useRef, useState } from "react";

const FilterMenu: React.FC<{
  onApply: (
    destination: string,
    departDateTime: string,
    avoidOptions: string[],
  ) => void;
}> = ({ onApply }) => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("Now");
  const [departTime, setDepartTime] = useState("Now");
  const [avoidOptions, setAvoidOptions] = useState<string[]>([]);

  const handleApply = () => {
    const departDateTime =
      departDate === "Now"
        ? "Now"
        : `${departDate} ${departTime === "Now" ? "00:00" : departTime}`;
    onApply(destination, departDateTime, avoidOptions);
  };

  const handleLocChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocation(event.target.value);
  };

  const handleDestChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDestination(event.target.value);
  };

  return (
    <div className="top-0 right-0 m-4 bg-white p-4 rounded shadow">
      <div className="mb-1">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-primary"
        >
          Current Location
        </label>
        <textarea
          id="location"
          className="border border-primary text-sm rounded-lg p-2 resize-none h-10"
          value={location}
          onChange={handleLocChange}
          placeholder="Enter Current Location"
        />
      </div>

      <div className="mb-1">
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-primary"
        >
          Destination
        </label>
        <textarea
          id="destination"
          className="border border-primary text-sm rounded-lg p-2 resize-none h-10"
          value={destination}
          onChange={handleDestChange}
          placeholder="Enter Destination"
        />
      </div>

      <div className="mb-1">
        <label className="block text-sm font-medium text-primary">
          Depart
        </label>
        <div className="flex py-2">
          <select
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="p-2 border border-primary rounded-lg mr-2"
          >
            <option value="Now">Now</option>
            {/* Options */}
          </select>
          <select
            value={departTime}
            onChange={(e) => setDepartTime(e.target.value)}
            className="p-2 border border-primary rounded"
          >
            <option value="00:00">00:00</option>
            <option value="00:30">00:30</option>
            <option value="01:00">01:00</option>
            <option value="01:30">01:30</option>
            <option value="02:00">02:00</option>
            <option value="02:30">02:30</option>
            <option value="03:00">03:00</option>
            <option value="03:30">03:30</option>
            <option value="04:00">04:00</option>
            <option value="04:30">04:30</option>
            <option value="05:00">05:00</option>
            <option value="05:30">05:30</option>
            <option value="06:00">06:00</option>
            <option value="06:30">06:30</option>
            <option value="07:00">07:00</option>
            <option value="07:30">07:30</option>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16:00">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23:00">23:00</option>
            <option value="23:30">23:30</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary">
          Avoid Route
        </label>
        <div className="flex flex-wrap">
          <label className="mr-2">
            <input
              type="checkbox"
              checked={avoidOptions.includes("Highway")}
              onChange={() =>
                setAvoidOptions((options) =>
                  options.includes("Highway")
                    ? options.filter((option) => option !== "Highway")
                    : [...options, "Highway"],
                )
              }
            />
            Highway
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={avoidOptions.includes("Ferries")}
              onChange={() =>
                setAvoidOptions((options) =>
                  options.includes("Ferries")
                    ? options.filter((option) => option !== "Ferries")
                    : [...options, "Ferries"],
                )
              }
            />
            Ferries
          </label>
          <label>
            <input
              type="checkbox"
              checked={avoidOptions.includes("Tolls")}
              onChange={() =>
                setAvoidOptions((options) =>
                  options.includes("Tolls")
                    ? options.filter((option) => option !== "Tolls")
                    : [...options, "Tolls"],
                )
              }
            />
            Tolls
          </label>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterMenu;
