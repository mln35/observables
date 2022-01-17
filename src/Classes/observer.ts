import { IObserver } from "../Interfaces/IObserver";
import { ISubject } from "../Interfaces/ISubject";
import { View } from "../view/viewHandler";

//class solde implementation
export class Solde implements IObserver{
    constructor(private solde:number, private view:View){
        this.render();
    }
    update(data: any []) {
        let totalDebit=0;
        let totalCredit=0;
        data.forEach(obj =>{
            if(obj.type==='Debit'){
                totalDebit+=obj.montant
            }
            else{
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