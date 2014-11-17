var echecs = echecs || {};

echecs.action_handlers = {

    tryCapture: function (game, clickedPieceID)
    {
        var clickedPiece = game.pieces[clickedPieceID];

        if ((game.pieces[game.IDpieceSelected].idsPossibleCaptureHostCells).indexOf(clickedPiece.idHostCell) !== -1)
        {
            this.capture(game, clickedPieceID);
        }
        console.log("trying to capture here! :" + game.IDpieceSelected + " to " + clickedPieceID);
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
        var capturedPiece = game.pieces[clickedPieceID];
        
        if (capturedPiece.type === echecs.constants.PIECE_TYPES.king)
        {
            echecs.action_handlers.trigger_check_mate(game);
            return;
        }

        var capturingPiece = game.pieces[game.IDpieceSelected];

        capturedPiece.isCaptured = true;
        capturingPiece.idsPossibleMoveHostCells.push(capturedPiece.idHostCell);
        echecs.action_handlers.move(game, capturedPiece.idHostCell);
        echecs.utils.process_captured_piece(game, capturedPiece);
    },

    move: function (game, destinationCellID)
    {
        var originCellID = echecs.utils.get_id_cell_containing(game, game.IDpieceSelected);

        echecs.utils.bind_piece_to_cell(game, game.IDpieceSelected, destinationCellID);
        echecs.utils.slide_piece(game, game.IDpieceSelected, destinationCellID, echecs.constants.SLIDE_OPTIONS.move);

        // now that we moved, the cell should be reset to its original state
        echecs.utils.reset_cell(game.chessboard.cells[originCellID]);

        echecs.utils.reset_after_move(game);
    },

    trigger_check_mate: function (game)
    {
        alert("CHECK MATE");

        echecs.utils.clear_game(game)

        echecs.utils.start_new_game();
    }
};