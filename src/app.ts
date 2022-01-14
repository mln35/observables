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
// const vanne1=new Vanne("vanne1", 35, humiditySensor);
// const vanne2=new Vanne("vanne2", 20, humiditySensor);
// const vanne3=new Vanne("vanne3", 10, humiditySensor);
// humiditySensor.subscribe(vanne1);
// humiditySensor.subscribe(vanne2);
// humiditySensor.subscribe(vanne3);
humiditySensor.testFunction(f, g);
// humiditySensor.setHumidity(20);


