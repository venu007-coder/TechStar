stop();
//////////////////////////////////////////////////////////////
var Parent:MovieClip;
Parent = this;
Count = 1;
Active = 1;
var TextBox1:TextField;
var TextBox2:TextField;
//-------------------------------------------------
function Init() {
	Root_Box1 = eval("_parent."+Parent+".Text_Box1");
	Root_Box2 = eval("_parent."+Parent+".Text_Box2");
	Root_Display1 = eval("_parent."+Parent+".Dyn_Txt1");
	Root_Display2 = eval("_parent."+Parent+".Dyn_Txt2");
	Root_Display3 = eval("_parent."+Parent+".Dyn_Txt3");
	Root_Display4 = eval("_parent."+Parent+".Dyn_Txt4");
	Root_Display5 = eval("_parent."+Parent+".Dyn_Txt5");
	Root_Display6 = eval("_parent."+Parent+".Dyn_Txt6");
	Root_Display7 = eval("_parent."+Parent+".Dyn_Txt7");
	Root_Display8 = eval("_parent."+Parent+".Dyn_Txt8");
	Root_Display9 = eval("_parent."+Parent+".Dyn_Txt9");
	Root_Display10 = eval("_parent."+Parent+".Dyn_Txt10");
	Root_Display11 = eval("_parent."+Parent+".Dyn_Txt11");
	Root_Display12 = eval("_parent."+Parent+".Dyn_Txt12");
	Root_Display13 = eval("_parent."+Parent+".Dyn_Txt13");
	Root_Display14 = eval("_parent."+Parent+".Dyn_Txt14");
	Root_Display15 = eval("_parent."+Parent+".Dyn_Txt15");
	TextBox1 = eval(Root_Box2+".PowFraction.tf2");
	TextBox2 = eval(Root_Box2+".PowInteger.tf1");
}
Init();
//-------------------------------------------------
Root3_X = eval(Root_Display3)._x;
LB_X = eval(Root_Display3).Left_Bracket._x;
/////////////////////////////////////Declaration and Initalize///////////////////////////////
ActiveSet = ["Text_Box1.BaseInteger.tf1", "Text_Box1.BaseInteger.tf1", "Text_Box1.BaseInteger.tf1", "Text_Box1.BaseFraction.tf2", "Text_Box1.BaseFraction.tf2", "Text_Box1.BaseFraction.tf2", "Text_Box1.BaseFraction.tf1", "Text_Box1.BaseFraction.tf1", "Text_Box1.BaseFraction.tf1", "Text_Box1.BasePower.tf1", "Text_Box1.BasePower.tf1", "Text_Box1.BasePower.tf1", "Text_Box1.BasePower.tf1", "Text_Box1.BaseSquare.tf1", "Text_Box1.BaseSquare.tf1"];
ToggleButton = [Root_Box1+".ToggleBase", Root_Box2+".TogglePower"];
//, Root_Box1+"BasePower.ToggleBasePow"
TypesOfInteger = [Root_Box1+".BaseInteger", Root_Box2+".PowInteger"];
TypesOfFraction = [Root_Box1+".BaseFraction", Root_Box2+".PowFraction"];
TextBoxArray = [Root_Box1+".BaseInteger.tf1", Root_Box1+".BaseFraction.tf1", Root_Box1+".BaseFraction.tf2", Root_Box1+".BaseFraction.tf3", Root_Box2+".PowInteger.tf1", Root_Box2+".PowFraction.tf1", Root_Box2+".PowFraction.tf2", Root_Box1+".BasePower.tf1", Root_Box1+".BasePower.tf2", Root_Box1+".BasePower.tf3", Root_Box1+".BaseSquare.tf1", Root_Box1+".BaseSquare.tf2"];
eval(Root_Box1+".BaseFraction")._visible = false;
eval(Root_Box1+".BasePower")._visible = false;
eval(Root_Box1+".BaseSquare")._visible = false;
eval(Root_Box2)._visible = false;
//eval(Root_Box1)._visible = false;
eval(Root_Box2+".PowInteger")._visible = false;
eval(Root_Box2+".PowFraction")._visible = false;
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
eval(Root_Display1+".tf1").Equalent = eval(Root_Display2+".tf1").Equalent=eval(Root_Display3+".tf1").Equalent=Root_Box1+".BaseInteger.tf1";
eval(Root_Display9+".tf1").Equalent = eval(Root_Display8+".tf1").Equalent=eval(Root_Display7+".tf1").Equalent=Root_Box1+".BaseFraction.tf1";
eval(Root_Display9+".tf2").Equalent = eval(Root_Display8+".tf2").Equalent=eval(Root_Display7+".tf2").Equalent=eval(Root_Display6+".tf1").Equalent=eval(Root_Display4+".tf1").Equalent=eval(Root_Display5+".tf1").Equalent=Root_Box1+".BaseFraction.tf2";
eval(Root_Display9+".tf3").Equalent = eval(Root_Display8+".tf3").Equalent=eval(Root_Display7+".tf3").Equalent=eval(Root_Display6+".tf2").Equalent=eval(Root_Display4+".tf2").Equalent=eval(Root_Display5+".tf2").Equalent=Root_Box1+".BaseFraction.tf3";
eval(Root_Display14+".tf3").Equalent = eval(Root_Display12+".tf4").Equalent=eval(Root_Display10+".tf3").Equalent=eval(Root_Display8+".tf4").Equalent=eval(Root_Display2+".tf2").Equalent=eval(Root_Display4+".tf3").Equalent=Root_Box2+".PowInteger.tf1";
eval(Root_Display15+".tf3").Equalent = eval(Root_Display13+".tf4").Equalent=eval(Root_Display11+".tf3").Equalent=eval(Root_Display9+".tf4").Equalent=eval(Root_Display3+".tf2").Equalent=eval(Root_Display5+".tf3").Equalent=Root_Box2+".PowFraction.tf1";
eval(Root_Display15+".tf4").Equalent = eval(Root_Display13+".tf5").Equalent=eval(Root_Display11+".tf4").Equalent=eval(Root_Display9+".tf5").Equalent=eval(Root_Display3+".tf3").Equalent=eval(Root_Display5+".tf4").Equalent=Root_Box2+".PowFraction.tf2";
eval(Root_Display10+".tf1").Equalent = eval(Root_Display11+".tf1").Equalent=eval(Root_Display12+".tf1").Equalent=eval(Root_Display13+".tf1").Equalent=Root_Box1+".BasePower.tf1";
eval(Root_Display10+".tf2").Equalent = eval(Root_Display11+".tf2").Equalent=eval(Root_Display12+".tf2").Equalent=eval(Root_Display13+".tf2").Equalent=Root_Box1+".BasePower.tf2";
eval(Root_Display12+".tf3").Equalent = eval(Root_Display13+".tf3").Equalent=Root_Box1+".BasePower.tf3";
eval(Root_Display15+".tf1").Equalent = eval(Root_Display14+".tf1").Equalent=Root_Box1+".BaseSquare.tf1";
eval(Root_Display15+".tf2").Equalent = eval(Root_Display14+".tf2").Equalent=Root_Box1+".BaseSquare.tf2";
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////Toggle Button Operation///////////////////////
for (Index=1; Index<=ToggleButton.length; Index++) {
	eval("Root_Box"+Index).No = Index;
	eval("Root_Box"+Index+"."+ToggleButton[Index-1]).No = Index;
	eval("Root_Box"+Index+"."+ToggleButton[Index-1])._visible = false;
	eval("Root_Box"+Index+"."+ToggleButton[Index-1]).onPress = function() {
		MouseDown();
	};
	eval("Root_Box"+Index+"."+ToggleButton[Index-1]).onRelease = function() {
		TextBox.ToggleOperation(eval("Root_Box"+this.No+"."+ToggleButton[this.No-1]), eval("Root_Box"+this.No+"."+TypesOfInteger[this.No-1]), eval("Root_Box"+this.No+"."+TypesOfFraction[this.No-1]), eval("Root_Box"+this.No+"."+"BasePower"), eval("Root_Box"+this.No+"."+"BaseSquare"));
	};
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////TextBox SetFocus////////////////////////////////
for (Index=1; Index<=TextBoxArray.length; Index++) {
	eval(TextBoxArray[Index-1]).restrict = "-0--9 A-Z a-z . ";
	eval(TextBoxArray[Index-1]).onSetFocus = function() {
		Parent = this._parent._parent._parent;
		Init();
		eval(Parent).MouseDown();
		DynamicVisible();
		Root_Box1._visible = true;
		if (Root_Box2.PowInteger.tf1.text != "") {
			Root_Box2._visible = true;
		}
		Parent = this._parent._parent._parent;
		eval("this._parent._parent._parent").Active = 0;
		TextBox.Focus(this, eval(this._parent._parent+"."+ToggleButton[this._parent._parent.No-1]));
		eval(Parent).SetActive();
	};
}
///////////////////////////////////////////////////////////////////////////////
function SetActive() {
	if ((eval(Root_Box1.BaseInteger)._visible)) {
		eval(Parent).Active = 1;
	}
	if (eval(Parent).Active == 1) {
		if ((eval(Root_Box2).PowInteger._visible) and (eval(Root_Box2).PowInteger.tf1.text != "")) {
			eval(Parent).Active = 2;
		}
		if ((eval(Root_Box2).PowFraction._visible) and (eval(Root_Box2).PowFraction.tf1.text != "")) {
			eval(Parent).Active = 3;
		}
	}
	if ((eval(Root_Box1).BaseFraction._visible) and (eval(Root_Box1).BaseFraction.tf1.text == "")) {
		eval(Parent).Active = 6;
		//if (eval("this._parent._parent._parent").Active == 6) {
		if ((eval(Root_Box2).PowInteger._visible) and (eval(Root_Box2).PowInteger.tf1.text != "")) {
			eval(Parent).Active = 4;
		}
		if ((eval(Root_Box2).PowFraction._visible) and (eval(Root_Box2).PowFraction.tf1.text != "")) {
			eval(Parent).Active = 5;
		}
		//}                               
	}
	if ((eval(Root_Box1).BaseFraction._visible) and (eval(Root_Box1).BaseFraction.tf1.text != "")) {
		eval(Parent).Active = 7;
	}
	if (eval(Parent).Active == 7) {
		if ((eval(Root_Box2).PowInteger._visible == true) and (eval(Root_Box2).PowInteger.tf1.text != "")) {
			eval(Parent).Active = 8;
		}
		if ((eval(Root_Box2).PowFraction._visible == true) and (eval(Root_Box2).PowFraction.tf1.text != "")) {
			eval(Parent).Active = 9;
		}
	}
	if (eval(Root_Box1).BasePower._visible) {
		eval(Parent).Active = 10;
	}
	if ((eval(Root_Box1).BasePower._visible) and (eval(Root_Box2)._visible)) {
		if ((eval(Root_Box1).BasePower.tf3.text == "1") or (eval(Root_Box1).BasePower.tf3.text == "")) {
			if (eval(Root_Box2).PowInteger._visible) {
				eval(Parent).Active = 10;
			}
			if (eval(Root_Box2).PowFraction._visible) {
				eval(Parent).Active = 11;
			}
		} else {
			if (eval(Root_Box2).PowInteger._visible) {
				eval(Parent).Active = 12;
			}
			if (eval(Root_Box2).PowFraction._visible) {
				eval(Parent).Active = 13;
			}
		}
	}
	if (eval(Root_Box1).BaseSquare._visible) {
		eval(Parent).Active = 14;
		if ((eval(Root_Box2).PowFraction._visible) and (eval(Root_Box2).PowFraction.tfl.text != "") and (eval(Root_Box2).PowFraction.tf2.text != "")) {
			eval(Parent).Active = 15;
		}
	}
}
for (Index=1; Index<=TextBoxArray.length; Index++) {
	eval(TextBoxArray[Index-1]).onKillFocus = function() {
		eval(Parent).Valid = TextBox.TextValidation(this);
		SetActive();
		for (Index=1; Index<=15; Index++) {
			for (Index1=1; Index1<=5; Index1++) {
				eval("Root_Display"+Index+".tf"+Index1).text = eval(eval("Root_Display"+Index+".tf"+Index1).Equalent).text;
			}
		}
	};
}
function Dynamic_Visible() {
	Init();
	for (Index=1; Index<=15; Index++) {
		eval("Root_Display"+Index).Minus._visible = false;
		eval("Root_Display"+Index).Minus1._visible = false;
		eval("Root_Display"+Index).Minus.selectable = false;
		eval("Root_Display"+Index).Minus1.selectable = false;
		for (Index1=1; Index1<=5; Index1++) {
			eval("Root_Display"+Index+".tf"+Index1).text = RemoveMinus(eval(eval("Root_Display"+Index+".tf"+Index1).Equalent));
		}
	}
	if (eval(Root_Box2).PowFraction.tf1.Minus == eval(Root_Box2).PowFraction.tf2.Minus) {
		eval(Root_Display15).Minus._visible = eval(Root_Display13).Minus1._visible=eval(Root_Display13).Minus._visible=eval(Root_Display11).Minus._visible=eval(Root_Display9).Minus._visible=eval(Root_Display3).Minus._visible=eval(Root_Display5).Minus._visible=false;
	} else {
		eval(Root_Display15).Minus._visible = eval(Root_Display13).Minus1._visible=eval(Root_Display13).Minus._visible=eval(Root_Display11).Minus._visible=eval(Root_Display9).Minus._visible=eval(Root_Display3).Minus._visible=eval(Root_Display5).Minus._visible=true;
	}
	if (eval(Root_Box1).BasePower.tf3.Minus == eval(Root_Box1).BasePower.tf2.Minus) {
		eval(Root_Display10).Minus._visible = eval(Root_Display11).Minus._visible=eval(Root_Display12).Minus._visible=eval(Root_Display13).Minus._visible=false;
	} else if (Math.abs(Number(eval(Root_Box1).BasePower.tf3.text))<>1) {
		eval(Root_Display10).Minus._visible = eval(Root_Display11).Minus._visible=eval(Root_Display12).Minus._visible=eval(Root_Display13).Minus._visible=true;
	}
	if ((eval(Root_Box1).BasePower.tf3.Minus<>eval(Root_Box1).BasePower.tf2.Minus) and (Math.abs(Number(eval(Root_Box1).BasePower.tf3.text)) == 1)) {
		eval(Root_Display10).tf2.text = eval(Root_Display11).tf2.text="– "+Math.abs(Number(eval(Root_Box1).BasePower.tf2.text));
	}
	if (eval(Root_Box1).BaseFraction.tf1.text == "") {
		if (eval(Root_Box1).BaseFraction.tf2.Minus == eval(Root_Box1).BaseFraction.tf3.Minus) {
			eval(Root_Display4).Minus._visible = eval(Root_Display5).Minus1._visible=eval(Root_Display6).Minus._visible=false;
		} else {
			eval(Root_Display4).Minus._visible = eval(Root_Display5).Minus1._visible=eval(Root_Display6).Minus._visible=true;
		}
	}
	TempArray = [eval(Root_Box2).PowInteger.tf1, eval(Root_Display12).tf4, eval(Root_Display10).tf3, eval(Root_Display8).tf4, eval(Root_Display4).tf3, eval(Root_Display2).tf2];
	AddMinus(TempArray);
	TempArray = [eval(Root_Box1).BaseInteger.tf1, eval(Root_Display1).tf1, eval(Root_Display2).tf1, eval(Root_Display3).tf1];
	AddMinus(TempArray);
	TempArray = [eval(Root_Box1).BaseFraction.tf1, eval(Root_Display7).tf1, eval(Root_Display8).tf1, eval(Root_Display9).tf1];
	AddMinus(TempArray);
	TempArray = [eval(Root_Box1).BasePower.tf1, eval(Root_Display13).tf1, eval(Root_Display10).tf1, eval(Root_Display12).tf1, eval(Root_Display11).tf1, eval(Root_Display10).tf1];
	AddMinus(TempArray);
	TempArray = [eval(Root_Box1).BaseFraction.tf2, eval(Root_Display7).tf2, eval(Root_Display8).tf2, eval(Root_Display9).tf2];
	AddMinus(TempArray);
	TempArray = [eval(Root_Box1).BaseFraction.tf3, eval(Root_Display7).tf3, eval(Root_Display8).tf3, eval(Root_Display9).tf3];
	AddMinus(TempArray);
	eval(Root_Box1)._visible = eval(Root_Box2)._visible=false;
	//...............................eval(Parent).Enabled(true)
	DynamicVisible();
	eval("Root_Display"+Active)._visible = true;
	eval("Root_Display"+Active).enabled = true;
	eval("Root_Display"+Active).tf1.selectable = true;
	//-------------------------------------21.09.2005
	Align_Box();
	//-------------------------------------
	for (Index=1; Index<=15; Index++) {
		for (Index1=1; Index1<=5; Index1++) {
			if (eval("Root_Display"+Active+".tf"+Index1)<>undefined) {
				eval(Parent).Valid = TextBox.TextValidation(eval("Root_Display"+Active+".tf"+Index1));
				//trace("Enter"+eval(Parent).Valid+","+TextBox.TextValidation(eval("Root_Display"+Active+".tf"+Index1)));
			}
			for (i=0; i<length(eval("Root_Display"+Index+".tf"+Index1).text); i++) {
				if (((ord(eval("Root_Display"+Index+".tf"+Index1).text.charAt(i))>=65) and (ord(eval("Root_Display"+Index+".tf"+Index1).text.charAt(i))<=90)) or ((ord(eval("Root_Display"+Index+".tf"+Index1).text.charAt(i))>=97) and (ord(eval("Root_Display"+Index+".tf"+Index1).text.charAt(i))<=122))) {
					eval("Root_Display"+Index+".tf"+Index1).setTextFormat(i, (i+1), My_Fmt);
				}
			}
		}
	}
	this.KillFocus();
}
function RemoveMinus(TextFields) {
	if (eval(TextFields).text.substr(0, 1) == "-") {
		eval(TextFields).Minus = true;
		//return (eval(TextFields).text.substr(1)); -- Original Code
		return (eval(TextFields).text);
	} else {
		eval(TextFields).Minus = false;
		return (eval(TextFields).text);
	}
}
function AddMinus(Fields:Array) {
	if (eval(Fields[0]).Minus) {
		MinusSymbol = "–";
	} else {
		MinusSymbol = "";
	}
	for (Index=1; Index<Fields.length; Index++) {
		eval(Fields[Index]).text = MinusSymbol+RemoveMinus(eval(Fields[Index]));
	}
}
function BoxType() {
	Parent = eval(Selection.getFocus())._parent._parent._parent;
	Init();
	switch (eval(Parent).Active) {
	case 1 :
		if (eval(Parent).WholeNumber) {
			eval(Parent).Active = 1;
			TextBox1 = eval(Root_Box1+".BaseInteger.tf1");
		}
		break;
	case 2 :
		break;
	case 3 :
		break;
	case 4 :
		break;
	case 5 :
		break;
	case 6 :
		break;
	case 7 :
		break;
	case 8 :
		break;
	case 9 :
		break;
	case 10 :
		break;
	case 11 :
		break;
	case 12 :
		break;
	case 13 :
		break;
	}
}
//------------------------------------------------21.09.2005
function Align_Box() {
	(eval(Root_Display3).tf1.text.length == 1) ? (eval(Root_Display3)._x=Root3_X-10) & (eval(Root_Display3).Left_Bracket._x=LB_X+20) : "";
	(eval(Root_Display3).tf1.text.length == 2) ? (eval(Root_Display3)._x=Root3_X-5) & (eval(Root_Display3).Left_Bracket._x=LB_X+10) : "";
	(eval(Root_Display3).tf1.text.length == 3) ? (eval(Root_Display3)._x=Root3_X) & (eval(Root_Display3).Left_Bracket._x=LB_X) : "";
}
//-----------------------------------------------End
