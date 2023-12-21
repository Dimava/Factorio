import type { CustomInputPrototype } from 'factorio:prototype'
import { addCustomInputs } from '../lib/events'

declare global {
  interface CustomEventMap {
    'dish-PAGEUP': true
    'dish-PAGEDOWN': true
    'dish-SHIFT-R': true
  }
}

addCustomInputs([{
  name: 'dish-PAGEUP',
  key_sequence: 'PAGEUP',
}, {
  name: 'dish-PAGEDOWN',
  key_sequence: 'PAGEDOWN',
}, {
  name: 'dish-SHIFT-R',
  key_sequence: 'SHIFT + R',
}])
