import type { CustomInputPrototype } from 'factorio:prototype'

data.extend<CustomInputPrototype>([{
  type: 'custom-input',
  key_sequence: 'INSERT',
  name: 'dish-reload-control',
}])

data.extend<CustomInputPrototype>([{
  type: 'custom-input',
  key_sequence: 'CONTROL + INSERT',
  name: 'dish-whatever',
}])

declare global {
  interface CustomEventMap {
    'dish-reload-control': true
    'dish-whatever': true
  }
}
