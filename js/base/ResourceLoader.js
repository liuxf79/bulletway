import {
	Resource
} from "./Resource";

export class ResourceLoader {
	constructor() {
		this.map = new Map(Resource);
		for (let [key, val] of this.map) {
				const image = wx.createImage();
				image.src = val;
				this.map.set(key, image)
		}
	}

	onLoaded(callback) {
		let loadedCount = 0;
		for (let val of this.map.values()) {
			val.onload = () => {
				loadedCount++;
				if (loadedCount >= this.map.size) {
					callback(this.map)
				}
			}
		}
	}

	static create() {
		return new ResourceLoader();
	}
}