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

    Piece: function (pieceID, type, color)
    {
        this.type = type;
        this.pieceID = pieceID;
        this.visible_instance = $("<div id='" + this.pieceID + "' class='piece " + type + " " + color + "'>" + this.pieceID + "</div>")
        this.color = color;
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

    Rook: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);
        
        this.movements = [
            echecs.mvt_rules.up,
            echecs.mvt_rules.down,
            echecs.mvt_rules.left,
            echecs.mvt_rules.right
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
            echecs.mvt_rules.LShapeSSO,
            echecs.mvt_rules.LShapeOSO,
            echecs.mvt_rules.LShapeONO,
            echecs.mvt_rules.LShapeNNO
        ];

        this.captures = this.movements;
    },

    Bishop: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);
        
        this.movements = [
            echecs.mvt_rules.upLeft,
            echecs.mvt_rules.upRight,
            echecs.mvt_rules.downLeft,
            echecs.mvt_rules.downRight
        ];

        this.captures = this.movements;
    },

    Pawn: function (pieceID, type, color)
    {
        echecs.models.Piece.call(this, pieceID, type, color);

        var currPawn = this;
        
        this.movements = [
            echecs.mvt_rules.up
        ];

        this.captures = [
            echecs.mvt_rules.upLeft,
            echecs.mvt_rules.upRight
        ];
    }
};