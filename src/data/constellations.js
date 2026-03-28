export const CONSTELLATIONS = [
  {
    id: 'first-star',
    name: 'First Star',
    stars: [{ id: 'fs1', x: 400, y: 80 }],
    lines: [],
  },
  {
    id: 'crux',
    name: 'Crux',
    stars: [
      { id: 'cr1', x: 120, y: 160 },
      { id: 'cr2', x: 120, y: 220 },
      { id: 'cr3', x: 90,  y: 190 },
      { id: 'cr4', x: 150, y: 190 },
    ],
    lines: [['cr1','cr2'],['cr3','cr4']],
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    stars: [
      { id: 'ca1', x: 580, y: 100 },
      { id: 'ca2', x: 620, y: 130 },
      { id: 'ca3', x: 660, y: 110 },
      { id: 'ca4', x: 700, y: 140 },
      { id: 'ca5', x: 740, y: 120 },
    ],
    lines: [['ca1','ca2'],['ca2','ca3'],['ca3','ca4'],['ca4','ca5']],
  },
  {
    id: 'orion',
    name: 'Orion',
    stars: [
      { id: 'or1', x: 200, y: 200 },
      { id: 'or2', x: 240, y: 180 },
      { id: 'or3', x: 210, y: 250 },
      { id: 'or4', x: 250, y: 240 },
      { id: 'or5', x: 225, y: 300 },
      { id: 'or6', x: 215, y: 330 },
      { id: 'or7', x: 245, y: 330 },
    ],
    lines: [['or1','or2'],['or3','or4'],['or1','or3'],['or2','or4'],['or3','or5'],['or4','or5'],['or5','or6'],['or5','or7']],
  },
  {
    id: 'ursa-minor',
    name: 'Ursa Minor',
    stars: [
      { id: 'um1', x: 420, y: 140 },
      { id: 'um2', x: 450, y: 160 },
      { id: 'um3', x: 480, y: 150 },
      { id: 'um4', x: 510, y: 170 },
      { id: 'um5', x: 500, y: 200 },
      { id: 'um6', x: 470, y: 210 },
      { id: 'um7', x: 460, y: 190 },
    ],
    lines: [['um1','um2'],['um2','um3'],['um3','um4'],['um4','um5'],['um5','um6'],['um6','um7'],['um7','um4']],
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    stars: [
      { id: 'sc1', x: 650, y: 250 },
      { id: 'sc2', x: 670, y: 270 },
      { id: 'sc3', x: 690, y: 260 },
      { id: 'sc4', x: 710, y: 280 },
      { id: 'sc5', x: 700, y: 300 },
      { id: 'sc6', x: 720, y: 320 },
      { id: 'sc7', x: 710, y: 340 },
      { id: 'sc8', x: 730, y: 350 },
    ],
    lines: [['sc1','sc2'],['sc2','sc3'],['sc3','sc4'],['sc4','sc5'],['sc5','sc6'],['sc6','sc7'],['sc7','sc8']],
  },
  {
    id: 'leo',
    name: 'Leo',
    stars: [
      { id: 'le1', x: 300, y: 150 },
      { id: 'le2', x: 330, y: 130 },
      { id: 'le3', x: 360, y: 150 },
      { id: 'le4', x: 350, y: 180 },
      { id: 'le5', x: 320, y: 200 },
      { id: 'le6', x: 290, y: 190 },
      { id: 'le7', x: 370, y: 220 },
      { id: 'le8', x: 400, y: 210 },
      { id: 'le9', x: 410, y: 190 },
    ],
    lines: [['le1','le2'],['le2','le3'],['le3','le4'],['le4','le5'],['le5','le6'],['le6','le1'],['le4','le7'],['le7','le8'],['le8','le9']],
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major',
    stars: [
      { id: 'ub1', x: 100, y: 350 },
      { id: 'ub2', x: 140, y: 340 },
      { id: 'ub3', x: 180, y: 355 },
      { id: 'ub4', x: 220, y: 345 },
      { id: 'ub5', x: 240, y: 380 },
      { id: 'ub6', x: 200, y: 400 },
      { id: 'ub7', x: 160, y: 390 },
      { id: 'ub8', x: 270, y: 360 },
      { id: 'ub9', x: 300, y: 340 },
      { id: 'ub10', x: 320, y: 355 },
    ],
    lines: [['ub1','ub2'],['ub2','ub3'],['ub3','ub4'],['ub4','ub5'],['ub5','ub6'],['ub6','ub7'],['ub7','ub4'],['ub4','ub8'],['ub8','ub9'],['ub9','ub10']],
  },
]

export function getStarAchievementMap(achievements, constellations) {
  const map = {}
  let idx = 0
  for (const constellation of constellations) {
    for (const star of constellation.stars) {
      if (idx < achievements.length) {
        map[star.id] = achievements[idx]
        idx++
      }
    }
  }
  return map
}

export function getAllocatedStars(achievements, constellations) {
  const filled = new Set()
  let remaining = achievements.length

  for (const constellation of constellations) {
    if (remaining <= 0) break
    const toFill = Math.min(remaining, constellation.stars.length)
    constellation.stars.slice(0, toFill).forEach(s => filled.add(s.id))
    remaining -= toFill
  }

  return filled
}

export function isConstellationComplete(constellation, allocatedStars) {
  return constellation.stars.every(s => allocatedStars.has(s.id))
}

export function getActiveConstellation(achievements, constellations) {
  const allocatedStars = getAllocatedStars(achievements, constellations)

  for (const constellation of constellations) {
    if (!isConstellationComplete(constellation, allocatedStars)) {
      const starsEarned = constellation.stars.filter(s => allocatedStars.has(s.id)).length
      return {
        name: constellation.name,
        starsEarned,
        starsTotal: constellation.stars.length,
      }
    }
  }

  return null
}
