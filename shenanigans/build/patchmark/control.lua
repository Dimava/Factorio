local ____exports = {}
local whatever
local ____events = require("lib.events")
local Script = ____events.Script
function whatever(event)
    local player = game.get_player(event.player_index)
    local surface = player.surface
    local e = surface.create_entity({name = "", position = {0, 0}})
    if e ~= nil then
        local ____ = e.name
    end
    local a = "a"
    if a == "" then
    end
end
Script:on_custom(
    "dish-whatever",
    function(event)
        whatever(event)
    end
)
return ____exports
