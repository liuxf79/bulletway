import {
	DataStore
} from "./base/DataStore";
import {
	ResourceLoader
} from "./base/ResourceLoader";
import {
	BackGround
} from "./runtime/BackGround";
import {
	Director
} from "./runtime/Director";
import {
	Hero
} from "./player/Hero";
import {
	Score
} from "./runtime/Score";

export class Main {

	constructor() {
		this.canvas = wx.createCanvas()
		this.ctx = this.canvas.getContext('2d');
		this.dataStore = DataStore.getInstance();
		this.director = Director.getInstance();
		const loader = ResourceLoader.create();
		loader.onLoaded(map => {
			this.onResourceFirstLoaded(map)
		})
		this.screenWidth = this.canvas.width;
		this.screenHeight = this.canvas.height;

	}
		//创建背景音乐
		createBackgroundMusic(){
			const bgm = wx.createInnerAudioContext();
			bgm.autoplay = true;
			bgm.loop = true;
			bgm.src = 'res/audio/bgm.mp3'
		}

	//dataStore内容初始化
	onResourceFirstLoaded(map) {
		this.dataStore.canvas = this.canvas
		this.dataStore.ctx = this.ctx
		this.dataStore.res = map
		this.createBackgroundMusic()
		this.init()
	}

	//初始化游戏界面
	init() {
		//创建背景
		this.dataStore
			.put('bg', BackGround)
			.put('hero', Hero)
			.put('enemy', [])
			.put('bullet', [])
			.put('explosion', [])
			.put('score', Score);
		this.registerEvent();
		this.director.isGameOver = false;
		this.director.gameReset();
		this.director.run();

	}

	registerEvent() {
		wx.onTouchMove(e => {
			if (!this.director.isGameOver) {
				this.director.moveEvent(e)
			}
		})
		wx.onTouchStart(e => {
			if (this.director.isGameOver) {
				console.log('game restart')
				this.init();
			} else {
				this.director.touchEvent(e)
			}
		})
	}

}