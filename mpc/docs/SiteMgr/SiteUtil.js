/* This file includes functions that can be run as both server side
** or client side JavaScript.
**
** Copyright (c) 2001, Mercantec, Inc.
*/

/*
** Since we don't have access to the client side font metrics,
** we must make a guess about the character widths and heights
*/
function getTextHeight(text, width)
{
	var	aveCharWidth = 10;
	var	aveCharHeight = 18;
	var	floatW = width / aveCharWidth;
	var	aveLineWidth = parseInt(floatW.toString());
	newlines = text.split('\n');
	numOfRows = newlines.length;
	// guess aveLineWidth chars per line for width
	for (i=0; i < newlines.length; i++)
	{
		if (newlines[i].length > aveLineWidth)
		{
			var floatR = newlines[i].length / aveLineWidth;
			numOfRows += parseInt(floatR.toString());
		}
	}
	// points do not equal pixels
	height = numOfRows * aveCharHeight;
	return height;
}

