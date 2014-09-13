$(document).ready(
  function()
  {
     createCanvas();
     $('#ButtonCreateStack').click(createStack);
     $('#ButtonPush').click(pushvalue);
     $('#ButtonPop').click(popValue);
     var isStackCreated = false;
     var mystack;
     function createStack(e)
    {
       if(isStackCreated)
       {
          mystack.removeStack();
       }
       var len = $('#TextFieldStackLen').val();
       console.log(len);
       console.log(typeof len);
       var len = parseInt(len);
       console.log(len);
       console.log(typeof len);
       if(isNaN(len))
       {
          alert("please give valid number");
          return;
       }
       var canvaswidth = Constants["canvas"]["width"];
       var stackwidth = Constants["stack"]["width"];
       var numcapacity = (canvaswidth)/stackwidth;
       
       if(len > numcapacity-2)
       {
          alert("sorry");
          return
       }
       var x = (numcapacity - len)/2 + (numcapacity - len)%2;
       var startx = x* stackwidth;
       var starty = Constants["canvas"]["height"]/3;
       mystack = new Stack(startx,starty,len);
       isStackCreated = true;   
    }

    function pushvalue()
    {
       var pushValue = $('#TextFieldPushValue').val();
       console.log("stack created "+isStackCreated);
       if(!isStackCreated)
       {
          alert("sorry first create stack");
          return;
       }
       if(pushValue==="")
       {
         alert("please provide value");
         return;
       }
       mystack.push(pushValue);
       
       
    }
    
    function popValue()
    {
       if(!isStackCreated)
       {
          alert("sorry first create stack");
          return;
       }
       mystack.pop();
    }
  }
);



