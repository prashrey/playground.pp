// Game Economy Constants
export const ECONOMY = {
  DRILL_INTERVAL: 10000, // Mining tick interval in milliseconds
  BASE_STORAGE_CAPACITY: 100, // Initial storage capacity for new players
  INITIAL_BALANCE: 1000, // Starting money
  INITIAL_LOAN: 1000000, // Starting loan amount
  LOAN_INSTALLMENT_RATE: 0.001, // Weekly loan payment rate (0.1%)
  BASE_MATERIAL_COST: 1, // Base value for material cost calculations
};

// Material Rarity Configuration - multiplier property is unused for now
export const MATERIAL_RARITY = {
  COMMON: { chance: 0.85, multiplier: 1 }, // High probability, low value
  UNCOMMON: { chance: 0.925, multiplier: 2 }, // Medium probability
  RARE: { chance: 0.999, multiplier: 5 }, // Low probability
  SPECIAL: { chance: 1, multiplier: 10 }, // Extremely rare, highest value
};

// Equipment Upgrade Configurations
export const UPGRADES = {
  STORAGE: {
    1: { cost: 750, capacityMultiplier: 2 }, // 100 → 200 capacity
    2: { cost: 1500, capacityMultiplier: 4 }, // 200 → 400 capacity
    3: { cost: 3000, capacityMultiplier: 16 }, // 400 → 1,600 capacity
    4: { cost: 9000, capacityMultiplier: 64 }, // 1,600 → 6,400 capacity
    5: { cost: 18000, capacityMultiplier: 256 }, // 6,400 → 25,600 capacity
    MAX_LEVEL: 6,
  },
  DRILL: {
    1: { cost: 300, productionMultiplier: 2 }, // 1 → 2 units/second
    2: { cost: 900, productionMultiplier: 4 }, // 2 → 4 units/second
    3: { cost: 1800, productionMultiplier: 16 }, // 4 → 16 units/second
    4: { cost: 3600, productionMultiplier: 32 }, // 16 → 32 units/second
    5: { cost: 7200, productionMultiplier: 64 }, // 32 → 64 units/second
    MAX_LEVEL: 6,
  },
};

// Material Categories
export const MATERIALS = {
  COMMON: ["iron", "copper", "aluminum", "tin", "lead", "zinc"],
  UNCOMMON: ["nickel", "cobalt", "mercury", "titanium", "silver"],
  RARE: ["gold", "palladium", "platinum", "tungsten"],
  VALUABLE: ["iridium", "osmium", "rhodium", "diamond", "ruby", "sapphire", "emerald"],

  // All materials list for iteration
  ALL: [
    // Common (1-7x)
    "iron",
    "aluminum",
    "copper",
    "tin",
    "lead",
    "zinc",
    // Uncommon (9-20x)
    "nickel",
    "cobalt",
    "mercury",
    "titanium",
    "silver",
    "tungsten",
    // Rare (25-63x)
    "gold",
    "palladium",
    "platinum",
    "rhodium",
    // Special (70-200x)
    "iridium",
    "osmium",
    "emerald",
    "sapphire",
    "ruby",
    "diamond",
  ],
};

// Material Cost Configuration
export const MATERIAL_COSTS = {
  // Common Materials (1-7x base value)
  iron: { cost: 1, rarity: "COMMON" }, // Base material
  aluminum: { cost: 1, rarity: "COMMON" }, // Equal to iron
  copper: { cost: 3, rarity: "COMMON" }, // 3x iron value
  tin: { cost: 4, rarity: "COMMON" }, // 4x iron value
  lead: { cost: 6, rarity: "COMMON" }, // 6x iron value
  zinc: { cost: 7, rarity: "COMMON" }, // 7x iron value

  // Uncommon Materials (9-20x base value)
  nickel: { cost: 9, rarity: "UNCOMMON" }, // 9x iron value
  cobalt: { cost: 11, rarity: "UNCOMMON" }, // 11x iron value
  mercury: { cost: 12, rarity: "UNCOMMON" }, // 12x iron value
  titanium: { cost: 15, rarity: "UNCOMMON" }, // 15x iron value
  silver: { cost: 18, rarity: "UNCOMMON" }, // 18x iron value
  tungsten: { cost: 20, rarity: "UNCOMMON" }, // 20x iron value

  // Rare Materials (25-63x base value)
  gold: { cost: 25, rarity: "RARE" }, // 25x iron value
  palladium: { cost: 40, rarity: "RARE" }, // 40x iron value
  platinum: { cost: 54, rarity: "RARE" }, // 54x iron value
  rhodium: { cost: 63, rarity: "RARE" }, // 63x iron value

  // Special Materials (70-200x base value)
  iridium: { cost: 70, rarity: "SPECIAL" }, // 70x iron value
  osmium: { cost: 79, rarity: "SPECIAL" }, // 79x iron value
  emerald: { cost: 82, rarity: "SPECIAL" }, // 82x iron value
  sapphire: { cost: 120, rarity: "SPECIAL" }, // 120x iron value
  ruby: { cost: 150, rarity: "SPECIAL" }, // 150x iron value
  diamond: { cost: 200, rarity: "SPECIAL" }, // 200x iron value
};

// Calculate loan installment based on rate
export const LOAN_INSTALLMENT = ECONOMY.INITIAL_LOAN * ECONOMY.LOAN_INSTALLMENT_RATE;
