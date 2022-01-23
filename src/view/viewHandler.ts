export class View {

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
    let ul = document.querySelector("#liste");
    ul.innerHTML = "";
    data.forEach((obj) => {
      ul.insertAdjacentHTML(
        "beforeend",
        `
        <li class=${obj.type === "Debit" ? "debit" : "credit"}>
        ${obj.montant} F ont été ${obj.type === "Debit" ? "Retiré" : "Déposé"}
        par ${obj.fullname} pour ${obj.motif} </li>
        `
      );
    });
  }
  renderPersonal(data: any[], uniqueName: any[]) {
    let table = document.querySelector("#autor");
    table.innerHTML = "";
    for (let i = 0; i < uniqueName.length; i++) {
      let arr1 = data.filter((e) => {
        return e.fullname === uniqueName[i];
      });
      let name = arr1[0].fullname;
      let totalDebit = 0;
      let totalCredit = 0;
      arr1.forEach((e) => {
        if (e.type === "Debit") {
          totalDebit += e.montant;
        } else {
          totalCredit += e.montant;
        }
      });
      console.log(
        `name:${name} totalCredit:${totalCredit} totalDebit:${totalDebit}`
      );
      table.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
            <td>${name}</td>
            <td>${totalDebit}</td>
            <td>${totalCredit}</td>
        </tr>
        `
      );
    }
  }
}
