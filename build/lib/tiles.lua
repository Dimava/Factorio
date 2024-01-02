local ____exports = {}
local ____misc = require("lib.misc")
local logs = ____misc.logs
function ____exports.tilesArea(left_top, right_bottom, name)
    local a = {}
    do
        local x = left_top.x
        while x <= right_bottom.x do
            do
                local y = left_top.y
                while y <= right_bottom.y do
                    a[#a + 1] = {name = name, position = {x = x, y = y}}
                    y = y + 1
                end
            end
            x = x + 1
        end
    end
    logs(#a)
    return a
end
return ____exports
