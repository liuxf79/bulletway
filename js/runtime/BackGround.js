import {
	Sprite
} from "../base/Sprite";
import {
	DataStore
} from "../base/DataStore";
import { Director } from "./Director";

export class BackGround extends Sprite {

	constructor() {
		const img = Sprite.getImage('bg');
		const canvas = DataStore.getInstance().canvas
		super(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
		this.moveY = 0;
		this.moveSpeed = Director.getInstance().moveSpeed
	}

	draw(){
		const canvas = DataStore.getInstance().canvas
		this.moveY = this.moveY + this.moveSpeed;
		if(this.moveY >= canvas.height){
			this.moveY=0;
		}
		//绘制2次，拼接底图以配合移动
		super.draw(this.img,this.srcX,this.srcY,this.srcW,this.srcH,this.x,this.moveY,this.width,this.height);

		super.draw(this.img,this.srcX,this.srcY,this.srcW,this.srcH,this.x,this.moveY-canvas.height,this.width,this.height);

	}
}