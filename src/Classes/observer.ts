import { IObserver } from "../Interfaces/IObserver";
import { ISubject } from "../Interfaces/ISubject";
import { View } from "../view/viewHandler";

//class solde implementation
export class Solde implements IObserver{
    constructor(private solde:number, private view:View){
        this.render();
    }
    update(data: any []) {
        console.log('update', data);
        let totalDebit=0;
        let totalCredit=0;
        data.forEach(obj =>{
            if(obj.type==='Debit'){
                totalDebit+=obj.montant
                console.log('tDeb',totalDebit);
            }
            
            if(obj.type === 'Credit'){
                totalCredit+=obj.montant;
                console.log('tCred',totalCredit);
            }
        });
        this.solde=totalCredit - totalDebit;
        console.log('solde',this.solde);
        this.render();
    }
    render(){
        this.view.renderSolde(this.solde);
    }
}


export class NbTransactions implements IObserver{
    totalDebit=0;
    totalCredit=0;
    constructor(private nb:number, private view:View){
        this.render();
    }
    update(data: any []) {
        this.totalDebit=0;
        this.totalCredit=0;
        console.log('update', data);


        data.forEach(obj =>{
            if(obj.type==='Debit'){
                this.totalDebit+=obj.montant
                console.log('tDeb',this.totalDebit);
            }
            
            if(obj.type === 'Credit'){
                this.totalCredit+=obj.montant;
                console.log('tCred',this.totalCredit);
            }
        });
        
        this.render();
    }
    render(){
        this.view.renderNbTrans(this.totalDebit,this.totalCredit);
    }
}

export class State implements IObserver{
    totalDebit=0;
    totalCredit=0;
    constructor(private nb:number, private view:View){
        this.render();
    }
    update(data: any []) {
        this.totalDebit=0;
        this.totalCredit=0;
        console.log('update', data);


        data.forEach(obj =>{
            if(obj.type==='Debit'){
                this.totalDebit+=obj.montant
                console.log('tDeb',this.totalDebit);
            }
            
            if(obj.type === 'Credit'){
                this.totalCredit+=obj.montant;
                console.log('tCred',this.totalCredit);
            }
        });
        
        this.render();
    }
    render(){
        let state = this.totalCredit < this.totalDebit?'Debiteur':'Crediteur';
        this.view.renderState(state);
    }
}


export class List implements IObserver{
    data: any[]=[];
    constructor(private view:View){
        this.render(this.data);
    }
    update(data: any []) {
        this.render(data);
    }
    render(data:any[]){
        this.view.renderList(data);
    }
}
