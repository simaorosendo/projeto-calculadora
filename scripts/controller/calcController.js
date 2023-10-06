


class calcController{


constructor(){

    this.controlEval = 0;
    this.i=0;
    this._displayCalcEl = document.querySelector("#display1");
    this._operation=[];
    this.initialize();
    this.initButtonsEventsNumbers();
    this.initButtonsEventsOperators();
    this.setNumberToDisplay();
    



}


initialize(){

    

}


verifyOperator(value){

    return (['+', '-', '/', '%', '*'].indexOf(value) > -1);

}



pushOperation(value){

    let lastDigit = this._operation[this._operation.length-1];

    if(this._operation.length > 0 && this.verifyOperator(value))
    {


        //se for operador
        if(isNaN(lastDigit))
        {
            //substituir operadores
            value=value.toString();
            this._operation[this._operation.length-1] = value;

        }else{
        //inserção normal do operador
        value=value.toString();
        this._operation.push(value);
        }
    }

else if(this._operation.length == 0){
        if(this.verifyOperator(value) == false)
        {
        //caso seja a primeira inserção
        this._operation.push(parseInt(value));
        }

    }else{

                if(isNaN(lastDigit))
                {
                    //adiciona numero normalmente depois de um operador
                    this._operation.push(parseInt(value));

                }else{

                    //sequencia de numeros

                    let newValue = this._operation[this._operation.length-1].toString()+ value.toString();
                    this._operation[this._operation.length-1] = parseInt(newValue);

                }

    }





}



addEventListenerAll(element, events, fn){


    events.split(' ').forEach(event => {
    
    
        element.addEventListener(event, fn, false);
    
    
    });
    
    
    }


calcIf3(){

    if(this._operation.length == 4)
    {
        this.controlEval = 1;
        return eval(this._operation.join(""));
    }

}   


setNumberToDisplay(){

    let number = 0;

    if(this.controlEval == 1)
    {
        number = this._operation[0];
        this.displayCalc = number;
        this.controlEval = 0;
    }
    else if(this._operation.length == 0)
    {
        this.displayCalc = number;
    }
    else{
        number = this._operation[this._operation.length-1];
        if(isNaN(number)==false)
        {
        this.displayCalc = number;
        
        }
    }

}

clear(){

this._operation=[];
this.setNumberToDisplay();

}

getLastOperator(){

    let lastOper = this._operation[this._operation.length-1];
    this._operation[this._operation.length-1] = "";
    return lastOper;

}

doEval(){

    let calc = 0;

    if(isNaN(this._operation[this._operation.length-1]))
    {
        this._operation[this._operation.length-1] = "";
        calc= eval(this._operation.join(""));
        this._operation=[];
        this._operation[0] = calc;
    }else{

        calc= eval(this._operation.join(""));
        this._operation=[];
        this._operation[0] = calc;

    }

}


    execBtn(value){

        switch(value){
            
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            this.pushOperation(value);
            console.log(this._operation);
            if(this._operation.length == 4 && this.verifyOperator(value))
            {
            
            let lastOperator = this.getLastOperator();
            let product = this.calcIf3();
            this._operation = [];
            this._operation[0] = product;
            this._operation[1] = lastOperator.toString();
            console.log(this._operation);

            }
            
            this.setNumberToDisplay();



            break;

            case 'ce':
            
            break;

            case 'c':

            this.clear();

            break;

            case '=':

            this.doEval();
            this.setNumberToDisplay();
            
            break;
        
            }
        }


initButtonsEventsNumbers(){


    let buttons = document.querySelectorAll(".row > button");

    buttons.forEach((btn, index)=>{
    
            
                this.addEventListenerAll(btn, 'click drag', e=>{
            
                    let textBtn = btn.className.replace("btn btn-number col-sm ", ""); 
                    this.execBtn(textBtn);
            
                });

    });


}


initButtonsEventsOperators(){


    let buttons = document.querySelectorAll(".row > button");

    buttons.forEach((btn, index)=>{
    
            
                this.addEventListenerAll(btn, 'click drag', e=>{
            
                    let textBtn = btn.className.replace("btn btn-others col-sm ", ""); 
                    this.execBtn(textBtn);
            
                });

    });


}











get displayCalc(){

    return this._displayCalcEl.innerHTML;

}

set displayCalc(value){

    this._displayCalcEl.innerHTML = value;

}




}






























