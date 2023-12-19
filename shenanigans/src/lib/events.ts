/* eslint-disable ts/no-unsafe-argument */
import type { CustomInputPrototype } from 'factorio:prototype'
import type { CustomInputEvent, EventId, NthTickEventData } from 'factorio:runtime'

export type eventMap = {
  [K in keyof typeof defines.events
  as K extends `on_${infer N}` ? N : K
  ]: typeof defines.events[K]
}
export type eventName = keyof eventMap
export type eventListenerMap = {
  [E in eventName]: (data: eventMap[E]['_eventData']) => void
}

class ScriptEmitter {
  listeners: { [E in eventName]?: ((data: any) => void)[] } = {}
  on<E extends eventName>(
    event: E,
    handler: (data: eventMap[E]['_eventData']) => void,
  ) {
    const eventId = defines.events[`on_${event}` as 'on_tick'] ?? event as never as EventId<any>
    const oldList = this.listeners[event]
    if (!oldList) {
      this.listeners[event] = [handler]
      script.on_event(eventId, handler as any)
    }
    else {
      oldList.push(handler)
      script.on_event(eventId, (event) => {
        for (let i = 0; i < oldList.length; i++)
          oldList[i](event)
      })
    }
  }

  on_custom(event: customEventName, listener: (data: CustomInputEvent) => void) {
    return this.on(event as any, listener)
  }

  off() {
    throw new Error('not implemented')
  }

  on_tick(tick: number, handler: (data: NthTickEventData) => void) {
    script.on_nth_tick(tick, handler)
  }
}

declare global {
  interface CustomEventMap {}
  type customEventName = [keyof CustomEventMap] extends [never] ? string : keyof CustomEventMap
}

export const Script = new ScriptEmitter()

type Writeable<T> = { -readonly[K in keyof T]: T[K] }

type MyCustomInput = Partial<Writeable<CustomInputPrototype>> & (
  | { name: customEventName; key_sequence: string }
  | { name: customEventName; linked_game_control: Required<CustomInputPrototype>['linked_game_control'] }
)

export function addCustomInputs(prototypes: readonly MyCustomInput[]) {
  data.extend<CustomInputPrototype>(prototypes.map<CustomInputPrototype>((p) => {
    p.type = 'custom-input'
    if (p.linked_game_control)
      p.key_sequence ??= ''
    return p as CustomInputPrototype
  }))
}
