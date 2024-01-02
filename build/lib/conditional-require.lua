local ____exports = {}
function ____exports.crequire(fname, mod, stage)
    if mod == "lib" then
        return require(fname)
    end
    if stage == "settings" then
        return require(fname)
    end
    if settings.startup["dish-enable-" .. mod].value then
        return require(fname)
    end
end
return ____exports
