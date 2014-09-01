﻿var echecs = echecs || {};

echecs.event_handlers = {

    on_click_piece : function (game, clickedPieceID)
    {
        // if the piece belongs to the set that has the go to play
        if (echecs.utils.has_go_to_play(game, clickedPieceID))
        {
            game.IDpieceSelected = clickedPieceID;
        }
        else
        {
            // if we already selected a piece, we're trying to capture
            if (game.IDpieceSelected != null)
            {
                echecs.mvt_handlers.tryCapture(game.IDpieceSelected, clickedPieceID)
            }

            // reset currently selected piece
            game.IDpieceSelected = null;
        }
    },

    on_click_cell: function (game, clickedCellID)
    {
        var clickedCell = game.chessboard.cells[clickedCellID];

        // if we already selected a piece, and not clicked the same cell: we're trying to capture or move 
        if (game.IDpieceSelected != null && (game.IDpieceSelected != clickedCell.idPieceContained))
        {
            // try to capture if cell is occupied with a piece of opponent's color 
            if (!clickedCell.isEmpty)
            {
                if (game.pieces[clickedCell.idPieceContained].color != game.toPlayColor)
                {
                    var clickedPieceID = clickedCell.idPieceContained;
                    echecs.mvt_handlers.tryCapture(game.IDpieceSelected, clickedPieceID);
                }
            }
            else
            {
                // move
                echecs.mvt_handlers.tryMove(game, clickedCellID);
            }
        }

        // reset currently selected piece
        game.IDpieceSelected = null;
    }

};