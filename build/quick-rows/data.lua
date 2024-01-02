local ____exports = {}
local ____events = require("lib.events")
local addCustomInputs = ____events.addCustomInputs
addCustomInputs({{name = "dish-PAGEUP", key_sequence = "PAGEUP"}, {name = "dish-PAGEDOWN", key_sequence = "PAGEDOWN"}, {name = "dish-SHIFT-R", key_sequence = "SHIFT + R"}})
return ____exports
