import Garden from './garden';
import input from './input/test1';

const garden = new Garden(input);

garden.walk();
garden.print();
console.log("Garden.score: ",garden.score);

/*
function Genetický-Algoritmus(populácia, Vyhodnocovacia-Funkcia)
returns riešenie inputs: populácia, množina riešení
F-
-
	TT
Vyhodnocovacia-Funkcia, funkcia, ktorá vyjadruje úspešnosť daného riešenia
until nejaké riešenie je dostatočne úspešné
return najlepšie riešenie v populácii podľa Vyhodnocovacej-
Funkcie
end
 */

/*
0  ŠTART   : vytvor náhodnú populáciu n chromozómov
1  FITNES : vyhodnoť fitnes f(x) každého chromozómu v
populácii
2 REPRODUKCIA ⇒0 VÝBER
	: založený na f(x)
: kríženie chromozómov
	: zmutuj chromozómy
	: odstráň alebo prijmi nový
chromozóm
1 REKOMBINÁCIA
2 MUTÁCIA
3 PRIJATIE
3  NÁHRADA : nahraď starú populáciu novou
4  TEST    : otestuj, či je v populácii riešenie
problému
5 CYKLUS : opakuj kroky 1 – 4 dovtedy, až nejaký chromozóm prejde úspešne testom

 */
