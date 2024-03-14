import React, { useState } from 'react';

import './cinemaGrid.css';

const CinemaGrid = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    const isSeatSelected = selectedSeats.includes(seatNumber);
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBuyTickets = () => {
    alert(`You bought the tickets : ${selectedSeats.join(', ')}`);
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
