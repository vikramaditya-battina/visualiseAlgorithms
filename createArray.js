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
function  MyArray(sx,sy,w,d,arr)
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
    
    function Element(text)
    {
       if(typeof text === 'undefined')
       {
           text = ""
       }
       var elempos = new ElementPosition(arraycontext.ex,arraycontext.ey,arraycontext.w,arraycontext.d);
       arraycontext.ex = arraycontext.ex+arraycontext.w;
       this.elemPosition = elempos;
       var elemtextpos = new ElementTextPosition(elempos);
       this.elemTextPosition = elemtextpos;
       this.value = text;     
       this.elem = canvas.rect(elempos.sx,elempos.sy,elempos.w,elempos.d);
       this.elemText = canvas.text(elemtextpos.x,elemtextpos.y,text);                      
       this.setText = function(text)
                      {
                          this.value = text;
                          this.elemText.attr({"text":text});
                      }
        this.getText = function()
                    {
                         return  this.value;
                    }
                     
        
    }
    /***
        It will create pointer with specified text and specified elemindex
        where flag says it is whether top or bottom        
    ****/
        function Pointer(elemindex,text,name,flag)
        {
          this.text = text;
          this.index = elemindex;
          this.name = name;
          this.flag =flag;
          var elempos = arraycontext.elements[elemindex-1]["elemPosition"];
          if(flag === true) //top
          {
             
             this.x2 = elempos["sx"]+elempos["w"]/2;
             this.y2 = elempos["sy"]-5;
             this.x1 = this.x2;
             this.y1 = this.y2-25;
             this.pointerText = canvas.text(this.x1,this.y1-5,text);               
          }
          else if(flag === false) //bottom
          {
            this.x2 = elempos["sx"]+elempos["w"]/2;
            this.y2 = elempos["sy"]+elempos["d"]+5;
            this.x1 = this.x2;
            this.y1 = this.y2 + 25;
            this.pointerText = canvas.text(this.x1,this.y1+5,text);            
          }
          else
          {
              this.x1 = 0;
              this.y1 = 0;
              this.x2  = 0;
              this.y2 = 0;
          }
          console.log("vikram"+this.x1);
          var command = "M"+this.x1+" ,"+this.y1+"L"+this.x2+" ,"+this.y2;
          console.log("command is"+command);
          this.pointer = canvas.path(command);
          this.pointer.attr({"arrow-end":"classic -narrow -long"});
          
          
          this.move = function(elemindex,callback)
                     //assuming inpu is true
                     //assuming element idex starts from 1..len
                     {
                        if(elemindex <= arraycontext.len)
                        {
                              var elempos = arraycontext.elements[elemindex-1]["elemPosition"];
                              if(this.flag === true)
                              {
                                  this.x2 = elempos["sx"]+elempos["w"]/2;
                                  this.y2 = elempos["sy"]-5;
                                  this.x1 = this.x2;
                                  this.y1 = this.y2-25;
                                  this.pointerText.animate({x:this.x1,y:this.y1-5},1000,"long",null);
                              }
                              else if( this.flag === false)
                              {
                                  this.x2 = elempos["sx"]+elempos["w"]/2;
                                  this.y2 = elempos["sy"]+elempos["d"]+5;
                                  this.x1 = this.x2;
                                  this.y1 = this.y2 + 25;
                                  this.pointerText.animate({x:this.x1,y:this.y1+5},1000,"long",null);
                              }
                              var command = "M"+this.x1+" ,"+this.y1+"L"+this.x2+" ,"+this.y2;
                              
                              this.pointer.animate({"path":command},1000,"long",callback);
                              
                              
                        }
                        else
                        {
                            //throw error
                        }
                     }                     
          
        }        
    this.createPointer = function(elemindex,text,name,flag)
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
             console.log("vikramaditya............");
             arraycontext.pointers[name] = new Pointer(elemindex,text,name,flag);
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
    this.setText = function(elemindex,text)
                   {
                        var elem = this.elements[elemindex-1];
                        var elemText = elem.elemText
                        elemText.attr({"text":text});
                   }
    function main()
    {
       if(arraycontext.len === arraycontext.arr.length)
       {
           for(var i=0;i<arraycontext.len;i++)
           {
               arraycontext.elements[i] = new Element(arraycontext.arr[i]);
           }
       }
       else
       {
           for(var i=0;i<arraycontext.len;i++)
           {
               arraycontext.elements[i] = new Element("");
           }
       }
    }
    main();
 }
  

