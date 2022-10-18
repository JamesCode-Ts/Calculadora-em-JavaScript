class CalcController{

constructor(){

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

}

addEventListenerAll(element, events, fn){

events.split(' ').forEach(event =>{

    element.addEventListener(event, fn, false);


});
}

initButtonsEvents(){

    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index)=>{ /** Com o forEach, Percorre todos os elementos dentro de buttons */

        this.addEventListenerAll(btn,"click drag", e =>{

            console.log(btn.className.baseVal.replace("btn-",""));  /** Replace quer dizer subistitua,ou seja, removeu o btn- na hora da impressão. */
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