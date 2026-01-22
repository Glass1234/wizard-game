import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import robloxTs from "eslint-plugin-roblox-ts";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";

export default [
	js.configs.recommended,

	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: "module",
				project: "./tsconfig.json",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				Vector2: "readonly",
				Color3: "readonly",
				UDim: "readonly",
				UDim2: "readonly",
				Enum: "readonly",
				PlayerGui: "readonly",
				GuiObject: "readonly",
				InputObject: "readonly",
				Instance: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			"roblox-ts": robloxTs,
			prettier,
			react,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			"prettier/prettier": "warn",
		},
	},

	{
		files: ["**/*.tsx", "**/*.jsx"],
		rules: {
			"react/jsx-sort-props": [
				"error",
				{
					reservedFirst: ["ref"], // ref всегда первым
					callbacksLast: false, // события сразу после ref
					shorthandFirst: false, // булевы props в конце
					ignoreCase: true, // регистр игнорируем
					noSortAlphabetically: false, // сортировка по алфавиту внутри группы
				},
			],
		},
	},
];
