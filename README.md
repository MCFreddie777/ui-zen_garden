# Zenová záhradka

**Škola**: Slovenská Technická Univerzita v Bratislave <br/>
**Fakulta**: Fakulta informatiky a informačných technológií <br/>
**Predmet**: Umelá inteligencia <br/>
**Študent**: Bc. František Gič <br/>
**Cvičiaci**: Ing. Ivan Kapustík <br/>

<div style="page-break-after: always;"></div>

## Zadanie

<div style="page-break-inside: avoid">

Zenová záhradka je plocha vysypaná hrubším pieskom (drobnými kamienkami). Obsahuje však aj nepohyblivé väčšie objekty, ako napríklad kamene, sochy, konštrukcie, samorasty. Mních má upraviť piesok v záhradke pomocou hrablí tak, že vzniknú pásy ako na nasledujúcom obrázku.

Pásy môžu ísť len vodorovne alebo zvislo, nikdy nie šikmo. Začína vždy na okraji záhradky a ťahá rovný pás až po druhý okraj alebo po prekážku. Na okraji – mimo záhradky môže chodiť ako chce. Ak však príde k prekážke – kameňu alebo už pohrabanému piesku – musí sa otočiť, ak má kam. Ak má voľné smery vľavo aj vpravo, je jeho vec, kam sa otočí. Ak má voľný len jeden smer, otočí sa tam. Ak sa nemá kam otočiť, je koniec hry. Úspešná hra je taká, v ktorej mních dokáže za daných pravidiel pohrabať celú záhradu, prípade maximálny možný počet políčok. Výstupom je pokrytie danej záhrady prechodmi mnícha.

</div>

<div style="page-break-after: always;"></div>

## Inštalácia

Prerekvizity:

-   [Node.js](https://nodejs.org)
-   [Node package manager](https://npmjs.com)

V root adresári spustite nasledovné príkazy:

```
npm install
```

A následne, pre každú transpiláciu typescriptového kódu na javascript a spustenie kódu v node.js:

```
npm run dev
```


