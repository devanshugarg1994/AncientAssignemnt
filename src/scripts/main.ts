/* 
* This is the entry point of the application where we create Game Object of `Application` 
* and assigned it to window so that we can use it the game the anywhere in the game
* Then we creating an instance of  Loader Class which is reponsible for loading the media.
*/


import * as PIXI from "pixi.js";
declare global {
    interface Window { PIXI: any; }
    interface Window { game: Application; }

}

window.PIXI = PIXI;

import { Application } from "./Engine/Application";
import { Loader } from "./Engine/Loader";
import { Assets } from "./Assets";

// @ts-ignore               
export  const game: any = new Application();
// @ts-ignore               
globalThis.__PIXI_APP__ = game;
window.game = game;
export const loader = new Loader();
loader.loadMainManifest([Assets.MainManifsetPath, Assets.LoadingUiPath]);
