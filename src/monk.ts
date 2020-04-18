export class Monk {
    public position!: Coordinates;
    public direction: 'H' | 'V';

    constructor(size: Coordinates) {
        this.position = { x: 0, y: 0 };

        // Random from first row
        if (Math.round(Math.random())) {
            this.position.x = 0;
            this.position.y = random(0, size.y - 1);
            this.direction = 'V';
        }
        // Random from last column
        else {
            this.position.x = random(0, size.x - 1);
            this.position.y = size.y - 1;
            this.direction = 'H';
        }
    }

    getNextStep(): Coordinates {
        if (this.direction == 'H')
            return {
                x: this.position.x,
                y: this.position.y - 1,
            };
        else
            return {
                x: this.position.x + 1,
                y: this.position.y,
            };
    }
}

export interface Coordinates {
    x: number;
    y: number;
}

function random(min: number = 0, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
