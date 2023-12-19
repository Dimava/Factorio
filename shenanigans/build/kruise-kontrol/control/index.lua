local ____lualib = require("lualib_bundle")
local __TS__ArrayAt = ____lualib.__TS__ArrayAt
local ____exports = {}
local logs
local ____events = require("lib.events")
local Script = ____events.Script
function logs(s)
    game.print(s)
end
local queue = {}
Script:on(
    "tick",
    function()
        local action = __TS__ArrayAt(queue, -1)
        if not action then
            return
        end
        if action.type == "move-to-point" then
        end
    end
)
Script:on_custom(
    "dish-kruise-run",
    function(event)
        return
    end
)
return ____exports
