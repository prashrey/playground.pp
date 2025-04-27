"use client";

import EconomyDetails from "@/components/EconomyDetails";
import Marketplace from "@/components/Marketplace";
import Workshop from "@/components/Workshop";

import { useGame } from "@/context/GameContext";
import { UPGRADES, ECONOMY } from "@/helper/constants";

export default function Home() {
  const {
    gameStarted,
    setGameStarted,
    balance,
    setBalance,
    loan,
    vacationFund,
    inventory,
    setInventory,
    week,
    advanceWeek,
    drillLevel,
    upgradeDrill,
    setDrillLevel,
    storageLevel,
    setStorageLevel,
    upgradeStorage,
    getStorageCapacity,
    sellItems,
  } = useGame();

  const getDrillUpgradeCost = level => {
    if (UPGRADES.DRILL[level]) {
      return UPGRADES.DRILL[level].cost;
    }
    return null;
  };

  const getStorageUpgradeCost = level => {
    if (UPGRADES.STORAGE[level]) {
      return UPGRADES.STORAGE[level].cost;
    }
    return null;
  };

  return (
    <main className="p-8 font-mono">
      <h1 className="text-3xl mb-4">⛏️ The Myning Game</h1>
      <p className="text-3xl mb-4" style={{ fontSize: "14px", margin: "10px 0 0 60px" }}>
        You're the only hope of your village. Overcome their loans and accumulate enough wealth to plan a vacation trip
        to Hawai for all of them
      </p>
      <section className="main-grid">
        <div className="grid-item">
          <div className="section-details">
            <h2 className="grid-section-name">🏠 Home</h2>
            <p className="grid-dection-desc">Welcome to the Mining Game! Start your adventure now!</p>
          </div>
          <EconomyDetails
            gameStarted={gameStarted}
            balance={balance}
            loan={loan}
            vacationFund={vacationFund}
            week={week}
            advanceWeek={advanceWeek}
          />
        </div>
        <div className="grid-item">
          <div className="section-details">
            <h2 className="grid-section-name">🛠️ Workshop</h2>
            <p className="grid-dection-desc">This is where it all goes down! </p>
          </div>
          <Workshop
            gameStarted={gameStarted}
            balance={balance}
            drillLevel={drillLevel}
            upgradeDrill={upgradeDrill}
            getDrillUpgradeCost={getDrillUpgradeCost}
          />
        </div>
        <div className="grid-item">
          <div className="section-details">
            <h2 className="grid-section-name">🛒 Marketplace</h2>
            <p className="grid-dection-desc">Trade your resources and upgrade your equipment!</p>
          </div>
          <Marketplace
            gameStarted={gameStarted}
            balance={balance}
            inventory={inventory}
            storageLevel={storageLevel}
            upgradeStorage={upgradeStorage}
            getStorageUpgradeCost={getStorageUpgradeCost}
            getStorageCapacity={getStorageCapacity}
            sellItems={sellItems}
          />
          {/* <p>📦 Storage Level: {storageLevel}</p>
          {gameStarted && (
            <>
              <button
                onClick={upgradeStorage}
                disabled={balance < getStorageUpgradeCost(storageLevel) || storageLevel >= UPGRADES.STORAGE.MAX_LEVEL}
                className={`rounded ${
                  balance < getStorageUpgradeCost(storageLevel) ? "up-storage" : "up-action-disabled"
                }`}
              >
                {getStorageUpgradeCost(storageLevel)
                  ? `Upgrade Storage (₹${getStorageUpgradeCost(storageLevel)})`
                  : "Max Storage"}
              </button>
            </>
          )} */}
          {/* <p className="mt-4">
            🪨 Items in storage:{" "}
            {Object.entries(inventory)
              .map(([material, amount]) => amount)
              .reduce((a, b) => a + b, 0)}
            / {getStorageCapacity()}
          </p> */}
          {/* <ul className="mt-4">
            {Object.entries(inventory).map(([material, amount]) => (
              <li key={material} className="flex justify-between">
                <span>{material.charAt(0).toUpperCase() + material.slice(1)}:</span>
                <span>{amount}</span>
              </li>
            ))}
          </ul> */}
          {/* {gameStarted && (
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
          )} */}
        </div>
        <div className="grid-item">
          <div className="section-details">
            <h2 className="grid-section-name">🏆 Achievements</h2>
            <p className="grid-dection-desc">Unlock achievements as you progress through the game!</p>
          </div>
        </div>
        {/* <div className="grid-item">
          <div className="section-details">
          <h2 className="grid-section-name">⚙️ Settings</h2>
          <p className="grid-dection-desc">Customize your game experience!</p>
          </div>
        </div> */}
      </section>

      <footer className="mt-8">
        {!gameStarted ? (
          <button
            style={{ margin: "20px", width: "calc(100% - 40px)" }}
            className="block rounded"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        ) : (
          <button
            style={{ margin: "20px", width: "calc(100% - 40px)" }}
            className="block rounded"
            onClick={() => {
              setBalance(ECONOMY.INITIAL_BALANCE);
              setDrillLevel(1);
              setStorageLevel(1);
              // setLoan(ECONOMY.INITIAL_LOAN);
              // setVacationFund(0);
              setInventory({});
              setGameStarted(false);
            }}
          >
            Reset Game
          </button>
        )}
      </footer>
    </main>
  );
}

// NEXT STEP: add AI to generate insult for every click
