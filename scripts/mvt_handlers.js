var echecs = echecs || {};

echecs.mvt_handlers = {

    tryCapture: function (game, clickedPieceID)
    {
        this.capture(game, clickedPieceID);
        console.log("trying to capture here! :" + clickedPieceID + " to " + clickedPieceID);
    },

    tryMove: function (game, clickedCellID)
    {
        if ((game.pieces[game.IDpieceSelected].idsPossibleMoveHostCells).indexOf(clickedCellID) !== -1)
        {
            this.move(game, clickedCellID);
        }
        console.log("trying to move here! from:" + clickedCellID + " to " + clickedCellID);
    },

    capture: function (game, clickedPieceID)
    {

    },

    move: function (game, destinationCellID)
    {
        var originCellID = echecs.utils.get_id_cell_containing(game, game.IDpieceSelected);

        echecs.utils.slide_piece(echecs.constants.SLIDE_OPTIONS.move);

        // now that we moved, the cell should be reset to its original state
        echecs.utils.reset_cell(game.chessboard.cells[originCellID]);

        echecs.utils.reset_after_move(game);
    }

};