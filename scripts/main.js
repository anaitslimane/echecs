$(document).ready(function () {
    draw_board();
});

function draw_board()
{
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var colorClassFair = "fair-colored-cell";
    var colorClassDark = "dark-colored-cell";
    
    for (iRow = 8; iRow > 0; iRow--)
    {
        var localRow = $("<tr></tr>");
        $("#chessboard").append(localRow);

        for (iCol = 0; iCol < 8; iCol++)
        {
            var localCol = $("<td></td>");
            localRow.append(localCol);
            localCol.attr("id", letters[iCol] + iRow);

            if (iCol % 2 == 0)
            {
                if (iRow % 2 == 0) {
                    localCol.addClass(colorClassFair);
                }
                else {
                    localCol.addClass(colorClassDark);
                }
            }
            else
            {
                if (iRow % 2 == 0) {
                    localCol.addClass(colorClassDark);
                }
                else {
                    localCol.addClass(colorClassFair);
                }
            }            
        }
    }
}