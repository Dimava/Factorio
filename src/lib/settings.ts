import type { BoolSettingDefinition } from 'factorio:settings'

import { modList } from './mod-list'

for (const mod of modList) {
  if (mod === 'lib')
    continue
  data.extend<BoolSettingDefinition>([{
    type: 'bool-setting',
    name: `dish-enable-${mod}`,
    localized_name: `Enable ${mod} submod`,
    default_value: false,
    setting_type: 'startup',
  }])
}
