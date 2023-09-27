import { Emitter } from "pixi-particles";
import { Texture } from "pixi.js";
import { Assets } from "../Assets";
import { game } from "../main";
import { CustomEventConstant } from "./EventConstant";
import { BasicNode } from "../Engine/UIComponent/BasicNode";

export class Particle extends BasicNode {
    constructor(json: any) {
        super(json);
        window.dispatchEvent(new CustomEvent(CustomEventConstant.SHOW_BACK_BUTTON, {
            detail: {
                show: true
            }
        }));
        this.init();
    }


    init() {
        const particleConatiner = this.getContainerRefrences("particleEffectContainer")
        const texture1 = Texture.from(Assets.getInstance().getRelativePath("fireParticle1"));
        const texture2 = Texture.from(Assets.getInstance().getRelativePath("fireParticle1"));
        this.emitter = new Emitter(particleConatiner, [texture1, texture2],
            game.loader.resources[Assets.getInstance().getRelativePath("emitter")].data);
        this.start();

    }

    private start() {
        game._app.ticker.add(this.emitterUpdate, this);
        this.emitter.emit = true;
    }


    private emitterUpdate(delta: number): void {
        this.emitter.update(delta * 0.01);
    }

    private emitter!: Emitter

}

const data = {
    alpha: { start: 1, end: 0 },
    scale: { start: 0.5, end: 0.1 },
    color: { start: 'ff0000', end: 'ffff00' },
    speed: { start: 100, end: 50 },
    accelerationY: 0,
    maxSpeed: 0,
    startRotation: { min: 0, max: 360 },
    noRotation: false,
    lifetime: { min: 1, max: 2 },
    blendMode: 'add',
    frequency: 0.1,
    emitterLifetime: -1,
    maxParticles: 500,
    pos: { x: 400, y: 550 },
    addAtBack: false,
    spawnType: 'circle',
    spawnCircle: { x: 0, y: 0, r: 10 },
};