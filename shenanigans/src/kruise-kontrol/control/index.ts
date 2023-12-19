import type { MapPosition } from 'factorio:runtime'
import { Script } from '../../lib/events'

interface TaskBase {
  type: string
}
interface MoveToPointTask extends TaskBase {
  type: 'move-to-point'
  target: MapPosition
}
type Task = MoveToPointTask

let queue: Task[] = []

Script.on('tick', () => {
  const action = queue.at(-1)
  if (!action)
    return
  if (action.type === 'move-to-point') {

  }
})

Script.on_custom('dish-kruise-run', (event) => {
  return
  const player = game.get_player(event.player_index)!
  if (!player.selected) {
    logs('nothing selected, moving to target')
    queue = [{
      type: 'move-to-point',
      target: event.cursor_position,
    }]
  }
})

function logs(s: string) {
  game.print(s)
}
