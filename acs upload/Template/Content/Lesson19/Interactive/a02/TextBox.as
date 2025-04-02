class TextBox {
	public static var CurrentMovie:MovieClip;
	public static function Initalize(Movie:MovieClip) {
		CurrentMovie = Movie;
	}
	public static function ToggleOperation(ButtonName:MovieClip, Movie1:MovieClip, Movie2:MovieClip, Movie3:MovieClip, Movie4:MovieClip):Void {
		if (Movie1._visible) {
			Movie2._visible = true;
			Movie1._visible = false;
			Movie3._visible = false;
			Movie4._visible = false;
			Selection.setFocus(String(eval(Movie2.tf1)));
		} else if (Movie2._visible) {
			if (typeof Movie3 == "movieclip") {
				Movie3._visible = true;
				Movie1._visible = false;
				Movie4._visible = false;
				Selection.setFocus(String(eval(Movie3.tf1)));
			} else {
				Movie3._visible = false;
				Movie1._visible = true;
				Selection.setFocus(String(eval(Movie1.tf1)));
			}
			Movie2._visible = false;
			//eval(ButtonName)._x = Movie3._x;
			//eval(ButtonName)._y = Movie3._y;
		} else if (Movie3._visible) {
			Movie3._visible = false;
			Movie2._visible = false;
			if (eval(ButtonName._parent._parent).RootBox == true) {
				Movie4._visible = true;
				Movie1._visible = false;
				Selection.setFocus(String(eval(Movie4.tf1)));
			} else {
				Movie4._visible = false;
				Movie1._visible = true;
				Selection.setFocus(String(eval(Movie1.tf1)));
			}
			//eval(ButtonName)._x = Movie4._x;
			//eval(ButtonName)._y = Movie4._y;
		} else if (Movie4._visible) {
			Movie4._visible = false;
			Movie3._visible = false;
			Movie2._visible = false;
			Movie1._visible = true;
			//eval(ButtonName)._x = Movie1._x;
			//eval(ButtonName)._y = Movie1._y;
			Selection.setFocus(String(eval(Movie1.tf1)));
		}
	}
	public static function Focus(TextBox:TextField, Toggle:MovieClip):Void {
		if (eval(Toggle)._parent._parent.WholeNumber) {
			eval(Toggle)._visible = false;
		} else if (eval(Toggle)._parent._parent.RootBox) {
			eval(Toggle)._parent.BaseInteger._visible = false;
			eval(Toggle)._parent.BaseFraction._visible = false;
			eval(Toggle)._parent.BasePower._visible = false;
			eval(Toggle)._parent.BaseSquare._visible = true;
			//Selection.setFocus(eval(Toggle)._parent+".BaseSquare.tf1");
			eval(Toggle)._visible = false;
		} else if (eval(Toggle)._parent._parent.DoublePower) {
			eval(Toggle)._parent.BaseInteger._visible = false;
			eval(Toggle)._parent.BaseFraction._visible = false;
			eval(Toggle)._parent.BasePower._visible = true;
			eval(Toggle)._parent.BaseSquare._visible = false;
			//Selection.setFocus(eval(Toggle)._parent+".BaseSquare.tf1");
			eval(Toggle)._visible = false;
		} else {
			eval(Toggle)._visible = true;
		}
	}
	public static function TextValidation(TextBoxName:TextField):Boolean {
		var RetrunValue = NumberCon(RemoveSpace(eval(TextBoxName).text));
		if (RetrunValue<>"false") {
			eval(TextBoxName).text = Separator(RetrunValue);
			return (ActiveValidation(eval(TextBoxName)._parent));
		} else {
			return (false);
		}
	}
	public static function NumberCon(TextBoxValue:String):String {
		if ((!isNaN(Number(TextBoxValue))) and (TextBoxValue.indexOf("e") == -1)) {
			TextBoxValue = String(Number(TextBoxValue));
			return (TextBoxValue);
		} else {
			return ("false");
		}
	}
	public static function Separator(TextBoxValue:String):String {
		var TempArr:Array;
		var Text:String;
		if (TextBoxValue<>"") {
			TempArr = TextBoxValue.split(".");
			Text = "";
			for (var Index1 = length(TempArr[0])-1; Index1>=0; Index1--) {
				if (((length(TempArr[0])-Index1)%3==0) and (length(TempArr[0])>3)) {
					Text = " "+TempArr[0].charAt(Index1)+Text;
				} else {
					Text = TempArr[0].charAt(Index1)+Text;
				}
			}
			TempArr[0] = Text;
			if (TempArr.length == 2) {
				TempArr[1] = "."+TempArr[1];
			}
			TextBoxValue = "";
			for (Index1=0; Index1<TempArr.length; Index1++) {
				TextBoxValue += TempArr[Index1];
			}
		}
		return (TextBoxValue);
	}
	public static function RemoveSpace(TextBoxValue:String):String {
		var Text:String = "";
		for (var Index = 0; Index<length(TextBoxValue); Index++) {
			if (TextBoxValue.charAt(Index) != " ") {
				Text += TextBoxValue.charAt(Index);
			}
		}
		return (Text);
	}
	public static function ActiveValidation(TextBoxValue:MovieClip):Boolean {
		var TempMovieClip = eval(TextBoxValue)._parent._parent.Text_Box1;
		if ((eval(TempMovieClip).BaseInteger._visible) and (eval(TempMovieClip).BaseInteger.tf1.text == "")) {
			return (false);
		} else if ((eval(TempMovieClip).BaseFraction._visible) and ((eval(TempMovieClip).BaseFraction.tf2.text == "") or (eval(TempMovieClip).BaseFraction.tf3.text == ""))) {
			return (false);
		} else if (eval(TempMovieClip).BasePower._visible) {
			if ((eval(TempMovieClip).BasePower.tf1.text == "") or (eval(TempMovieClip).BasePower.tf2.text == "") or (eval(TempMovieClip).BasePower.tf3.text == "")) {
				return (false);
			}
			if ((!eval(TempMovieClip)._parent.Text_Box2.PowInteger._visible) and (!eval(TempMovieClip)._parent.Text_Box2.PowFraction._visible)) {
				return (false);
			}
			if ((eval(TempMovieClip)._parent.Text_Box2.PowInteger._visible) and (eval(TempMovieClip)._parent.Text_Box2.PowInteger.tf1.text == "")) {
				return (false);
			} else if ((eval(TempMovieClip)._parent.Text_Box2.PowFraction._visible) and ((eval(TempMovieClip)._parent.Text_Box2.PowFraction.tf1.text == "") or (eval(TempMovieClip)._parent.Text_Box2.PowFraction.tf2.text == ""))) {
				return (false);
			} else {
				return (true);
			}
		} else if ((eval(TempMovieClip).BaseSquare._visible) and (eval(TempMovieClip).BaseSquare.tf2.text == "")) {
			return (false);
		} else {
			return (true);
		}
	}
}
