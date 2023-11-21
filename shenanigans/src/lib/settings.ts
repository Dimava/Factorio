import type { BoolSettingDefinition } from 'factorio:settings'
import type { CustomInputPrototype } from 'factorio:prototype'
import { modList } from './mod-list'

for (const mod of modList) {
  if (mod === 'lib')
    continue
  data.extend<BoolSettingDefinition>([{
    type: 'bool-setting',
    name: `dish-enable-${mod}`,
    default_value: false,
    setting_type: 'startup',
  }])
}
