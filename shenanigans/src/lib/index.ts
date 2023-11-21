import type { EventId } from 'factorio:runtime'

type EventNameMap = {
  [K in keyof typeof defines.events
  as K extends `on_${infer E}` ? E : K
  ]: K
}
type EventDataMap = {
  [K in keyof typeof defines.events
  as K extends `on_${infer E}` ? E : K
  ]: typeof defines.events[K] extends EventId<infer D, any> ? D : never
}

export class Script {
  static eventMap: Record<string, Function[]> = {}

  static on<E extends keyof EventNameMap>(
    event: E,
    handler: (data: EventDataMap[E]) => void,
    _filter?: never,
  ) {
    const eventId = event.startsWith('script') ? defines.events[event as never] : defines.events[`on_${event}` as never]
    const handlers = this.eventMap[event] ??= []
    handlers.push(handler)
    if (handlers.length === 1)
      script.on_event(eventId, handler)
    else if (handlers.length === 2)
      script.on_event(eventId, (data) => { for (const h of handlers) h(data) })
  }
}
