// Game Economy Constants
export const ECONOMY = {
  DRILL_INTERVAL: 10000,
  BASE_STORAGE_CAPACITY: 100,
  INITIAL_BALANCE: 1000,
  INITIAL_LOAN: 1000000,
  LOAN_INSTALLMENT_RATE: 0.001,
  BASE_MATERIAL_COST: 1,
};

// Material Rarity Configuration - multiplier property is unused for now
export const MATERIAL_RARITY = {
  COMMON: { chance: 0.85, multiplier: 1 },
  UNCOMMON: { chance: 0.925, multiplier: 2 },
  RARE: { chance: 0.999, multiplier: 5 },
  VERY_RARE: { chance: 1, multiplier: 10 },
};

// Equipment Upgrade Configurations
export const UPGRADES = {
  STORAGE: {
    1: { cost: 750, capacityMultiplier: 2 }, // 100 → 200
    2: { cost: 1500, capacityMultiplier: 4 }, // 200 → 400
    3: { cost: 3000, capacityMultiplier: 16 }, // 400 → 1600
    4: { cost: 9000, capacityMultiplier: 64 }, // 1600 → 6400
    5: { cost: 18000, capacityMultiplier: 256 }, // 1600 → 6400
    MAX_LEVEL: 6,
  },
  DRILL: {
    1: { cost: 300, productionMultiplier: 2 }, // 1 → 2/s
    2: { cost: 900, productionMultiplier: 4 }, // 2 → 4/s
    3: { cost: 1800, productionMultiplier: 16 }, // 4 → 8/s
    4: { cost: 3600, productionMultiplier: 32 }, // 8 → 16/s
    5: { cost: 3600, productionMultiplier: 64 }, // 8 → 16/s
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
    // Very Rare (70-200x)
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
  // Common Materials (1-7x)
  iron: { cost: 1, rarity: "COMMON" },
  aluminum: { cost: 1, rarity: "COMMON" },
  copper: { cost: 3, rarity: "COMMON" },
  tin: { cost: 4, rarity: "COMMON" },
  lead: { cost: 6, rarity: "COMMON" },
  zinc: { cost: 7, rarity: "COMMON" },

  // Uncommon Materials (9-20x)
  nickel: { cost: 9, rarity: "UNCOMMON" },
  cobalt: { cost: 11, rarity: "UNCOMMON" },
  mercury: { cost: 12, rarity: "UNCOMMON" },
  titanium: { cost: 15, rarity: "UNCOMMON" },
  silver: { cost: 18, rarity: "UNCOMMON" },
  tungsten: { cost: 20, rarity: "UNCOMMON" },

  // Rare Materials (25-63x)
  gold: { cost: 25, rarity: "RARE" },
  palladium: { cost: 40, rarity: "RARE" },
  platinum: { cost: 54, rarity: "RARE" },
  rhodium: { cost: 63, rarity: "RARE" },

  // Very Rare Materials (70-200x)
  iridium: { cost: 70, rarity: "VERY_RARE" },
  osmium: { cost: 79, rarity: "VERY_RARE" },
  emerald: { cost: 82, rarity: "VERY_RARE" },
  sapphire: { cost: 120, rarity: "VERY_RARE" },
  ruby: { cost: 150, rarity: "VERY_RARE" },
  diamond: { cost: 200, rarity: "VERY_RARE" },
};

// Calculate loan installment based on rate
export const LOAN_INSTALLMENT = ECONOMY.INITIAL_LOAN * ECONOMY.LOAN_INSTALLMENT_RATE;
