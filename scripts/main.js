var echecs = echecs || {};

// global var : game
window.game;

$(document).ready(function () {
    
    // initialize the game
    window.game = echecs.utils.init_game();

    $(".piece").on("click", function (e) {
        echecs.event_handlers.on_click_piece(window.game, $(this).attr("id"));
        e.stopPropagation();
    });

    $(".cell").on("click", function () {
        echecs.event_handlers.on_click_cell(window.game, $(this).attr("id"));
    });
});

