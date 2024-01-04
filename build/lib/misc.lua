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
            function(____, e)
                if type(e) == "string" then
                    return e
                end
                if type(e) == "table" and e.object_name ~= nil then
                    local v = e
                    local pos = v.position
                    return ((((((v.object_name .. "{") .. v.name) .. "@") .. tostring(pos.x)) .. ",") .. tostring(pos.y)) .. "}"
                end
                return serpent.line(e)
            end
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
function Pos.of(self, target)
    return ____exports.Pos:from(target.position)
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
function Pos.prototype.sub(self, x, y)
    if type(x) == "number" then
        return __TS__New(____exports.Pos, self.x - x, self.y - y)
    end
    return __TS__New(____exports.Pos, self.x - x.x, self.y - x.y)
end
function Pos.prototype.mul(self, x, y)
    if type(x) == "number" then
        return __TS__New(____exports.Pos, self.x * x, self.y * (y or x))
    end
    return __TS__New(____exports.Pos, self.x * x.x, self.y * x.y)
end
function Pos.prototype.setX(self, x)
    return __TS__New(
        ____exports.Pos,
        type(x) == "number" and x or x.x,
        self.y
    )
end
function Pos.prototype.setY(self, y)
    return __TS__New(
        ____exports.Pos,
        self.x,
        type(y) == "number" and y or y.y
    )
end
function Pos.prototype.round(self)
    return __TS__New(
        ____exports.Pos,
        math.floor(self.x + 0.5),
        math.floor(self.y + 0.5)
    )
end
function Pos.prototype.floor(self)
    return __TS__New(
        ____exports.Pos,
        math.floor(self.x),
        math.floor(self.y)
    )
end
function Pos.prototype.ceil(self)
    return __TS__New(
        ____exports.Pos,
        math.ceil(self.x),
        math.ceil(self.y)
    )
end
function Pos.prototype.tileToChunk(self)
    return self:mul(1 / 32):floor():mul(32):add(16, 16)
end
function Pos.prototype.widen(self, dx, dy)
    if dy == nil then
        dy = dx
    end
    return __TS__New(
        ____exports.Area,
        self:sub(dx, dy),
        self:add(dx, dy)
    )
end
__TS__ObjectDefineProperty(
    Pos,
    "north",
    {get = function(self)
        return __TS__New(____exports.Pos, 0, -1)
    end}
)
____exports.Area = __TS__Class()
local Area = ____exports.Area
Area.name = "Area"
function Area.prototype.____constructor(self, l, r)
    self.left_top = l
    self.right_bottom = r
end
function ____exports.range(min, max)
    local a = {}
    do
        local x = min
        while x <= max do
            a[#a + 1] = x
            x = x + 1
        end
    end
    return a
end
return ____exports
