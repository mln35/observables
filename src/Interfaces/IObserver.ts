import { ISubject } from "./ISubject";

export interface IObserver{
    update(data:any []);
}