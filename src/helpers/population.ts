import Garden from '../garden';

export class Population {
    static getRandom(
        algorithm: 'tournament' | 'roulette',
        population: Garden[]
    ) {
        if (algorithm === 'tournament') {
            const a = population[random(0, population.length)];
            const b = population[random(0, population.length)];
            return a.score > b.score ? a : b;
        } else {
            // TODO: roulette
            return population[random(0, population.length)];
        }
    }
}

function random(min: number = 0, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
