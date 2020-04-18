export class Monk {
    constructor(public position: Coordinates, public direction: 'H' | 'V') {}

    /**
     * Recursive function which goes through the garden, trying to find the exit.
     *
     * @param monk The instance of monk having position
     * @param garden Instance of garden
     * @param mark The mark that should leave monk on the raked field
     */
    walk(monk: Monk, garden: string[][], mark: string): Statuses {
        // Whether the monk could exit the garden
        if (
            !monk.inBounds(monk.position, {
                x: garden.length,
                y: garden[0].length,
            })
        )
            return Statuses.SUCCESS;

        // If hit rock or another pathway
        if (garden[monk.position.x][monk.position.y] !== '0')
            return Statuses.TURN;

        for (let i = 0; i < 2; i++) {
            // Nest into next step
            const result: Statuses = monk.walk(
                new Monk(monk.getNextStep(), monk.direction),
                garden,
                mark
            );

            // Mark the current pathway
            if (result === Statuses.SUCCESS) {
                garden[monk.position.x][monk.position.y] = mark;
                return Statuses.SUCCESS;
            }
            // Toggle direction
            else if (result === Statuses.TURN) {
                monk.direction = monk.direction == 'H' ? 'V' : 'H';
            }
            // Cannot mark the pathway, this gene failed
            else return Statuses.FAIL;
        }
        // Unreachable step
        return Statuses.FAIL;
    }

    /**
     * Check whether coordinates are inside the garden
     *
     * @param position Coordinates, position of the monk
     * @param size Size of the garden
     */
    inBounds(position: Coordinates, size: Coordinates): boolean {
        return (
            position.x < size.x &&
            position.x >= 0 &&
            position.y < size.y &&
            position.y >= 0
        );
    }

    /**
     * Returns a position in Gaussian 2D coordinates of a next step according to currently set direction
     */
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

export enum Statuses {
    FAIL,
    SUCCESS,
    TURN,
}
