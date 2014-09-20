function Queue(startx,starty,len)
{
      var queueContext = this;
      function initialise()
      {
          queueContext.size = len;
          queueContext.arr = new MyArray(startx,starty,Constants["queue"]["width"],Constants["queue"]["width"],len,Constants["queue"]);
          queueContext.front = 0;
          queueContext.rear = 0;
          queueContext.count = 0;
          queueContext.frontPointer = null;
          queueContext.rearPointer = null;
          queueContext.enqueue = enqueue;
          queueContext.dequeue = dequeue;
          queueContext.removeQueue = removeQueue ;
          queueContext.frontPointer = queueContext.arr.createPointer(queueContext.front+1,"front","front",true,Constants["queue"]["front-pointer"]);
          queueContext.rearPointer =  queueContext.arr.createPointer(queueContext.rear+1,"rear","rear",false,Constants["queue"]["rear-pointer"]); 
      }
      initialise();
      
      function enqueue(value,callback)
      {
       
        if(isFull())
        {
           if( typeof callback === 'function')
            {
               callback(false);
               return;
            }  
        }
        queueContext.count =  queueContext.count+1;
        queueContext.arr.fillColor(queueContext.front+1,"#94AFF7");
        queueContext.arr.setText(queueContext.front+1,value);
        queueContext.front = (queueContext.front+1)%queueContext.size;
        queueContext.frontPointer.move(queueContext.front+1,successcallback);
        function successcallback()
        {
           if( typeof callback === 'function')
            {
               callback(true);
            }                     
        }
      }
      
      
      function dequeue(callback)
      {
         if(isEmpty())
         {
             if( typeof callback === 'function')
             {
                callback(false);
                return;
             }
         }
        
        queueContext.count =  queueContext.count-1;
        var dequeuedvalue = queueContext.arr.elements[queueContext.rear].getText();
        queueContext.arr.setText(queueContext.rear+1,"");
        queueContext.arr.fillColor(queueContext.rear+1,"#ffffff");
        queueContext.rear = (queueContext.rear+1)%queueContext.size;
        queueContext.rearPointer.move(queueContext.rear+1,successcallback);            
         
        function successcallback()
        {
          if( typeof callback === 'function')
             {
                callback(dequeuedvalue);
             }
        }         
         
      }
      
      function isFull()
      {
        if(  (queueContext.front == queueContext.rear) && queueContext.count == queueContext.size)
          {
            return true;   
          }
          return false;
        
       }
       
       function isEmpty()
       {
         if(  (queueContext.front == queueContext.rear) && queueContext.count == 0) 
         {
            return true;
         }
         return false;
       }
      
       function removeQueue()
       {
          queueContext.arr.removeArray();   
       }
      
      
      
      
      
      
}