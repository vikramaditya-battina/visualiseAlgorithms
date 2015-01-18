ANIMATIONS_PAUSE = {};
IS_PAUSED = false;
function createCanvas()
{
    canvas = Raphael("canvas",1000,500);
    if( typeof canvas.attr === 'undefined' )
    {
         console.log("vikramaditya");
    }
    else
    {
         console.log("battina");
    }
}
function  MyArray(sx,sy,w,d,arr,attribs)
{
    this.sx = sx;    // starting x cordinate
    this.sy = sy;   // starting y cordinate
    this.w = w;    // width of the array
    this.d = d ;  // depth of the array
    this.elements = [];
    this.ex = sx;
    this.ey = sy;
    this.pointers = {};
    var arraycontext = this;
    if((arr instanceof Array))
    {
       this.arr = arr;
       this.len = arr.length;
    }
    else if(typeof arr === 'number')
    {
       this.arr = [];
       this.len = arr;
    }
    else
    {
       this.arr = [];
       this.len = 0;
    }
    function ElementPosition(sx,sy,w,d)
    {
       this.sx = sx; //this is elements starting x cordinate
       this.sy = sy; // this is element starting y cordiante       
       this.w = w;   //this is width
       this.d = d;   //this is depth      
    }
    
    function ElementTextPosition(elempos)
    {
       var x = elempos.sx + elempos.w/2;
       this.x =   x ; //this is position of the text
       
       var y = elempos.sy + elempos.d/2;
       this.y = y;   
    }
    
    function Element(text,attributes)
    {
       if(typeof text === 'undefined')
       {
           text = ""
       }
       attributes = attributes || {};
       var elempos = new ElementPosition(arraycontext.ex,arraycontext.ey,arraycontext.w,arraycontext.d);
       arraycontext.ex = arraycontext.ex+arraycontext.w;
       this.elemPosition = elempos;
       var elemtextpos = new ElementTextPosition(elempos);
       this.elemTextPosition = elemtextpos;
       this.value = text;     
       this.elem = canvas.rect(elempos.sx,elempos.sy,elempos.w,elempos.d);
       this.elemText = canvas.text(elemtextpos.x,elemtextpos.y,text);
       if( attributes["text-size"])
       {
          this.elemText.attr({"font-size": attributes["text-size"] });
       }
       if( attributes["text-color"])
       {
          this.elemText.attr({"fill": attributes["text-color"] });
       }
       if( attributes["background-color"])
       {
          this.elem.attr({"fill" : attributes["background-color"]})
       }
       this.setText = function(text)
                      {
                          this.value = text;
                          this.elemText.attr({"text":text});
                      }
        this.getText = function()
                    {
                         return  this.value;
                    }
        this.fillColor = function(color)
        {
            
            this.elem.attr({"fill":color})
        }
        this.removeElement = function()
         {
            this.elem.remove();
            this.elemText.remove();
         }
        this.updateText = function(attribs)
             {
                for( var key in attribs)
                {
                   this.elemText.attr({key : attribs[key]});
                }
             }             
        
    }
    /***
        It will create pointer with specified text and specified elemindex
        where flag says it is whether top or bottom        
    ****/
        function Pointer(elemindex,text,name,flag,attributes)
        {
          this.text = text;
          this.index = elemindex;
          this.name = name;
          this.flag =flag;
          var elempos = arraycontext.elements[elemindex-1]["elemPosition"];
          attributes = attributes || {};
          this.attributes = attributes;
          var textgap = (attributes["pointer-text-size"]) || 0;
          textgap = textgap/2 + 5;
          
          if( flag === true ) //top
          {
             
             this.x2 = elempos["sx"]+elempos["w"]/2;
             this.y2 = elempos["sy"]-(attributes["pointer-gap"] || 5 );;
             this.x1 = this.x2;
             this.y1 = this.y2-( attributes["height"] || 25 );
             this.pointerText = canvas.text(this.x1,this.y1-textgap,text);               
          }
          else if(flag === false) //bottom
          {
            this.x2 = elempos["sx"]+elempos["w"]/2;
            this.y2 = elempos["sy"]+elempos["d"]+ (attributes["pointer-gap"] || 5 );
            this.x1 = this.x2;
            this.y1 = this.y2 + (attributes["height"] || 25 );
            this.pointerText = canvas.text(this.x1,this.y1+textgap,text);            
          }
          var command = "M"+this.x1+" ,"+this.y1+"L"+this.x2+" ,"+this.y2;
          this.pointer = canvas.path(command);
          this.pointer.attr({"arrow-end":"classic -narrow -long"});
          if( attributes["stroke"] )
          {
            this.pointer.attr({"stroke":attributes["stroke"]});
          }
          if( attributes["stroke-width"] )
          {
            this.pointer.attr({"stroke-width":attributes["stroke-width"]});
          }
          if( attributes["pointer-text-size"] )
          {
             this.pointerText.attr({"font-size": attributes["pointer-text-size"] });
          }
          if( attributes["pointer-text-family"] )
          {
            this.pointerText.attr({"font-family": attributes["pointer-text-family"]});
          }
          if(  attributes["pointer-text-color"] )
          {
            this.pointerText.attr({"fill" : attributes["pointer-text-color"] });
          }
          
          this.move = function(elemindex,callback)
                     //assuming inpu is true
                     //assuming element idex starts from 1..len
                     {
                     
                        if(elemindex <= arraycontext.len)
                        {
                             var textgap = (this.attributes["pointer-text-size"]) || 0;
                             textgap = textgap/2 + 5;
                              var elempos = arraycontext.elements[elemindex-1]["elemPosition"];
                              var animationspeed = attributes["animation-speed"] || 1000;
                              var pointergap = this.attributes["pointer-gap"] || 5 ;
                              var pointerheight = this.attributes["height"] || 25;
                              var animationName = "PointerText"+elemindex; 
                              if(this.flag === true)
                              {
                                  this.x2 = elempos["sx"]+elempos["w"]/2;
                                  this.y2 = elempos["sy"]-pointergap;
                                  this.x1 = this.x2;
                                  this.y1 = this.y2-pointerheight;
                                  this.pointerText.animate({x:this.x1,y:this.y1-textgap},animationspeed,"long",pointerTextsucccall);
                                  //console.log("Pointer Text Not Stored");
                                  ANIMATIONS_PAUSE[animationName] = this.pointerText;
                                  //console.log("Pointer Text Stored");
                              }
                              else if( this.flag === false)
                              {
                                  this.x2 = elempos["sx"]+elempos["w"]/2;
                                  this.y2 = elempos["sy"]+elempos["d"]+pointergap;
                                  this.x1 = this.x2;
                                  this.y1 = this.y2 + pointerheight; 
                                  this.pointerText.animate({x:this.x1,y:this.y1+textgap},animationspeed,"long",pointerTextsucccall);
                                  //console.log("Pointer Text Not Stored");
                                  ANIMATIONS_PAUSE[animationName] = this.pointerText;
                                  //console.log("Pointer Text Stored");
                              }
                              var command = "M"+this.x1+" ,"+this.y1+"L"+this.x2+" ,"+this.y2;
                              var pointerAnimationName = "Pointer"+elemindex;
                              this.pointer.animate({"path":command},animationspeed,"long",pointercallback);
                              console.log("Pointer Not Stored");
                              ANIMATIONS_PAUSE[pointerAnimationName] = this.pointer;
                              console.log("Pointer Stored");
                              function pointerTextsucccall()
                              {
                                 var animationNamee = "PointerText"+elemindex;
                                 ANIMATIONS_PAUSE[animationNamee] = null;
                              }
                              function pointercallback()
                              {
                                var animationNamee = "Pointer"+elemindex;
                                ANIMATIONS_PAUSE[animationNamee] = null;
                                callback();
                              }
                              
                              
                        }
                        else
                        {
                            //throw error
                        }
                     }                     
          
        }
        
    this.createPointer = function(elemindex,text,name,flag,attributes)
    {
             if(elemindex > this.len)
             {
               //throw error
             }
             if(typeof name === undefined)
             {
                //throw error
             }
             if(typeof text === 'undefined' || text===""|| text===null)
             {
                 text = "";
               
             }
             if(typeof flag === undefined)
             {
                flag = true;
             }
             arraycontext.pointers[name] = new Pointer(elemindex,text,name,flag,attributes);
             return arraycontext.pointers[name];     
    }
    
    this.getPointer=   function(name)
                      {
                      
                          return this.pointers[name];
                      }
    this.removePointer = function(name)
                        {
                            
                            this.pointers[name].pointer.remove();
                            this.pointers[name].pointerText.remove();
                        }
    this.removeArray = function()
                       {
                           for(var i in this.elements)
                           {
                               this.elements[i].removeElement();
                           }
                           for(var i in this.pointers)
                           {
                               this.removePointer(i);;
                           }
                       }
    this.setText = function(elemindex,text)
                   {
                        var elem = this.elements[elemindex-1];
                        elem.setText(text);
                   }
    this.fillColor = function(elemindex,color)
                   {
                     this.elements[elemindex-1].fillColor(color);
                   }
    this.moveElement = function( sourceindex,targetindex,sourcetext,flag,callback,specificattr)
                {
                       var sourseElementText = this.elements[sourceindex];
                       var targetElementText = this.elements[targetindex];
                       
                       if( sourseElementText && sourseElementText )
                       {
                          var sourceX = sourseElementText["elemTextPosition"]["x"];
                          var sourceY = sourseElementText["elemTextPosition"]["y"];
                          var targetX = targetElementText["elemTextPosition"]["x"];
                          var targetY = targetElementText["elemTextPosition"]["y"];
                          var attr = sourseElementText["elemText"].attr();
                          var elemsource = canvas.text(sourceX,sourceY,sourcetext);
                          elemsource.attr({"font-size": attr["font-size"]});
                          elemsource.attr({"fill":attr["fill"]});
                       }
                       else
                       {
                         return;
                       }
                       var animationName = "moveElement"+sourceindex+"$"+targetindex+"$"+flag;
                       var animationSpeed =  (specificattr && specificattr["animation_speed"]) || 1000; 
                       if( flag == 0)
                       {
                           // on the above of index
                           var height = attribs["width"] || 50;
                           elemsource.animate({ x : sourceX , y:sourceY-height},animationSpeed,"long",successcallback01);
                           ANIMATIONS_PAUSE[animationName] = elemsource;
                           function successcallback01()
                           {
                             elemsource.attr({ x : sourceX , y:sourceY-height});
                             elemsource.animate({ x : targetX , y:sourceY-height},animationSpeed,"long",successcallback02);
                           }
                           function successcallback02()
                           {
                              elemsource.attr({ x : targetX , y:sourceY-height});
                              elemsource.animate({ x : targetX , y:targetY },animationSpeed,"long",successcallback03);
                           }
                           function successcallback03()
                           {
                             var animationName = "moveElement"+sourceindex+"$"+targetindex+"$"+flag;
                             ANIMATIONS_PAUSE[animationName] = null;
                             elemsource.remove();
                             targetElementText.setText(sourcetext);  
                             if( typeof callback === "function")
                             {
                               callback();
                             }
                           }
                       }
                       else if( flag == 1)
                       {
                           // on the parallel to the array
                            elemsource.remove();
                           elemsource.animate({ x : targetX , y:targetY},animationSpeed,"long",succ);
                           ANIMATIONS_PAUSE[animationName] = elemsource;
                           function succ()
                           {
                             var animationName = "moveElement"+sourceindex+"$"+targetindex+"$"+flag;
                             ANIMATIONS_PAUSE[animationName] = null;
                             targetElementText.setText(sourcetext);
                              if( typeof callback === "function")
                              {
                                callback();
                              }
                           }
                       }
                       else
                       {
                           height = attribs["width"] || 50; 
                           elemsource.animate({ x : sourceX , y:sourceY+height},animationSpeed,"long",successcallback21);
                           ANIMATIONS_PAUSE[animationName] = elemsource;
                           function successcallback21()
                           {
                             elemsource.attr({ x : sourceX , y:sourceY+height});
                             elemsource.animate({ x : targetX , y:sourceY+height},animationSpeed,"long",successcallback22);
                           }
                           function successcallback22()
                           {
                              elemsource.attr({ x : targetX , y:sourceY+height}); 
                              elemsource.animate({ x : targetX , y:targetY },animationSpeed,"long",successcallback23);
                           }
                           function successcallback23()
                           {
                              ANIMATIONS_PAUSE[animationName] = null;
                              elemsource.remove();
                             targetElementText.setText(sourcetext); 
                             if( typeof callback === "function")
                             {
                                callback();
                             }
                           } 
                       
                       }
                       // assuming the sourceindex and the targetindex are valid
                       
                }
    this.getValues = function( )
             {
                var values = [];
                for(var i in this.elements)
                {
                  values[i] = this.elements[i].getText();
                }
                return values;
             }             
   function main()
    {
        attribs = attribs || {};
       if(arraycontext.len === arraycontext.arr.length)
       {
           for(var i=0;i<arraycontext.len;i++)
           {
               arraycontext.elements[i] = new Element(arraycontext.arr[i],attribs["element"]);
           }
       }
       else
       {
           for(var i=0;i<arraycontext.len;i++)
           {
               
               arraycontext.elements[i] = new Element("",attribs["element"]);
           }
       }
    }
    main();
 }
  
function pauseAnimations()
{
  for(var element in ANIMATIONS_PAUSE)
  {
    if( ANIMATIONS_PAUSE[element] )
    {
      console.log(element);
      ANIMATIONS_PAUSE[element].pause();
    }
  }
}
function resumeAnimations()
{
  for(var element in ANIMATIONS_PAUSE)
  {
    if( ANIMATIONS_PAUSE[element])
    {
      console.log(element);
      ANIMATIONS_PAUSE[element].resume();
    }
  }
}

function pleasePause()
{
  setTimeout(timeOutCallback,100);
  function timeOutCallback()
  {
    if( IS_PAUSED === true)
    {
      pauseAnimations();
      console.log("pausing");
      pleasePause();
    }
  }
}
function pauseIt()
{
  IS_PAUSED = true;
  pauseAnimations();
  pleasePause();
}
function resumeIt()
{
  IS_PAUSED = false;
  console.log("resuming");
  resumeAnimations();
}