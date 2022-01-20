export class Controller{

    btn = document.querySelector('#valid') as HTMLButtonElement;
    fullNameInput = document.querySelector('#fullname') as HTMLInputElement;
    typeInput = document.querySelector('#type') as HTMLInputElement;
    montantInput = document.querySelector('#montant') as HTMLInputElement;
    motifInput = document.querySelector('#motif') as HTMLInputElement;
    data={
        nom:'',
        type:'',
        montant:0,
        motif:''
    }

    constructor(){
        this.btn.addEventListener('click', (e) => {
            console.log('button clicked');
            
            this.data.nom = this.fullNameInput.value;
            this.data.type = this.typeInput.value;
            this.data.montant = +this.montantInput.value;
            this.data.motif = this.motifInput.value;
            console.log(this.data);

        })
    }
    getData():{nom:string,type:string,montant:number,motif:string}{
        return this.data;
    }
}