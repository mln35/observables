import {IObserver} from '../Interfaces/IObserver'
import { ISubject } from '../Interfaces/ISubject' 

export class Transaction implements ISubject{
    private observers:IObserver[]=[];
    private transactionList:Object[]=[];

    btn = document.querySelector('#valid') as HTMLButtonElement;
    fullNameInput = document.querySelector('#fullname') as HTMLInputElement;
    typeInput = document.querySelector('#type') as HTMLInputElement;
    montantInput = document.querySelector('#montant') as HTMLInputElement;
    motifInput = document.querySelector('#motif') as HTMLInputElement;
    data:{
        nom:string,
        type:string,
        montant:number,
        motif:string
    }

    constructor(){
        this.btn.addEventListener('click', (e) => {
           console.log(this.fullNameInput.value);
           this.transactionList.push({
                nom:this.fullNameInput.value,
                type:this.typeInput.value,
                montant:+this.montantInput.value,
                motif:this.motifInput.value});
            console.log(this.transactionList);
            this.notifyObserver();

        })
    }
    subscribe(observer: IObserver) {
        this.observers.push(observer);
        this.notifyObserver();        
    }
    unsubscribe(observer:IObserver){
        this.observers=this.observers.filter(obs =>{
            return obs!==observer;
        })
        console.log("Unsubscribe--Observers Array", this.observers);
    }
    notifyObserver() {
        this.observers.forEach(element => {
            
            element.update(this.transactionList);
        });
    }
   
}
