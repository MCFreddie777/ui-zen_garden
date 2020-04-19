import Garden from './garden';
import input from './input/test1';
import { Population, random } from './helpers/population';
import { Direction, Monk } from './monk';
import { cloneDeep, shuffle } from 'lodash';

const DEBUG = false;
const startPopulation = 50;
let population: Garden[] = [];
const generations = {
    actual: 1,
    max: 1000,
};
const mutationChance = 0.2;

// Generate first starting population
for (let i = 0; i < startPopulation; i++) {
    population.push(new Garden(input));
}

// while (true) {
while (generations.actual < generations.max) {
    // Statistics for actual generation
    const maximum = {
        score: 0,
        index: -1,
    };
    const minimum = {
        score: 1,
        index: -1,
    };

    population.forEach((specimen, index) => {
        if (specimen.score > maximum.score) {
            maximum.score = specimen.score;
            maximum.index = index;
        }
        if (specimen.score < minimum.score) {
            minimum.score = specimen.score;
            minimum.index = index;
        }
    });

    console.log(`[Generation ${generations.actual}] Max: ${maximum.score} Min: ${minimum.score}`);

    // Check if the whole garden is raked in this population
    if (maximum.score === 1) {
        break;
    }

    const nextGeneration: Garden[] = [];

    // We gonna take the best of current population to the next generation
    nextGeneration.push(cloneDeep<Garden>(population[maximum.index]));

    population.forEach((specimen) => {
        // Get two parents according to algorithm
        const parentA = Population.getRandom('tournament', population);
        const parentB = Population.getRandom('tournament', population);

        let childMonks: Monk[] = [];

        const rnd = Math.random();

        // Randomize genes from each parent into new child
        if (rnd < 0.3) {
            specimen.monks.forEach((_monk, index) => {
                childMonks.push(
                    Math.round(Math.random()) ? parentA.monks[index] : parentB.monks[index]
                );
            });

            // Take half of the genes from first parent and second from
        } else if (rnd >= 0.3 && rnd < 0.6) {
            const newMonks = parentA.monks
                .slice(0, parentA.monks.length / 2)
                .concat(parentB.monks.slice(parentA.monks.length / 2, parentB.monks.length));
            childMonks.push(...newMonks);

            // Take every second gene from second parent
        } else if (rnd >= 0.6 && rnd < 0.9) {
            for (let i = 0; i <= specimen.monks.length - 2; i += 2) {
                childMonks.push(parentA.monks[i]);
                childMonks.push(parentB.monks[i + 1]);
            }

            // No crossover
        } else if (rnd >= 0.9) {
            childMonks = parentA.monks;
        }

        childMonks.forEach((_monk, index) => {
            if (Math.random() > mutationChance) {
                const rnd = Math.random();

                // Mutate genes by inserting random gene
                if (rnd < 0.2) {
                    childMonks[index] = specimen.generateMonks()[
                        random(0, specimen.x + specimen.y)
                    ];
                }

                // Toggle turn direction of the gene
                if (rnd >= 0.2 && rnd < 0.4) {
                    childMonks[index].turnDirection = !childMonks[index].turnDirection;
                }

                // Increase and modulo the position of the child gene
                if (rnd >= 0.4 && rnd < 0.6) {
                    if (
                        childMonks[index].direction === Direction.UP ||
                        childMonks[index].direction === Direction.DOWN
                    ) {
                        // handle the border ones
                        if (
                            childMonks[index].position.y !== 0 &&
                            childMonks[index].position.y !== specimen.y - 1
                        )
                            childMonks[index].position.y =
                                (childMonks[index].position.y + 1) % specimen.y;
                    } else {
                        // handle the border ones
                        if (
                            childMonks[index].position.x !== 0 &&
                            childMonks[index].position.x !== specimen.x - 1
                        )
                            childMonks[index].position.x =
                                (childMonks[index].position.x + 1) % specimen.x;
                    }
                }

                // Double and modulo the position of the child gene
                if (rnd >= 0.6 && rnd < 0.8) {
                    if (
                        childMonks[index].direction === Direction.UP ||
                        childMonks[index].direction === Direction.DOWN
                    ) {
                        // handle the border ones
                        if (
                            childMonks[index].position.y !== 0 &&
                            childMonks[index].position.y !== specimen.y - 1
                        )
                            childMonks[index].position.y =
                                (childMonks[index].position.y * 2) % specimen.y;
                    } else {
                        // handle the border ones
                        if (
                            childMonks[index].position.x !== 0 &&
                            childMonks[index].position.x !== specimen.x - 1
                        )
                            childMonks[index].position.x =
                                (childMonks[index].position.x * 2) % specimen.x;
                    }
                }

                // Shuffle the genes
                if (rnd >= 0.8) {
                    childMonks = shuffle(childMonks);
                }
            }
        });

        // Push the newly created child into the new generation
        nextGeneration.push(new Garden(input, childMonks));
    });

    // we took the best one, so we need to remove one specimen
    nextGeneration.pop();

    // replace the old population with the new generation
    population = nextGeneration;
    generations.actual++;
}

console.log(`[Generation ${generations.actual}]`);

// Sort the Final population
population.sort((a, b) => {
    return a.score - b.score;
});

if (DEBUG) {
    console.log('Best monks: ', population[population.length - 1].monks);
}

console.log(`Best score: ${population[population.length - 1].score}`);
population[population.length - 1].print();
