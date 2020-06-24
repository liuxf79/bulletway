import {
	DataStore
} from "./DataStore";

export class Sprite {

	constructor(img = null, srcX = 0, srcY = 0, srcW = 0, srcH = 0, x = 0, y = 0, width = 0, height = 0) {
		this.dataStore = DataStore.getInstance();
		this.ctx = this.dataStore.ctx;
		this.img = img;
		this.srcX = srcX;
		this.srcY = srcY;
		this.srcW = srcW;
		this.srcH = srcH;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	static getImage(key) {
		return DataStore.getInstance().res.get(key)
	}

	/**
	 * img 传入Image对象
	 * srcX 要剪裁的起始X坐标
	 * srcY 要剪裁的其实Y坐标
	 * srcW 要剪裁的宽度
	 * srcH 要剪裁的高度
	 * x 放置的x坐标
	 * y 防止的y坐标
	 * width 要使用的宽度
	 * height 要使用的高度
	 */
	draw(img = this.img, srcX = this.srcX, srcY = this.srcY, srcW = this.srcW, srcH = this.srcH, x = this.x, y = this.y, width = this.width, height = this.height) {
		this.ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, width, height)
		// this.ctx.beginPath();
		// this.ctx.strokeRect(x,y,width,height)
		// this.ctx.closePath();
	}
}