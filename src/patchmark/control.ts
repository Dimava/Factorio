import type { CustomInputEvent, LuaEntity } from 'factorio:runtime'
import { Script } from '../lib/events'
import { Pos, logs } from '../lib/misc'

Script.on_custom('dish-whatever', (event) => {
  logs('whatever')
  whatever(event)
})

function whatever(event: CustomInputEvent) {
  const player = game.get_player(event.player_index)!
  const pos = Pos.of(player)
  logs({ pos })
  const chunk = pos.tileToChunk()
  logs({ chunk })
  const ee = player.surface.find_entities_filtered({
    area: chunk.widen(16),
    type: 'resource',
  })
  logs(...ee)

  const o: Record<string, LuaEntity> = {}
  for (const e of ee) {
    const key = `${e.position.x},${e.position.y}`
    o[key] = e
  }
  logs(o)
}
