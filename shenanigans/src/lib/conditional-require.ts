export function crequire(fname: string, mod: string, stage: 'settings' | 'data' | 'control') {
  if (mod === 'lib') {
    // eslint-disable-next-line ts/no-unsafe-return, ts/no-require-imports
    return require(fname)
  }
  if (stage === 'settings') {
    // eslint-disable-next-line ts/no-unsafe-return, ts/no-require-imports
    return require(fname)
  }
  if (settings.startup[`dish-enable-${mod}`].value) {
    // eslint-disable-next-line ts/no-unsafe-return, ts/no-require-imports
    return require(fname)
  }
}
