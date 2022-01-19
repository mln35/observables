import { Transaction } from "./Classes/observable";
import { List } from "./Classes/observer";
import { View } from "./view/viewHandler";
import { Personal } from "./Classes/observer";

const view=new View();
const transaction=new Transaction();

const list=new List(view);
transaction.subscribe(list);

const personal=new Personal(view);
transaction.subscribe(personal);