import {IObserver} from '../Interfaces/IObserver'
import { ISubject } from '../Interfaces/ISubject' 

export class Humidity implements ISubject{
    private observers:IObserver[]=[];
    private controller:HTMLInputElement;
    constructor(private humidity:number){
        this.controller=document.querySelector('#humidity-control') as HTMLInputElement;
        this.controller.value=this.humidity.toString();
        this.controller.addEventListener('change', (e:Event)=>{
            this.setHumidity(+this.controller.value);
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
            console.log(`this.humidity: ${this.humidity}`)
            element.update(this.humidity);
        });
    }
    setHumidity(value:number){
        this.humidity=value;
        this.notifyObserver();
    }
    testFunction(f: () =>void, g:()=>void){
        f();
        g();
    }
}
