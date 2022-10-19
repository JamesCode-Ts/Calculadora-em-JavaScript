class CalcController{

constructor(){
    this._operation = [];
    this._locale = 'pt-BR';
    this._displayCalcEl = document.querySelector('#display');
    this._dateEl = document.querySelector('#data');
    this._timeEl = document.querySelector('#hora');
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();



}

initialize(){


this.setDisplayDateTime();

setInterval(()=>{ /** Arrow funcion, a flexa indica o que vai ser executado diretamente,
                      ou seja, essa função vai fazer isso.
                      Para executar algo de forma intermitente usamos o setInterval. */
     this.setDisplayDateTime();



}, 1000);

this.setLastNumberToDisplay();

}

addEventListenerAll(element, events, fn){

events.split(' ').forEach(event =>{

    element.addEventListener(event, fn, false);


});
}

clearAll(){

this._operation = [];

this.setLastNumberToDisplay();

}

clearEntry(){

this._operation.pop();

this.setLastNumberToDisplay();

}

getLastOperation(){

    return this._operation[this._operation.length-1]; /** Retorna o valor armazenado na ultima posição. */
}

setLastOperation(value){

    this._operation[this._operation.length -1 ] = value; /** Adiciona o valor ao array na ultima posição */

}

isOperator(value){

    return(['+','-','*','%','/'].indexOf(value) > -1);
}

pushOperation(value){


    this._operation.push(value);

if(this._operation.length > 3){

    this.calc();

    console.log(this._operation);

}


}

calc(){

    let last = '';

    if(this._operation.length > 3){
        last = this._operation.pop();
    }

    let result = eval(this._operation.join(""));
    this._operation = [result, last];

    if(last == '%'){

        result /= 100;

        this._operation = [result];

    }else{

        this._operation = [result];
    
        if(last) this._operation.push(last);
    }

    this.setLastNumberToDisplay();


}

setLastNumberToDisplay(){

let lastNumber;

for(let i = this._operation.length-1; i>=0; i--){

    if(!this.isOperator(this._operation[i])){
    lastNumber = this._operation[i];
    break;

    }
}

if(!lastNumber) lastNumber = 0;

this.displayCalc = lastNumber;
}

addOperation(value){

console.log('A', isNaN(this.getLastOperation()));

if(isNaN(this.getLastOperation())){ /** isNAN é usado para afirmar que não é um numero.
                                    Nesse caso ele retorna a ultima operação, no qual não é um numero.*/

    if(this.isOperator(value)){ /** Se for um operador, passa o valor do operador para o array. */


       this.setLastOperation(value);  // Adicionar o valor operador,Pode haver uma substituição do operador, caso haja uma troca de sinais.

    }else if(isNaN(value)){

        // Outra coisa

        console.log(value);

    } else {
/** Se não for um operador ou outra coisa é um numero. Salva no array o número */
        this.pushOperation(value);

        this.setLastNumberToDisplay();
    }

    


    
}else{ 
/** Ser for digitado o operador 2 ou mais vezes, substitui o sinal do operador */
if(this.isOperator(value)){

    this.pushOperation(value);

}else{

/**O valor digitado é um numero */

    let newValue = this.getLastOperation().toString() + value.toString(); /** Transforma o array para string para poder concatena-lo. */
    this.setLastOperation(parseInt(newValue));

    this.setLastNumberToDisplay();
}
}
    console.log(this._operation);
}

setError(){

    this.displayCalc = "Error"
}

execBtn(value){

    switch(value){

        case 'ac':
            this.clearAll();
        break;

        case 'ce':
            this.clearEntry();
        break;

        case 'soma' : 
        this.addOperation('+');
        break;

        case 'subtracao' : 
        this.addOperation('-');

        break;


        case 'divisao' : 
        this.addOperation('/');

        break;

        case 'multiplicacao' : 

        this.addOperation('*');

        break;

        case 'porcento' : 

        this.addOperation('%');


        break;

        case 'igual' : 
        
        this.addOperation('=');
        this.calc();

        break;

        case 'ponto' : 
        
        this.addOperation('.');

        break;

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
            this.addOperation(parseInt(value));
            break;
            
        default:
        this.setError();
        break;
    }

}


initButtonsEvents(){

    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index)=>{ /** Com o forEach, Percorre todos os elementos dentro de buttons */

        this.addEventListenerAll(btn,"click drag", e =>{

          let textBtn =  btn.className.baseVal.replace("btn-",""); 
           /** Replace quer dizer subistitua,ou seja, removeu o btn- na hora da impressão. */

           this.execBtn(textBtn);
        });

     this.addEventListenerAll(btn,"mouseover mouseup mousedown", e =>{

        btn.style.cursor = "pointer";
     })

    } )
}


setDisplayDateTime(){

    this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
        day: "2-digit",
        month: "long",
        year:"numeric"
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
}

get displayTime(){

    return this._timeEl.innerHTML;

}

get displayDate(){

    return this._dateEl.innerHTML;


}

set displayTime(valor){

    return this._timeEl.innerHTML = valor;
}

set displayDate(valor){

    return this._dateEl.innerHTML = valor;
}



get displayCalc(){
    return this._displayCalcEl.innerHTML;
}

set displayCalc(valor){
    this._displayCalcEl.innerHTML = valor;
}


get currentDate(){
    return new Date();
}

set currentDate(valor){
    return this._currentDate = valor;
}
}