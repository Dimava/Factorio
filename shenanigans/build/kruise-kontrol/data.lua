local ____exports = {}
local ____events = require("lib.events")
local addCustomInputs = ____events.addCustomInputs
addCustomInputs({
    {name = "dish-kruise-run", key_sequence = "mouse-button-3"},
    {name = "dish-kruise-queue", key_sequence = "SHIFT + mouse-button-3"},
    {name = "dish-kruise-cancel-W", linked_game_control = "move-up"},
    {name = "dish-kruise-cancel-A", linked_game_control = "move-left"},
    {name = "dish-kruise-cancel-S", linked_game_control = "move-down"},
    {name = "dish-kruise-cancel-D", linked_game_control = "move-right"},
    {name = "dish-kruise-cancel-Train", linked_game_control = "connect-train"}
})
return ____exports
