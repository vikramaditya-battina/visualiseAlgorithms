$(document).ready(main);

function main()
{
  isQueueCreated = false;  
  initialisePropertiesOfDialog();
  $("#ButtonEnqueue").click(onClickEnqueue);
  $("#CreateQueue").click(onClickCreate);
  $("#dequeue").click(onClickDequeue);
  $("#clearqueue").click(onClickClear);
  
}
function initialisePropertiesOfDialog()
{
   $('#overflow').dialog({
   autoOpen: false,
   modal : true,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
      
  });
  $('#empty').dialog({
    autoOpen: false,
    modal : true,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
  });
  $('#create').dialog({
   autoOpen: false,
   modal : true,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
  });
    $('#createValidNumber').dialog({
   autoOpen: false,
   modal : true,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
  });
  
    $('#validSize').dialog({
   autoOpen: false,
   modal : true,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
  });
}
function measuringCanvasSize()
{
   var windowSize = $(window).width();
   var availableCanvasSize = windowSize - windowSize * 0.06; // excluding 3% margin on left and right
   
   var givenWidth = Constants["queue"]["width"];
   var capacity = availableCanvasSize/givenWidth;
   capacity = Math.floor(capacity);
   return { "capacity" : capacity , "canvasSize" : availableCanvasSize};
}
function createQueue(len)
{
   var result = measuringCanvasSize();
   var capacity =  result && result["capacity"];
   var canvasSize = result && result["canvasSize"];
   if( capacity == undefined || len > capacity-2)
   {
      return false;
   }
   canvas = Raphael("canvas",canvasSize,500);
    var x = (capacity - len)/2 + (capacity - len)%2;
    var queueWidth = Constants["queue"]["width"];
    var startx = x* queueWidth;
    var starty = Constants["canvas"]["height"]/3;
    queue = new Queue(startx,starty,len);
    return true;
}

function onClickEnqueue()
{
    var enQueueValue = $('#enqueuevalue').val();
    console.log(typeof enQueueValue);
       if(!isQueueCreated)
       {
          $("#create").dialog("open");
          return;
       }
       if(enQueueValue == undefined || enQueueValue.trim()==="")
       {
         alert("please provide value");
         return;
       }
       $("#overlay").fadeIn(100);
       queue.enqueue(enQueueValue,callback);
       function callback(status)
       {
          $("#overlay").fadeOut(100);
         if( status === false)
         {
            $("#overflow").dialog("open");
          }
       }
}

function onClickDequeue()
{
   if(!isQueueCreated)
       {
          $("#create").dialog("open");
          return;
       }
       $("#overlay").fadeIn(100);
       queue.dequeue(callback)
       function callback(result)
       {
          $("#overlay").fadeOut(100);
          if( result == false)
          $("#empty").dialog("open");
          else
          {
             $("#TextFieldDequeueValue").val(result);
          }
       }
}

function onClickCreate()
{
  
     if( isQueueCreated )
     {
        queue.removeQueue();
        isQueueCreated = false;
        onClickCreate();
     }
     else
     {
       var len = $('#TextFieldQueueLen').val();
       console.log(len);
       console.log(typeof len);
       var len = parseInt(len);
       console.log(typeof len);
       if(isNaN(len))
       {
          $("#createValidNumber").dialog("open");
          return;
       }
        var flag = createQueue(len);
        if(flag)
        {
          isQueueCreated = true;
        }
        else
        {
           $("#validSize").dialog("open"); 
        }
     }     
}

function onClickClear()
{
    if( isQueueCreated )
    {  
       queue.removeQueue();
    }    
}





























