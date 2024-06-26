import { Optimizer } from "./Optimizer";
import { InputConfig } from "./InputConfig";
import { OutputConfig } from "./OutputConfig";

export const RunOptimizerRequest = {
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "RunOptimizerRequest",
	type: "object",
	properties: {
		parent: {
			type: "string",
			description: "The parent resource name.",
		},
		optimizer: Optimizer,
		input_config: InputConfig,
		output_config: OutputConfig,
	},
	required: ["parent", "optimizer", "input_config", "output_config"],
};
