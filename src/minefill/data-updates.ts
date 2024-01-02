import type { ItemPrototype } from 'factorio:prototype'

const mined_sound = [
  { filename: '__core__/sound/landfill-small.ogg' },
  { filename: '__core__/sound/landfill-small-1.ogg' },
  { filename: '__core__/sound/landfill-small-2.ogg' },
  { filename: '__core__/sound/landfill-small-3.ogg' },
  { filename: '__core__/sound/landfill-small-4.ogg' },
  { filename: '__core__/sound/landfill-small-5.ogg' },
]

for (const [_, tile] of pairs(data.raw.tile))
  tile.check_collision_with_entities = true

for (const [_, item] of pairs(data.raw.item)) {
  if (item.place_as_tile && isLandfill(item)) {
    const tile = data.raw.tile[item.place_as_tile.result]
    if (!tile || tile.minable)
      continue
    tile.minable = {
      mining_time: 0.1,
      result: item.name,
    }
    tile.mined_sound = mined_sound
  }
}

function isLandfill(item: ItemPrototype) {
  const landfillCondition = data.raw.item.landfill?.place_as_tile?.condition
  const itemCondition = item.place_as_tile?.condition
  if (!landfillCondition)
    return !itemCondition
  if (landfillCondition.length !== itemCondition?.length)
    return false
  for (let i = 0; i < landfillCondition.length; i++) {
    if (landfillCondition[i] !== itemCondition[i])
      return false
  }
  return true
}
