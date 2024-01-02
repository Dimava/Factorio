local ____exports = {}
local isLandfill
function isLandfill(item)
    local ____opt_2 = data.raw.item.landfill
    local ____opt_0 = ____opt_2 and ____opt_2.place_as_tile
    local landfillCondition = ____opt_0 and ____opt_0.condition
    local ____opt_4 = item.place_as_tile
    local itemCondition = ____opt_4 and ____opt_4.condition
    if not landfillCondition then
        return not itemCondition
    end
    if #landfillCondition ~= (itemCondition and #itemCondition) then
        return false
    end
    do
        local i = 0
        while i < #landfillCondition do
            if landfillCondition[i + 1] ~= itemCondition[i + 1] then
                return false
            end
            i = i + 1
        end
    end
    return true
end
local mined_sound = {
    {filename = "__core__/sound/landfill-small.ogg"},
    {filename = "__core__/sound/landfill-small-1.ogg"},
    {filename = "__core__/sound/landfill-small-2.ogg"},
    {filename = "__core__/sound/landfill-small-3.ogg"},
    {filename = "__core__/sound/landfill-small-4.ogg"},
    {filename = "__core__/sound/landfill-small-5.ogg"}
}
for _, tile in pairs(data.raw.tile) do
    tile.check_collision_with_entities = true
end
for _, item in pairs(data.raw.item) do
    do
        if item.place_as_tile and isLandfill(item) then
            local tile = data.raw.tile[item.place_as_tile.result]
            if not tile or tile.minable then
                goto __continue3
            end
            tile.minable = {mining_time = 0.1, result = item.name}
            tile.mined_sound = mined_sound
        end
    end
    ::__continue3::
end
return ____exports
