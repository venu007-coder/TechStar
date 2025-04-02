function Set_Focus() {
	BoxType();
	Parent = eval(Selection.getFocus())._parent._parent._parent;
	//Init();
	Current_Focus = eval(Selection.getFocus())._parent._name;
	//	if ((eval(Selection.getFocus()) == eval("_parent."+Parent+".Text_Box2.PowFraction.tf2")) or (eval(Selection.getFocus()) == eval("_parent."+Parent+".Text_Box2.PowInteger.tf1"))) {
	if ((eval(Selection.getFocus()) == eval(TextBox1)) or (eval(Selection.getFocus()) == eval(TextBox2))) {
		var NextFocus = eval("_parent."+Parent).NextBox;
		//trace(eval("_parent."+NextFocus+"."+ActiveSet[eval("_parent."+NextFocus).Active]));
		eval(Parent).Dynamic_Visible();
		Selection.setFocus(eval("_parent."+NextFocus+"."+ActiveSet[eval("_parent."+NextFocus).Active]));
		eval(Parent).ReturnValue();
		eval(Parent).SetActive();
		//eval(Parent).KillFocus();
		//this.KillFocus();
	} else if (Current_Focus == "BaseInteger") {
		eval("_parent."+Parent+".Text_Box2")._visible = true;
		//eval("_parent."+Parent+".Text_Box2.PowFraction")._visible = true;
		//eval("_parent."+Parent+".Text_Box2.PowInteger")._visible = true;
		if (eval("_parent."+Parent+".Text_Box2.PowInteger")._visible) {
			//eval("_parent."+Parent+".Text_Box2.PowFraction")._visible = false;
			Selection.setFocus("_parent."+Parent+".Text_Box2.PowInteger.tf1");
		} else if (eval("_parent."+Parent+".Text_Box2.PowFraction")._visible) {
			Selection.setFocus("_parent."+Parent+".Text_Box2.PowFraction.tf1");
		} else {
			eval("_parent."+Parent+".Text_Box2.PowInteger")._visible = true;
			Selection.setFocus("_parent."+Parent+".Text_Box2.PowInteger.tf1");
		}
	} else if (Current_Focus == "BaseFraction") {
		Count = Number(eval(Selection.getFocus())._name.substr(2))+1;
		FocusSet(Count, 3, Current_Focus);
	} else if (Current_Focus == "BasePower") {
		Count = Number(eval(Selection.getFocus())._name.substr(2))+1;
		FocusSet(Count, 3, Current_Focus);
	} else if (Current_Focus == "BaseSquare") {
		Count = Number(eval(Selection.getFocus())._name.substr(2))+1;
		FocusSet(Count, 2, Current_Focus);
	} else if (eval(Selection.getFocus()) == eval("_parent."+Parent+".Text_Box2.PowFraction.tf1")) {
		Selection.setFocus("_parent."+Parent+".Text_Box2.PowFraction.tf2");
	}
}
function FocusSet(Count, MaxCount, Current_Focus) {
	if (Count<=MaxCount) {
		Selection.setFocus("_parent."+Parent+".Text_Box1."+Current_Focus+".tf"+Count);
	} else {
		Count = 1;
		eval("_parent."+Parent+".Text_Box2")._visible = true;
		eval("_parent."+Parent+".Text_Box2.PowFraction")._visible = true;
		eval("_parent."+Parent+".Text_Box2.PowInteger")._visible = true;
		if (eval("_parent."+Parent+".Text_Box2.PowFraction.tf1").text == "") {
			eval("_parent."+Parent+".Text_Box2.PowFraction")._visible = false;
			Selection.setFocus("_parent."+Parent+".Text_Box2.PowInteger.tf1");
		} else {
			eval("_parent."+Parent+".Text_Box2.PowInteger")._visible = false;
			Selection.setFocus("_parent."+Parent+".Text_Box2.PowFraction.tf1");
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------02-09-2005
function DynamicVisible(Start) {
	for (q=1; q<=15; q++) {
		if (Start<>q) {
			eval("Root_Display"+q)._visible = false;
		}
	}
}
DynamicVisible(1);
My_Fmt = new TextFormat();
My_Fmt.italic = true;
My_Fmt.font = "My_Font";
for (s=0; s<=TextBoxArray.length; s++) {
	eval(TextBoxArray[s]).onChanged = function() {
		for (i=0; i<length(this.text); i++) {
			if (((ord(this.text.charAt(i))>=65) and (ord(this.text.charAt(i))<=90)) or ((ord(this.text.charAt(i))>=97) and (ord(this.text.charAt(i))<=122))) {
				this.setTextFormat(i, (i+1), My_Fmt);
			}
		}
		eval(Parent).SetActive();
		eval(Parent).ReturnValue();
		this._parent._parent._parent.TextChange();
	};
}
for (Index=1; Index<=15; Index++) {
	for (Index1=1; Index1<=5; Index1++) {
		eval("Root_Display"+Index+".tf"+Index1).onSetFocus = function() {
			BeforeFocus();
			Id = setInterval(CursorFocus, 1, this.Equalent, eval(this.Equalent).text);
			eval(this.Equalent).text = "";
		};
	}
}
function CursorFocus(val, val1) {
	Selection.setFocus(val);
	eval(val).text = val1;
	clearInterval(Id);
}
function BeforeFocus() {
	for (Index=1; Index<=15; Index++) {
		for (Index1=1; Index1<=5; Index1++) {
			eval("Root_Display"+Index)._visible = false;
		}
	}
	eval(Root_Box1)._visible = true;
	eval(Root_Box2)._visible = true;
	if ((Active == 1) or (Active == 6) or (Active == 7)) {
		eval(Root_Box2)._visible = false;
	}
}
function Delete() {
	//gotoAndPlay(1);
	eval(Root_Box2)._visible = false;
	eval(Root_Box1).BaseFraction._visible = false;
	eval(Root_Box1).BasePower._visible = false;
	eval(Root_Box1).BaseSquare._visible = false;
	eval(Root_Box1).BaseInteger._visible = true;
	Active = 1;
	for (Index=0; Index<TextBoxArray.length; Index++) {
		eval(TextBoxArray[Index]).text = "";
	}
	eval(Root_Box1)._visible = false;
	for (Indexx=1; Indexx<15; Indexx++) {
		eval("Root_Display"+Indexx)._visible = false;
		for (ss=1; ss<=5; ss++) {
			eval("Root_Display"+Indexx+".tf"+ss).text = "";
		}
	}
	eval("Root_Display1")._visible = true;
}
function ReturnValue() {
	var Value1 = eval(Root_Box1+".BaseInteger.tf1").text;
	var Value2 = eval(Root_Box2+".PowInteger.tf1").text;
	var Value3 = eval(Root_Box2+".PowFraction.tf1").text;
	var Value4 = eval(Root_Box2+".PowFraction.tf2").text;
	var Value5 = eval(Root_Box1+".BaseFraction.tf1").text;
	var Value6 = eval(Root_Box1+".BaseFraction.tf2").text;
	var Value7 = eval(Root_Box1+".BaseFraction.tf3").text;
	var Value8 = eval(Root_Box1+".BasePower.tf1").text;
	var Value9 = eval(Root_Box1+".BasePower.tf2").text;
	var Value10 = eval(Root_Box1+".BasePower.tf3").text;
	var Value11 = eval(Root_Box1+".BaseSquare.tf1").text;
	var Value12 = eval(Root_Box1+".BaseSquare.tf2").text;
	eval("_parent."+Parent).Text1 = undefined;
	eval("_parent."+Parent).Text2 = undefined;
	eval("_parent."+Parent).Text3 = undefined;
	eval("_parent."+Parent).Text4 = undefined;
	eval("_parent."+Parent).Text5 = undefined;
	switch (eval(Parent).Active) {
	case 1 :
		eval("_parent."+Parent).Text1.restrict = "a-z 0-9.\\-";
		eval("_parent."+Parent).Value = Value1;
		eval("_parent."+Parent).Text1 = Value1;
		eval("_parent."+Parent).Group_Value = Value1;
		break;
	case 2 :
		eval("_parent."+Parent).Value = Math.pow(Value1, Value2);
		eval("_parent."+Parent).Text1 = Value1;
		eval("_parent."+Parent).Text2 = Value2;
		eval("_parent."+Parent).Group_Value = Value1+"$"+Value2;
		break;
	case 3 :
		eval("_parent."+Parent).Value = Math.pow(Value1, (Value3/Value4));
		eval("_parent."+Parent).Text1 = Value1;
		eval("_parent."+Parent).Text2 = Value3;
		eval("_parent."+Parent).Text3 = Value4;
		eval("_parent."+Parent).Group_Value = Value1+"$"+Value3+"$"+Value4;
		break;
	case 4 :
		eval("_parent."+Parent).Value = Math.pow((Value6/Value7), Value2);
		eval("_parent."+Parent).Text1 = Value6;
		eval("_parent."+Parent).Text2 = Value7;
		eval("_parent."+Parent).Text3 = Value2;
		eval("_parent."+Parent).Group_Value = Value6+"$"+Value7+"$"+Value2;
		break;
	case 5 :
		eval("_parent."+Parent).Value = Math.pow((Value6/Value7), (Value3/Value4));
		eval("_parent."+Parent).Text1 = Value6;
		eval("_parent."+Parent).Text2 = Value7;
		eval("_parent."+Parent).Text3 = Value3;
		eval("_parent."+Parent).Text4 = Value4;
		eval("_parent."+Parent).Group_Value = Value6+"$"+Value7+"$"+Value3+"$"+Value4;
		break;
	case 6 :
		eval("_parent."+Parent).Value = (Value6/Value7);
		eval("_parent."+Parent).Text1 = Value6;
		eval("_parent."+Parent).Text2 = Value7;
		eval("_parent."+Parent).Group_Value = Value6+"$"+Value7;
		break;
	case 7 :
		eval("_parent."+Parent).Value = ((Value5*Value7)+Value6)/Value7;
		eval("_parent."+Parent).Text1 = Value5;
		eval("_parent."+Parent).Text2 = Value6;
		eval("_parent."+Parent).Text3 = Value7;
		eval("_parent."+Parent).Group_Value = Value5+"$"+Value6+"$"+Value7;
		break;
	case 8 :
		eval("_parent."+Parent).Value = Math.pow(Value5*(Value6/Value7), Value2);
		eval("_parent."+Parent).Text1 = Value5;
		eval("_parent."+Parent).Text2 = Value6;
		eval("_parent."+Parent).Text3 = Value7;
		eval("_parent."+Parent).Text4 = Value2;
		eval("_parent."+Parent).Group_Value = Value5+"$"+Value6+"$"+Value7+"$"+Value2;
		break;
	case 9 :
		eval("_parent."+Parent).Value = Math.pow(Value5*(Value6/Value7), (Value3/Value4));
		eval("_parent."+Parent).Text1 = Value5;
		eval("_parent."+Parent).Text2 = Value6;
		eval("_parent."+Parent).Text3 = Value7;
		eval("_parent."+Parent).Text4 = Value3;
		eval("_parent."+Parent).Text4 = Value4;
		eval("_parent."+Parent).Group_Value = Value5+"$"+Value6+"$"+Value7+"$"+Value3+"$"+Value4;
		break;
	case 10 :
		eval("_parent."+Parent).Value = Math.pow(Math.pow(Value8, Value9), Value2);
		eval("_parent."+Parent).Text1 = Value8;
		eval("_parent."+Parent).Text2 = Value9;
		eval("_parent."+Parent).Text3 = Value2;
		eval("_parent."+Parent).Group_Value = Value8+"$"+Value9+"$"+Value2;
		break;
	case 11 :
		eval("_parent."+Parent).Value = Math.pow(Math.pow(Value8, Value9), (Value3/Value4));
		eval("_parent."+Parent).Text1 = Value8;
		eval("_parent."+Parent).Text2 = Value9;
		eval("_parent."+Parent).Text3 = Value3;
		eval("_parent."+Parent).Text4 = Value4;
		eval("_parent."+Parent).Group_Value = Value8+"$"+Value9+"$"+Value3+"$"+Value4;
		break;
	case 12 :
		eval("_parent."+Parent).Value = Math.pow(Math.pow(Value8, (Value9/Value10)), Value2);
		eval("_parent."+Parent).Text1 = Value8;
		eval("_parent."+Parent).Text2 = Value9;
		eval("_parent."+Parent).Text3 = Value10;
		eval("_parent."+Parent).Text4 = Value2;
		eval("_parent."+Parent).Group_Value = Value8+"$"+Value9+"$"+Value10+"$"+Value2;
		break;
	case 13 :
		eval("_parent."+Parent).Value = Math.pow(Math.pow(Value8, (Value9/Value10)), (Value3/Value4));
		eval("_parent."+Parent).Text1 = Value8;
		eval("_parent."+Parent).Text2 = Value9;
		eval("_parent."+Parent).Text3 = Value10;
		eval("_parent."+Parent).Text4 = Value3;
		eval("_parent."+Parent).Text4 = Value4;
		eval("_parent."+Parent).Group_Value = Value8+"$"+Value9+"$"+Value10+"$"+Value3+"$"+Value4;
		break;
	case 14 :
		if ((Value11 == "") and (Value2 == "")) {
			eval("_parent."+Parent).Value = Math.sqrt(Value12);
		} else if (Value2 == "") {
			eval("_parent."+Parent).Value = Math.pow(Value12, (1/Value11));
		} else if (Value11 == "") {
			eval("_parent."+Parent).Value = Math.pow(Math.sqrt(Value12), Value2);
		} else {
			eval("_parent."+Parent).Value = Math.pow(Math.pow(Value12, (1/Value11)), Value2);
		}
		eval("_parent."+Parent).Text1 = Value11;
		eval("_parent."+Parent).Text2 = Value12;
		eval("_parent."+Parent).Text3 = Value2;
		eval("_parent."+Parent).Group_Value = Value11+"$"+Value12+"$"+Value2;
		break;
	case 15 :
		if ((Value3 == "") or (Value4 == "")) {
			eval("_parent."+Parent).Value = Math.pow(Value12, (1/Value11));
		} else if ((Value11 == "") and (Value3="") and (Value4="")) {
			eval("_parent."+Parent).Value = Math.sqrt(Value12);
		} else {
			eval("_parent."+Parent).Value = Math.pow((Value11*Math.sqrt(Value12)), (Value3/Value4));
		}
		eval("_parent."+Parent).Text1 = Value11;
		eval("_parent."+Parent).Text2 = Value12;
		eval("_parent."+Parent).Text3 = Value3;
		eval("_parent."+Parent).Text3 = Value4;
		eval("_parent."+Parent).Group_Value = Value11+"$"+Value12+"$"+Value3+"$"+Value4;
		break;
	}
}
eval(Parent).isEnabled = true;
function Enabled(Value) {
	Parent = this._name;
	Init();
	for (Index=1; Index<=15; Index++) {
		eval(Root_Box1+".BaseInteger.tf1").selectable = Value;
		for (Index1=1; Index1<=5; Index1++) {
			eval("Root_Display"+Index+".tf"+Index1).selectable = Value;
		}
	}
	eval("_parent."+Parent).isEnabled = Value;
}
function SetFocus(TextToFocus) {
	var MovieName:MovieClip;
	if (eval("Root_Display"+Active).tf1.selectable) {
		if (TextToFocus == undefined) {
			eval(Root_Box2)._visible = false;
			MovieName = eval(Root_Box1).BaseInteger;
			if (eval(Root_Box2)._parent.RootBox) {
				MovieName = eval(Root_Box1).BaseSquare;
			} else if (eval(Root_Box2)._parent.DoublePower) {
				MovieName = eval(Root_Box1).BasePower;
			}
			Hide(MovieName);
			Active = 1;
			Selection.setFocus(MovieName+".tf1");
		} else {
			Selection.setFocus("Root_Display"+Active+".tf"+TextToFocus.substr(4));
		}
	}
}
function ChangeText(TextToChange, ChangeValue) {
	Parent = this._name;
	Init();
	OrgTextBoxName = eval("Root_Display"+Active+".tf"+TextToChange.substr(4)).Equalent;
	eval("Root_Display"+Active+".tf"+TextToChange.substr(4)).text = eval(OrgTextBoxName).text=ChangeValue;
	eval(Parent).ReturnValue();
	//trace(eval("Root_Display"+Active+".tf"+TextToChange.substr(4))+","+eval(OrgTextBoxName));
	//eval(Parent).Dynamic_Visible();
	ChangeValue = "";
	eval(Root_Box1)._visible = false;
	eval(Root_Box2)._visible = false;
	eval("Root_Display"+Active)._visible = true;
}
function Restrict(RestrictValue) {
	for (Index=1; Index<=TextBoxArray.length; Index++) {
		eval(TextBoxArray[Index-1]).restrict = RestrictValue;
	}
}
function MouseDown() {
	eval(Parent).onMouseDown = function() {
		if (this.hitTest(_root._xmouse, _root._ymouse, true)) {
		} else {
			//eval(Parent).SetActive();
			//eval(Parent).Valid = TextBox.TextValidation(eval(TextBoxArray[Index-1]));
			eval(Parent).Dynamic_Visible();
			//this.KillFocus();
			delete eval(Parent).onMouseDown;
		}
	};
}
function ToggleChange() {
	Parent = eval(Selection.getFocus())._parent._parent._parent;
	Init();
	if ((eval(Parent).WholeNumber<>true) and (eval(Parent).RootBox<>true)) {
		if (eval(Selection.getFocus())._parent._parent._name.toString() == "Text_Box1") {
			eval(Root_Box1+".ToggleBase").onPress();
			eval(Root_Box1+".ToggleBase").onRelease();
		}
		if (eval(Selection.getFocus())._parent._parent._name.toString() == "Text_Box2") {
			eval(Root_Box2+".TogglePower").onPress();
			eval(Root_Box2+".TogglePower").onRelease();
		}
	}
}
function Hide(MovieName) {
	eval(Root_Box1).BaseFraction._visible = false;
	eval(Root_Box1).BasePower._visible = false;
	eval(Root_Box1).BaseSquare._visible = false;
	eval(Root_Box1).BaseInteger._visible = false;
	eval(MovieName)._visible = true;
}
