import jetpack from 'fs-jetpack'

let jp = jetpack
while (!jp.exists('package.json')) jp = jp.cwd('..')
const jpSrc = jp.cwd('src')

jp.dir('build')
jp.list('build').map(e => jp.cwd('build').remove(e))

const fileMapping = {
  'settings.lua': ['**/settings.ts', '**/settings/index.ts'],
  'settings-updates.lua': ['**/settings-updates.ts', '**/settings/updates.ts'],
  'settings-final-fixes': ['**/settings-final-fixes.ts', '**/settings/final-fixes.ts'],
  'data.lua': ['**/data.ts', '**/data/index.ts'],
  'data-updates.lua': ['**/data-updates.ts', '**/data/updates.ts'],
  'data-final-fixes': ['**/data/final-fixes.ts', '**/data/final-fixes.ts'],
  'control.lua': ['**/control.ts', '**/control/index.ts'],
}

let modList
= Object.entries(fileMapping)
  .flatMap(([_lua, matching]) => {
    return jpSrc.find({ matching }).map(e => e.split(/[\\/]/)[0])
  })
modList = Array.from(new Set(modList)).sort()
console.log({ modList })

jp.write('src/lib/mod-list.ts', `export const modList = [
${
  modList.map(e => `  '${e}',`).join('\n')
}
]`)

for (const [lua, matching] of Object.entries(fileMapping)) {
  const matches = jpSrc.find({ matching })
  console.log(lua, matching, matches)
  if (matches.length) {
    jp.cwd('build').write(
      lua,
      `--[[ This is code-generated file, don\'t edit. *--]]
local cr = require('lib/conditional-require').crequire
${
      matches
        .map(e => e.replaceAll('\\', '/').replace(/\.ts$/, ''))
        .map((e) => {
          const modname = e.split(/[\\/]/)[0]
          return `cr('${e}', '${modname}', '${lua.split(/\.|-/)[0]}')`
        }).join('\n')}`,
    )
  }
}

jp.copy('public/info.json', 'build/info.json', { overwrite: true })
