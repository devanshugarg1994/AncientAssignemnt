import { DisplayObject, Sprite } from "pixi.js";
import { Assets } from "../Assets";
import { BasicNode } from "../Engine/UIComponent/BasicNode";
import { Label } from "../Engine/UIComponent/Label";
import { game, loader } from "../main";
import { CustomEventConstant } from "./EventConstant";


const NextCycleTimeInSec = 2;
const NumberOfCharcter = 3;
const MinFont = 16;
const MaxFont = 28;
const offsetSpace = 10;
const EmojiPath: string[] =
    ["../images/1.png",
        "../images/2.png",
        "../images/3.png",
        "../images/4.png",
        "../images/5.png",
        "../images/6.png",
        "../images/7.png",
        "../images/8.png",
        "../images/9.png",
        "../images/10.png"
    ];
export default class MixedTextNew extends BasicNode {
    constructor(json: any) {
        super(json);
        this.json = json;
        window.dispatchEvent(new CustomEvent(CustomEventConstant.SHOW_BACK_BUTTON, {
            detail: {
                show: true
            }
        }));
        this.randomTxt = game.loader.resources[Assets.getInstance().getRelativePath("randomTxt")].data.randomTxt;
        this.loadAssets();
        this.registerEvent();

    }

    private registerEvent() {
        this.unRegisterEvent
        window.addEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.removeScheduledTask.bind(this));

    }

    private unRegisterEvent() {
        window.removeEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.removeScheduledTask.bind(this));
    }


    loadAssets() {
        loader.loadDynamic(EmojiPath, (_loader: PIXI.Loader, _resources: Partial<Record<string, PIXI.LoaderResource>>) => {
            const callback = () => {
                this.removeChildren();
                this.setUp();
            }
            game.scheduleTask("MIXED_TEXT_SCHEDULER", NextCycleTimeInSec, callback);
            callback();
        });
    }

    private setUp() {
        const textConfig: string[] = []
        this.elementX = 0;
        for (let i = 1; i <= NumberOfCharcter; i++) {
            textConfig.push(this.getRandomConfiguration());
        }
        const fontSize = Math.floor((Math.random() * MaxFont) + MinFont);
        for (const key of textConfig) {
            this.getMixedTextPart(key, fontSize);
        }

        this.x = Math.random() * (innerWidth - this.width);
        this.y = Math.random() * (innerHeight - this.height);

    }

    private getMixedTextPart(key: string, fontSize: number) {
        switch (key) {
            case "image":
                const img: string = "../images/" + Math.floor((Math.random() * EmojiPath.length + 1)) + ".png";
                const image: Sprite = new Sprite(game.loader.resources[img]?.texture);
                this.addChild(image)
                image.x = this.elementX;
                this.elementX = this.elementX + image.width;
                image.y = -15;
                break;
            case "text":
                const jsonData = this.json.txt;
                jsonData.style.fontSize = fontSize;
                const randomTxtIndex = Math.floor(Math.random() * this.randomTxt.length)
                const textStatement = this.randomTxt[randomTxtIndex];
                const label: Label = new Label(jsonData);
                label.x = this.elementX;
                label.anchor.set(0, 0);
                label.text = textStatement;
                this.addChild(label);
                this.elementX = this.elementX + label.width;
                break;
        }
    }

    // Helper Functions
    private getRandomConfiguration() {
        const configurations = ["text", "image"];
        return configurations[Math.floor(Math.random() * configurations.length)];
    }

    private removeScheduledTask() {
        game.removeScheduledTask("MIXED_TEXT_SCHEDULER")
    }

    private setOffsetX() {
        this.children.forEach((element: DisplayObject, index: number) => {
            if (index === 0) {
                element.x = 0;
            } else {
                // @ts-ignore               
                element.x = this.children[index - 1].x + this.children[index - 1].width + offsetSpace;
            }
        }, this);

    }

    private json: any;
    private randomTxt!: string[];
    private elementX: number = 0;


}