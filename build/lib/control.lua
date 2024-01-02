script.on_event(
    "dish-reload-control",
    function()
        game.print("Reloading scripts...")
        game.reload_mods()
    end
)
