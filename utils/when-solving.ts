import { readDataFile } from "./read-data";

/**
 * Only executes when `import.meta.main` is true, intended to be used within a specific day's
 * script, only when it's directly executed (such that it doesn't execute when running the sample
 * tests). Fetches the proper input automatically and then passes it as the data parameter
 * for `callback(data:)`.
 */
export async function whenSolving(
	day: number | string,
	callback: (data: string) => void
): Promise<void> {
	if (!import.meta.main) return;

	const rawData = await readDataFile(day, "input");
	callback(rawData);
}
