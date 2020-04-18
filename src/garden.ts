import chalk from 'chalk';
import { Monk, Coordinates } from './monk';

export default class Garden {
    public x: number;
    public y: number;
    public rocks: number;
    public score: number = 0;
    public monks: Monk[] = [];

    constructor(public garden: string[][]) {
        this.x = this.garden.length;
        this.y = this.garden[0].length;

        // Count rocks
        this.rocks = 0;
        for (let i = 0; i < this.garden.length; i++) {
            for (let j = 0; j < this.garden[0].length; j++) {
                if (this.garden[i][j] == 'K') this.rocks++;
            }
        }
    }

    walk() {
        let walk = 1;
        let trapped = false;

        while (!trapped && this.monks.length < this.getMaximumMonks()) {
            // Create next starting position on the border
            const monk = new Monk({ x: this.x, y: this.y });

            // Check if the position is not occupied
            if (this.garden[monk.position.x][monk.position.y] != '0') break;

            this.monks.push(monk);

            while (this.garden[monk.position.x][monk.position.y] == '0') {
                // Mark the position
                this.garden[monk.position.x][monk.position.y] = walk.toString();

                let nextStep = monk.getNextStep();
                if (!this.inBounds(nextStep)) break;

                // If we hit the rock or another pathway
                if (this.garden[nextStep.x][nextStep.y] != '0') {
                    monk.direction = monk.direction == 'H' ? 'V' : 'H';
                    nextStep = monk.getNextStep();

                    // If event the turn wasn't successful, break
                    if (
                        !this.inBounds(nextStep) ||
                        this.garden[nextStep.x][nextStep.y] != '0'
                    ) {
                        trapped = true;
                        break;
                    }
                }
                monk.position = nextStep;
            }
            walk++;
        }

        this.score = this.getScore();
    }

    inBounds(position: Coordinates): boolean {
        return (
            position.x < this.x &&
            position.x >= 0 &&
            position.y < this.y &&
            position.y >= 0
        );
    }

    getMaximumMonks() {
        return this.x + this.y + this.rocks;
    }

    /**
     * Function which calculates the number of raked parts of garden
     */
    getScore() {
        let score = 0;
        for (let i = 0; i < this.garden.length; i++) {
            for (let j = 0; j < this.garden[0].length; j++) {
                if (this.garden[i][j] != '0' && this.garden[i][j] != 'K')
                    score++;
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
                process.stdout.write(
                    color(` ${silent ? ' ' : element.padStart(2, ' ')} `)
                );
            }
            process.stdout.write('\n');
        }
    }
}
