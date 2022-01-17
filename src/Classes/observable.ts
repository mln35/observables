import {IObserver} from '../Interfaces/IObserver'
import { ISubject } from '../Interfaces/ISubject' 

export class Transaction implements ISubject{
    private observers:IObserver[]=[];
    private transactionList:Object[]=[];
    constructor(private humidity:number){
        
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
