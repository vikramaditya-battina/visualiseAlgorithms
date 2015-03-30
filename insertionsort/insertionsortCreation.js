/*
  Assuming all the values in the bubble sort are numbers 
*/
function InsertionSort(startx, starty, arr) {
    var context = this;
    context.startx = startx;
    context.starty = starty;
    context.values = arr;

    function main() {
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
        context.startSort = startSort;
        InitialiseComparisonOperators();
    }

    function InitialiseComparisonOperators() {
        var defaultvalues = {
            "cx": 50,
            "cy": 50,
            "r": 25
        };
        var width = Constants["bubble"]["width"];
        if (context.values && context.values instanceof Array) {
            var len = context.values.length;
        }
        var cx1 = context.startx + len / 2 * width;
        var cy1 = context.starty - width - 35;
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
        context.operand1 = operand1;
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
        context.operand2 = operand2;

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
        context.operator = operator;

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
        context.stmt = stmt;
    }

    function compareIt(op1Value, op2Value) {
        var op1Value = parseInt(op1Value, 10);
        var op2Value = parseInt(op2Value, 10);
        alert(op1Value);
        alert(op2Value);
        if (op1Value > op2Value) {
            context.operator.attr({
                "text": ">"
            })
            context.stmt.attr({
                "text": "Continue..."
            });
            return true;
        } else if (op1Value < op2Value) {
            context.operator.attr({
                "text": "<"
            })
            context.stmt.attr({
                "text": "InserIt,BreakIt"
            });
            return false;
        } else {
            context.operator.attr({
                "text": "="
            })
            context.stmt.attr({
                "text": "Continue..."
            });
            return false;
        }
    }

    function moveToComparioson(index, flag, succcallback) {
        var IndxsrcPosX, IndxsrcPocY, IndxdstPosX, IndxdstPosY;
        IndxsrcPosX = context.arr["elements"][index]["elemTextPosition"]["x"];
        IndxsrcPocY = context.arr["elements"][index]["elemTextPosition"]["y"];
        var IndxTxt = context.arr["elements"][index].getText();
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
            var finalOperandX = context.operand1.attr()["cx"];
            var finalOperandY = context.operand1.attr()["cy"];
        } else if (flag == 2) {
            var finalOperandX = context.operand2.attr()["cx"];
            var finalOperandY = context.operand2.attr()["cy"];
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
    }

    function startSort() {
        var outer_pointer, inner_pointer;
        var op1Value, op2Value;
        function innerloop(innerindex, innerloop_callback) {
            if( inner_pointer )
            {
               var attribs = Constants && Constants["bubble"] && Constants["bubble"]["inner_pointer"];
               inner_pointer = context.arr.createPointer(innerindex + 1, "inner", "inner", false, attribs); 
               op1Value = context.arr["elements"][innerindex].getText();
               moveToComparioson(innerindex, 1, succcallback);
            }
            else
            {
                outer_pointer.move(innerindex - 1,innerpointer_callback);
            }
            function innerpointer_callback()
            {
               op1Value = context.arr["elements"][innerindex].getText();
               moveToComparioson(innerindex, 1, succcallback);
            }
            function succcallback() {
                var compRes = compareIt(op1Value, op2Value);
                if (compRes) {
                    var Value = context.arr.elements[innerindex].getText();
                    context.arr.moveElement(innerindex, innerindex + 1, Value, 0, succ1, {
                        "animation_speed": 400
                    });
                } else {
                    if(typeof innerloop_callback == 'function')
                    {
                        innerloop_callback();
                    }
                }

                function succ1() {
                    if( typeof innerloop_callback == 'function')
                    innerloop_callback();
                }
            }
        }
        function outer_loop(outerindex,outer_loop_successcallback) {
            if(outer_pointer)
            {
                var attribs = Constants && Constants["bubble"] && Constants["bubble"]["outer_pointer"];   
                outer_pointer = context.arr.createPointer(2, "outer", "outer", true, attribs);
                op2Value = context.arr["elements"][outerindex].getText();
                moveToComparioson(outerindex, 2, succcallback);
            }
            else
            {
                outer_pointer.move(outerindex + 1,outerpointer_callback);
                function outerpointer_callback()
                {
                     moveToComparioson(outerindex, 2, succcallback);
                }
            }

            function succcallback() {
                    if( typeof outer_loop_successcallback == 'function')
                    {
                        outer_loop_successcallback(outerindex+1);
                    }

                }
        }
        outer_loop(2,outer_loop_successcallback);
        function outer_loop_successcallback( outerindex)
        {
           var fillcolor = (Constants && Constants["bubble"] && Constants["bubble"]["fill"]) || "#4F8DF7";
           context.arr.fillColor(outerindex, fillcolor);
           
        }

    }
    main();
}