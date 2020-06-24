import {
	Sprite
} from "../base/Sprite";

export class Hero extends Sprite {

	constructor() {
		const img = Sprite.getImage('hero')
		super(img,
			0,
			0,
			img.width,
			img.height,
			0,
			0,
			img.width,
			img.height);

		this.x = this.dataStore.canvas.width / 2 - img.width / 4
		this.y = this.dataStore.canvas.height - (img.height / 2)
	}

	draw() {
		super.draw(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width / 2, this.height / 2)
	}
}