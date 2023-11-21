local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local ____exports = {}
____exports.Script = __TS__Class()
local Script = ____exports.Script
Script.name = "Script"
function Script.prototype.____constructor(self)
end
function Script.on(self, event, handler, _filter)
    local ____event_startsWith_result_0
    if __TS__StringStartsWith(event, "script") then
        ____event_startsWith_result_0 = defines.events[event]
    else
        ____event_startsWith_result_0 = defines.events["on_" .. event]
    end
    local eventId = ____event_startsWith_result_0
    local ____self_eventMap_1, ____event_2 = self.eventMap, event
    if ____self_eventMap_1[____event_2] == nil then
        ____self_eventMap_1[____event_2] = {}
    end
    local handlers = self.eventMap[event]
    handlers[#handlers + 1] = handler
    if #handlers == 1 then
        script.on_event(eventId, handler)
    elseif #handlers == 2 then
        script.on_event(
            eventId,
            function(data)
                for ____, h in ipairs(handlers) do
                    h(data)
                end
            end
        )
    end
end
Script.eventMap = {}
return ____exports
