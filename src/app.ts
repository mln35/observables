import { Transaction } from "./Classes/observable";
import { Solde,NbTransactions, State } from "./Classes/observer";
import { View } from "./view/viewHandler";

// const controller = new Controller();

const transaction = new Transaction();

const solde = new Solde(0,new View());

transaction.subscribe(solde);

const nbTrans = new NbTransactions(0,new View());

transaction.subscribe(nbTrans);

const state = new State(0,new View());

transaction.subscribe(state);
