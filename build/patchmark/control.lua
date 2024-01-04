local ____exports = {}
local whatever
local ____events = require("lib.events")
local Script = ____events.Script
local ____misc = require("lib.misc")
local Pos = ____misc.Pos
local logs = ____misc.logs
function whatever(event)
    local player = game.get_player(event.player_index)
    local pos = Pos:of(player)
    logs({pos = pos})
    local chunk = pos:tileToChunk()
    logs({chunk = chunk})
    local ee = player.surface.find_entities_filtered({
        area = chunk:widen(16),
        type = "resource"
    })
    logs(unpack(ee))
    local o = {}
    for ____, e in ipairs(ee) do
        local key = (tostring(e.position.x) .. ",") .. tostring(e.position.y)
        o[key] = e
    end
    logs(o)
end
Script:on_custom(
    "dish-whatever",
    function(event)
        logs("whatever")
        whatever(event)
    end
)
return ____exports
