import { Script } from '../lib/events'
import { logs } from '../lib/misc'

Script.on('player_selected_area', (event) => {
  logs(event.name)
  if (event.item !== 'dish-dupebox-selector')
    return
//   event.surface.set_tiles([{
//     name: ''
//   }])
//   'hazard-concrete'
//   logs(event.area.left_top.x)
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
