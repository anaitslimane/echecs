var echecs = echecs || {};

echecs.models = {

    Player: function (username)
    {
        this.username = username;
    },

    Game: function (player1, player2)
    {
        this.player1 = player1;
        this.player2 = player2;
        
        this.id;
        this.chessboard;
        this.pieces;
        this.capturedPieces = {};
        this.dateTimeStart;
        this.dateTimeEnd;
        this.playerWinner;
        this.IDpieceSelected;
        this.toPlayColor;
        this.movesCount;
    },
    
    Chessboard: function ()
    {
        this.cells = {};
    },

    /* chessboard cell */
    Cell: function (id, isEmpty, Xindex, Yindex, idPieceContained)
    {
        this.visible_instance = $("#" + id);
        this.id = id;
        this.isEmpty = isEmpty;
        this.Xindex = Xindex;
        this.Yindex = Yindex;
        this.idPieceContained = idPieceContained;
    },

    Position: function (Xindex, Yindex)
    {
        this.Xindex = Xindex;
        this.Yindex = Yindex;
    },

    Piece: function (pieceID, type, color)
    {
        this.type = type;
        this.pieceID = pieceID;
        this.color = color;
        this.visible_instance = $("<img id='" + this.pieceID + "' class='piece " + type + " " + color + "' src='/imgs/pieces/" + this.type + this.color.charAt(0) + ".png'>")
        this.isCaptured = false;
        this.idHostCell;
        this.idsPossibleMoveHostCells = [];
        this.idsPossibleCaptureHostCells = [];
    },

    King: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);

        this.movements = [
            echecs.mvt_rules.up,
            echecs.mvt_rules.down,
            echecs.mvt_rules.left,
            echecs.mvt_rules.right,
            echecs.mvt_rules.upLeft,
            echecs.mvt_rules.upRight,            
            echecs.mvt_rules.downLeft,
            echecs.mvt_rules.downRight
        ];

        this.captures = this.movements;
    },

    Queen: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);

        this.movements = [
            echecs.mvt_rules.upRepeat,
            echecs.mvt_rules.downRepeat,
            echecs.mvt_rules.leftRepeat,
            echecs.mvt_rules.rightRepeat,
            echecs.mvt_rules.upLeftRepeat,
            echecs.mvt_rules.upRightRepeat,
            echecs.mvt_rules.downLeftRepeat,
            echecs.mvt_rules.downRightRepeat
        ];

        this.captures = this.movements;
    },

    Rook: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);
        
        this.movements = [
            echecs.mvt_rules.upRepeat,
            echecs.mvt_rules.downRepeat,
            echecs.mvt_rules.leftRepeat,
            echecs.mvt_rules.rightRepeat
        ];

        this.captures = this.movements;
    },

    Knight: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);
        
        this.movements = [
            echecs.mvt_rules.LShapeNNE,
            echecs.mvt_rules.LShapeENE,
            echecs.mvt_rules.LShapeESE,
            echecs.mvt_rules.LShapeSSE,
            echecs.mvt_rules.LShapeSSW,
            echecs.mvt_rules.LShapeWSW,
            echecs.mvt_rules.LShapeWNW,
            echecs.mvt_rules.LShapeNNW
        ];

        this.captures = this.movements;
    },

    Bishop: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);
        
        this.movements = [
            echecs.mvt_rules.upLeftRepeat,
            echecs.mvt_rules.upRightRepeat,
            echecs.mvt_rules.downLeftRepeat,
            echecs.mvt_rules.downRightRepeat
        ];

        this.captures = this.movements;
    },

    Pawn: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);

        var currPawn = this;
        
        this.movements = [
            echecs.mvt_rules.up,
            echecs.mvt_rules.upDouble
        ];

        this.captures = [
            echecs.mvt_rules.upLeft,
            echecs.mvt_rules.upRight
        ];
    }
};