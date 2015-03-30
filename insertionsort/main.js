$( document).ready(function()
{
   createCanvas();
   $('#resumeButton').attr('disabled','disabled');
   $('#pauseButton').attr('disabled','disabled');
   canvas = undefined;
   initialisePropertiesOfDialog();
   //bubble = new BubbleSort();
   $('#startSortButton').click(makeArray);
   $('#pauseButton').click(function(){
   $('#resumeButton').removeAttr('disabled');
   pauseIt();
   $('#pauseButton').attr('disabled','disabled');
   });
      $('#resumeButton').click(function(){
      $('#pauseButton').removeAttr('disabled');
      $('#resumeButton').attr('disabled','disabled');
      resumeIt();
   });
   
});
function makeArray()
{
  var inputval = $('#sortInputVal').val();
  $('#pauseButton').removeAttr('disabled');
  $('#resumeButton').attr('disabled','disabled');
  if( canvas )
  {
    canvas.remove();
  }
  if( inputval )
  {
  inputval =inputval.trim();
    var inputvalues = inputval.split(",");
    if( inputvalues && inputvalues instanceof Array )
    {
      var len =inputvalues.length;
      for(var i = 0 ; i < len ; i++)
      {
         if( isNaN(inputvalues[i] ) )
         {
            $("#validInput").dialog("open");
            return;
         }
        inputvalues[i] = parseInt(inputvalues[i],10);
      }
      var flag = createInsertionSort(inputvalues);
      if( flag == false)
      {
         $("#validSize").dialog("open");
         return;
      }
     $('#pauseButton').removeAttr('disabled');
     $('#resumeButton').attr('disabled','disabled');
     // insertion.startSort();
    }
    
  }
  else
  {
    $("#pleaseInput").dialog("open");
  }
}
function initialisePropertiesOfDialog()
{
     $('#validInput').dialog({
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
  
  $('#pleaseInput').dialog({
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
   var availableCanvasSize = windowSize - windowSize * 0.10; // excluding 3% margin on left and right
   
   var givenWidth = Constants["bubble"]["width"];
   var capacity = availableCanvasSize/givenWidth;
   capacity = Math.floor(capacity);
   return { "capacity" : capacity , "canvasSize" : availableCanvasSize};
}
function createInsertionSort(arr)
{
   var len = arr.length;
   var result = measuringCanvasSize();
   var capacity =  result && result["capacity"];
   var canvasSize = result && result["canvasSize"];
   if( capacity == undefined || len > capacity-2)
   {
      return false;
   }
   canvas = Raphael("canvas",canvasSize,500);
    var x = (capacity - len)/2 + (capacity - len)%2;
    var queueWidth = Constants["bubble"]["width"];
    var startx = x* queueWidth;
    var starty = Constants["canvas"]["height"]/3;
    insertion = new visualise.InsertionSort(startx,starty,arr);
    insertion.startSort();
    return true;
}