import { BasicNode } from "../Engine/UIComponent/BasicNode";
import { game } from "../main";
import SpriteOneFourFour from "./SpriteOneFourFour";

export default class  MainScene extends BasicNode {
    constructor(json: any) {
        super(json);
        this.init();
    }

    private init() {
        const child  = new SpriteOneFourFour(game.loader.resources["../jsonfile/spriteOneFourFour.json"]?.data.spriteOneFourFour);
        game.stage.addChild(child);
    }
}