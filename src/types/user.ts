export interface IUser {
	user_name: string;
	email: string;
	password: string;
	role: "admin" | "user" | undefined;
}
