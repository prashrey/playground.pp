"use client";

import EconomyDetails from "@/components/EconomyDetails";
import Marketplace from "@/components/Marketplace";
import Workshop from "@/components/Workshop";

import { useGame } from "@/context/GameContext";
import { UPGRADES } from "@/helper/constants";

export default function Home() {
  const {
    gameStarted,
    setGameStarted,
    balance,
    loan,
    vacationFund,
    inventory,
    week,
    advanceWeek,
    drillLevel,
    upgradeDrill,
    storageLevel,
    upgradeStorage,
    getStorageCapacity,
    sellItems,
    resetGame,
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
    <main className="main-app">
      <h1 className="app-title">The Myning Game</h1>
      <p className="app-desc">
        You are the only hope of your village. Overcome their loans and accumulate enough wealth to plan a vacation trip
        to Hawai for all of them
      </p>
      <section className="main-grid">
        <div className="grid-item">
          <div className="section-details">
            <h2 className="grid-section-name">Home</h2>
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
            <h2 className="grid-section-name">Workshop</h2>
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
            <h2 className="grid-section-name">Marketplace</h2>
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
        </div>
        <div className="grid-item">
          <div className="section-details">
            <h2 className="grid-section-name">Achievements</h2>
            <p className="grid-dection-desc">Unlock achievements as you progress through the game!</p>
          </div>
        </div>
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
          <button style={{ margin: "20px", width: "calc(100% - 40px)" }} className="block rounded" onClick={resetGame}>
            Reset Game
          </button>
        )}
      </footer>
    </main>
  );
}

// NEXT STEP: add AI to generate insult for every click
