import debugsx from "debug-sx";

export const logger: Utilities.Logger = {
	info: debugsx("main::INFO"),
	warn: debugsx("main::WARN"),
	err: debugsx("main::ERR"),
};
