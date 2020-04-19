import chalk from 'chalk';
import { Direction, Monk, Statuses } from './monk';
import { cloneDeep } from 'lodash';

export default class Garden {
    public x: number;
    public y: number;
    public rocks: number;
    public score: number = 0;
    public monks: Monk[] = [];
    public garden: string[][];

    constructor(garden: string[][]);
    constructor(garden: string[][], monks: Monk[]);
    constructor(garden?: string[][], monks?: Monk[]) {
        // Deep copy of array
        this.garden = cloneDeep<string[][]>(garden!);

        // Set dimensions
        this.x = this.garden.length;
        this.y = this.garden[0].length;

        // Count rocks
        this.rocks = 0;
        for (let i = 0; i < this.garden.length; i++) {
            for (let j = 0; j < this.garden[0].length; j++) {
                if (this.garden[i][j] == 'K') this.rocks++;
            }
        }

        // Generate the pathways
        this.monks = monks ?? this.generateMonks();
        this.walk();
        this.score = this.getScore();
    }

    /**
     * Generates the pathways around the garden and calculates the score
     */
    walk() {
        let walk = 1;
        this.monks.forEach((monk) => {
            if (monk.walk(cloneDeep<Monk>(monk), this.garden, walk.toString()) === Statuses.SUCCESS)
                walk++;
        });
    }

    /**
     * Function generates random, not repeating starting positions for monks
     */
    generateMonks(): Monk[] {
        const monks: Monk[] = [];

        // upper border
        for (let i = 0; i < this.y; i++)
            monks.push(new Monk({ x: 0, y: i }, Direction.DOWN, !!Math.round(Math.random())));

        // bottom border
        for (let i = 0; i < this.y; i++)
            monks.push(
                new Monk({ x: this.x - 1, y: i }, Direction.UP, !!Math.round(Math.random()))
            );

        // right border
        for (let i = 0; i < this.x; i++)
            monks.push(
                new Monk({ x: i, y: this.y - 1 }, Direction.LEFT, !!Math.round(Math.random()))
            );

        // left border
        for (let i = 0; i < this.x; i++)
            monks.push(new Monk({ x: i, y: 0 }, Direction.RIGHT, !!Math.round(Math.random())));

        // shuffle
        for (let i = monks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = monks[i];
            monks[i] = monks[j];
            monks[j] = temp;
        }

        return monks.slice(0, this.x + this.y + this.rocks);
    }

    /**
     * Function which calculates the number of raked parts of garden
     */
    getScore() {
        let score = 0;
        for (let i = 0; i < this.garden.length; i++) {
            for (let j = 0; j < this.garden[0].length; j++) {
                if (this.garden[i][j] != '0' && this.garden[i][j] != 'K') score++;
            }
        }
        return score / (this.x * this.y);
    }

    /**
     * Fancy function which prints colorful representation
     * of current garden into the console
     *
     * @param silent: boolean - whether it should print 'chars' of the entities
     * such as number of monk pathways
     */
    print(silent: boolean = false): void {
        for (let i = 0; i < this.garden.length; i++) {
            for (let j = 0; j < this.garden[0].length; j++) {
                let color = undefined;
                const element = this.garden[i][j];

                if (element == '0') color = chalk.bgKeyword('goldenrod');
                else if (element == 'K') color = chalk.bgKeyword('dimgray');
                else color = chalk.bgKeyword('sienna');
                process.stdout.write(color(` ${silent ? ' ' : element.padStart(2, ' ')} `));
            }
            process.stdout.write('\n');
        }
    }
}
