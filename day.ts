// THIS SCRIPT IS UNUSED
// I ended up just running it in my command shell normally,
// I'm just a fiend for a little overengineering sometimes

import { $ } from "bun";
import minimist, { type ParsedArgs } from "minimist";
import { z } from "zod";

let args: ValidArgs | ParsedArgs = minimist(process.argv.slice(2));

const argsSchema = z.object({
	_: z
		.array(z.coerce.number().min(1).max(25))
		.length(1, "Please specify exactly one day")
		.transform((data) => data[0]),
});
type ValidArgs = z.infer<typeof argsSchema>;

// shell-friendly colors for pretty-printing errors because I'm quirky like that
const GOLD = Bun.color("#fb0", "ansi");
const RED = Bun.color("#f77", "ansi");

{
	// Validate program arguments.....
	const { success, error, data } = argsSchema.safeParse(args);

	if (!success) {
		console.error(`${RED}Invalid arguments!`);
		Object.entries(error.format())
			.filter(([key]) => key !== "_errors")
			.forEach(([path, value]) => {
				const errors = (value as { _errors: string[] })?._errors;
				if (errors?.length)
					errors.forEach((err) =>
						console.error(`${RED}${path} :: ${GOLD}${err}`)
					);
			});
		process.exit(1);
	}

	args = data;
}

const scriptPath = `./days/${args._}.ts`;

{
	// Check the script file exists......
	const scriptFile = Bun.file(scriptPath);
	if (!(await scriptFile.exists())) {
		console.error(`${RED}Script file does not exist! ${GOLD}${scriptPath}`);
		process.exit(1);
	}
}

await $`bun run --watch ./days/${args._}.ts`.env({ FORCE_COLOR: "1" });
