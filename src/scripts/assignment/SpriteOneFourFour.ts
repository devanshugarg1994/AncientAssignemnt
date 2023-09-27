import { BasicNode } from "../Engine/UIComponent/BasicNode";
import { FactoryUI } from "../Engine/UIComponent/FactoryUI";
import { Shape } from "../Engine/UIComponent/Shape";
import basicTween, { Tween } from "../Engine/tween";
import { CustomEventConstant } from "./EventConstant";

export class SpriteOneFourFour extends BasicNode {
    constructor(json: any) {
        super(json);
        this.createCard(json.cardBasicData);
        window.dispatchEvent(new CustomEvent(CustomEventConstant.SHOW_BACK_BUTTON, {
            detail: {
                show: true
            }
        }));

        this.registerEvent();
    }

    private registerEvent() {
        this.unRegisterEvent();
        window.addEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.killTween.bind(this));
    }

    private unRegisterEvent() {
        window.removeEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.killTween.bind(this));
    }

    private killTween() {
        this.tween.kill();
        this.destroy();
    }

    createCard(json: any) {
        for (let i = 0; i < 144; i++) {
            json.id = "cardBasicData" + "_" + i;
            json.y = (json.y / 1.5 + i * 0.5);
            json.fillColor = this.getRandomColor();
            this.cardList.push(FactoryUI.createShape(json, this));
        }
        this.cardIndexProcessing = this.cardList.length - 1;
        this.move();
    }

    private getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private move() {
        const finalPositionY: number = this.cardList[this.cardIndexProcessing].y / 1.5 + (this.cardList.length - this.cardIndexProcessing - 1) * 0.5;
       this.tween =  basicTween(this.cardList[this.cardIndexProcessing], 500, finalPositionY, 2000, () =>{
            console.log("Tween completed", this.cardIndexProcessing);
            if(this.cardList?.length) {
                this.addChildAt(this.cardList[this.cardIndexProcessing], this.cardList.length - this.cardIndexProcessing - 1);
                this.cardIndexProcessing--;
                if (this.cardIndexProcessing >= 0) {
                    this.move();
                }
            }

        });
    }

    protected cardList: Shape[] = [];
    private cardIndexProcessing!: number;
    private tween!: Tween;
}