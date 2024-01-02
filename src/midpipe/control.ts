import { Script } from '../lib'
import { Pos, logs } from '../lib/misc'

declare const global: {
  pipe_lookup: Record<string, { pipe: string; upipe: string; pipe_item: string }>
}

Script.on('built_entity', (event) => {
  return
  const upipe = event.created_entity
  const isGhost = upipe.type === 'entity-ghost'
  const utype = !isGhost ? upipe.type : upipe.ghost_type
  const uname = !isGhost ? upipe.name : upipe.ghost_name
  const upos = Pos.from(upipe.position)
  if (utype !== 'pipe-to-ground')
    return
  if (!global.pipe_lookup[uname])
    return logs(`pipe for ${uname} not found`)
  logs('caught', uname, 'placed at', upos)

  const lookup = global.pipe_lookup[uname]

  const surface = upipe.surface

  const ppos = upos.add(Pos.north.rotate8(upipe.direction))

  const canPlaceGhost = surface.can_place_entity({
    name: lookup.pipe,
    position: ppos,
    build_check_type: defines.build_check_type.manual_ghost,
  })
  if (!canPlaceGhost)
    return logs(`cant place ${lookup.pipe} at`, ppos)
  logs(`can place ${lookup.pipe} at`, ppos)
  surface.create_entity({
    name: lookup.pipe,
    position: ppos,
    text: 'placed pipe',
    player_index: event.player_index,
    render_player_index: event.player_index,
  })
})

function rebuild_lookup() {
  const recipes = game.get_filtered_recipe_prototypes([{
    filter: 'has-product-item',
    elem_filters: [{
      filter: 'place-result',
      elem_filters: [{
        filter: 'type',
        type: 'pipe-to-ground',
      }],
    }],
  }, {
    mode: 'and',
    filter: 'has-ingredient-item',
    elem_filters: [{
      filter: 'place-result',
      elem_filters: [{
        filter: 'type',
        type: 'pipe',
      }],
    }],
  }])
  function itemNameToEntity(name: string) {
    const item = game.item_prototypes[name].place_result?.name
    return item == null ? null : game.entity_prototypes[item]
  }
  global.pipe_lookup = {}
  for (const [_, rec] of recipes) {
    const pipe = rec.ingredients.find(e => itemNameToEntity(e.name)?.type === 'pipe')
    const upipe = rec.products.find(e => itemNameToEntity(e.name)?.type === 'pipe-to-ground')
    if (!pipe || !upipe)
      continue
    global.pipe_lookup[itemNameToEntity(upipe.name)!.name] = {
      pipe: itemNameToEntity(pipe.name)!.name,
      pipe_item: pipe.name,
      upipe: itemNameToEntity(upipe.name)!.name,
    }
  }
  logs(global.pipe_lookup)
}

script.on_init(rebuild_lookup)
script.on_configuration_changed(rebuild_lookup)
