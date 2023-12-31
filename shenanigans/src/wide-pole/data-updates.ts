for (const [_, pole] of pairs(data.raw['electric-pole'])) {
  if (pole.maximum_wire_distance === 15)
    pole.maximum_wire_distance = 16
}
