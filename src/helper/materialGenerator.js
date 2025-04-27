import { MATERIALS, MATERIAL_RARITY } from "./constants.js";

export const generateMaterials = amount => {
  const materials = [];

  for (let i = 0; i < amount; i++) {
    const random = Math.random();
    let materialPool;

    if (random < MATERIAL_RARITY.COMMON.chance) {
      materialPool = MATERIALS.COMMON;
    } else if (random < MATERIAL_RARITY.UNCOMMON.chance) {
      materialPool = MATERIALS.UNCOMMON;
    } else if (random < MATERIAL_RARITY.RARE.chance) {
      materialPool = MATERIALS.RARE;
    } else {
      materialPool = MATERIALS.VALUABLE;
    }

    materials.push(materialPool[Math.floor(Math.random() * materialPool.length)]);
  }

  return materials.reduce((acc, material) => {
    acc[material] = (acc[material] || 0) + 1;
    return acc;
  }, {});
};
