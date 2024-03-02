import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './styles/calender.css';
import './styles/tailwind.css';
import {
  add,
  compareAsc,
  format,
  isWeekend,
  setYear,
  setMonth,
  sub
} from "date-fns";
import { AccessTime, ChevronLeft, ChevronRight } from '@mui/icons-material';

function App() {
  const events = [
    { date: new Date(2024, 1, 21), subject: 'Physics', lecture:"Laws of thermodynamics", time:"Class has started ..." },
    { date: new Date(2024, 0, 31), subject: 'Physics', lecture:"Laws of thermodynamics", time:"Class has started ..." },
    { date: new Date(2024, 0, 31), subject: 'Physics', lecture:"Laws of thermodynamics", time:"Class has started ..." },
    { date: new Date(2024, 0, 31), subject: 'Physics', lecture:"Laws of thermodynamics", time:"Class has started ..." },
    { date: new Date(2024, 0, 31), subject: 'Physics', lecture:"Laws of thermodynamics", time:"Class has started ..." },
    { date: new Date(2024, 0, 31), subject: 'Physics', lecture:"Laws of thermodynamics", time:"Class has started ..." },
    { date: new Date(2024, 0, 31), subject: 'Physics', lecture:"Laws of thermodynamics", time:"Class has started ..." },
    // Add more events as needed
  ];
  

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notificationEvents] = useState(events);
  const [activeStartDate, setActiveStartDate] = useState(
new Date()
  );

  const hasEventOnDate = (date) => {
    return notificationEvents.some(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
  };
  useEffect(()=>{
    console.log(selectedDate);
  },[selectedDate]);
  

  
  return (
    <div className='container flex items-center justify-center h-screen'>
      <div className='container flex items-center justify-around h-max max-w-3xl p-4 border-2 border-gray-300 shadow-md rounded-md'>

        
        <div className='container flex flex-col items-center justify-center p-4 h-96 w-80 border bg-white border-gray-400 rounded-md' >
        <div className="flex items-center justify-between w-64">
          <button
            onClick={() => {
              setActiveStartDate(sub(activeStartDate, { months: 1 }))
            }}
          >
            <ChevronLeft style={{color:"gray"}} />
          </button>
          <h2 className="text-gray-400 font-medium">
            {activeStartDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => {
              setActiveStartDate(add(activeStartDate, { months: 1 }))
            }}
            
          >
            <ChevronRight style={{color:"gray"}}/>
          </button>
        </div>
        <Calendar
          className="container  h-64 border-0 px-4 mt-4"
          formatShortWeekday={(locale, date) => {
            const dayIndex = date.getDay();
            const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            return dayLabels[dayIndex];
          }}
          activeStartDate={activeStartDate}
          onChange={setSelectedDate}
          showNavigation={false}
          value={selectedDate}
          tileContent={({ date, view }) =>
            view === 'month' && hasEventOnDate(date) ? (
              <div className="notification-dot-container">
                <span className="notification-dot" />
              </div>
            ) : null
          }
          tileClassName={"container rounded-full"}
        />
        </div>


        <div className='container flex flex-col items-center justify-start h-96 w-1/2 overflow-y-auto'>
          
          
            {notificationEvents
              .filter(
                (event) =>
                  event.date.toDateString() === selectedDate.toDateString()
              )
              .map((event) => (
                <div className='container h-24 border-l-2 border-red-400 flex flex-col justify-between w-80 bg-red-50 rounded-md p-4 mb-2'  key={event.date.getTime}>
                  <div className='container w-full flex items-center justify-between'> 
                    <p className='text-sm font-medium'>{event.subject}</p>
                    <p className='text-sm font-medium text-gray-500'>john Smith</p>
                  </div>
                  <p className='text-lg font-semibold'>{event.lecture}</p>
                  <div className='container w-full flex items-center justify-between'> 
                    <div className='container flex items-center  w-1/2'>
                    <AccessTime style={{fontSize:"15",color:"red"}}/>
                    <p className='text-xs font-medium text-red-400 ml-2'>{event.time}</p>
                    </div>
                    <button className="px-3 py-1 rounded-full bg-red-500 text-white text-xs">
                      Join Class
                    </button>

                     
                  </div>
                </div>
              ))}
          
        </div>
      </div>
      
    </div>
  );
}

export default App;