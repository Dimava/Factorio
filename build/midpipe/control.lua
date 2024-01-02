local ____lualib = require("lualib_bundle")
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local ____exports = {}
local ____lib = require("lib.index")
local Script = ____lib.Script
local ____misc = require("lib.misc")
local Pos = ____misc.Pos
local logs = ____misc.logs
Script:on(
    "built_entity",
    function(event)
        return
    end
)
local function rebuild_lookup()
    local recipes = game.get_filtered_recipe_prototypes({{filter = "has-product-item", elem_filters = {{filter = "place-result", elem_filters = {{filter = "type", type = "pipe-to-ground"}}}}}, {mode = "and", filter = "has-ingredient-item", elem_filters = {{filter = "place-result", elem_filters = {{filter = "type", type = "pipe"}}}}}})
    local function itemNameToEntity(name)
        local ____opt_0 = game.item_prototypes[name].place_result
        local item = ____opt_0 and ____opt_0.name
        local ____temp_2
        if item == nil then
            ____temp_2 = nil
        else
            ____temp_2 = game.entity_prototypes[item]
        end
        return ____temp_2
    end
    global.pipe_lookup = {}
    for _, rec in pairs(recipes) do
        do
            local pipe = __TS__ArrayFind(
                rec.ingredients,
                function(____, e)
                    local ____opt_3 = itemNameToEntity(e.name)
                    return (____opt_3 and ____opt_3.type) == "pipe"
                end
            )
            local upipe = __TS__ArrayFind(
                rec.products,
                function(____, e)
                    local ____opt_5 = itemNameToEntity(e.name)
                    return (____opt_5 and ____opt_5.type) == "pipe-to-ground"
                end
            )
            if not pipe or not upipe then
                goto __continue8
            end
            global.pipe_lookup[itemNameToEntity(upipe.name).name] = {
                pipe = itemNameToEntity(pipe.name).name,
                pipe_item = pipe.name,
                upipe = itemNameToEntity(upipe.name).name
            }
        end
        ::__continue8::
    end
    logs(global.pipe_lookup)
end
script.on_init(rebuild_lookup)
script.on_configuration_changed(rebuild_lookup)
return ____exports
