for _, pole in pairs(data.raw["electric-pole"]) do
    if pole.maximum_wire_distance == 15 then
        pole.maximum_wire_distance = 16
    end
end
