/* 
* It is the Basic View of our Game
* When we need to create our Own View we should exted from this class.
* This Class is extended from `PIXI.Container` not from `Conatiner` class we created
* because we do not want to set View basic property from JSON but we will create all 
* compoent (like :  Text  Conatiner) used in the View using JSOn only.
* It use `FactoryUI` class to create diffrent Ui Component
* This class is also responsible for handling resize of  game when window get Resized
*/

import { Container } from "./Container";
import { Label } from "./Label";
import { FactoryUI } from "./FactoryUI";

export class BasicNode extends PIXI.Container {
    // Iterative Design Pattern
    private containerReferences: { [key: string]: Container } = {};
    private labelReferences: { [key: string]: Label } = {};

    constructor(json: any) {
        super()
        FactoryUI.createUI(json, this);
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }


    // /* 
    // * Set pivot and position of the View 
    // */
    protected resize(_evt?: Event): void {
        //
    }

    public showView(): void {
        this.visible = true;
    }

    public hideView(): void {
        this.visible = false;
    }

    public setLabelRefrences(id: string, label: Label) {
        this.labelReferences[id] = label;
    }
    public getLabelRefrences(id: string): Label {
        return this.labelReferences[id];
    }

    public setContainerRefrences(id: string, container: Container) {
        this.containerReferences[id] = container;
    }
    public getContainerRefrences(id: string): Container {
        return this.containerReferences[id];
    }
}