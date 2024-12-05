import { describe, test, beforeAll, beforeEach, expect } from "bun:test";
import {
	calculateSimilarityScore,
	findAllDistances,
	findTotalDistance,
	parseDataIntoSortedArrays,
} from "./1";
import { readDataFile } from "../utils/read-data";

describe("Day 1", async () => {
	const rawText = await readDataFile(1, "sample");

	const { left, right } = parseDataIntoSortedArrays(rawText);
	const distances = findAllDistances(left, right);

	describe("Part 1", () => {
		describe("Extracts into arrays", () => {
			test("Left array is correct", () => {
				expect(left).toBeArray();
				expect(left).toEqual([1, 2, 3, 3, 3, 4]);
			});
			test("Right array is correct", () => {
				expect(right).toBeArray();
				expect(right).toEqual([3, 3, 3, 4, 5, 9]);
			});
		});

		describe("Calculates distances", () => {
			test("Distances are correct", () => {
				expect(distances).toEqual([2, 1, 0, 1, 2, 5]);
			});

			test("Distances accumulate correctly", () => {
				expect(findTotalDistance(distances)).toEqual(11);
			});
		});
	});

	describe("Part 2", () => {
		test("Similarity score is accurate", () => {
			const similarityScore = calculateSimilarityScore(left, right);
			expect(similarityScore).toEqual(31);
		});
	});
});
