import $ from 'jquery'; 
import React, { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react'
import { ShowToast } from '../showToast';
import useHustleFunctions from '../../utils/hustles';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export default function WorkingHoursMiniPage() {
  const [enabled, setEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [savedWorkingHours, setSavedWorkingHours] = useState([])

  const { getAvailableTimes, createHustlerWorkingHours } = useHustleFunctions()
  const history = useNavigate();

  const submitWorkingHours = async () => {
    setIsLoading(true)

    const selectedAvailability = availability
    .filter((item) => item.isSelected) 
    .map(({ day, opening_time, closing_time }) => ({ 
      day,
      opening_time,
      closing_time,
    }));

    const params = {
      "availability" : selectedAvailability
    }

    const {response_code, hours} = await createHustlerWorkingHours(params)
    if (response_code === 200){
      ShowToast("success", "Working hours created successfully")
      setIsLoading(false)
      window.location.reload()
      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/')
    }

    setIsLoading(false)
    ShowToast("error", "Updating working hours failed.")
    return
  }

  const getHustlerAvailableTimes = async () => {
    setIsLoading(true)
    const {response_code, availableTimes} = await getAvailableTimes(Cookies.get('huid'))

    if (response_code === 200){
      if (availableTimes.length > 0){

        setSavedWorkingHours(availableTimes)
        return
      }

      return
    }

    if (response_code === 401){
      ShowToast("error", "Session expired. Sign in to continue!")
      return history('/')
    }

    ShowToast("error", "Hustler availability details not set.")
    return
  }

  useEffect(() => {
    getHustlerAvailableTimes()
  }, [])

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

  const [availability, setAvailability] = useState(
    daysOfWeek.map((day) => ({
      day: day.toLowerCase(),
      opening_time: timeSlots[0],
      closing_time: timeSlots[timeSlots.length - 1],
      isSelected: false
    }))
  );

  const handleTimeChange = (day, field, value) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, [field]: value } : item
      )
    );
  };

  const handleCheckboxChange = (day) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  useEffect(() => {
    if (savedWorkingHours.length > 0 ){
      const initialAvailability = daysOfWeek.map((day) => {
        const matched = savedWorkingHours.find(item => item.day.toLowerCase() === day.toLowerCase());
        return {
          day: day.toLowerCase(),
          opening_time: matched ? matched.opening_time : '08:00',
          closing_time: matched ? matched.closing_time : '17:00',
          isSelected: matched ? matched.is_available : false,
        };
      });

      setAvailability(initialAvailability);
    }
  }, [savedWorkingHours]);


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
                    value={opening_time}
                    onChange={(e) => handleTimeChange(day, 'opening_time', e.target.value)}
                    className="auth-input-box auth-input-box-alt-sub working-input-box block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className='flex flex-col'>
                  <h1 className="form-label-alt">Choose delivery time</h1>
                  <input 
                    type="time" 
                    name="date_needed"
                    value={closing_time}
                    onChange={(e) => handleTimeChange(day, 'closing_time', e.target.value)}
                    className="auth-input-box auth-input-box-alt-sub working-input-box block" 
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              : null
            }
          </div>
        ))}
        <button onClick={() => submitWorkingHours()} className='flex !w-[55%] lg:!w-[30%] md:!w-[30%] view-more-button justify-center items-center mt-4'>
          <h1 className='view-more-button-text'>Update working hours</h1>
        </button>
      </div>
    </div>
  )
}