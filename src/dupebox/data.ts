import type { SelectionToolPrototype, TrainStopPrototype } from 'factorio:prototype'

data.extend<TrainStopPrototype>([{
  type: 'train-stop',
  name: 'dish-dupebox-stop',
  animation_ticks_per_frame: 1,
}])

data.extend<SelectionToolPrototype>([{
  ...data.raw.blueprint.blueprint,
  type: 'selection-tool',
  name: 'dish-dupebox-selector',
  stack_size: 1,
  selection_color: [1, 0.5, 0], // orange
  selection_cursor_box_type: 'pair',
  selection_mode: ['any-tile', 'blueprint'],
  always_include_tiles: true,
  alt_selection_color: [1, 0.5, 0], // orange
  alt_selection_cursor_box_type: 'pair',
  alt_selection_mode: ['any-tile'],
  flags: ['always-show', 'not-stackable'],
}])

// data.extend<ItemPrototype>([{
// type: 'item',
// name: 'dish-dupebox-selector',
// stack_size: 1,

// }])
