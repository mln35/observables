import { Transaction } from "./Classes/observable";
import { List, Solde, State } from "./Classes/observer";
import { View } from "./view/viewHandler";
import { Personal } from "./Classes/observer";
import { NbTransactions } from "./Classes/observer";

const view=new View();
const transaction=new Transaction();

const list=new List(view);
transaction.subscribe(list);

const personal=new Personal(view);
transaction.subscribe(personal);

const solde=new Solde(0, view);
transaction.subscribe(solde);

const nbTrans = new NbTransactions(0,new View());
transaction.subscribe(nbTrans);

const state = new State(0,new View());
transaction.subscribe(state);

