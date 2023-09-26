import MainScene from "../assignment/MainScene";
import { game } from "../main";
import { Container } from "./UIComponent/Container";
import { Label } from "./UIComponent/Label";


/* 
* It is class whose instance is treated as gameObject of the Game
* It allow us to add compoenet on stage,
* It allow to load media (All asynchronous are take care internally by PIXI).
* It also contain the _app object.
*/
export class Application {

    public _app: PIXI.Application;
    public stage: PIXI.Container;
    public loader: PIXI.Loader;

    constructor() {
        const resolution: number = window.devicePixelRatio;
        this._app = new PIXI.Application({
            autoStart: true,
            autoDensity: true,
            antialias: false,
            resolution: resolution,
            backgroundColor: 0xFFFFFF,
            resizeTo: window,
            width: 1280,
            height: 720,
        });


        document.body.appendChild(this._app.view);
        window.addEventListener("resize", () => {
            this._app.renderer.resize(window.innerWidth, window.innerHeight);
        });
        this.stage = this._app.stage;
        this.loader = this._app.loader;

        this.init();

    }

    getFPS(): number {
        return this._app.ticker.FPS;
    }

    getStageRefrence(): PIXI.Container {
        return this.stage;
    }

    getLoaderRefrence(): PIXI.Loader {
        return this.loader

    }

    public init(): void {
        this.loader.add("../jsonfile/loading.json");
        this.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onAssestsLoaded(loader, resources));

    };

    private onAssestsLoaded(_loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>): void {

        new MainScene(resources["../jsonfile/mainScene.json"]?.data.mainScene);


        console.log("Game Init");

    }
}
