// biome-ignore lint:
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../models/user"

import ResponseHelper from "../helpers/responseHelper";

// biome-ignore lint:
import { IUser } from "../types/user";

/**
 * @param {Request} req
 * @param {Response} res
 * @returns
 * */
export const register = async (req: Request, res: Response): Promise<void> => {
	const { user_name, email, password, role }: IUser = req.body;
	try {
		const erros = validationResult(req);
		if (!erros.isEmpty()) {
			ResponseHelper.sendResponse({
				res,
				code: 400,
				success: false,
				message: "Failed",
				data: {},
			});
		}
		const userObj = new User({
			user_name,
			email,
			password,
			role,
		});
		await userObj.save();
		ResponseHelper.sendResponse({
			res,
			code: 201,
			success: true,
			message: "User registered",
			data: {},
		});
	} catch (error) {
		ResponseHelper.errorResponse({ res, err: error });
	}
};
