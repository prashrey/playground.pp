import React from "react";
import { useGame } from "@/context/GameContext";

const EconomyDetails = props => {
  const { balance, loan, vacationFund, week, gameStarted, advanceWeek } = useGame();
  return (
    <div>
      <p>
        <b>Balance:</b> ₹{Math.round(balance)}
      </p>
      <p>
        <b>Student Loan:</b> ₹{loan}
      </p>
      <p>
        <b>Vacation Fund:</b> ₹{vacationFund}
      </p>
      <p>
        <b>Week:</b> #{week}
      </p>
      {gameStarted && (
        <button onClick={advanceWeek} className="mt-2 px-4 py-2 bg-blue-700 text-white rounded">
          Advance Week
        </button>
      )}
    </div>
  );
};

export default EconomyDetails;
