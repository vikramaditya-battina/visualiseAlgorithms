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
        var codeString = 'var j = 2;          \nwhile(j < length){\n  var key = Array[j];\n  var i = j - 1;\n  while( i > 0 && Array[i] > key ){\n     Array[i+1] = Array[i]\n     i = i - 1;\n  }\n  j = j+1;\n}';
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
            codeLineMap["2"] && codeLineMap["2"]["statementDefinedProps"] && (codeLineMap["2"]["statementDefinedProps"]["WHILE_CONDITIONAL_TRUE_LINE_NUM"] = 3);
            codeLineMap["2"] && codeLineMap["2"]["statementDefinedProps"] && (codeLineMap["2"]["statementDefinedProps"]["WHILE_CONDITIONAL_FALSE_LINE_NUM"] = 13);
            codeLineMap["2"] && ( codeLineMap["2"]["handler"] = function(succ){succ();});
            codeLineMap["2"] && ( codeLineMap["2"]["comments"] = "checking_length_outer+pointer" );

            codeLineMap["3"] && ( codeLineMap["3"]["statementType"] = "ASSIGMENT" );
            codeLineMap["3"] && ( codeLineMap["3"]["nextLine"] = "4" );
            codeLineMap["3"] && ( codeLineMap["3"]["handler"] = this.moveTheKeyValue);
            codeLineMap["3"] && ( codeLineMap["3"]["comments"] = "moving_keyvalue");

            codeLineMap["4"] && ( codeLineMap["4"]["statementType"] = "ASSIGMENT" );
            codeLineMap["4"] && ( codeLineMap["4"]["nextLine"] = "5" );
            codeLineMap["4"] && ( codeLineMap["4"]["handler"] = this.initialiseInnerPointer);
            codeLineMap["4"] && ( codeLineMap["4"]["comments"] = "assigning_the_innerPointer");
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
		        } else if (flag == 2) {
		            var finalOperandX = this.operand2.attr()["cx"];
		            var finalOperandY = this.operand2.attr()["cy"];
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
		        alert(op1Value);
		        alert(op2Value);
		        if (op1Value > op2Value) {
		            this.operator.attr({
		                "text": ">"
		            })
		            this.stmt.attr({
		                "text": "Continue..."
		            });
		            succcallback(true);
		        } else if (op1Value < op2Value) {
		            this.operator.attr({
		                "text": "<"
		            })
		            this.stmt.attr({
		                "text": "InserIt,BreakIt"
		            });
		            succcallback(false)
		        } else {
		            this.operator.attr({
		                "text": "="
		            })
		            this.stmt.attr({
		                "text": "Continue..."
		            });
		            succcallback(false);
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
        this.moveToComparioson(outerIndexValue, 2,succcallback);
    },
    "moveTheValueForComparision" : function(succcallback){
    	var innerpointerindex = this.innerpointerindex;
    	var outerpointerindex = this.outerPointerIndex;
    	function succ()
    	{
          var op1Value = this.arr.elements[innerpointerindex].getText();
          var op2Value = this.arr.elements[outerpointerindex].getText();
    	  this.compareIt(op1Value,op2Value,succcallback);	
    	}
    	this.moveToComparioson(innerpointerindex,1,succ);
    },
    "startSort":function(succcallback)
    {
       var con = this;
       this.insertionCodeANM.moveNext(this,succ,err);
       function succ(res)
       {
       	 setTimeout(function(){
       	 	con.insertionCodeANM.moveNext(con,succ,err,res);
       	 },1000);
       	 
       }
       function err()
       {
       	 
       }
    }
});