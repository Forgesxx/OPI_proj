import React, { useState, useContext, useEffect } from 'react'
import { db } from '../../../context/AuthContext/Firebase'
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { Image, message, Space, DatePicker, TimePicker } from 'antd'
import './cinemaGrid.css';

const { RangePicker } = DatePicker;

const CinemaGrid = ({ movieTitle }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { currentUser } = useContext(AuthContext)
  const [messageApi, contextHolder] = message.useMessage()

  const handleSeatClick = (seatNumber) => {
    const isSeatSelected = selectedSeats.includes(seatNumber);
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
  };

  const disabledHours = () => {
    const disabledHours = [0, 1, 2, 3,4,5,6,7,8,9,10,11,13,15,17,19,21,23];
    
   
    return disabledHours;
  };

  const handleBuyTickets = async () => {
    if (currentUser !== null && selectedDate && selectedTime) {
      alert(`You bought the tickets for ${movieTitle} on ${selectedDate} at ${selectedTime}: ${selectedSeats.join(', ')}`);
      await addDoc(collection(db, "mail"), {
        to: currentUser.email,
        message: {
          subject: 'Hello from Firebase!',
          html: `You bought the tickets for ${movieTitle} on ${selectedDate} at ${selectedTime}: ${selectedSeats.join(', ')}`,
        },
      });
    } else {
      alert("To buy tickets, you should be logged in and select date and time!");
    }
  };

  const renderSeats = () => {
    const seats = [];

    for (let seat = 1; seat <= 50; seat++) {
      const seatNumber = seat;
      const isSelected = selectedSeats.includes(seatNumber);
      seats.push(
        <div
          key={seatNumber}
          className={`seat ${isSelected ? 'selected' : ''}`}
          onClick={() => handleSeatClick(seatNumber)}
        >
          {seatNumber}
        </div>
      );
    }

    return seats;
  };

  return (
    <div className="cinema-grid">
      <h2>Tickets</h2>
      <div className="date-time-picker">
        <Space direction="horizontal">
          <DatePicker onChange={handleDateChange} picker="date" />
          <TimePicker 
  onChange={handleTimeChange} 
  disabledHours={disabledHours} 
  format="HH:00" 
  minuteStep={60} 
/>

        </Space>
      </div>
      <div className="seats">
        {renderSeats()}
      </div>
      <button className={selectedSeats.length > 0 ? 'buy-btn active' : 'buy-btn'} onClick={handleBuyTickets}>Buy</button>
    </div>
  );
};

export default CinemaGrid;
