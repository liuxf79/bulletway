import {
	Sprite
} from "../base/Sprite";
import {
	DataStore
} from "../base/DataStore";

export class Explosion {

	constructor(x, y) {
		const imgArr = []
		for (let idx = 1; idx <= 19; idx++) {
			imgArr.push(Sprite.getImage(`explosion${idx}`))
		}
		this.x = x
		this.y = y
		this.imgArr = imgArr
		this.counter = 0
		this.index = 0
	}

	draw() {
		this.counter++
		if (this.index >= 18) {
			return;
		}
		if(this.counter%2===0){
			this.index++
		}
		
		DataStore.getInstance().ctx.drawImage(this.imgArr[this.index],
			0,
			0,
			this.imgArr[0].width,
			this.imgArr[0].height,
			this.x-this.imgArr[0].width/2,
			this.y-this.imgArr[0].height/2,
			this.imgArr[0].width,
			this.imgArr[0].height)
	}
}