import Garden from './garden';
import input from './input/test1';
import { Population } from './helpers/population';
import { Monk } from './monk';

const startPopulation = 200;
let population: Garden[] = [];
const generations = {
    actual: 1,
    max: 1000,
};
const randomSelectionAlg = 'tournament'; // 'tournament' || 'roulette'
const mutationChance = 0.8;

// Generate first starting population
for (let i = 0; i < startPopulation; i++) {
    population.push(new Garden(input));
}

while (generations.actual < generations.max) {
    // Check if the whole garden is raked in this population
    let maxScore = 0;
    population.forEach((specimen) => {
        if (specimen.score > maxScore) maxScore = specimen.score;
    });
    if (maxScore == 1) {
        break;
    }

    const nextGeneration: Garden[] = [];

    population.forEach((specimen, iteration) => {
        // We gonna take the best of current population to the next generation
        if (iteration == 0) {
            nextGeneration.push(population[population.length - 1]);
            return;
        }

        // Get two parents according to algorithm
        const parentA = Population.getRandom(randomSelectionAlg, population);
        const parentB = Population.getRandom(randomSelectionAlg, population);

        let childMonks: Monk[] = [];

        specimen.monks.forEach((_monk, index) => {
            // Randomize genes from each parent into new child
            childMonks.push(
                Math.round(Math.random())
                    ? parentA.monks[index]
                    : parentB.monks[index]
            );

            // Mutate genes by inserting random gene
            if (Math.random() > mutationChance) {
                childMonks[index] = specimen.generateMonks()[0];
            }
        });

        // Push the newly created child into the new generation
        nextGeneration.push(new Garden(input, childMonks));
    });

    // replace the old population with the new generation
    population = nextGeneration;
    generations.actual++;
}

// Sort the Final population
population.sort((a, b) => {
    return a.score - b.score;
});

// Print the best specimen
console.log(population[population.length - 1].score);
population[population.length - 1].print();
