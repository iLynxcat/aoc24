/* Day 1: Historian Hysteria */
/* PART ONE */
import { whenSolving } from "../utils/when-solving";

export function parseDataIntoSortedArrays(data: string): {
	left: number[];
	right: number[];
} {
	const left: number[] = [];
	const right: number[] = [];

	for (const line of data.split(/[\r\n]/)) {
		if (!line) continue;
		const [leftNum, rightNum] = line.split("   ").map((n) => +n);
		left.push(leftNum);
		right.push(rightNum);
	}

	left.sort();
	right.sort();

	return { left, right };
}

export function findAllDistances(left: number[], right: number[]): number[] {
	if ([left, right].some((array) => array.length !== left.length))
		throw new Error(
			"Some array passed to findAllDistances(arrays:) has mismatched length."
		);

	let distances: number[] = [];

	for (let i = 0; i < left.length; i++) {
		distances.push(left[i] - right[i]);
	}

	return distances.map(Math.abs);
}

export function findTotalDistance(distances: number[]): number {
	return distances.reduce((prev, curr) => prev + curr, 0);
}

whenSolving(1, (rawText) => {
	const { left, right } = parseDataIntoSortedArrays(rawText);
	const distances = findAllDistances(left, right);
	const total = findTotalDistance(distances);

	console.log(`Part 1 :: The total distance is: (solution) ${total}`);
});

/* PART TWO */
export function calculateSimilarityScore(
	left: number[],
	right: number[]
): number {
	let cumulativeScore = 0;

	for (const leftNum of left) {
		const appearancesInRightArray = right.filter(
			(num) => num === leftNum
		).length;
		cumulativeScore += leftNum * appearancesInRightArray;
	}

	return cumulativeScore;
}

whenSolving(1, (rawText) => {
	const { left, right } = parseDataIntoSortedArrays(rawText);
	const score = calculateSimilarityScore(left, right);

	console.log(`Part 2 :: The similarity score is: (solution) ${score}`);
});
