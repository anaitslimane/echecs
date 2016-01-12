var echecs = echecs || {};

echecs.mvt_rules = {
        
        up : function (color, Xcurr, Ycurr)
        {
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return new echecs.models.Position(Xcurr, Yindex);
        },

        down: function (color, Xcurr, Ycurr)
        {
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return new echecs.models.Position(Xcurr, Yindex);
        },

        left: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;

            return new echecs.models.Position(Xindex , Ycurr);
        },

        right: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;

            return new echecs.models.Position(Xindex , Ycurr);
        },

        upLeft: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        upRight: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        downLeft: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        downRight: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        upDouble: function (color, Xcurr, Ycurr)
        {
            var pos = echecs.mvt_rules.up(color, Xcurr, Ycurr);

            return echecs.mvt_rules.up(color, pos.Xindex, pos.Yindex);
        },
        
        upRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.up(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.up(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        downRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.down(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.down(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        leftRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.left(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.left(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        rightRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.right(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.right(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        upLeftRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.upLeft(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.upLeft(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        upRightRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.upRight(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.upRight(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        downLeftRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.downLeft(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.downLeft(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        downRightRepeat: function (color, Xcurr, Ycurr)
        {
            var positions = [];
            var distance = 8;
            var currPos = echecs.mvt_rules.downRight(color, Xcurr, Ycurr);

            while (distance > 0)
            {
                positions.push(currPos);
                currPos = echecs.mvt_rules.downRight(color, currPos.Xindex, currPos.Yindex);
                distance--;
            }

            return positions;
        },

        // L shape north north east 
        LShapeNNE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 2 : Ycurr - 2;

            return new echecs.models.Position(Xindex , Yindex);
        },

        // L shape east north east 
        LShapeENE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 2 : Xcurr - 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        // L shape east south east 
        LShapeESE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 2 : Xcurr - 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        // L shape south south east 
        LShapeSSE: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr + 1 : Xcurr - 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 2 : Ycurr + 2;

            return new echecs.models.Position(Xindex , Yindex);
        },

        // L shape south south west 
        LShapeSSW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 2 : Ycurr + 2;

            return new echecs.models.Position(Xindex , Yindex);
        },

        // L shape west south west 
        LShapeWSW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 2 : Xcurr + 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr - 1 : Ycurr + 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        // L shape west north west 
        LShapeWNW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 2 : Xcurr + 2;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 1 : Ycurr - 1;

            return new echecs.models.Position(Xindex , Yindex);
        },

        // L shape north north west 
        LShapeNNW: function (color, Xcurr, Ycurr)
        {
            var Xindex = (color == echecs.constants.COLORS.white) ? Xcurr - 1 : Xcurr + 1;
            var Yindex = (color == echecs.constants.COLORS.white) ? Ycurr + 2 : Ycurr - 2;

            return new echecs.models.Position(Xindex , Yindex);
        }
};