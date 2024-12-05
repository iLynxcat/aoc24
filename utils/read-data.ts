import { join as joinPath } from "node:path";

export async function readDataFile(
	day: number | string,
	source: "input" | "sample"
): Promise<string> {
	const file = Bun.file(
		joinPath(__dirname, "..", "days", `${day}.${source}.txt`)
	);

	if (!(await file.exists()))
		throw new Error(`File could not be found, days/${day}.${source}.txt`);

	return await file.text();
}
