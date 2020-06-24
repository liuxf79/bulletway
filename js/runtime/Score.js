import {
	Sprite
} from "../base/Sprite";
import {
	Director
} from "./Director";

export class Score extends Sprite {

	constructor() {
		const img = Sprite.getImage('common')
		super(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
	}

	draw() {
		super.draw(this.img, 7, 109, 54, 48, 0, 20, 100, 60);
		let score = Director.getInstance().gameScore

		let showScore = score;
		if (score >= 1000 && score < 10000) {
			showScore = Math.floor(score / 1000) + '.' + Math.floor((score - Math.floor(score / 1000) * 1000) / 100) + 'k'
		} else if (score >= 10000) {
			showScore = Math.floor(score / 10000) + '.' + Math.floor((score - Math.floor(score / 10000) * 10000) / 1000) + 'w'
		}
		const ctx = this.dataStore.ctx
		ctx.font = '11px Arial';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(
			`当前得分：${showScore}`,
			4, 40, 1000
		)
		ctx.fillText(
			`当前等级：${Director.getInstance().gameLevel}`,
			4, 60, 1000
		)
	}
}