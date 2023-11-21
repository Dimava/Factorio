import { Script } from '../lib'

declare const global: {
  pipe_lookup: Record<string, { pipe: string; upipe: string; pipe_item: string }>
}

Script.on('built_entity', (event) => {
  event.created_entity.clone({
    position: {
      x: event.created_entity.position.x,
      y: event.created_entity.position.y - 8,
    },
  })
  game.print(event.created_entity.name)

  const ghost = event.created_entity.name === 'entity-ghost'
  const uname = ghost ? event.created_entity.ghost_name : event.created_entity.name
  const lookup = global.pipe_lookup[uname]
  log({ ghost, uname, lookup })
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
  function itemNameToEntoty(name: string) {
    const item = game.item_prototypes[name].place_result?.name
    return item == null ? null : game.entity_prototypes[item]
  }
  global.pipe_lookup = {}
  for (const [_, rec] of recipes) {
    const pipe = rec.ingredients.find(e => itemNameToEntoty(e.name)?.type === 'pipe')
    const upipe = rec.products.find(e => itemNameToEntoty(e.name)?.type === 'pipe-to-ground')
    if (!pipe || !upipe)
      continue
    global.pipe_lookup[itemNameToEntoty(upipe.name)!.name] = {
      pipe: itemNameToEntoty(pipe.name)!.name,
      pipe_item: pipe.name,
      upipe: itemNameToEntoty(upipe.name)!.name,
    }
  }
}

script.on_init(rebuild_lookup)
script.on_configuration_changed(rebuild_lookup)

function log(s: any) {
  game.print(serpent.line(s))
}
