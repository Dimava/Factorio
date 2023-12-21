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
    local ____temp_0
    if type(event) ~= "string" then
        ____temp_0 = event
    else
        ____temp_0 = defines.events["on_" .. event] or defines.events[event] or event
    end
    local eventId = ____temp_0
    local ____self_listeners_1, ____event_2 = self.listeners, event
    if ____self_listeners_1[____event_2] == nil then
        ____self_listeners_1[____event_2] = {}
    end
    local list = self.listeners[event]
    list[#list + 1] = handler
    script.on_event(
        eventId,
        function(ev)
            do
                local i = 0
                while i < #list do
                    list[i + 1](ev)
                    i = i + 1
                end
            end
        end
    )
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
