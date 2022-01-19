import {IObserver} from '../Interfaces/IObserver'
import { ISubject } from '../Interfaces/ISubject' 

export class Transaction implements ISubject{
    private observers:IObserver[]=[];
    private transactionList:Object[]=[];
    constructor(){
        let htmlFullname=document.querySelector("#fullname") as HTMLInputElement;
        let htmlType=document.querySelector("#type") as HTMLSelectElement;
        let htmlMontant=document.querySelector("#montant") as HTMLInputElement;
        let htmlMotif=document.querySelector("#motif") as HTMLInputElement;
        let button=document.querySelector("#valid") as HTMLButtonElement;
        button.addEventListener('click', (e)=>{
            this.transactionList.push({
                fullname:htmlFullname.value,
                type:htmlType.value,
                montant:+htmlMontant.value,
                motif:htmlMotif.value
            });
            this.notifyObserver();
            htmlFullname.value="";
            htmlMontant.value="";
            htmlMotif.value="";
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
