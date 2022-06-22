/*
	nginx api thing idk

	Designed for Node.JS version: 16.14.0

	Written by Anthony Stainton.
    Github: https://github.com/ItzRock
    Discord: Anthоny#0001 (299682971374452739)

    "Support" Server: https://discord.gg/pc2NKdRHkf (I don't have a dedicated discord server for this but best place to find me is here because its my game.)

*/

// .env is in the gitignore so you'll need to make a .env and pick a port number
import { config } from "dotenv"; config();
import * as fs from "fs";
import express from "express";

const server = express();

// Load each api version;
fs.readdir("./src/apis", async (err, data) => {
	if (err) console.log(err);
	else for(const api of data){
		const imported = (await import(`./apis/${api}/index.js`)).default;
	
		// We're gonna assume each one returns a function which expects the express client.
		imported(server);
	}
});
