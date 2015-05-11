if( typeof visualise == 'undefined')
{
	visualise = {};
}
visualise.InsertionSort = Class({
	"constructor" : function(startx, starty, arr){
			var context = this;
		    context.startx = startx;
		    context.starty = starty;
		    context.values = arr;
		    context.outer_pointer = "";
		    context.inner_pointer = "";
		    context.op1Value = "";
		    context.op2Value = "";
		    context.innerPointerIndex = "";
		    context.outerPointerIndex = "";
		    var unsorted = Constants && Constants["bubble"] && Constants["bubble"]["unsorted"];
	        if (unsorted) {
	            var attribs = {
	                "element": unsorted
	            };
	        }
	        if (arr && arr instanceof Array) {
	            context.arr = new MyArray(startx || 100, starty || 100, Constants["bubble"]["width"] || 50, Constants["bubble"]["width"] || 50, arr, attribs);
	        } else {
	            context.arr = new MyArray(startx || 100, starty || 100, Constants["bubble"]["width"] || 50, Constants["bubble"]["width"] || 50, [4, 1, 22, 3, 3, 6, 2, 15, 2, 1, 12, 10, 15], attribs);
	        }
	        context.values = context.arr.getValues();

	        context.len = context.values.length;
	        for (var i in context.values) {
	            context.values[i] = parseInt(context.values[i]);
	        }
	        //context.startSort = startSort;
	        this.initialiseComparisonOperators();

	        /** all the params should be initialised as the objects in the contructor **/
	        this.moveToCompariosonParams = {};
	        this.compareItParams = {};
	        this.initialiseInnerPointerParams = {};
	        this.initialiseOuterPointerParams = {};
            this.initialiseOuterPointerParams["outerPointerIndex"] = 2;

            this.initialiseCode();
            this.staticAssigmentOfCode();
	},
    "initialiseCode" : function()
    {
        var codeString = 'var outer = 2;\nwhile(outer < length){\n     var key = Array[outer];\n  var inner = outer - 1;\n  while( inner > 0 && Array[inner] > key ){\n     Array[inner+1] = Array[inner]\n     inner = inner - 1;\n  }\n  Array[inner+1] = key;\nouter = outer+1;\n}\n';
        var codeANMProps = Constants["insertion"] && Constants["insertion"]["codeANM"];
        codeANMProps = (codeANMProps)?codeANMProps:{"highliteColor":"#009900","normalColor":"#808066"};
        this.insertionCodeANM = new visualise.codeANM(codeString,codeANMProps);
    },
    "staticAssigmentOfCode" : function(){
    	var codeLineMap = this.insertionCodeANM && this.insertionCodeANM.getCodeLineMap();
    	if( codeLineMap ){
            codeLineMap["1"] && ( codeLineMap["1"]["statementType"] = "ASSIGMENT" );
            codeLineMap["1"] && ( codeLineMap["1"]["nextLine"] = "2" );
            codeLineMap["1"] && ( codeLineMap["1"]["handler"] = this.initialiseOuterPointer );
            codeLineMap["1"] && ( codeLineMap["1"]["comments"] = "initialising_the_outer_pointer" );
            
            codeLineMap["2"] && ( codeLineMap["2"]["statementType"] = "WHILE_CONDITIONAL" );
            codeLineMap["2"] && codeLineMap["2"]["statementDefinedProps"] && (codeLineMap["2"]["statementDefinedProps"]["WHILE_CONDITIONAL_TRUE_LINE_NUM"] = "3");
            codeLineMap["2"] && codeLineMap["2"]["statementDefinedProps"] && (codeLineMap["2"]["statementDefinedProps"]["WHILE_CONDITIONAL_FALSE_LINE_NUM"] = "12");
            codeLineMap["2"] && ( codeLineMap["2"]["handler"] = this.checkingOuterWithLength);
            codeLineMap["2"] && ( codeLineMap["2"]["comments"] = "checking_length_outer+pointer" );

            codeLineMap["3"] && ( codeLineMap["3"]["statementType"] = "ASSIGMENT" );
            codeLineMap["3"] && ( codeLineMap["3"]["nextLine"] = "4" );
            codeLineMap["3"] && ( codeLineMap["3"]["handler"] = this.moveTheKeyValue);
            codeLineMap["3"] && ( codeLineMap["3"]["comments"] = "moving_keyvalue");

            codeLineMap["4"] && ( codeLineMap["4"]["statementType"] = "ASSIGMENT" );
            codeLineMap["4"] && ( codeLineMap["4"]["nextLine"] = "5" );
            codeLineMap["4"] && ( codeLineMap["4"]["handler"] = this.initialiseInnerPointer);
            codeLineMap["4"] && ( codeLineMap["4"]["comments"] = "assigning_the_innerPointer");

            codeLineMap["5"] && ( codeLineMap["5"]["statementType"] = "WHILE_CONDITIONAL" );
            codeLineMap["5"] && codeLineMap["5"]["statementDefinedProps"] && (codeLineMap["5"]["statementDefinedProps"]["WHILE_CONDITIONAL_TRUE_LINE_NUM"] = "6");
            codeLineMap["5"] && codeLineMap["5"]["statementDefinedProps"] && (codeLineMap["5"]["statementDefinedProps"]["WHILE_CONDITIONAL_FALSE_LINE_NUM"] = "9");
            codeLineMap["5"] && ( codeLineMap["5"]["handler"] = this.moveTheValueForComparision);
            codeLineMap["5"] && ( codeLineMap["5"]["comments"] = "comparing the values with inner for loop");

            codeLineMap["6"] && ( codeLineMap["6"]["statementType"] = "ASSIGMENT" );
            codeLineMap["6"] && ( codeLineMap["6"]["nextLine"] = "7" );
            codeLineMap["6"] && ( codeLineMap["6"]["handler"] = this.moveTheValueElement);
            codeLineMap["6"] && ( codeLineMap["6"]["comments"] = "moving the element in to its higher index");

            codeLineMap["7"] && ( codeLineMap["7"]["statementType"] = "ASSIGMENT" );
            codeLineMap["7"] && ( codeLineMap["7"]["nextLine"] = "8" );
            codeLineMap["7"] && ( codeLineMap["7"]["handler"] = this.decrementInnerPointer);
            codeLineMap["7"] && ( codeLineMap["7"]["comments"] = "decrementing the inner pointer");

            codeLineMap["8"] && ( codeLineMap["8"]["statementType"] = "ASSIGMENT" );
            codeLineMap["8"] && ( codeLineMap["8"]["nextLine"] = "5" );
            codeLineMap["8"] && ( codeLineMap["8"]["handler"] = function(succcallback){
                if( typeof succcallback === 'function')
                    succcallback();
            });
            codeLineMap["8"] && ( codeLineMap["8"]["comments"] = "decrementing the inner pointer");

            codeLineMap["10"] && ( codeLineMap["10"]["statementType"] = "ASSIGMENT" );
            codeLineMap["10"] && ( codeLineMap["10"]["nextLine"] = "11" );
            codeLineMap["10"] && ( codeLineMap["10"]["handler"] = this.incrementOuterPointer);
            codeLineMap["10"] && ( codeLineMap["10"]["comments"] = "incrementing the outer pointer");


            codeLineMap["9"] && ( codeLineMap["9"]["statementType"] = "ASSIGMENT" );
            codeLineMap["9"] && ( codeLineMap["9"]["nextLine"] = "10" );
            codeLineMap["9"] && ( codeLineMap["9"]["handler"] = this.moveTheKeyValueBackToArray);
            codeLineMap["9"] && ( codeLineMap["9"]["comments"] = "moving the key value back to array");

            codeLineMap["11"] && ( codeLineMap["11"]["statementType"] = "ASSIGMENT" );
            codeLineMap["11"] && ( codeLineMap["11"]["nextLine"] = "2" );
            codeLineMap["11"] && ( codeLineMap["11"]["handler"] = function (succcallback){
            	if( typeof succcallback === 'function')
            		succcallback();
            });
            codeLineMap["12"] && ( codeLineMap["12"]["comments"] = "it is a closing brace so moving back to Top...");

            codeLineMap["12"] && ( codeLineMap["12"]["statementType"] = "DUMMY" );
            codeLineMap["12"] && ( codeLineMap["12"]["nextLine"] = "EOF" );
            codeLineMap["12"] && ( codeLineMap["12"]["handler"] = function (succcallback){
            	if( typeof succcallback === 'function')
            		succcallback();
            });
            codeLineMap["12"] && ( codeLineMap["12"]["comments"] = "Finally it is the end of the code");            
    	}
    },
	"initialiseComparisonOperators" : function(){
				var defaultvalues = {
		            "cx": 50,
		            "cy": 50,
		            "r": 25
		        };
		        var width = Constants["bubble"]["width"];
		        if (this.values && this.values instanceof Array) {
		            var len = this.values.length;
		        }
		        var cx1 = this.startx + len / 2 * width;
		        var cy1 = this.starty - width - 35;
		        var gap = (Constants && Constants["bubble"] && Constants["bubble"]["operand1"] && Constants["bubble"]["operand1"]["circle"]["gap"]) || 30;
		        var radius = (Constants && Constants["bubble"] && Constants["bubble"]["operand1"] && Constants["bubble"]["operand1"]["circle"]["radius"]) || 30;
		        var cx2 = cx1 + 2 * parseInt(radius, 10) + gap;
		        var cy2 = cy1;
		        var finalValueOperand1 = (Constants && Constants["bubble"] && Constants["bubble"]["operand1"] && Constants["bubble"]["operand1"]["circle"]) || defaultvalues;
		        var operand1 = canvas.circle();
		        operand1.attr(finalValueOperand1);
		        operand1.attr({
		            "cx": cx1,
		            "cy": cy1,
		            "r": radius
		        });
		        this.operand1 = operand1;
		        defaultvalues = {
		            "cx": 85,
		            "cy": 50,
		            "r": 25
		        }
		        var finalValueOperand2 = (Constants && Constants["bubble"] && Constants["bubble"]["operand2"] && Constants["bubble"]["operand2"]["circle"]) || defaultvalues;

		        var operand2 = canvas.circle();
		        operand2.attr(finalValueOperand2);
		        operand2.attr({
		            "cx": cx2,
		            "cy": cy2,
		            "r": radius
		        });
		        this.operand2 = operand2;

		        var operator = canvas.text();
		        defaultvalues = {
		            x: 78,
		            y: 50
		        };
		        var opx = (cx1 + cx2) / 2;
		        var opy = cy1;
		        var finalValueOperator = (Constants && Constants["bubble"] && Constants["bubble"]["operator"]) || defaultvalues;
		        operator.attr(finalValueOperator);
		        operator.attr({
		            "x": opx,
		            "y": opy
		        });
		        operator.attr({
		            "text": ""
		        });
		        this.operator = operator;

		        defaultvalues = {
		            x: 160,
		            y: 50
		        };
		        var stmtx = cx2 + radius + ((Constants && Constants["bubble"] && Constants["bubble"]["stmt"]["gap"]) || 30);
		        var stmty = cy1;
		        var finalValueStmt = (Constants && Constants["bubble"] && Constants["bubble"]["stmt"]) || defaultvalues;
		        stmt = canvas.text();
		        stmt.attr(finalValueStmt);
		        stmt.attr({
		            "x": stmtx,
		            "y": stmty
		        });
		        stmt.attr({
		            "text": ""
		        });
		        this.stmt = stmt;
	},

	"moveToComparioson" : function(index,flag,succcallback){
				var IndxsrcPosX, IndxsrcPocY, IndxdstPosX, IndxdstPosY;
				var context = this;
		        IndxsrcPosX = this.arr["elements"][index]["elemTextPosition"]["x"];
		        IndxsrcPocY = this.arr["elements"][index]["elemTextPosition"]["y"];
		        var IndxTxt = this.arr["elements"][index].getText();
		        var temp = canvas.text(IndxsrcPosX, IndxsrcPocY, IndxTxt);
		        var attribs = Constants && Constants["bubble"] && Constants["bubble"]["comparision"];
		        if (attribs && attribs["text-size"]) {
		            temp.attr({
		                "font-size": attribs["text-size"]
		            });
		        }
		        if (attribs && attribs["text-color"]) {
		            temp.attr({
		                "fill": attribs["text-color"]
		            });
		        }
		        if (flag == 1) {
		            var finalOperandX = this.operand1.attr()["cx"];
		            var finalOperandY = this.operand1.attr()["cy"];
                    if( typeof this.operand1Text !== 'undefined')
                    {
                        this.operand1Text.remove();
                    } 
                    this.operand1Text = temp;
		        } else if (flag == 2) {
		            var finalOperandX = this.operand2.attr()["cx"];
		            var finalOperandY = this.operand2.attr()["cy"];
                    if( typeof this.operand2Text !== 'undefined')
                    {
                        this.operand2Text.remove();
                    }
                    this.operand2Text = temp;
		        }
		        var animationspeed = (attribs && attribs["animation_speed"]) || 1000;
		        temp.animate({
		            x: finalOperandX,
		            y: finalOperandY
		        }, animationspeed, "long", callback);
		        ANIMATIONS_PAUSE["COMP"] = temp;

		        function callback() {
		            ANIMATIONS_PAUSE["COMP"] = null;
		            var onfocusattr = (Constants && Constants["bubble"] && Constants["bubble"]["operand2"] && Constants["bubble"]["operand2"]["onfocuscircle"]);
		            if (onfocusattr != undefined) {
		                context.operand2.attr(onfocusattr);
		            }
		            succcallback();
		        }
	},

	"compareIt"  : function(op1Value, op2Value, succcallback){
				var op1Value = parseInt(op1Value, 10);
		        var op2Value = parseInt(op2Value, 10);

		        if (op1Value > op2Value) {
		            this.operator.attr({
		                "text": ">"
		            })
		            this.stmt.attr({
		                "text": "Continue..."
		            });
		            succcallback(true);
		            return;
		        } else if (op1Value < op2Value) {
		            this.operator.attr({
		                "text": "<"
		            })
		            this.stmt.attr({
		                "text": "InserIt,BreakIt"
		            });
		            succcallback(false);
		            return;
		        } else {
		            this.operator.attr({
		                "text": "="
		            })
		            this.stmt.attr({
		                "text": "Continue..."
		            });
		            succcallback(false);
		            return;
		        }
	           succcallback(false);	        
    },

    "initialiseInnerPointer": function(succcallback){
    	 var innerpointerindex = this.initialiseInnerPointerParams && this.initialiseInnerPointerParams["innerpointerindex"];
    	 var attribs = Constants && Constants["bubble"] && Constants["bubble"]["inner_pointer"];
    	 if(this.inner_pointer)
    	 {
    	 	this.arr.removePointer("inner");
    	 	this.inner_pointer = undefined;
    	 }
    	 this.inner_pointer = this.arr.createPointer(innerpointerindex, "inner", "inner", false, attribs);
    	 this.innerpointerindex = innerpointerindex;
    	 succcallback();
    },

    "initialiseOuterPointer" : function(succcallback){
    	var outerPointerIndex = this.initialiseOuterPointerParams &&  this.initialiseOuterPointerParams["outerPointerIndex"];
    	 var attribs = Constants && Constants["bubble"] && Constants["bubble"]["outer_pointer"];
    	 if(this.outer_pointer)
    	 {
    	 	this.arr.removePointer("outer");
    	 	this.outer_pointer = undefined;
    	 }
    	 this.outer_pointer = this.arr.createPointer(outerPointerIndex, "outer", "outer", false, attribs);	
    	 this.outerPointerIndex = outerPointerIndex;
    	 succcallback(true);
    },
    "decrementInnerPointer" : function(succcallback)  
    {
    	if(typeof succcallback !== 'function') return;
    	this.innerpointerindex = this.innerpointerindex -1;
    	this.inner_pointer.move(this.innerpointerindex,succcallback)
    },
    "incrementOuterPointer" : function(succcallback){
    	if(typeof succcallback !== 'function') return;
    	this.outerPointerIndex = this.outerPointerIndex + 1;
    	this.outer_pointer.move(this.outerPointerIndex,succcallback);
    },
    "destroy" : function()
    {
    	canvas.remove();
    	this.insertionCodeANM && this.insertionCodeANM.removeTheLines();
    },
    "moveTheKeyValue" : function(succcallback)
    {
        var outerIndexValue = this.outerPointerIndex;
        this.innerpointerindex = outerIndexValue-1;
        this.initialiseInnerPointerParams && ( this.initialiseInnerPointerParams["innerpointerindex"] =this.innerpointerindex);
        this.moveToComparioson(outerIndexValue-1, 2,succcallback);
    },
    "moveTheValueForComparision" : function(succcallback){
    	var innerpointerindex = this.innerpointerindex;
    	var outerpointerindex = this.outerPointerIndex;
    	var scopeObj =this;
    	function succc()
    	{
          var op1Value = scopeObj.arr.elements[innerpointerindex-1].getText();
          var op2Value = scopeObj.operand2Text.attr()["text"];
        
    	  scopeObj.compareIt(op1Value,op2Value,succcallback);	
    	}
        if( innerpointerindex <= 0)
        {
           succcallback(false);
           return;
        }
    	this.moveToComparioson(innerpointerindex-1,1,succc);
    },
    "checkingOuterWithLength" : function(succcallback)
    {
    	var outerPointerIndex = this.outerPointerIndex;
    	var length = this.len;
    	if( length >= outerPointerIndex )
    	{
    		if( typeof succcallback === 'function')
    		{
    			succcallback(true);
    		}
            return;

    	}
    	else
    	{
            if( typeof succcallback === 'function')
            {
            	succcallback(false);
            }
            return;
    	}
    },
    "startSort":function(succcallback,errorcallback)
    {
       var con = this;
       this.insertionCodeANM.moveNext(this,succ,err);
       function succ()
       {
       	 setTimeout(function(){
       	 	con.insertionCodeANM.moveNext(con,succ,err);
       	 },1000);
       	 
       }
       function err(error)
       {
       	  if( typeof errorcallback === 'function')
       	  	errorcallback(error);
       }
    },
    "moveToNextLine":function(succcallback,errorcallback)
    {
    	 //this function explicity move to the next function irrespective of wether breakpoint or not
         
         function succ(res)
         {
             if( typeof succcallback === 'function')
             	succcallback(res)
         }
         function err(eror)
         { 
             if( typeof errorcallback === 'function')
             	errorcallback(eror);
         }
         this.insertionCodeANM.moveNext(this,succ,err,true);
    },
    "pauseIt" : function()
    {
        //this will try to set the auto break point at next line, this will not stop
        // the current execution of the lines
        this.insertionCodeANM.stopIt();
    },
    "continue":function(succcallback,errorcallback)
    {
        var con = this;
        this.insertionCodeANM.continueIt();
       this.insertionCodeANM.moveNext(this,succ,err,true);
       function succ()
       {
       	 setTimeout(function(){
       	 	con.insertionCodeANM.moveNext(con,succ,err);
       	 },1000);
       	 
       }
       function err(error)
       {
       	  if( typeof errorcallback === 'function')
       	  	errorcallback(error);
       }
    },
    "moveTheValueElement": function(succcallback)
    {
        var innerpointerIndex = this.innerpointerindex;
        var sourceText = this.arr.elements[innerpointerIndex-1].getText();
        this.arr.moveElement(innerpointerIndex-1,innerpointerIndex,sourceText,0,succcallback,{"animation_speed":400});
        return;
    },
    "moveTheKeyValueBackToArray":function(succcallback)
    {
       var temp = this.operand2Text;
       var text = temp.attr()["text"];
       var x = temp.attr()["x"];
       var y = temp.attr()["y"];
       var newTextNode = canvas.text(x,y,text);
       var innerindexPLUSone = (this.innerpointerindex-1)+1;
       var targetELementNode = this.arr["elements"][innerindexPLUSone];
       var finalX =  targetELementNode["elemTextPosition"]["x"];
       var finalY = targetELementNode["elemTextPosition"]["y"];
       var animationspeed = 1000;
       newTextNode.animate({
                    x: finalX,
                    y: finalY
                }, animationspeed, "long", callback);
    ANIMATIONS_PAUSE["BACKTOKEY"] = newTextNode;
    function callback() {
                    ANIMATIONS_PAUSE["BACKTOKEY"] = null;
                    targetELementNode.setText(text);  
                    newTextNode.remove();
                    succcallback();
                }
       
       
    }
});
