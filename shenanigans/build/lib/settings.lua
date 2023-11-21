local ____exports = {}
local ____mod_2Dlist = require("lib.mod-list")
local modList = ____mod_2Dlist.modList
for ____, mod in ipairs(modList) do
    do
        if mod == "lib" then
            goto __continue2
        end
        data:extend({{type = "bool-setting", name = "dish-enable-" .. mod, default_value = false, setting_type = "startup"}})
    end
    ::__continue2::
end
return ____exports
