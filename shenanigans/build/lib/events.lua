local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local ____exports = {}
local ScriptEmitter = __TS__Class()
ScriptEmitter.name = "ScriptEmitter"
function ScriptEmitter.prototype.____constructor(self)
    self.listeners = {}
end
function ScriptEmitter.prototype.on(self, event, handler)
    local eventId = defines.events["on_" .. event] or event
    local oldList = self.listeners[event]
    if not oldList then
        self.listeners[event] = {handler}
        script.on_event(eventId, handler)
    else
        oldList[#oldList + 1] = handler
        script.on_event(
            eventId,
            function(event)
                do
                    local i = 0
                    while i < #oldList do
                        oldList[i + 1](event)
                        i = i + 1
                    end
                end
            end
        )
    end
end
function ScriptEmitter.prototype.on_custom(self, event, listener)
    return self:on(event, listener)
end
function ScriptEmitter.prototype.off(self)
    error(
        __TS__New(Error, "not implemented"),
        0
    )
end
function ScriptEmitter.prototype.on_tick(self, tick, handler)
    script.on_nth_tick(tick, handler)
end
____exports.Script = __TS__New(ScriptEmitter)
function ____exports.addCustomInputs(prototypes)
    data:extend(__TS__ArrayMap(
        prototypes,
        function(____, p)
            p.type = "custom-input"
            if p.linked_game_control then
                if p.key_sequence == nil then
                    p.key_sequence = ""
                end
            end
            return p
        end
    ))
end
return ____exports
