export function logs(...a: any[]) {
  game.print(a.map(e => typeof e === 'string' ? e : serpent.line(e)).join(' '))
}

interface PosLike { readonly x: number; readonly y: number }
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

  static get north() {
    return new Pos(0, -1)
  }
}
