/* eslint-disable ts/no-non-null-asserted-optional-chain */

import type { BlueprintEntity, CustomInputEvent } from 'factorio:runtime'

declare const global: {
  original_bp: BlueprintEntity[]
  bp_count: number
  bp_direction: boolean
}

script.on_event('dish-PAGEUP', (event) => {
  game.print('dish-PAGEUP')

  const p = game.get_player(event.player_index)
  const bp = p?.cursor_stack!
  if (!bp.label) {
    global.bp_count = 1
    global.original_bp = bp.get_blueprint_entities()!
  }
  change_bp_count(event, 1)
})

script.on_event('dish-PAGEDOWN', (event) => {
  game.print('dish-PAGEDOWN')
  change_bp_count(event, -1)
})

script.on_event('dish-SHIFT-R', (event) => {
  game.print('dish-SHIFT-R')
  global.bp_direction = !global.bp_direction
  change_bp_count(event, 0)
})

function change_bp_count(event: CustomInputEvent, diff: number) {
  const p = game.get_player(event.player_index)
  const bp = p?.cursor_stack!
  global.bp_count += diff
  bp.label = `x${global.bp_count}`

  const size = bp_size(global.original_bp)
  log(size)
  const delta = {
    x: !global.bp_direction ? size.size.x : 0,
    y: global.bp_direction ? size.size.y : 0,
  }

  const moved = Array.from({ length: global.bp_count }, (_, i) => {
    return global.original_bp.map((e) => {
      return { ...e, position: {
        x: e.position.x + i * delta.x - size.top_left.x,
        y: e.position.y + i * delta.y - size.top_left.y,
      } }
    })
  }).flat()

  bp.set_blueprint_entities(moved)
  bp.blueprint_snap_to_grid = size.size
}

function bp_size(entities: BlueprintEntity[]) {
  const x1 = Math.min(...entities.map(e => e.position.x - game.entity_prototypes[e.name].tile_width / 2))
  const x2 = Math.max(...entities.map(e => e.position.x + game.entity_prototypes[e.name].tile_width / 2))
  const y1 = Math.min(...entities.map(e => e.position.y - game.entity_prototypes[e.name].tile_height / 2))
  const y2 = Math.max(...entities.map(e => e.position.y + game.entity_prototypes[e.name].tile_height / 2))
  return {
    top_left: { x: x1, y: y1 },
    bottom_right: { x: x2, y: y2 },
    center: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 },
    size: { x: x2 - x1, y: y2 - y1 },
  } satisfies Record<string, { x: number; y: number }>
}

function log(o: any) {
  game.print(serpent.block(o))
}
