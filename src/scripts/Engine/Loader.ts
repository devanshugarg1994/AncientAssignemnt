/* 
* This Class is responsible for loading all media for us.
* All media is mentioned in `manifest.json`, hence fist load it later load media 
* mentioned in the json file.
*  
*/

import { Assets } from "../Assets";
import { game } from "../main";
import { getAssetKey } from "../utils";

export class Loader {
    constructor() {
    }

    public loadMainManifest(loadingAssestArray: string[]): void {
        loadingAssestArray.forEach((path: string) => {
            game.loader.add(path);
        });
        game.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onManifestLoaded(loader, resources));
    }


    private onManifestLoaded(_loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>): void {
        const assetsPaths = resources[Assets.MainManifsetPath]?.data.preLoadresources;
        this.preLoad(assetsPaths);
    }

    private preLoad(assetsPaths: string []): void {
        this.addFileNeededToLoad(assetsPaths);
        this.loadAddedFile();
    }

    private addFileNeededToLoad(assetsPaths:string []): void {
        for (let path of assetsPaths) {
            game.loader.add(path);
            const assestKey = getAssetKey(path);
            Assets.getInstance().add({ [assestKey]:path }); // adding name as key
        }
    }

    private loadAddedFile(): void {
        game.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onLoadComplete(loader, resources));
    }

    private onLoadComplete(_loader: PIXI.Loader, _resources: Partial<Record<string, PIXI.LoaderResource>>) {
        game.init();
    }

}