import $ from 'jquery'; 
import React, { useState, Fragment } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react'

export default function WorkingHoursMiniPage() {
  const [enabled, setEnabled] = useState(false)

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

  const [availability, setAvailability] = useState(
    daysOfWeek.map((day) => ({
      day: day.toLowerCase(),
      opening_time: timeSlots[0],
      closing_time: timeSlots[timeSlots.length - 1],
      isSelected: true
    }))
  );

  const handleCheckboxChange = (day) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  return (
    <div className="flex flex-col p-0 lg:p-2 md:p-2">
      <h1 className="text-xl font-regular mb-2">Working hours</h1>
      <hr className='default'/>
      <div className='flex flex-col gap-2 px-0 lg:px-24 md:px-12 mt-4'>
        {availability.map(({ day, opening_time, closing_time, isSelected }) => (
          <div className='flex flex-col gap-2 mb-4'>
            <div className='flex flex-row justify-between'>
              {day.charAt(0).toUpperCase() + day.slice(1)}
              <Switch
                checked={isSelected}
                onChange={() => handleCheckboxChange(day)}
                className={`${
                  isSelected ? 'bg-[#0A4F42]' : 'toggle-active-color' 
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable availability</span>
                <span
                  className={`${
                    isSelected ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            { isSelected ? 
              <div className='flex flex-col lg:flex-row md:flex-row items-center gap-2 lg:gap-8 md:gap-8'>
                <div className='flex flex-col'>
                  <h1 className="form-label-alt">Choose delivery time</h1>
                  <input 
                    type="time" 
                    name="date_needed"
                    className="auth-input-box auth-input-box-alt-sub working-input-box block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className='flex flex-col'>
                  <h1 className="form-label-alt">Choose delivery time</h1>
                  <input 
                    type="time" 
                    name="date_needed"
                    className="auth-input-box auth-input-box-alt-sub working-input-box block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              : null
            }
            
            
            <React.Fragment key={day}>
              {/* <div className="mt-2 flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(day)}
                />
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div> */}

              {/* Start Time Dropdown */}
              {/* <select
                value={opening_time}
                onChange={(e) => handleTimeChange(day, "opening_time", e.target.value)}
                className="p-2 border rounded focus:outline-none"
                disabled={!isSelected} // Disable if checkbox is not selected
              >
                {timeSlots
                  .filter((time) => time !== "17:00") // Exclude 17:00 from start times
                  .map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
              </select> */}

              {/* End Time Dropdown */}
              {/* <select
                value={closing_time}
                onChange={(e) => handleTimeChange(day, "closing_time", e.target.value)}
                className="p-2 border rounded focus:outline-none"
                disabled={!isSelected} // Disable if checkbox is not selected
              >
                {timeSlots
                  .filter(
                    (time) =>
                      parseInt(time.replace(":", ""), 10) >
                      parseInt(opening_time.replace(":", ""), 10)
                  )
                  .map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
              </select> */}
            </React.Fragment>
          </div>
        ))}
      </div>
    </div>
  )
}