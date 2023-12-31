local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFlat = ____lualib.__TS__ArrayFlat
local ____exports = {}
local reassign_stack_if_needed, change_bp_count, bp_size
local ____events = require("lib.events")
local Script = ____events.Script
function reassign_stack_if_needed(event)
    local player = game.get_player(event.player_index)
    if not (player and player.is_cursor_blueprint()) then
        return
    end
    local bp = player.cursor_stack
    if not bp.label then
        global.bp_count = 1
        global.original_bp = bp.get_blueprint_entities()
    end
end
function change_bp_count(event, diff)
    local player = game.get_player(event.player_index)
    if not (player and player.is_cursor_blueprint()) or not global.bp_count or not global.original_bp then
        return
    end
    local bp = player.cursor_stack
    global.bp_count = math.max(1, diff + global.bp_count)
    bp.label = "x" .. tostring(global.bp_count)
    local size = bp_size(global.original_bp)
    local delta = {x = not global.bp_direction and size.size.x or 0, y = global.bp_direction and size.size.y or 0}
    local moved = __TS__ArrayFlat(__TS__ArrayFrom(
        {length = global.bp_count},
        function(____, _, i)
            return __TS__ArrayMap(
                global.original_bp,
                function(____, e)
                    return __TS__ObjectAssign({}, e, {position = {x = e.position.x + i * delta.x - size.top_left.x, y = e.position.y + i * delta.y - size.top_left.y}})
                end
            )
        end
    ))
    bp.set_blueprint_entities(moved)
    bp.blueprint_snap_to_grid = size.size
end
function bp_size(entities)
    local x1 = math.min(unpack(__TS__ArrayMap(
        entities,
        function(____, e) return e.position.x - game.entity_prototypes[e.name].tile_width / 2 end
    )))
    local x2 = math.max(unpack(__TS__ArrayMap(
        entities,
        function(____, e) return e.position.x + game.entity_prototypes[e.name].tile_width / 2 end
    )))
    local y1 = math.min(unpack(__TS__ArrayMap(
        entities,
        function(____, e) return e.position.y - game.entity_prototypes[e.name].tile_height / 2 end
    )))
    local y2 = math.max(unpack(__TS__ArrayMap(
        entities,
        function(____, e) return e.position.y + game.entity_prototypes[e.name].tile_height / 2 end
    )))
    return {top_left = {x = x1, y = y1}, bottom_right = {x = x2, y = y2}, center = {x = (x1 + x2) / 2, y = (y1 + y2) / 2}, size = {x = x2 - x1, y = y2 - y1}}
end
Script:on_custom(
    "dish-PAGEUP",
    function(event)
        reassign_stack_if_needed(event)
        change_bp_count(event, 1)
    end
)
Script:on_custom(
    "dish-PAGEDOWN",
    function(event)
        reassign_stack_if_needed(event)
        change_bp_count(event, -1)
    end
)
Script:on_custom(
    "dish-SHIFT-R",
    function(event)
        reassign_stack_if_needed(event)
        global.bp_direction = not global.bp_direction
        change_bp_count(event, 0)
    end
)
return ____exports
