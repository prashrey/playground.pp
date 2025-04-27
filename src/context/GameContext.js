"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { generateMaterials } from "@/helper/materialGenerator";
import { ECONOMY, UPGRADES, MATERIALS, MATERIAL_RARITY, MATERIAL_COSTS } from "@/helper/constants";

// Create context for managing game state
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Game state management
  const [gameStarted, setGameStarted] = useState(false);
  const [balance, setBalance] = useState(ECONOMY.INITIAL_BALANCE);
  const [loan, setLoan] = useState(ECONOMY.INITIAL_LOAN);
  const [vacationFund, setVacationFund] = useState(0);
  const [inventory, setInventory] = useState({});
  const [week, setWeek] = useState(1);

  // Upgrade levels and capacity tracking
  const [drillLevel, setDrillLevel] = useState(1);
  const [storageLevel, setStorageLevel] = useState(1);
  const [updatedStorageCapacity, setUpdatedStorageCapacity] = useState(ECONOMY.BASE_STORAGE_CAPACITY);

  // Memoized getters to prevent unnecessary rerenders
  const getStorageCapacity = useCallback(() => updatedStorageCapacity, [updatedStorageCapacity]);

  const getMaterialCost = useCallback(material => {
    const costMultiplicationFactor = MATERIAL_COSTS[material].cost || 1;
    return ECONOMY.BASE_MATERIAL_COST * costMultiplicationFactor;
  }, []);

  const getProductionRate = useCallback(() => Math.pow(2, drillLevel - 1), [drillLevel]);

  // Automated mining loop - runs every second when game is started
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setInventory(prevInventory => {
        const availableSpace =
          getStorageCapacity() - Object.values(prevInventory).reduce((sum, amount) => sum + amount, 0);

        if (availableSpace <= 0) return prevInventory;

        const unitsToProduce = Math.min(getProductionRate(), availableSpace);
        if (unitsToProduce <= 0) return prevInventory;

        const newMaterials = generateMaterials(unitsToProduce);

        return Object.entries(newMaterials).reduce(
          (acc, [material, amount]) => ({
            ...acc,
            [material]: (acc[material] || 0) + amount,
          }),
          { ...prevInventory }
        );
      });
    }, ECONOMY.DRILL_INTERVAL);

    return () => clearInterval(timer);
  }, [gameStarted, getStorageCapacity, getProductionRate]);

  // Weekly game progression handler
  const advanceWeek = useCallback(() => {
    if (!gameStarted || typeof week !== "number") return false;
    let weeklyInstallment = ECONOMY.LOAN_INSTALLMENT_RATE * ECONOMY.INITIAL_LOAN;

    try {
      setWeek(prev => prev + 1);

      if (loan > 0) {
        setBalance(prev => prev - weeklyInstallment);
      }

      const weeklyProduction = getProductionRate() * (7 * 24 * 60 * 60);

      setInventory(prevInventory => {
        const availableSpace =
          getStorageCapacity() - Object.values(prevInventory).reduce((sum, amount) => sum + amount, 0);

        if (availableSpace <= 0) return prevInventory;

        const actualProduction = Math.min(weeklyProduction, availableSpace);
        const newMaterials = generateMaterials(actualProduction);

        return Object.entries(newMaterials).reduce(
          (acc, [material, amount]) => ({
            ...acc,
            [material]: (acc[material] || 0) + amount,
          }),
          { ...prevInventory }
        );
      });

      return true;
    } catch (error) {
      console.error("Failed to advance week:", error);
      return false;
    }
  }, [gameStarted, week, loan, getStorageCapacity, getProductionRate]);

  // Upgrade handlers
  const upgradeDrill = () => {
    if (drillLevel >= UPGRADES.DRILL.MAX_LEVEL) return false; // Max level check

    const nextLevel = drillLevel + 1;
    const upgrade = UPGRADES.DRILL[drillLevel];

    if (!upgrade || balance < upgrade.cost) return false;

    try {
      setBalance(prev => prev - upgrade.cost);
      setDrillLevel(nextLevel);
      return true;
    } catch (error) {
      console.error("Drill upgrade failed:", error);
      return false;
    }
  };

  const upgradeStorage = () => {
    if (storageLevel > UPGRADES.STORAGE.MAX_LEVEL) return; // Max level check

    const nextLevel = storageLevel + 1;
    const storageDetails = UPGRADES.STORAGE[storageLevel];

    if (!storageDetails || balance < storageDetails.cost) return;

    try {
      setBalance(prev => prev - storageDetails.cost);
      setStorageLevel(nextLevel);
      setUpdatedStorageCapacity(ECONOMY.BASE_STORAGE_CAPACITY * storageDetails.capacityMultiplier);
      return true;
    } catch (error) {
      console.error("Storage upgrade failed:", error);
      return false;
    }
  };

  // Resource management
  const sellItems = () => {
    // Check if there are any items to sell
    const hasItems = Object.values(inventory).some(amount => amount > 0);
    if (!hasItems) return;

    try {
      // Calculate total earnings from all materials
      const totalEarned = Object.entries(inventory).reduce((total, [material, amount]) => {
        const materialPrice = getMaterialCost(material);
        return total + materialPrice * amount;
      }, 0);

      // Update balance and clear inventory
      setBalance(prev => prev + totalEarned);
      setInventory({}); // Reset inventory to empty

      return totalEarned; // Return total earned for UI feedback
    } catch (error) {
      console.error("Failed to sell items:", error);
      return 0;
    }
  };

  console.log("Final Inventory: ", inventory);
  // Context provider setup
  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        balance,
        setBalance,
        loan,
        setLoan,
        vacationFund,
        setVacationFund,
        inventory,
        setInventory,
        week,
        advanceWeek,
        drillLevel,
        upgradeDrill,
        setDrillLevel,
        storageLevel,
        upgradeStorage,
        setStorageLevel,
        getStorageCapacity,
        getMaterialCost,
        sellItems,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for accessing game context
export const useGame = () => useContext(GameContext);
