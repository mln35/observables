import {IObserver} from './IObserver'
export interface ISubject{
    subscribe(observer:IObserver);
    unsubscribe(observer:IObserver);
    notifyObserver();
}