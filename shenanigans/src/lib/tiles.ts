import type { TileWrite } from 'factorio:runtime'
import { logs } from './misc'

export function tilesArea(left_top: PosLike, right_bottom: PosLike, name: string) {
  const a: TileWrite[] = []
  for (let x = left_top.x; x <= right_bottom.x; x++) {
    for (let y = left_top.y; y <= right_bottom.y; y++)
      a.push({ name, position: { x, y } })
  }
  logs(a.length)
  return a
}
