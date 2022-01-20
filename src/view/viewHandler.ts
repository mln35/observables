export class View{
    
    
    
    private soldeValue:HTMLElement;

    constructor(){
        this.soldeValue=document.querySelector('#solde-value') as HTMLElement;
    }
    renderSolde(solde:number){
        this.soldeValue.innerHTML=solde.toString();
    }

    renderNbTrans(totalDebit: number, totalCredit: number) {
        document.querySelector('#totalDebit').innerHTML = totalDebit.toString();
        document.querySelector('#totalCredit').innerHTML = totalCredit.toString();        
    }

    renderState(state: string) {
        let divClass = state === 'Debiteur' ?'debiteur':'crediteur';
        document.querySelector('#state-text').className = divClass;
        document.querySelector('#state-text').innerHTML = state;
    }
    
    renderList(data: any[]) {
        //TODO 
        // implement list rendering
    }
}