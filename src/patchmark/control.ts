import type { CustomInputEvent } from 'factorio:runtime'
import { Script } from '../lib/events'

Script.on_custom('dish-whatever', (event) => {
  whatever(event)
})

function whatever(event: CustomInputEvent) {
  const player = game.get_player(event.player_index)!
  const { surface } = player
  const e = surface.create_entity({
    name: '',
    position: [0, 0],
  })
  e?.name
  const a: 'a' | 'b' = 'a' as any
  if (a == '') {

  }
}
