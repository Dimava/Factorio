import type { CustomInputPrototype } from 'factorio:prototype'

data.extend<CustomInputPrototype>([{
  type: 'custom-input',
  key_sequence: 'PAGEUP',
  name: 'dish-PAGEUP',
}])

data.extend<CustomInputPrototype>([{
  type: 'custom-input',
  key_sequence: 'PAGEDOWN',
  name: 'dish-PAGEDOWN',
}])

data.extend<CustomInputPrototype>([{
  type: 'custom-input',
  key_sequence: 'SHIFT + R',
  name: 'dish-SHIFT-R',
}])
