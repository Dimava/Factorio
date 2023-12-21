local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
data:extend({{type = "train-stop", name = "dish-dupebox-stop", animation_ticks_per_frame = 1}})
data:extend({__TS__ObjectAssign({}, data.raw.blueprint.blueprint, {
    type = "selection-tool",
    name = "dish-dupebox-selector",
    stack_size = 1,
    selection_color = {1, 0.5, 0},
    selection_cursor_box_type = "pair",
    selection_mode = {"any-tile", "blueprint"},
    always_include_tiles = true,
    alt_selection_color = {1, 0.5, 0},
    alt_selection_cursor_box_type = "pair",
    alt_selection_mode = {"any-tile"},
    flags = {"always-show", "not-stackable"}
})})
return ____exports
