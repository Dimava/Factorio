import { Script } from '../lib/events'
import { Pos, logs, range } from '../lib/misc'
import { tilesArea } from '../lib/tiles'

Script.on('player_selected_area', (event) => {
  logs(event.name)
  if (event.item !== 'dish-dupebox-selector')
    return
  const { surface, player_index } = event
  const { force } = game.get_player(player_index)!

  const lt = Pos.from(event.area.left_top).floor()
  const rb = Pos.from(event.area.right_bottom).floor()
  logs({ lt, rb })

  event.surface.set_tiles(tilesArea(lt, rb.setX(lt), 'hazard-concrete-right'))
  event.surface.set_tiles(tilesArea(lt.add(1, 0), rb.setY(lt).sub(1, 0), 'hazard-concrete-right'))
  event.surface.set_tiles(tilesArea(lt.setX(rb), rb, 'hazard-concrete-right'))
  event.surface.set_tiles(tilesArea(lt.setY(rb).add(1, 0), rb.sub(1, 0), 'hazard-concrete-right'))

  const gate_poss = range(lt.y + 1, rb.y - 1).flatMap(y => [[lt.x, y], [rb.x, y]] as const)
  const gate2_poss = range(lt.x + 1, rb.x - 1).flatMap(x => [[x, lt.y], [x, rb.y]] as const)
  const place = [
    ...gate_poss.map(p => ({ position: p })),
    ...gate2_poss.map(p => ({ position: p, direction: 2 })),
  ]

  for (const ent of place) {
    const e = surface.create_entity({
      ...ent,
      name: 'gate',
      force,
    })!
    e.minable = false
  }
  for (const angle of [lt, rb, lt.setX(rb), lt.setY(rb)]) {
    const e = surface.create_entity({
      position: angle,
      name: 'stone-wall',
      force,
    })!
    e.minable = false
  }
})

Script.on_custom('dish-PAGEDOWN', (event) => {
  game.print(123)
  logs(1)
  const p = game.get_player(event.player_index)!
  logs(2)
  if (p.cursor_stack && p.cursor_stack.count > 0)
    return game.get_player(event.player_index)!.opened = game.player?.cursor_stack
  logs(3)
  p.cursor_stack!.set_stack('dish-dupebox-selector')
})

Script.on('gui_opened', (event) => {
  logs(event)
  const player = game.get_player(event.player_index)!
  logs(player.selected)
})
