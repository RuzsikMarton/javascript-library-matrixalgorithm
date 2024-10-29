import {MatrixData} from "./MatrixData.js";

export class MatrixElement extends MatrixData {
    constructor(name, value, changeable, showLabel) {
        super();
        if (typeof changeable === "undefined") {
            changeable = false;
        }
        if (typeof showLabel === "undefined") {
            showLabel = false;
        }
        this.name = name;
        this.value = value;
        this.maxValue = 1000;
        this.minValue = -999;

        this.changeable = changeable;
        this.showLabel = showLabel;
        this.changing = false;
        this.copy = false;
        this.copyx = 0;
        this.copyy = 0;
        this.compare = false;
        this.minSize = 30;
        this.maxSize = 100;
        this.width = 35; //default width of the element
        this.height = 35; //default height of the element
        this.fillColor = '#EEE';
        this.strokeColor = '#000';

        this.defaultColor = '#EEE';
        this.greenColor = '#579F6E';
        this.grayColor = '#999999';
        this.blackColor = '#000';

        this.originalFillColor = "#EEE";
        this.originalStrokeColor = "#000";
    }

    render() {
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.strokeRect(this.x - this.width / 2 - 0.5, this.y - this.height / 2 - 0.5, this.width + 1, this.height + 1);

        this.ctx.fillStyle = this.strokeColor;
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillText(this.value, this.x, this.y);

        if (this.showLabel) {
            this.ctx.font = "12px Arial";
            this.ctx.textBaseline = "alphabetic";
            this.ctx.fillText(this.name, this.x, this.y - this.height /2 - 5);
        }
        if (this.compare) {
            this.ctx.fillStyle = "#FFF"
            this.ctx.globalAlpha = 0.5;
            const textSize = (this.width + this.height) /2;
            this.ctx.font = "bold " + textSize + "px serif";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText("?", this.x, this.y);
            this.ctx.globalAlpha = 1;
        }
    }

    // set random value to element
    randomize(min, max) {
        min = typeof min === "undefined" ? this.minValue : min;
        max = typeof max === "undefined" ? this.maxValue : max;
        if (min > max) {
            [min, max] = [max, min];
        }
        this.value = Math.floor(Math.random() * (max - min) + min);
    }

    setSize(width, height) {
        if (typeof width !== 'number' || typeof height !== 'number' || width <= 0 || height <= 0) {
            console.warn("Invalid width or height specified. Both must be positive numbers.");
            return;
        }
        if (width > this.maxSize) {
            console.warn(`Width exceeds maximum allowed size of ${this.maxSize}. Setting width to ${this.maxSize}.`);
            width = this.maxSize;
        }
        if (height > this.maxSize) {
            console.warn(`Height exceeds maximum allowed size of ${this.maxSize}. Setting height to ${this.maxSize}.`);
            height = this.maxSize;
        }
        if (width < this.minSize) {
            console.warn(`Width exceeds maximum allowed size of ${this.maxSize}. Setting width to ${this.minSize}.`);
            width = this.minSize;
        }
        if (height < this.minSize) {
            console.warn(`Height exceeds maximum allowed size of ${this.maxSize}. Setting height to ${this.minSize}.`);
            height = this.minSize;
        }
        this.height = height;
        this.width = width;
    }

    isOver(x,y) {
        if (this.width > 0 && Math.abs(x - this.x) <= this.width && Math.abs(y - this.y) <= this.height) {
            return true;
        }
        return false;
    }

    updateValue(value){
        this.value = value;
    }
    // setting colors of MatrixElement

    setDefaultColor() {
        this.fillColor = this.defaultColor;
        this.strokeColor = this.blackColor;
    }
    // setting color to green, when something is done
    setGreenColor(){
        this.fillColor = this.greenColor;
        this.strokeColor = '#FFF';
    }
    // setting color to lightblue when comparing
    setCompareColor() {
        this.fillColor = '#F9B900'; // light blue for comparing
        this.strokeColor = this.blackColor;
    }

    //setting color to grey
    setGrayColor(){
        this.fillColor = this.grayColor;
        this.strokeColor = this.blackColor;
    }
}