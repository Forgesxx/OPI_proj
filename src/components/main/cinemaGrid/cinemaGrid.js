import React, { useState, useContext, useEffect } from 'react'
import { db } from '../../../context/AuthContext/Firebase'
import { collection, addDoc } from "firebase/firestore";

import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { Image, message, Space, } from 'antd'


import './cinemaGrid.css';

const CinemaGrid = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
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

    const handleBuyTickets = 
        async () => 
        {
            if (currentUser !== null) 
            {
// TODO: use message API
                // messageApi.open(
                // {
                //     type: "info",
                //     content: `You bought the tickets : ${selectedSeats.join(', ')}`,
                //     duration: 4
                // });
                alert(`You bought the tickets : ${selectedSeats.join(', ')}`);
                await addDoc(collection(db, "mail"), 
                {
                    to: currentUser.email,
                    message: 
                    {
                        subject: 'Hello from Firebase!',
                        html: `You bought the tickets : ${selectedSeats.join(', ')}`,
                    },
                });
            } 
            else 
            {
              alert("To buy tickets, you should be logged in!");
// TODO: use message API
              // messageApi.open(
              //   {
              //       type: "error",
              //       content: "To buy tickets, you should be logged in!",
              //       duration: 4
              //   })
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
      <div className="seats">
        {renderSeats()}
      </div>
      <button className={selectedSeats.length > 0 ? 'buy-btn active' : 'buy-btn'} onClick={handleBuyTickets}>Buy</button>
    </div>
  );
};

export default CinemaGrid;
