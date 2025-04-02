var MenuTop=102;

//var WindowWidth=getWindowWidth();
var adjustment = getWindowWidth();


if (ie55)
{
    var Menu01Left=330 + adjustment + 40;
    var Menu02Left=402 + adjustment + 32;
    var Menu03Left=575 + adjustment + 18;
}
else
{
    var Menu01Left = 330 + adjustment;
    var Menu02Left = 402 + adjustment;
    var Menu03Left = 575 + adjustment;
}

function getWindowWidth(){
    adj = 0;
	if (ie4){
		WindowWidth=document.body.clientWidth;
		if (WindowWidth>768)
		{
			adj = (WindowWidth-768)/2 + 2;
		}else {adj = 0;}
	}
	if (ns4){
		WindowWidth=window.innerWidth;
		if (WindowWidth>768)
		{
			adj = (WindowWidth-768)/2 - 10;
		}else {adj = 0;}
		MenuTop -= 6;
	}
	if (ns6){
		WindowWidth=document.body.clientWidth;
		if (WindowWidth>768)
		{
			adj = (WindowWidth-768)/2 - 5;
		}else {adj = 0;}
		MenuTop -= 5;
	}
	return adj;
}
