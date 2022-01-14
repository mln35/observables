import { IObserver } from "../Interfaces/IObserver";
import { ISubject } from "../Interfaces/ISubject";
export class Vanne implements IObserver{
    private div=document.createElement('div');
    private data:number;//
    private state:boolean=true;
    constructor(private name:string, private seuil:number, private Observable:ISubject){
        this.Observable.subscribe(this);
        console.log(`this.data: ${this.data}`)
        this.state=true;
        let container=document.querySelector("#pompe-container");
        //div_id=pompe
        // this.div.className="off";
        this.div.id=this.name;
        //input
        let input=document.createElement('input');
        input.className="seuil";
        input.type="number";
        input.value=this.seuil.toString();
        input.addEventListener('change', (e:Event)=>{
            this.setSeuil(+input.value);
        })
        //title h4
        let title=document.createElement('h4');
        title.innerHTML=this.name;
        //button
        let button=document.createElement('button');
        button.innerHTML="Unsubscribe";
        button.addEventListener('click', (e:Event)=>{
            
            if(button.innerHTML==="Unsubscribe"){
                button.innerHTML="Subscribe";
                this.Observable.unsubscribe(this);
                this.state=false;
                this.div.className="unsubs";
            }
            else{
                button.innerHTML="Unsubscribe";
                this.Observable.subscribe(this);
                this.state=true;
                this.update(this.data);
            }
        })
        //add element in the div
        this.div.appendChild(input);        
        this.div.appendChild(title);        
        this.div.appendChild(button);        
        container.appendChild(this.div);        
    }
    
    update(data: number) {
        console.log(`this.state:${this.state}`);
        if(this.state){
            this.data=data;
            console.log(`this.seuil: ${this.seuil} ${this.data}`)
        if(this.data < this.seuil){
            console.log(`if(this.data < this.seuil) `);
            this.div.className="on";
        }
        else{
            this.div.className="off";
        }
        }
        
    }
    setSeuil(value:number){
        this.seuil=value;

        this.update(this.data);
    }
}