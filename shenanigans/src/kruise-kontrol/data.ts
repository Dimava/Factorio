import { addCustomInputs } from '../lib/events'

declare global {
  interface CustomEventMap {
    'dish-kruise-run': true
    'dish-kruise-queue': true
    'dish-kruise-cancel-W': true
    'dish-kruise-cancel-A': true
    'dish-kruise-cancel-S': true
    'dish-kruise-cancel-D': true
    'dish-kruise-cancel-Train': true
  }
}
addCustomInputs([{
  name: 'dish-kruise-run',
  key_sequence: 'mouse-button-3',
}, {
  name: 'dish-kruise-queue',
  key_sequence: 'SHIFT + mouse-button-3',
}, {
  name: 'dish-kruise-cancel-W',
  linked_game_control: 'move-up',
}, {
  name: 'dish-kruise-cancel-A',
  linked_game_control: 'move-left',
}, {
  name: 'dish-kruise-cancel-S',
  linked_game_control: 'move-down',
}, {
  name: 'dish-kruise-cancel-D',
  linked_game_control: 'move-right',
}, {
  name: 'dish-kruise-cancel-Train',
  linked_game_control: 'connect-train',
}])
