local ____lualib = require("lualib_bundle")
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__ObjectDefineProperty = ____lualib.__TS__ObjectDefineProperty
local ____exports = {}
function ____exports.logs(...)
    local a = {...}
    game.print(table.concat(
        __TS__ArrayMap(
            a,
            function(____, e) return type(e) == "string" and e or serpent.line(e) end
        ),
        " "
    ))
end
____exports.Pos = __TS__Class()
local Pos = ____exports.Pos
Pos.name = "Pos"
function Pos.prototype.____constructor(self, x, y)
    self.x = x
    self.y = y
end
function Pos.from(self, pos)
    return __TS__New(____exports.Pos, pos.x, pos.y)
end
function Pos.prototype.rotate8(self, angle)
    if angle < 0 or angle > 8 then
        angle = (angle % 8 + 8) % 8
    end
    if angle % 2 == 1 then
        error("unsupported angle")
    end
    if angle == 2 then
        return __TS__New(____exports.Pos, -self.y, self.x)
    end
    if angle == 4 then
        return __TS__New(____exports.Pos, -self.x, -self.y)
    end
    if angle == 6 then
        return __TS__New(____exports.Pos, self.y, -self.x)
    end
    return __TS__New(____exports.Pos, self.x, self.y)
end
function Pos.prototype.add(self, x, y)
    if type(x) == "number" then
        return __TS__New(____exports.Pos, self.x + x, self.y + y)
    end
    return __TS__New(____exports.Pos, self.x + x.x, self.y + x.y)
end
__TS__ObjectDefineProperty(
    Pos,
    "north",
    {get = function(self)
        return __TS__New(____exports.Pos, 0, -1)
    end}
)
return ____exports
