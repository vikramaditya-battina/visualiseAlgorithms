$(document).ready(main);

function main()
{
  isQueueCreated = false;  
  canvas = Raphael("canvas",1000,500);
   x = canvas.text(100,200,"vikram");
  x.animate({ x : 100 , y:600 },1000,"long",successcallback);
  function successcallback()
  {
    alert("vikram");
  }
}
