/*
var j = 2;          
while(j < length)
{
  var key = Array[j];
  var i = j - 1;
  while( i > 0 && Array[i] > key )
  {
     Array[i+1] = Array[i]
   i = i - 1;
  }
  j = j+1;
}
*/

if( typeof visualise == 'undefined')
{
	visualise = {};
}
visualise.properties = {"highliteColor":true,"normalColor":true};
userdefinedKeys = {"highliteColor":true,"normalColor":true};
visualise.codeANM = Class({
   	"constructor": function(codeString,properties){
        this.codeString = codeString;
        this.properties = properties;
        this.highLiteLines = {};
        this.CodeLineMap = {};
        this.breakPointLines = {};
        this.programCounter = 1;
        var codeLines = codeString && codeString.split('\n');
        if( codeLines instanceof Array )
        {
          var length = codeLines.length;
          var codecontainer  = document.getElementById("codecontainer");
          for(var i  = 0 ;  i < length ; i++)
          {
            var divElement = document.createElement("div");
            divElement.setAttribute("id","line"+(i+1));
            codecontainer.appendChild(divElement);
            var divTextNode = document.createTextNode(codeLines[i]);
            var button123 = document.createElement("button");
            var buttonTextNode = document.createTextNode(""+(i+1));
            button123.setAttribute("id","breakPoint"+(i+1));
            button123.style["height"] = '100%';
            button123.style["padding-left"] = "2px";
            button123.style["margin"] = "0 auto";
            button123.style["font-size"] = "50%";
            button123.style["border-width"] = "0px";
            button123.style["border-radius"] = "100%";
            button123.style["background"] = (this.properties["breakPointUnselectColor"])?this.properties["breakPointUnselectColor"]:properties["normalColor"];
            button123.appendChild(buttonTextNode);
            this.registerBreakPoint(button123,i+1);
            divElement.appendChild(button123);
            divElement.appendChild(divTextNode);
            for( var stylekeys in properties)
            {
              if( !userdefinedKeys[stylekeys] )
              divElement.style[stylekeys] = properties[stylekeys];
            }
            if( properties["normalColor"] )
            {
              divElement.style["background-color"] = properties["normalColor"];
            }
            this.CodeLineMap[String(i+1)] = {};
            this.CodeLineMap[String(i+1)]["lineDiv"] = divElement;
            this.CodeLineMap[String(i+1)]["lineCode"] = codeLines[i];
            this.CodeLineMap[String(i+1)]["lineNum"] = String(i+1);
            // nextLine number these will be filled automatically by next Release
            this.CodeLineMap[String(i+1)]["nextLine"] = 0;
            //what will be the statement type ex: declaration or Conditional Stmnt or LoopCoditional Statement
            this.CodeLineMap[String(i+1)]["statementType"] = "";
            //what will be the properties of statement ex conditional statement has What is else part line number
            this.CodeLineMap[String(i+1)]["statementDefinedProps"] = {};
            //what animations need to execute for this line
            this.CodeLineMap[String(i+1)]["handler"] = function(succ){succ();};
            this.CodeLineMap[String(i+1)]["comments"] = "";

          }
          //alert(JSON.stringify(this.CodeLineMap));
        }
    },
 
    "setAnimationObj" : function(animationObj){
        this.animationObj = animationObj;
    },
    "makeHighLite"  : function(linenum,flag){
         // linenum says which line to be hight lighted
         //flag  says whether off all other hights or hight lite this also
         if(!linenum)
             return;
        if(flag == true)
        {
            for(var lnnum in this.highLiteLines)
            {
               var divElement = this.CodeLineMap[String(lnnum)] && this.CodeLineMap[String(lnnum)]["lineDiv"];
               divElement.style["background-color"] = this.properties["normalColor"];
            }
            this.highLiteLines = {};
        }
         if( linenum instanceof Array)
         {
            for(var i  = 0 ; i < linenum.length ;i++)
            {
               var divElement = this.CodeLineMap[String(linenum[i])] && this.CodeLineMap[String(linenum[i])]["lineDiv"];
               divElement.style["background-color"] = this.properties["highliteColor"];
               this.highLiteLines[String(linenum[i])] = true;
            }
         }
         else
         {
            //assuming it was number
            var divElement = this.CodeLineMap[String(linenum)] && this.CodeLineMap[String(linenum)]["lineDiv"];
            divElement.style["background-color"] = this.properties["highliteColor"];
            this.highLiteLines[String(linenum)] = true;
         }      
    },

    "getCodeLineMap" : function(){
            return this.CodeLineMap;
    },
    
    "setCodeLineMap":function(CodeLineMap){
         this.CodeLineMap = CodeLineMap;
    },
    
    "moveNext" :  function(scopeObj,successcallback,errorcallback,forceNextLine){
         // conditionalFlag say whether we need to execute take nextLine property or need to take the statement properties
         //handler flag says whether we need to execute the handler or not
         //forceNextLine helps whether to execute or not if forceNextLine is true then it will execute if is break point also
         var currentScopeObj = this;

         var currentLineNum = this.programCounter;
         if(currentLineNum === "EOF")
         {
            errorcallback();
            return;
         }
         this.makeHighLite(currentLineNum,true);
         if( forceNextLine !== true && this.pleaseStop && this.pleaseStop === true)
         {
            errorcallback({"error":"BREAK_POINT_REACHED"});
            return;
         }
         else if( forceNextLine !== true && this.breakPointLines[currentLineNum] === true)
         {
             //hold break point reached so please stop u cannot proceed
             errorcallback({"error":"BREAK_POINT_REACHED"});
             return;
         }
         var lineProperties = this.CodeLineMap[String(currentLineNum)];
         var statementType = lineProperties && lineProperties["statementType"];
         //at present we have only there two statements
         if(statementType == "IF_CONDITIONAL")
         {
            var statementDefinedProps = lineProperties["statementDefinedProps"];
            var trueLineNum  = statementDefinedProps["IF_CONDITIONAL_TRUE_LINE_NUM"];
            var falseLineNum = statementDefinedProps["IF_CONDITIONAL_FALSE_LINE_NUM"];
         }
         else if(statementType == "WHILE_CONDITIONAL")
         {
              var statementDefinedProps = lineProperties["statementDefinedProps"];
              var trueLineNum  = statementDefinedProps["WHILE_CONDITIONAL_TRUE_LINE_NUM"];
              var falseLineNum = statementDefinedProps["WHILE_CONDITIONAL_FALSE_LINE_NUM"];  
         }
         else
         {
            var nextLineNumber = lineProperties["nextLine"];
            this.programCounter = nextLineNumber;
         } 
         lineProperties["handler"].call(scopeObj,moveNextsuccesscallback);
         function moveNextsuccesscallback(conditionalFlag)
        {
           if( statementType === "WHILE_CONDITIONAL")
           {
                if( conditionalFlag == true)
              {
                 currentScopeObj.programCounter = trueLineNum;
              }
              else
              {
                 currentScopeObj.programCounter = falseLineNum;
              }
           }
           else if( statementType === "IF_CONDITIONAL")
           {
                if( conditionalFlag == true)
               {
                   currentScopeObj.programCounter = trueLineNum;
               }
               else
               {
                   currentScopeObj.programCounter = falseLineNum;
               }
           } 
           if( typeof successcallback === 'function')
           successcallback();
        }
    },
    "registerBreakPoint":function(button,linenum)
    {
      var context = this;
      button.onclick = function(){
        if(context.breakPointLines[String(linenum)] ) var isSelected = true;
        if(isSelected === true)
        {
          context.breakPointLines[String(linenum)] = undefined;
          var color = context.properties["breakPointUnselectColor"];
          button["style"]["background"] = (color)?color:"#ffffff";
        }
        else
        {
          context.breakPointLines[String(linenum)] = true;
          var color = context.properties["breakPointSelectColor"];
          button["style"]["background"] = (color)?color:"#400311";
        }
      };
    },

    "removeTheLines":function(){
           var codeLineMap = this.CodeLineMap;
           var parentCodeContainer = document.getElementById("codecontainer");
           for(var linenum in codeLineMap)
           {
              if(codeLineMap[linenum])
              {
               var divElement = document.getElementById(codeLineMap[linenum]["lineDiv"]["id"]);
               parentCodeContainer.removeChild(divElement);
             }
           }
           //parentCodeContainer.remove();
    },
    "isBreakPointLine" : function(linenum)
    {
           if( linenum && this.breakPointLines[String(linenum)] === true)
              return true;
          return false;
    },
    "stopIt" : function()
    {

        this.pleaseStop = true;
       // this.breakPointLines[String(nextLineToBeExecuted)] = true;
    },
    "continueIt" : function()
    {
       delete this.pleaseStop;
    }


});