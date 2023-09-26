import { Assets } from "../Assets";
import MainScene from "../assignment/MainScene";


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
        const mainScene: MainScene = new MainScene(this.loader.resources[Assets.getInstance().getRelativePath("mainScene")]?.data.mainScene);
        this.stage.addChild(mainScene);
    }

    public scheduleTaskOnce(timeInSec: number, callback: Function) {
        let seconds = 0;
        const timer = (delta: number) => {
            seconds += (1 / 60) * delta;
            if (seconds >= timeInSec) {
                callback && callback();
                this._app.ticker.remove(timer);
            }
        }
        this._app.ticker.add(timer);
    }

    public scheduleTask(key: string, timeInSec: number, callback: Function) {
        let seconds = 0;
        const timer = (delta: number) => {
            seconds += (1 / 60) * delta;
            if (seconds >= timeInSec) {
                callback && callback();
                seconds = 0
            }
        }
        this.scheduledTask[key] = timer;
        this._app.ticker.add(timer);
    }
    removeScheduledTask(key: string) {
        const fun = this.scheduledTask[key];
        this._app.ticker.remove(fun);

    }
    private scheduledTask:  { [key: string]: any } = {};

}
