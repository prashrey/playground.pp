import React from "react";
import { ECONOMY, UPGRADES } from "@/helper/constants";

const Workshop = props => {
  const { gameStarted, balance, drillLevel, upgradeDrill, getDrillUpgradeCost } = props;
  return (
    <div className="mb-2">
      <p>Drill (Level {drillLevel})</p>
      <p>
        Produces {Math.pow(2, drillLevel - 1)} item(s)/{ECONOMY.DRILL_INTERVAL / 1000}sec(s)
      </p>
      {gameStarted && (
        <button
          onClick={() => upgradeDrill()}
          disabled={balance < getDrillUpgradeCost(drillLevel) || drillLevel >= UPGRADES.DRILL.MAX_LEVEL}
          className={`px-3 py-1 rounded ${
            balance < getDrillUpgradeCost(drillLevel) ? "bg-gray-500 cursor-not-allowed" : "bg-green-700 text-white"
          }`}
        >
          {getDrillUpgradeCost(drillLevel)
            ? `Upgrade Drill (₹${getDrillUpgradeCost(drillLevel)})`
            : "Latest model Drill"}
        </button>
      )}
    </div>
  );
};

export default Workshop;
