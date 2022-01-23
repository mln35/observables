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
            }
            
            if(obj.type === 'Credit'){
                totalCredit+=obj.montant;
            }
        });
        this.solde=totalCredit - totalDebit;
        this.render();
    }
    render(){
        this.view.renderSolde(this.solde);
    }
}

//Nombre de transaction
export class NbTransactions implements IObserver{
    totalDebit=0;
    totalCredit=0;
    constructor(private nb:number, private view:View){
        this.render();
    }
    update(data: any []) {
        
        this.totalCredit=data.filter((obj)=>{
            return obj.type==="Credit";
        }).length;
        this.totalDebit=data.filter((obj)=>{
            return obj.type==="Debit";
        }).length;
        
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
        data.forEach(obj =>{
            if(obj.type==='Debit'){
                this.totalDebit+=obj.montant
            }
            
            if(obj.type === 'Credit'){
                this.totalCredit+=obj.montant;
            }
        });
        
        this.render();
    }
    render(){
        let state = this.totalCredit - this.totalDebit <0?'Debiteur':'Crediteur';
        this.view.renderState(state);
    }
}

export class List implements IObserver {
  constructor(private view: View) {}
  update(data: any[]) {
    this.view.renderList(data);
  }
}

export class Personal implements IObserver {
  private distinctNames: any[];
  constructor(private view: View) {
  }
  update(data: any[]) {
    this.distinctNames = Array.from(
      new Set(
        data.map((obj) => {
          return obj.fullname;
        })
      )
    );
    this.view.renderPersonal(data, this.distinctNames);

    
  }
}


