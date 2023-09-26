import { BasicNode } from "../Engine/UIComponent/BasicNode";
import { game } from "../main";
import MixedText from "./MixedText";
import SpriteOneFourFour from "./SpriteOneFourFour";

export default class  MainScene extends BasicNode {
    constructor(json: any) {
        super(json);
        this.init();
    }

    private init() {
        const child  = new MixedText(game.loader.resources["../jsonfile/mixedText.json"]?.data.mixedText);
        game.stage.addChild(child);
    }
}