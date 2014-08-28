var echecs = echecs || {};

echecs.utils = {

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
        
        $(".main-wrapper").append("<table id='chessboard'></table>");

        for (iRow = 8; iRow > 0; iRow--)
        {
            var localRow = $("<ul></ul>");
            $("#chessboard").append(localRow);

            for (iCol = 0; iCol < 8; iCol++)
            {
                var localCol = $("<li class='cell'></li>");

                // id of the current cell
                var idCurrentCell = this.build_cell_id(iCol, iRow);
            
                localRow.append(localCol);
                localCol.attr("id", idCurrentCell);

                game.chessboard.cells[idCurrentCell] = new echecs.models.Cell(idCurrentCell, true, iCol + 1, iRow, null);
                
                switch(iRow)
                {
                    // blacks non pawns
                    case 8:
                        switch(iCol)
                        {
                            case 0:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook1B.pieceID, idCurrentCell);
                                break;
                            case 1:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight1B.pieceID, idCurrentCell);
                                break;
                            case 2:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop1B.pieceID, idCurrentCell);
                                break;
                            case 3:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.queenB.pieceID, idCurrentCell);
                                break;
                            case 4:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.kingB.pieceID, idCurrentCell);
                                break;
                            case 5:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop2B.pieceID, idCurrentCell);
                                break;
                            case 6:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight2B.pieceID, idCurrentCell);
                                break;
                            case 7:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook2B.pieceID, idCurrentCell);
                                break;
                        }
                        break;

                        // whites non pawns
                    case 1:
                        switch (iCol)
                        {
                            case 0:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook1W.pieceID, idCurrentCell);
                                break;
                            case 1:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight1W.pieceID, idCurrentCell);
                                break;
                            case 2:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop1W.pieceID, idCurrentCell);
                                break;
                            case 3:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.queenW.pieceID, idCurrentCell);
                                break;
                            case 4:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.kingW.pieceID, idCurrentCell);
                                break;
                            case 5:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.bishop2W.pieceID, idCurrentCell);
                                break;
                            case 6:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.knight2W.pieceID, idCurrentCell);
                                break;
                            case 7:
                                echecs.utils.bind_piece_to_cell(game, game.pieces.rook2W.pieceID, idCurrentCell);
                                break;
                        }
                        break;


                    // pawns

                    case 7:
                        //blacks
                        var propName = "pawn" + (iCol + 1).toString() + "B";
                        echecs.utils.bind_piece_to_cell(game, game.pieces[propName].pieceID, idCurrentCell);
                        break;

                    case 2:
                        //whites
                        var propName = "pawn" + (iCol + 1).toString() + "W";
                        echecs.utils.bind_piece_to_cell(game, game.pieces[propName].pieceID, idCurrentCell);
                        break;
                }

                if (iCol % 2 == 0)
                {
                    if (iRow % 2 == 0) {
                        localCol.addClass(classLight);
                    }
                    else {
                        localCol.addClass(classDark);
                    }
                }
                else
                {
                    if (iRow % 2 == 0) {
                        localCol.addClass(classDark);
                    }
                    else {
                        localCol.addClass(classLight);
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
    set_piece_possible_host_cells: function (game, pieceID)
    {
        var piece = game.pieces[pieceID];
        var cellCurr = game.chessboard.cells[piece.idHostCell];

        // reset the pieces's possible host cells
        this.reset_possible_host_cells(piece);

        for (var i = 0; i < piece.movements.length; i++)
        {
            var idCellPossible = piece.movements[i].call(this, piece.color, cellCurr.Xindex, cellCurr.Yindex);

            if (game.chessboard.cells[idCellPossible]
                && game.chessboard.cells[idCellPossible].isEmpty)
            {
                piece.idsPossibleMoveHostCells.push(idCellPossible);
            }
        }

        for (var capt in piece.captures)
        {
            piece.idsPossibleCaptureHostCells.push(capt);
        }
    },
    
    set_all_pieces_possible_hosts: function (game)
    {
        for (var pieceID in game.pieces)
        {
            this.set_piece_possible_host_cells(game, pieceID);
        }
    },

    reset_possible_host_cells: function (piece)
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

    bind_piece_to_cell: function (game, pieceID, cellID)
    {
        var cell = game.chessboard.cells[cellID];

        if (game.movesCount == 0)
        {
            cell.visible_instance.append(game.pieces[pieceID].visible_instance);
        }
        else
        {
            this.slide_piece(game, pieceID, cell);
        }

        game.pieces[pieceID].idHostCell = cellID;
        cell.idPieceContained = pieceID;
        cell.isEmpty = false;
    },

    build_piece_name : function(name, color, pieceIndex)
    {
        if (typeof pieceIndex === 'undefined')
            pieceIndex = "";

        return (name + pieceIndex.toString() + (color.charAt(0)).toUpperCase());
    },

    /**
     * slide the piece from a cell to another
     */
    slide_piece: function (game, pieceID, cell)
    {
        cell.visible_instance.append(game.pieces[pieceID].visible_instance);
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
                    for (i = 1; i < supRepeat; i++)
                    {
                        pieceID = echecs.utils.build_piece_name(pieceType, color, i);
                        pieces[pieceID] = new echecs.models.Rook(pieceID, pieceType, color);
                    }
                }

                if (pieceType == echecs.constants.PIECE_TYPES.knight)
                {
                    supRepeat = 3;
                    for (i = 1; i < supRepeat; i++)
                    {
                        pieceID = echecs.utils.build_piece_name(pieceType, color, i);
                        pieces[pieceID] = new echecs.models.Knight(pieceID, pieceType, color);
                    }
                }

                if (pieceType == echecs.constants.PIECE_TYPES.bishop)
                {
                    supRepeat = 3;
                    for (i = 1; i < supRepeat; i++)
                    {
                        pieceID = echecs.utils.build_piece_name(pieceType, color, i);
                        pieces[pieceID] = new echecs.models.Bishop(pieceID, pieceType, color);
                    }
                }
                    
                // make it eight of pawns
                if (pieceType == echecs.constants.PIECE_TYPES.pawn)
                {
                    supRepeat = 9;
                    for (i = 1; i < supRepeat; i++)
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
    }
};