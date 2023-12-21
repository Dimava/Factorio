local ____exports = {}
local ____events = require("lib.events")
local Script = ____events.Script
local ____misc = require("lib.misc")
local logs = ____misc.logs
Script:on(
    "player_selected_area",
    function(event)
        logs(event.name)
        if event.item ~= "dish-dupebox-selector" then
            return
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
            local ____game_get_player_result_2 = game.get_player(event.player_index)
            local ____opt_0 = game.player
            local ____temp_3 = ____opt_0 and ____opt_0.cursor_stack
            ____game_get_player_result_2.opened = ____temp_3
            return ____temp_3
        end
        logs(3)
        p.cursor_stack.set_stack("dish-dupebox-selector")
    end
)
return ____exports
