import React from "react";
import { useGame } from "@/context/GameContext";
import { UPGRADES } from "@/helper/constants";

const Marketplace = props => {
  const {
    gameStarted,
    balance,
    inventory,
    storageLevel,
    upgradeStorage,
    getStorageCapacity,
    sellItems,
    sellSingularItem,
  } = useGame();

  const { getStorageUpgradeCost } = props;

  return (
    <div className="marketplace-container">
      <div className="storage-wrap">
        <p>Storage Level: {storageLevel}</p>
        {gameStarted && (
          <button
            onClick={upgradeStorage}
            disabled={balance < getStorageUpgradeCost(storageLevel) || storageLevel >= UPGRADES.STORAGE.MAX_LEVEL}
            className={`rounded ${balance < getStorageUpgradeCost(storageLevel) ? "up-storage" : "up-action-disabled"}`}
          >
            {getStorageUpgradeCost(storageLevel)
              ? `Upgrade Storage (₹${getStorageUpgradeCost(storageLevel)})`
              : "Max Storage"}
          </button>
        )}

        <p className="mt-4">
          Items in storage: {Object.values(inventory).reduce((total, amount) => total + amount, 0)} /{" "}
          {getStorageCapacity()}
        </p>

        {gameStarted && (
          <button
            onClick={sellItems}
            disabled={Object.values(inventory).every(amount => amount === 0)}
            className={`mt-2 px-4 py-2 rounded ${
              Object.values(inventory).every(amount => amount === 0)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-700 text-white"
            }`}
          >
            Sell All Items
          </button>
        )}
      </div>

      <div className="materials-wrap">
        <ul className="material-list">
          {Object.entries(inventory).map(([material, amount]) => (
            <li key={material} className="flex justify-between">
              <span className="material-name">{material.charAt(0).toUpperCase() + material.slice(1)}</span>
              <span>{amount}</span>
              <button
                onClick={() => sellSingularItem(material)}
                disabled={amount === 0}
                className={`rounded sell-button ${amount === 0 ? "disabled" : ""}`}
              >
                Sell
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Marketplace;
