import type { LuaEntity } from 'factorio:runtime'

export function logs(...a: any[]) {
  game.print(a.map((e) => {
    if (typeof e === 'string')
      return e
    if (type(e) === 'table' && 'object_name' in e) {
      const v = e as LuaEntity
      return `${v.object_name}{name:${v.name},pos:${serpent.line(v.position)}}`
    }
    return serpent.line(e)
  }).join(' '))
}

declare global {
  interface PosLike { readonly x: number; readonly y: number }
}
export class Pos {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x; this.y = y
  }

  static from(pos: PosLike) {
    return new Pos(pos.x, pos.y)
  }

  rotate8(angle: number) {
    if (angle < 0 || angle > 8)
      angle = (angle % 8 + 8) % 8
    if (angle % 2 === 1)
      error('unsupported angle')
    if (angle === 2)
      return new Pos(-this.y, this.x)
    if (angle === 4)
      return new Pos(-this.x, -this.y)
    if (angle === 6)
      return new Pos(this.y, -this.x)
    return new Pos(this.x, this.y)
  }

  add(x: number, y: number): Pos
  add(pos: PosLike): Pos
  add(x: number | PosLike, y?: number): Pos {
    if (typeof x === 'number')
      return new Pos(this.x + x, this.y + y!)
    return new Pos(this.x + x.x, this.y + x.y)
  }

  sub(x: number, y: number): Pos
  sub(pos: PosLike): Pos
  sub(x: number | PosLike, y?: number): Pos {
    if (typeof x === 'number')
      return new Pos(this.x - x, this.y - y!)
    return new Pos(this.x - x.x, this.y - x.y)
  }

  setX(x: number): Pos
  setX(pos: PosLike): Pos
  setX(x: number | PosLike): Pos {
    return new Pos(typeof x === 'number' ? x : x.x, this.y)
  }

  setY(y: number): Pos
  setY(pos: PosLike): Pos
  setY(y: number | PosLike): Pos {
    return new Pos(this.x, typeof y === 'number' ? y : y.y)
  }

  round(): Pos {
    return new Pos(Math.round(this.x), Math.round(this.y))
  }

  floor(): Pos {
    return new Pos(Math.floor(this.x), Math.floor(this.y))
  }

  ceil(): Pos {
    return new Pos(Math.ceil(this.x), Math.ceil(this.y))
  }

  static get north() {
    return new Pos(0, -1)
  }
}

export function range(min: number, max: number): number[] {
  const a = []
  for (let x = min; x <= max; x++) a.push(x)
  return a
}
