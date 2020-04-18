import Garden from './garden';
import input from './input/test1';

const startPopulation = 200;
const generations = {
    actual: 1,
    max: 100,
};
const population: Garden[] = [];

// Generate first starting population
for (let i = 0; i < startPopulation; i++) {
    population.push(new Garden(input));
}

while (generations.actual < generations.max) {
    // Sort population by score
    population.sort((a, b) => {
        return a.score - b.score;
    });

    // If the whole garden is raked in this population
    if (population[population.length - 1].score == 1) break;

    // vyber jedincov

    // mutacia

    generations.actual++;
}
