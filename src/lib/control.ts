script.on_event('dish-reload-control', () => {
  game.print('Reloading scripts...')
  game.reload_mods()
})
