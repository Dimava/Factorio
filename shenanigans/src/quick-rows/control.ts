import type { BlueprintEntity, CustomInputEvent } from 'factorio:runtime'

declare const global: {
  original_bp: BlueprintEntity[]
  bp_count: number
  bp_direction: boolean
}

script.on_event('dish-PAGEUP', (event) => {
  reassign_stack_if_needed(event)
  change_bp_count(event, 1)
})

script.on_event('dish-PAGEDOWN', (event) => {
  reassign_stack_if_needed(event)
  change_bp_count(event, -1)
})

script.on_event('dish-SHIFT-R', (event) => {
  reassign_stack_if_needed(event)
  global.bp_direction = !global.bp_direction
  change_bp_count(event, 0)
})

function reassign_stack_if_needed(event: CustomInputEvent) {
  const player = game.get_player(event.player_index)
  if (!player?.is_cursor_blueprint())
    return
  const bp = player.cursor_stack!
  if (!bp.label) {
    global.bp_count = 1
    global.original_bp = bp.get_blueprint_entities()!
  }
}

function change_bp_count(event: CustomInputEvent, diff: number) {
  const player = game.get_player(event.player_index)
  if (!player?.is_cursor_blueprint() || !global.bp_count || !global.original_bp)
    return
  const bp = player.cursor_stack!
  global.bp_count = Math.max(1, diff + global.bp_count)

  bp.label = `x${global.bp_count}`

  const size = bp_size(global.original_bp)
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
