var echecs = echecs || {};

echecs.constants = {

    COLUMN_LETTERS : ["0", "a", "b", "c", "d", "e", "f", "g", "h"],

    PIECE_TYPES:
    {
        king: "king",
        queen: "queen",
        rook: "rook",
        knight: "knight",
        bishop: "bishop",
        pawn: "pawn"
    },

    COLORS : 
    {
        white : "white",
        black : "black"
    },

    SLIDE_OPTIONS : 
    {
        move: "move",
        capture: "capture"
    }
};