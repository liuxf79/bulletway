import {
	Sprite
} from "../base/Sprite";
import {
	Director
} from "../runtime/Director";

export class Enemy extends Sprite {

	constructor(x) {
		const img = Sprite.getImage('enemy')
		super(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
		this.x = x
	}

	draw() {
		this.y = this.y + Director.getInstance().enemySpeed;
		super.draw(this.img, 0, 0,this.width, this.height, this.x, this.y, this.width/2, this.height/2);
	}
}