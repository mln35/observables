export class Controller{
    private obj={
        fullname:"",
        type:"",
        montant:0,
        motif:""
    }
    
    constructor(){
        let htmlFullname=document.querySelector("#fullname") as HTMLInputElement;
        let htmlType=document.querySelector("#type") as HTMLSelectElement;
        let htmlMontant=document.querySelector("#montant") as HTMLInputElement;
        let htmlMotif=document.querySelector("#motif") as HTMLInputElement;
        let button=document.querySelector("#valid") as HTMLButtonElement;
        button.addEventListener('click', (e)=>{

            this.obj.type=htmlType.value;
            this.obj.fullname=htmlFullname.value;
            
            this.obj.montant=+htmlMontant.value;
            this.obj.motif=htmlMotif.value;
            // console.log(`
            // ${this.fullname} ${this.type} ${this.montant} ${this.motif}
            // `)
        })
    }
    getData(){
       return this.obj;
    }
    
}