/*
  Assuming all the values in the bubble sort are numbers 
*/
function BubbleSort()
{  var context = this;
   function main()
   {
        var unsorted = Constants && Constants["bubble"] && Constants["bubble"]["unsorted"];
        if( unsorted )
        {
           var attribs = { "element" : unsorted };
        }
        context.arr = new MyArray(100,100,50,50,[4,1,22,3,3,6,2,15,2,1,12,10,15],attribs);
        context.values = context.arr.getValues();
        context.len = context.values.length;
        for(var i in context.values)
        {
          context.values[i] = parseInt(context.values[i]);
        }
        context.swap = swap;
        context.startSort = startSort;
        comp();
   }
   function swap(position1,position2,callback)
   {
      var done1=false,done2=false;
      var position1Text = context.arr.elements[position1].getText();
      var position2Text = context.arr.elements[position2].getText();
      context.arr.moveElement(position1,position2,position1Text,0,succ1,{"animation_speed":400});
      context.arr.moveElement(position2,position1,position2Text,2,succ2,{"animation_speed":400});
      
      function succ1()
      {
         done1 = true;
         mutualcall();
      }
      function succ2()
      {
          done2 = true;
          mutualcall();
      }
      function mutualcall()
      {
         if( done1 == true && done2 === true)
         {
            if(typeof callback === 'function')
            {
               callback();
            }
         }
      }
   }
   function comp()
   {
      var defaultvalues = { "cx" : 50,"cy":50,"r":25};
      var finalValueOperand1 = (Constants && Constants["bubble"] && Constants["bubble"]["operand1"] && Constants["bubble"]["operand1"]["circle"]) || defaultvalues;
      var operand1 = canvas.circle();
      operand1.attr(finalValueOperand1);
      context.operand1 = operand1;
      defaultvalues = { "cx" : 85,"cy":50,"r":25}
      var finalValueOperand2 = (Constants && Constants["bubble"] && Constants["bubble"]["operand2"] && Constants["bubble"]["operand2"]["circle"]) || defaultvalues;
 
      var operand2 = canvas.circle(); 
      operand2.attr(finalValueOperand2);
      context.operand2 = operand2;
      
      var operator = canvas.text();
      defaultvalues = { x: 78 , y:50};
      var finalValueOperator = (Constants && Constants["bubble"] && Constants["bubble"]["operator"]) || defaultvalues  ;
      operator.attr(finalValueOperator) ;
      operator.attr({"text":"="});
      context.operator = operator;
      
      defaultvalues = { x: 160 , y:50};
      var finalValueStmt = (Constants && Constants["bubble"] && Constants["bubble"]["stmt"]) || defaultvalues  ;
      stmt = canvas.text();
      stmt.attr(finalValueStmt);
      stmt.attr({"text":"swap It"});
      context.stmt = stmt;  
   }
   function comparision(index1,index2,succcallback)
   {
         var Indx1srcPosX,Indx1srcPocY,Indx1dstPosX,Indx1dstPosY;
         var  Indx2srcPosX,Indx2srcPocY,Indx2dstPosX,Indx2dstPosY;
         Indx1srcPosX = context.arr["elements"][index1]["elemTextPosition"]["x"];
         Indx1srcPocY = context.arr["elements"][index1]["elemTextPosition"]["y"];           
        Indx2srcPosX = context.arr["elements"][index2]["elemTextPosition"]["x"];
        Indx2srcPocY = context.arr["elements"][index2]["elemTextPosition"]["y"];
        var Indx1Txt = context.arr["elements"][index1].getText();
        var Index2Txt = context.arr["elements"][index2].getText();
        var temp1 = canvas.text(Indx1srcPosX,Indx1srcPocY,Indx1Txt);
        var temp2 = canvas.text(Indx2srcPosX,Indx2srcPocY,Index2Txt);
        var attribs = Constants && Constants["bubble"] && Constants["bubble"]["comparision"];
        if( attribs && attribs["text-size"] )
         {
          temp1.attr({"font-size": attribs["text-size"] });
          temp2.attr({"font-size": attribs["text-size"] });         
         }
         if( attribs && attribs["text-color"])
         {
          temp1.attr({"fill": attribs["text-color"] });
          temp2.attr({"fill": attribs["text-color"] });          
         }
        var operand1X = context.operand1.attr()["cx"];
        var operand1Y = context.operand1.attr()["cy"];
        var operand1attr = context.operand1.attr();
        
        var operand2X = context.operand2.attr()["cx"];
        var operand2Y = context.operand2.attr()["cy"];
        var operand2attr = context.operand2.attr();
        var animationspeed = (attribs && attribs["animation_speed"]) || 1000;
        temp1.animate({ x : operand1X , y: operand1Y },animationspeed,"long",callback1);
        temp2.animate({ x : operand2X , y: operand2Y },animationspeed,"long",callback2);
        var done1 = false,done2 = false;
       
        function callback1()
         {
           var onfocusattr = (Constants && Constants["bubble"] && Constants["bubble"]["operand1"] && Constants["bubble"]["operand1"]["onfocuscircle"]);
           if ( onfocusattr != undefined)
           {
              context.operand1.attr(onfocusattr);
           }           
           done1 = true;
            mutualCallBack();
         }
         
         function callback2()
         {
           var onfocusattr = (Constants && Constants["bubble"] && Constants["bubble"]["operand2"] && Constants["bubble"]["operand2"]["onfocuscircle"]);
           if ( onfocusattr != undefined)
           {
              context.operand2.attr(onfocusattr);
           } 
            done2 = true;
            mutualCallBack();
         }         
         function mutualCallBack()
         {
                if( done1 == true && done2 === true)
                {
                   var value1 = parseInt(Indx1Txt);
                   var value2 = parseInt(Index2Txt);
                   setTimeout( timoutSuccess,1000);
                   function timoutSuccess()
                   {
                       if( value1 > value2)
                       {
                          context.operator.attr({"text" : ">"});
                          context.stmt.attr({"text" : "Swap It"});
                           setTimeout(function(){
                           temp1.remove();
                           temp2.remove();
                           finalClearing();
                           succcallback(true);
                       },1000)
                       }
                       else if( value1 < value2)
                       {
                          context.operator.attr({"text" : "<"});    
                          context.stmt.attr({"text" : "No Swap"});
                           setTimeout(function(){
                           temp1.remove();
                           temp2.remove();
                           finalClearing();
                        succcallback(false);
                       },1000)
                       }
                       else
                       {
                          context.operator.attr({"text" : "=="});
                          context.stmt.attr({"text" : "No Swap"});
                            setTimeout(function(){
                             temp1.remove();
                             temp2.remove();
                            finalClearing();                           
                           succcallback(false);
                       },1000)
                       
                       }
                 
                   }
                   function finalClearing()
                   {
                     context.operand1.attr(operand1attr);
                     context.operand2.attr(operand2attr);
                     context.operator.attr({"text":""});
                     context.stmt.attr({"text":""});
                   }
               
            }
         }
   }
   function startSort()
   {
       var outer_pointer,inner_pointer;
      function outerloop_initialise()
      {
          var attribs = Constants && Constants["bubble"] && Constants["bubble"]["outer_pointer"];
          outer_pointer = context.arr.createPointer(1,"outer","outer",true,attribs);    
      }
      function innerloop_initialise(index)
      {
         var attribs = Constants && Constants["bubble"] && Constants["bubble"]["inner_pointer"];
         inner_pointer = context.arr.createPointer(index+1,"inner","inner",false,attribs);
      }
      /*function comparision(j,callback)
      {
        if( context.values[j] > context.values[j+1])
        {
           var temp = context.values[j];
           context.values[j] = context.values[j+1];
           context.values[j+1] = temp;
           callback(true);
        }
        else
        {
           callback(false);
        }
      } */
      function innerloopInc(index,callback)
      {
         inner_pointer.move(index+1,callback);
      }
      function outerloopInc(index,callback)
      {
         outer_pointer.move(index+1,callback);
      }
      function outer_loop(i)
      {
           
           
           var len = context.values.length;
           if( i < len )
           {
              innerloop_initialise(0);
              inner_loop(0,inner_callback);
              function inner_callback()
              {
                 var fillcolor = (Constants && Constants["bubble"] && Constants["bubble"]["fill"]) || "#4F8DF7";
                 context.arr.fillColor(len-i,fillcolor);
                 outerloopInc(i+1,function()
                 {
                    
                    outer_loop(i+1);
                 });
              }              
           }
           else
           {
              return;
           }
        function inner_loop(j,callback)
        {
         
         
         if( j < context.len-1-i)
         {
            comparision(j,j+1,comp_callback);
                function comp_callback(boo)
                {
                   if( boo === true)
                   {
                    context.swap(j,j+1,swap_callback);
                    
                   }
                   else
                   {
                      innerloopInc(j+1,inc_callback);
                   }
                   function swap_callback()
                   {
                       innerloopInc(j+1,inc_callback);    
                   }
                   function inc_callback()
                   {
                      inner_loop(j+1,callback);
                   }
                   
                }    
         }
         else
         {
            context.arr.removePointer("inner")
            callback();
         }
      }
      }
      
      outerloop_initialise();
      outer_loop(0);
   }   
   main();
}