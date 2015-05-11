var INSERTION_SORT_BUTTON_STATUS = {};
INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = false;
INSERTION_SORT_BUTTON_STATUS["NEXT"] = false;
INSERTION_SORT_BUTTON_STATUS["START"] = true;
INSERTION_SORT_BUTTON_STATUS["STOP"] = false;
INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = true;
/*****
  On start -->>> start disabled,stop enabled,terminate enabled,next disabled
  on Terminate -->> start should get enabled,stop disabled,terminate disabled,next disabled
*****/

$( document).ready(function()
{
   createCanvas();
   canvas = undefined;
   initialisePropertiesOfDialog();
   UpdateButtonStatus();
   defineButtonHandlers();
   ExecuteWithDefaultValues();
   });
function validateInputANDCreate()
{
  var inputval = $('#sortInputVal').val();
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
            return false;
         }
        inputvalues[i] = parseInt(inputvalues[i],10);
      }
      var flag = createInsertionSort(inputvalues);
      if( flag == false)
      {
         $("#validSize").dialog("open");
         return false;
      }
      return true;
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
    visualise.InsertionSort.INSTANCE = new visualise.InsertionSort(startx,starty,arr);
       return true;
}

function startSort()
{

      function succcallback()
    {

        
    }

    function errorcallback(err)
    {

     if( err && err["error"]=== "BREAK_POINT_REACHED")
     {
       INSERTION_SORT_BUTTON_STATUS["STOP"] = true;
       INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = false;
       INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = true;
       INSERTION_SORT_BUTTON_STATUS["NEXT"] = true;
       INSERTION_SORT_BUTTON_STATUS["START"] = false;
       UpdateButtonStatus();
      }
    }
       INSERTION_SORT_BUTTON_STATUS["STOP"] = true;
       INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = true;
       INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = true;
       INSERTION_SORT_BUTTON_STATUS["NEXT"] = false;
       INSERTION_SORT_BUTTON_STATUS["START"] = false;
       UpdateButtonStatus();
       visualise.InsertionSort.INSTANCE.startSort(succcallback,errorcallback);
}

function UpdateButtonStatus()
{
   if(INSERTION_SORT_BUTTON_STATUS["TERMINATE"] === true)
   {
        $('#terminateButton').removeAttr('disabled');
   }
   else
   {
     $('#terminateButton').attr('disabled','disabled');
   }

   if(INSERTION_SORT_BUTTON_STATUS["NEXT"] === true)
   {
       $('#nextButton').removeAttr('disabled');
   }
   else
   {
       $('#nextButton').attr('disabled','disabled');
   }


   if(INSERTION_SORT_BUTTON_STATUS["START"] === true)
   {
        $('#startSortButton').removeAttr('disabled');
   }
   else
   {
      $('#startSortButton').attr('disabled','disabled');
   }


  if(INSERTION_SORT_BUTTON_STATUS["STOP"] === true)
   {
       $('#stopButton').removeAttr('disabled');
   }
   else
   {
      $('#stopButton').attr('disabled','disabled');
   }

  if(INSERTION_SORT_BUTTON_STATUS["ISSTOP"] === true)
   {
      $('#stopButton').html('STOP');
   }
   else
   {
      $('#stopButton').html('CONTINUE');
   }

}

function defineButtonHandlers()
{
    $('#startSortButton').click(startSortHandler);
    $('#stopButton').click(selectStopContinue);
    $('#nextButton').click(moveToNextLine);
    $('#terminateButton').click(terminateHandler);
}

function startSortHandler()
{
  var res = validateInputANDCreate();
  if( res === true)
  {
     startSort(); 
  }
}
function stopTheExecution()
{
    INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = false;
    INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = true;
    INSERTION_SORT_BUTTON_STATUS["NEXT"] = false;
     INSERTION_SORT_BUTTON_STATUS["START"] = false;
     INSERTION_SORT_BUTTON_STATUS["STOP"] = false;
    UpdateButtonStatus();
    visualise.InsertionSort.INSTANCE.pauseIt();
}

function continueTheExecution()
{
    function succcallback()
    {
    INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = false;
    INSERTION_SORT_BUTTON_STATUS["NEXT"] = true;
    INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = true;
    INSERTION_SORT_BUTTON_STATUS["STOP"] = true;
    INSERTION_SORT_BUTTON_STATUS["START"] = false;
    UpdateButtonStatus();
    }
    function errorcallback()
    {

    INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = false;
    INSERTION_SORT_BUTTON_STATUS["NEXT"] = true;
    INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = true;
        INSERTION_SORT_BUTTON_STATUS["STOP"] = true;
    INSERTION_SORT_BUTTON_STATUS["START"] = false;
    UpdateButtonStatus();
    }
    INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = true;
    INSERTION_SORT_BUTTON_STATUS["NEXT"] = false;
    INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = true;
    INSERTION_SORT_BUTTON_STATUS["START"] = false;
    INSERTION_SORT_BUTTON_STATUS["STOP"] = true;
    UpdateButtonStatus();
    visualise.InsertionSort.INSTANCE.continue(succcallback,errorcallback);
}

function moveToNextLine()
{

   function succcallback()
   {
     INSERTION_SORT_BUTTON_STATUS["NEXT"] = true;
     INSERTION_SORT_BUTTON_STATUS["STOP"] = true;

     UpdateButtonStatus();   
   }
   function errorcallback()
   {
       alert("Got some error...");
   }
    INSERTION_SORT_BUTTON_STATUS["NEXT"] = false;
    INSERTION_SORT_BUTTON_STATUS["STOP"] = false;
    UpdateButtonStatus();
    visualise.InsertionSort.INSTANCE.moveToNextLine(succcallback,errorcallback);
}

function terminateHandler()
{
   //delete canvas;
    visualise.InsertionSort.INSTANCE.destroy();
    delete visualise.InsertionSort.INSTANCE;
   // $('#sortInputVal').val();
   $('#sortInputVal').val('');
    INSERTION_SORT_BUTTON_STATUS["STOP"] = false;
    INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = true;
    INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = false;
    INSERTION_SORT_BUTTON_STATUS["NEXT"] = false;
    INSERTION_SORT_BUTTON_STATUS["START"] = true;
    UpdateButtonStatus();
}
function selectStopContinue()
{
    //var x = $('#stopButton').attr('value','continue');
    var z = $('#stopButton').text();
    if(z === 'STOP')
    {

          stopTheExecution();
    }
    else
    {
       continueTheExecution();
    }
}


function ExecuteWithDefaultValues()
{
  var res = createInsertionSort([5,4,3,6,7,1]);
  if( res === true)
  {
     $('#sortInputVal').val("5,4,3,6,7,1");
     INSERTION_SORT_BUTTON_STATUS["STOP"] = true;
     INSERTION_SORT_BUTTON_STATUS["ISSTOP"] = false;
     INSERTION_SORT_BUTTON_STATUS["TERMINATE"] = true;
     INSERTION_SORT_BUTTON_STATUS["NEXT"] = true;
     INSERTION_SORT_BUTTON_STATUS["START"] = false;
     UpdateButtonStatus();
     visualise.InsertionSort.INSTANCE.pauseIt(); 
     startSort();
  }

}