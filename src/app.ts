import { Humidity } from "./Classes/observable";
import { Vanne } from "./Classes/observer";
const f=()=>{
    console.log("Function1 passed in arg");
}
const g=()=>{
    console.log("Function2 passed in arg");
}
let counter=1;

const humiditySensor=new Humidity(21);
let Add=document.querySelector("#add");
Add.addEventListener('click', (e:Event)=>{
    const vanne=new Vanne(`vanne${counter}`, 30, humiditySensor);
    counter++;
})
humiditySensor.testFunction(f, g);



