// biome-ignore lint:
import { Response } from "express";

interface ResponseData {
	res: Response;
	code: number;
	success: boolean;
	message: string;
	// biome-ignore lint/suspicious/noExplicitAny:
	data: any;
}

interface ErrorData {
	res: Response;
	// biome-ignore lint/suspicious/noExplicitAny:
	err: any;
}

const responseHelper = {
	sendResponse: ({ res, code, success, message, data }: ResponseData): Response => {
		res.setHeader("X-Response-Data", JSON.stringify(data));

		return res.status(code).json({
			success,
			message,
		});
	},
	errorResponse: ({ res, err }: ErrorData): Response => {
		return res.status(500).json({
			message: "Something went wrong",
			err,
		});
	},
};

export default responseHelper;
