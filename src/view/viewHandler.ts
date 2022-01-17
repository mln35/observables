export class View{
    private soldeValue:HTMLAnchorElement;
    constructor(){
        let soldeValue=document.querySelector('#solde-value') as HTMLAnchorElement;
    }
    renderSolde(solde:number){
        this.soldeValue.innerHTML=solde.toString();
    }
}