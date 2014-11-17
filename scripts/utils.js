var echecs = echecs || {};

echecs.utils = {

    start_new_game : function()
    {
        // initialize the game
        window.game = echecs.utils.init_game();

        $(".piece").on("click", function (e)
        {
            echecs.event_handlers.on_click_piece(window.game, $(this).attr("id"));
            e.stopPropagation();
        });

        $(".cell").on("click", function ()
        {
            echecs.event_handlers.on_click_cell(window.game, $(this).attr("id"));
        });
    },

    /*
     * initializes game and board
     */
    init_game : function()
    {
        var classLight = "light-colored-cell";
        var classDark = "dark-colored-cell";

        var player1 = new echecs.models.Player("player1");
        var player2 = new echecs.models.Player("player2");

        var game = new echecs.models.Game(player1, player2);

        // basic initialization
        game.id;
        game.chessboard = new echecs.models.Chessboard();
        game.pieces = echecs.utils.populate_pieces();
        game.dateTimeStart = new Date();
        game.IDpieceSelected = null;
        game.toPlayColor = echecs.constants.COLORS.white;
        game.movesCount = 0;
        
        $("#chessboard-wrapper").append("<ul id='chessboard'></ul>");

        for (var iRow = 8; iRow > 0; iRow--)
        {
            var $localRowContainer = $("<li></li>");
            var $localRow = $("<ul></ul>");

            $("#chessboard").append($localRowContainer);
            $localRowContainer.append($localRow);

            // index from 1 to 8
            for (var iCol = 1; iCol < 9; iCol++)
            {
                var $localCol = $("<li class='cell'></li>");

                // id of the current cell
                var idCurrentCell = this.build_cell_id(iCol, iRow);
            
                $localRow.append($localCol);
                $localCol.attr("id", idCurrentCell);

                game.chessboard.cells[idCurrentCell] = new echecs.models.Cell(idCurrentCell, true, iCol, iRow, null);
                
                switch(iRow)
                {
                    // blacks non pawns
                    case 8:
                        switch(iCol)
                        {
                            case 1:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook1B.pieceID, idCurrentCell);
                                break;
                            case 2:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight1B.pieceID, idCurrentCell);
                                break;
                            case 3:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop1B.pieceID, idCurrentCell);
                                break;
                            case 4:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.queenB.pieceID, idCurrentCell);
                                break;
                            case 5:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.kingB.pieceID, idCurrentCell);
                                break;
                            case 6:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop2B.pieceID, idCurrentCell);
                                break;
                            case 7:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight2B.pieceID, idCurrentCell);
                                break;
                            case 8:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook2B.pieceID, idCurrentCell);
                                break;
                        }
                        break;

                        // whites non pawns
                    case 1:
                        switch (iCol)
                        {
                            case 1:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook1W.pieceID, idCurrentCell);
                                break;
                            case 2:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight1W.pieceID, idCurrentCell);
                                break;
                            case 3:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop1W.pieceID, idCurrentCell);
                                break;
                            case 4:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.queenW.pieceID, idCurrentCell);
                                break;
                            case 5:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.kingW.pieceID, idCurrentCell);
                                break;
                            case 6:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop2W.pieceID, idCurrentCell);
                                break;
                            case 7:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight2W.pieceID, idCurrentCell);
                                break;
                            case 8:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook2W.pieceID, idCurrentCell);
                                break;
                        }
                        break;


                    // pawns

                    case 7:
                        //blacks
                        var propName = "pawn" + (iCol).toString() + "B";
                        echecs.utils.bind_piece_to_cell(game, game.pieces[propName].pieceID, idCurrentCell);
                        break;

                    case 2:
                        //whites
                        var propName = "pawn" + (iCol).toString() + "W";
                        echecs.utils.bind_piece_to_cell(game, game.pieces[propName].pieceID, idCurrentCell);
                        break;
                }

                if ((iCol + 1) % 2 == 0)
                {
                    if (iRow % 2 == 0) {
                        $localCol.addClass(classLight);
                    }
                    else {
                        $localCol.addClass(classDark);
                    }
                }
                else
                {
                    if (iRow % 2 == 0) {
                        $localCol.addClass(classDark);
                    }
                    else {
                        $localCol.addClass(classLight);
                    }
                }
            }
        }

        // initialize possible pieces moves and captures
        this.set_all_pieces_possible_hosts(game);

        return game;
    },

    /** 
     * Sets the currently possible cells where a piece can be moved to.
     * This includes capture
     */
    set_piece_possible_host_cells: function (game, piece)
    {
        var cellCurr = game.chessboard.cells[piece.idHostCell];
        var pieceType = piece.type;

        var populate_possible_host_cells = function (piece, cell)
        {
            for (var i = 0; i < piece.movements.length; i++)
            {
                var position = piece.movements[i].call(this, piece.color, cellCurr.Xindex, cellCurr.Yindex);

                var idCellPossible = echecs.utils.build_cell_id(position.Xindex, position.Yindex);

                if (game.chessboard.cells[idCellPossible])
                {
                    if (game.chessboard.cells[idCellPossible].isEmpty)
                    {
                        piece.idsPossibleMoveHostCells.push(idCellPossible);
                    }
                    else
                    {
                        if (game.pieces[game.chessboard.cells[idCellPossible].idPieceContained].color != piece.color)
                        {
                            piece.idsPossibleCaptureHostCells.push(idCellPossible);
                        }
                    }
                }
            }
        }

        // reset the pieces's possible host cells
        this.flush_possible_host_cells(piece);

        switch(pieceType)
        {
            case echecs.constants.PIECE_TYPES.queen:
            case echecs.constants.PIECE_TYPES.rook:
            case echecs.constants.PIECE_TYPES.bishop:
                for (var i = 0; i < piece.movements.length; i++)
                {
                    var positions = piece.movements[i].call(this, piece.color, cellCurr.Xindex, cellCurr.Yindex);
                    
                    for(var positionKey in positions)
                    {
                        var idCellPossible = echecs.utils.build_cell_id(positions[positionKey].Xindex, positions[positionKey].Yindex);
                        
                        if (game.chessboard.cells[idCellPossible])
                        {
                            if (game.chessboard.cells[idCellPossible].isEmpty)
                            {
                                piece.idsPossibleMoveHostCells.push(idCellPossible);
                            }
                            else
                            {
                                if (game.pieces[game.chessboard.cells[idCellPossible].idPieceContained].color != piece.color)
                                {
                                    piece.idsPossibleCaptureHostCells.push(idCellPossible);
                                }
                                
                                // we've reached an obstacle, stop
                                break;
                            }
                        }
                    }
                }
                break;

            case echecs.constants.PIECE_TYPES.king:
                populate_possible_host_cells(piece, cellCurr);
                break;

            case echecs.constants.PIECE_TYPES.knight:
                populate_possible_host_cells(piece, cellCurr);
                break;

            case echecs.constants.PIECE_TYPES.pawn:
                for (var i = 0; i < piece.movements.length; i++)
                {
                    // allowing (or not) the double step for pawns
                    if (piece.movements[i] == echecs.mvt_rules.upDouble)
                    {
                        if ((cellCurr.Yindex !== 2 || piece.color !== echecs.constants.COLORS.white) &&
                                (cellCurr.Yindex !== 7 || piece.color !== echecs.constants.COLORS.black))
                        {
                            continue;
                        }
                    }

                    var position = piece.movements[i].call(this, piece.color, cellCurr.Xindex, cellCurr.Yindex);
                    var idCellPossible = echecs.utils.build_cell_id(position.Xindex, position.Yindex);

                    if (game.chessboard.cells[idCellPossible])
                    {
                        if (game.chessboard.cells[idCellPossible].isEmpty)
                        {
                            piece.idsPossibleMoveHostCells.push(idCellPossible);
                        }
                        else
                        {
                            // we've reached an obstacle, stop
                            break;
                        }
                    }
                }

                for (var i = 0; i < piece.captures.length; i++)
                {
                    var position = piece.captures[i].call(this, piece.color, cellCurr.Xindex, cellCurr.Yindex);
                    var idCellPossible = echecs.utils.build_cell_id(position.Xindex, position.Yindex);

                    if (game.chessboard.cells[idCellPossible])
                    {
                        if (!game.chessboard.cells[idCellPossible].isEmpty)
                        {
                            piece.idsPossibleCaptureHostCells.push(idCellPossible);
                        }
                    }
                }
                break;
        }
    },
    
    set_all_pieces_possible_hosts: function (game)
    {
        for (var pieceID in game.pieces)
        {
            this.set_piece_possible_host_cells(game, game.pieces[pieceID]);
        }
    },

    flush_possible_host_cells: function (piece)
    {
        while (piece.idsPossibleMoveHostCells.length > 0)
        {
            piece.idsPossibleMoveHostCells.pop();
        }

        while (piece.idsPossibleMoveHostCells.length > 0)
        {
            piece.idsPossibleCaptureHostCells.pop();
        }
    },

    build_cell_id : function(iCol, iRow)
    {
        return echecs.constants.COLUMN_LETTERS[iCol] + iRow;
    },

    bind_piece_to_cell: function (game, pieceID, destinationCellID)
    {
        var cell = game.chessboard.cells[destinationCellID];

        if (game.movesCount == 0)
        {
            cell.visible_instance.append(game.pieces[pieceID].visible_instance);
        }

        game.pieces[pieceID].idHostCell = destinationCellID;
        cell.idPieceContained = pieceID;
        cell.isEmpty = false;
    },

    // handles a captured piece
    process_captured_piece : function(game, capturedPiece)
    {
        if (capturedPiece.color == echecs.constants.COLORS.white)
        {
            capturedPiece.visible_instance.appendTo("#black-captured");
        }
        else
        {
            capturedPiece.visible_instance.appendTo("#white-captured");
        }
        
        game.capturedPieces[capturedPiece.pieceID] = capturedPiece;
        delete game.pieces[capturedPiece.pieceID];
    },

    build_piece_name : function (name, color, pieceIndex)
    {
        if (typeof pieceIndex === 'undefined')
            pieceIndex = "";

        return (name + pieceIndex.toString() + (color.charAt(0)).toUpperCase());
    },

    /**
     * slide the piece from a cell to another
     */
    slide_piece: function (game, pieceID, destinationCellID, originAction)
    {
        game.chessboard.cells[destinationCellID].visible_instance.append(game.pieces[pieceID].visible_instance);
    },

    /**
     * Tells if the piece belong to the set that has the go to play
     */
    has_go_to_play: function (game, pieceID)
    {
        return (game.pieces[pieceID].color == game.toPlayColor);
    },

    /*
     * construct all the chessboard's pieces
     */
    populate_pieces : function ()
    {
        var pieces = {};
        var pieceID;
            
        for (var color in echecs.constants.COLORS)
        {
            var supRepeat = 0;

            for (var pieceType in echecs.constants.PIECE_TYPES)
            {
                // make it two of rooks, knights and bishops
                if (pieceType == echecs.constants.PIECE_TYPES.rook)
                {
                    supRepeat = 3;
                    for (var i = 1; i < supRepeat; i++)
                    {
                        pieceID = echecs.utils.build_piece_name(pieceType, color, i);
                        pieces[pieceID] = new echecs.models.Rook(pieceID, pieceType, color);
                    }
                }

                if (pieceType == echecs.constants.PIECE_TYPES.knight)
                {
                    supRepeat = 3;
                    for (var i = 1; i < supRepeat; i++)
                    {
                        pieceID = echecs.utils.build_piece_name(pieceType, color, i);
                        pieces[pieceID] = new echecs.models.Knight(pieceID, pieceType, color);
                    }
                }

                if (pieceType == echecs.constants.PIECE_TYPES.bishop)
                {
                    supRepeat = 3;
                    for (var i = 1; i < supRepeat; i++)
                    {
                        pieceID = echecs.utils.build_piece_name(pieceType, color, i);
                        pieces[pieceID] = new echecs.models.Bishop(pieceID, pieceType, color);
                    }
                }
                    
                // make it eight of pawns
                if (pieceType == echecs.constants.PIECE_TYPES.pawn)
                {
                    supRepeat = 9;
                    for (var i = 1; i < supRepeat; i++)
                    {
                        pieceID = echecs.utils.build_piece_name(pieceType, color, i);
                        pieces[pieceID] = new echecs.models.Pawn(pieceID, pieceType, color);
                    }
                }

                if (pieceType == echecs.constants.PIECE_TYPES.king)
                {
                    pieceID = echecs.utils.build_piece_name(pieceType, color);
                    pieces[pieceID] = new echecs.models.King(pieceID, pieceType, color);
                }

                if (pieceType == echecs.constants.PIECE_TYPES.queen)
                {
                    pieceID = echecs.utils.build_piece_name(pieceType, color);
                    pieces[pieceID] = new echecs.models.Queen(pieceID, pieceType, color);
                }
            }
        }
            
        return pieces;
    },

    get_id_cell_containing : function(game, pieceID)
    {
        var cells = game.chessboard.cells;

        for (var cellID in cells)
        {
            var currCell = game.chessboard.cells[cellID];

            if (pieceID == currCell.idPieceContained)
            {
                return currCell.id;
            }
        }
    },

    reset_cell : function(cell)
    {
        cell.isEmpty = true;
        cell.idPieceContained = null;
    },

    reset_after_move: function (game)
    {
        echecs.utils.set_all_pieces_possible_hosts(game);
        game.toPlayColor = (game.toPlayColor == echecs.constants.COLORS.white) ? echecs.constants.COLORS.black : echecs.constants.COLORS.white;
        game.movesCount++;
    },

    // sets the currently selected piece's ID
    set_currently_selected_pieceID: function (game, selectedPieceID)
    {
        if (selectedPieceID != null)
        {
            $(".selected").removeClass("selected");
            $("#" + selectedPieceID).parent().addClass("selected");
        }
        
        game.IDpieceSelected = selectedPieceID;
    },

    // clears all game's dom objects
    clear_game: function (game)
    {
        $("#chessboard").remove();

        for (var k in game)
        {
            delete game[k];
        }
        delete game;
    }
};