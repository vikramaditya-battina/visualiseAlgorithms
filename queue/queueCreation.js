function Queue(startx,starty,len)
{
      var queueContext = this;
      function initialise()
      {
          queueContext.len = len;
          queueContext.arr = new MyArray(startx,starty,Constants["queue"]["width"],Constants["queue"]["width"],len);          
      }
      initialise();
}