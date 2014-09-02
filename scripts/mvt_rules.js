var echecs = echecs || {};

echecs.mvt_rules = {
        
        up : function (color, Xcurr, Ycurr)
        {
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return echecs.utils.build_cell_id(Xcurr - 1, Yindex);
        },

        down: function (color, Xcurr, Ycurr)
        {
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return echecs.utils.build_cell_id(Xcurr - 1, Yindex);
        },

        left: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;

            return echecs.utils.build_cell_id(Xindex - 1, Ycurr);
        },

        right: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;

            return echecs.utils.build_cell_id(Xindex - 1, Ycurr);
        },

        upLeft: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        upRight: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        downLeft: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        downRight: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape north north east 
        LShapeNNE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 2 : Ycurr - 2;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape east north east 
        LShapeENE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 2 : Xcurr - 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape east south east 
        LShapeESE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 2 : Xcurr - 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape south south east 
        LShapeSSE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 2 : Ycurr + 2;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape south south west 
        LShapeSSW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 2 : Ycurr + 2;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape west south west 
        LShapeWSW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 2 : Xcurr + 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape west north west 
        LShapeWNW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 2 : Xcurr + 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        },

        // L shape north north west 
        LShapeNNW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 2 : Ycurr - 2;

            return echecs.utils.build_cell_id(Xindex - 1, Yindex);
        }

};