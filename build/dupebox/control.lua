local ____lualib = require("lualib_bundle")
local __TS__ArrayFlatMap = ____lualib.__TS__ArrayFlatMap
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____events = require("lib.events")
local Script = ____events.Script
local ____misc = require("lib.misc")
local Pos = ____misc.Pos
local logs = ____misc.logs
local range = ____misc.range
local ____tiles = require("lib.tiles")
local tilesArea = ____tiles.tilesArea
Script:on(
    "player_selected_area",
    function(event)
        logs(event.name)
        if event.item ~= "dish-dupebox-selector" then
            return
        end
        local ____event_0 = event
        local surface = ____event_0.surface
        local player_index = ____event_0.player_index
        local ____game_get_player_result_1 = game.get_player(player_index)
        local force = ____game_get_player_result_1.force
        local lt = Pos:from(event.area.left_top).floor()
        local rb = Pos:from(event.area.right_bottom).floor()
        logs({lt = lt, rb = rb})
        event.surface.set_tiles(tilesArea(
            lt,
            rb.setX(lt),
            "hazard-concrete-right"
        ))
        event.surface.set_tiles(tilesArea(
            lt.add(1, 0),
            rb.setY(lt).sub(1, 0),
            "hazard-concrete-right"
        ))
        event.surface.set_tiles(tilesArea(
            lt.setX(rb),
            rb,
            "hazard-concrete-right"
        ))
        event.surface.set_tiles(tilesArea(
            lt.setY(rb).add(1, 0),
            rb.sub(1, 0),
            "hazard-concrete-right"
        ))
        local gate_poss = __TS__ArrayFlatMap(
            range(lt.y + 1, rb.y - 1),
            function(____, y) return {{lt.x, y}, {rb.x, y}} end
        )
        local gate2_poss = __TS__ArrayFlatMap(
            range(lt.x + 1, rb.x - 1),
            function(____, x) return {{x, lt.y}, {x, rb.y}} end
        )
        local ____array_2 = __TS__SparseArrayNew(unpack(__TS__ArrayMap(
            gate_poss,
            function(____, p) return {position = p} end
        )))
        __TS__SparseArrayPush(
            ____array_2,
            unpack(__TS__ArrayMap(
                gate2_poss,
                function(____, p) return {position = p, direction = 2} end
            ))
        )
        local place = {__TS__SparseArraySpread(____array_2)}
        for ____, ent in ipairs(place) do
            local e = surface.create_entity(__TS__ObjectAssign({}, ent, {name = "gate", force = force}))
            e.minable = false
        end
        for ____, angle in ipairs({
            lt,
            rb,
            lt.setX(rb),
            lt.setY(rb)
        }) do
            local e = surface.create_entity({position = angle, name = "stone-wall", force = force})
            e.minable = false
        end
    end
)
Script:on_custom(
    "dish-PAGEDOWN",
    function(event)
        game.print(123)
        logs(1)
        local p = game.get_player(event.player_index)
        logs(2)
        if p.cursor_stack and p.cursor_stack.count > 0 then
            local ____game_get_player_result_5 = game.get_player(event.player_index)
            local ____opt_3 = game.player
            local ____temp_6 = ____opt_3 and ____opt_3.cursor_stack
            ____game_get_player_result_5.opened = ____temp_6
            return ____temp_6
        end
        logs(3)
        p.cursor_stack.set_stack("dish-dupebox-selector")
    end
)
Script:on(
    "gui_opened",
    function(event)
        logs(event)
        local player = game.get_player(event.player_index)
        logs(player.selected)
    end
)
return ____exports
