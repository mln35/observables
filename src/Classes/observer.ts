import { IObserver } from "../Interfaces/IObserver";
import { ISubject } from "../Interfaces/ISubject";
import { View } from "../view/viewHandler";

//class solde implementation
export class Solde implements IObserver {
  constructor(private solde: number, private view: View) {
    this.render();
  }
  update(data: any[]) {
    let totalDebit = 0;
    let totalCredit = 0;
    data.forEach((obj) => {
      if (obj.type === "Debit") {
        totalDebit += obj.montant;
      } else {
        totalCredit += obj.montant;
      }
    });
    this.solde = totalCredit - totalDebit;
    this.render();
  }
  render() {
    this.view.renderSolde(this.solde);
  }
}

export class List implements IObserver {
  constructor(private view: View) {}
  update(data: any[]) {
    this.view.renderList(data);
  }
}

export class Personal implements IObserver {
  private uniqueName: any[];
  constructor(private view: View) {
    console.log("personalTrans work");
  }
  update(data: any[]) {
    this.uniqueName = Array.from(
      new Set(
        data.map((obj) => {
          return obj.fullname;
        })
      )
    );
    console.log("Update personalTrans", this.uniqueName);
    this.view.renderPersonal(data, this.uniqueName);

    // for (let i = 0; i < this.uniqueName.length; i++) {
    //   let arr1 = data.filter((e) => {
    //     return e.fullname === this.uniqueName[i];
    //   });
    //   let name = arr1[0].fullname;
    //   let totalDebit = 0;
    //   let totalCredit=0;
    //   arr1.forEach((e) => {
    //       if(e.type==="Debit"){
    //         totalDebit += e.montant;
    //       }
    //       else{
    //         totalCredit += e.montant;
    //       }
        
    //   });
    //   console.log(`name:${name} totalCredit:${totalCredit} totalDebit:${totalDebit}`);
    //   this.view.renderPersonal(name, totalDebit, totalCredit);
    // }
  }
}

// let array=[
//     {name:"maxi", trans:45}, {name:"sidi", trans:25}, {name:"sidi", trans:52},
//     {name:"rama", trans:27},{name:"maxi", trans:72}, {name:"salif", trans:78},
//     {name:"rama", trans:95} , {name:"salif", trans:15}, {name:"maxi", trans:7},
//     {name:"sidi", trans:49}, {name:"rama", trans:74}, {name:"salif", trans:45}
// ]
