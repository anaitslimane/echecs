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
        }

};