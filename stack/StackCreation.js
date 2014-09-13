function Stack(startx,starty,len)
{
    var stackContext = this;
    
    function initialise()
    {
       stackContext.len = len;
       
       stackContext.arr = new MyArray(startx,starty,Constants["stack"]["width"],Constants["stack"]["width"],len);
       stackContext.numElem = 0;
       stackContext.push = push;
       stackContext.pop = pop;
       stackContext.removeStack = removeStack;
       for(var i = 1;i <= len;i++)
       {
             changeColor(i,false);
       }
    }
    function removeStack()
    {
       stackContext.arr.removeArray();
    }
    function push(elem)
    {
       stackContext.numElem = stackContext.numElem+1;
       if( stackContext.numElem === 1)
       {
             stackContext.top = stackContext.arr.createPointer(1,"top","top",true);
             stackContext.arr.setText(stackContext.numElem,elem);
             changeColor(stackContext.numElem,true);
             
        }
       else if( stackContext.numElem <= stackContext.len)
       {
                 var pointer = stackContext.arr.getPointer("top");
                 console.log(pointer);
                 pointer.move(stackContext.numElem,successcallback);                
                 function successcallback()
                 {
                     console.log("in successcallback");
                     stackContext.arr.setText(stackContext.numElem,elem);
                     changeColor(stackContext.numElem,true);                     
                 }
                 
        }        
        else
        {
           stackContext.numElem = stackContext.numElem-1;
           alert("OOps... stack got full.. its gonna overflow");
        }
        
    }
     function pop()
     {
            var val;
           if( stackContext.numElem === 0 )
           {
               alert("OOps.... there is nothing in the stack");
               return;
           }
           else if( stackContext.numElem === 1 )
           {
              var elem = stackContext.arr.elements[stackContext.numElem-1];
               val = elem.getText();
              elem.setText("");
              
               changeColor(stackContext.numElem,false);
              stackContext.arr.removePointer("top");
           }
           else
           {
              var elem = stackContext.arr.elements[stackContext.numElem-1];
              console.log("vicky:: "+stackContext.numElem);
              console.log(elem);
              val = elem.getText();
              elem.setText("");
               changeColor(stackContext.numElem,false);
              var pointer = stackContext.arr.getPointer("top");
              pointer.move(stackContext.numElem-1);
              
           }
           stackContext.numElem = stackContext.numElem - 1;
           return val;
     }     
   function changeColor(elemindex,flag)
    {
       // changing color after pushing
       var element = stackContext.arr.elements[elemindex-1];
       console.log(element);
       if(flag === true)
       {
           
           element.elem.attr({"fill":"rgb(29,226,221)"});
       }
       else   //changing color after poping
       {
          element.elem.attr({"fill":"rgb(255,255,128)"});
       }
       
    }
     initialise();
}