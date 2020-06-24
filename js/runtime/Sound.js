export class Sound {

	static getInstance() {
		if (!this.instance) {
			this.instance = new Sound();
		}
		return this.instance;
	}
	constructor() {
		this.explosion = wx.createInnerAudioContext();
		this.explosion.src = 'res/audio/boom.mp3'

		this.bullet = wx.createInnerAudioContext();
		this.bullet.src = 'res/audio/bullet.mp3'
	}
}