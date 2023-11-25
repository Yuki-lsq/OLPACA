// components/DropdownMenu.tsx
import React, { useRef, useState, useEffect } from "react";

const FilterMenu: React.FC<{
  onApply: (
    origin: string,
    destination: string,
    stops: string[],
    mode: string,
    departDateTime: string,
    avoidOptions: string[],
  ) => void;
}> = ({ onApply }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showStops, setShowStops] = useState(false);
  const [stops, setStops] = useState<string[]>([]);
  const [mode, setMode] = useState("");
  const [departDate, setDepartDate] = useState("Now");
  const [departTime, setDepartTime] = useState("Now");
  const [avoidOptions, setAvoidOptions] = useState<string[]>([]);

  const handleApply = () => {
    const departDateTime =
      departDate === "Now"
        ? "Now"
        : `${departDate} ${departTime === "Now" ? "00:00" : departTime}`;
    onApply(origin, destination, stops, mode, departDateTime, avoidOptions);
  };

  const handleLocChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrigin(event.target.value);
  };

  const handleDestChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDestination(event.target.value);
  };

  const handleStopChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStops(event.target.value.split(","));
  };

  const [dateItems, setDateItems] = useState<string[]>()
  useEffect(() => {
    var allItems = []
    var startingDay = new Date();
    var select = document.getElementById('departDate');
    for(var i=1; i<7; i++) {
      if (select != null && select.children.length <= 6) {
        var thisDay = new Date();
        thisDay.setDate(startingDay.getDate() + i)
        var thisDayString = thisDay.getDate() + " " + MonthAsString(thisDay.getMonth()) + " " + thisDay.getFullYear();
        // var opt = document.createElement('option');
        // opt.value = thisDayString;
        // opt.innerHTML = thisDayString;
        // select.appendChild(opt);
        allItems.push(thisDayString)
      }
    } 
    setDateItems(allItems)
  }, []);

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
          value={origin}
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
      {
        !showStops &&
        <input type="button" className="border border-primary rounded-lg p-2" name="addStops" value="Add Stops" onClick={() => setShowStops(true)} />
      }
      {
        showStops &&
        <div id="stopsId" className="mb-1">
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-primary"
          >
              Stops
            </label>
          <textarea
            id="destination"
            className="border border-primary text-sm rounded-lg p-2 resize-none h-10"
            value={stops}
            onChange={handleStopChange}
            placeholder="Enter Stops"
          />
        </div>
      }
      <br/><br/>
      <label
        htmlFor="mode"
        className="block text-sm font-medium text-primary"
      >
        Travel Mode
      </label>
      <select className="form-control p-2 border border-primary rounded-lg mr-2" id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="">Select Mode</option>
        <option value="WALKING">Walking</option>
        <option value="DRIVING">Driving</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
      <br/><br/>
      <div className="mb-1">
        <label className="block text-sm font-medium text-primary">
          Depart
        </label>
        <div className="flex py-2">
          <select
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            id="departDate"
            className="p-2 border border-primary rounded-lg mr-2"
          >
            <option value="Now">Now</option>
            {dateItems?.map(item => <option value={item}>{item}</option>)}
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

function MonthAsString(monthIndex: number) {
  var d = new Date();
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return month[monthIndex];
}

export default FilterMenu;
