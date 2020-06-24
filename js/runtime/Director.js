import {
	DataStore
} from "../base/DataStore";
import {
	Enemy
} from "../npc/Enemy";
import {
	Sprite
} from "../base/Sprite";
import {
	Bullet
} from "../player/Bullet";
import {
	Explosion
} from "../player/Explosion";
import { Sound } from "./Sound";

export class Director {

	static getInstance() {
		if (!this.instance) {
			this.instance = new Director();
		}
		return this.instance;
	}

	constructor() {
		this.dataStore = DataStore.getInstance()
		//全局滚动速度
		this.moveSpeed = 2;
		//飞机飞行速度
		this.enemySpeed = 5;
		//子弹飞行速度
		this.bulletSpeed = 10;

		//点击偏移量
		this.offsetX = 0;
		this.offsetY = 0;

		//敌机频率(越小越密集)
		this.rate = 120;
		//子弹频率（越小月密集）
		this.bulletRate = 30

		//同时最大地人数
		this.maxEnemy = 2

		//帧数计时器
		this.frameCounter = 0;

		//游戏状态
		this.isGameOver = false;

		//游戏成绩
		this.gameScore = 0;

		//游戏等级
		this.gameLevel = 0;
	}

	gameUp() {
		if (this.frameCounter % 900 == 0) {
			this.enemySpeed <= 15 ? this.enemySpeed++ : this.enemySpeed
			this.rate >= 30 ? this.rate -= 20 : this.rate
			this.maxEnemy <= 8 ? this.maxEnemy++ : this.maxEnemy
			if(this.gameLevel<=6){
				this.gameLevel++
			}
		}
	}

	gameReset() {
		//飞机飞行速度
		this.enemySpeed = 5;
		//敌机频率(越小越密集)
		this.rate = 120;
		//同时最大地人数
		this.maxEnemy = 2;
		this.gameScore = 0;
		this.gameLevel = 0;
		this.frameCounter = 0;
	}

	//点击确定飞机偏移量
	touchEvent(e) {
		let heroX = this.dataStore.get('hero').x;
		let heroY = this.dataStore.get('hero').y;
		let fingerX = e.touches[0].clientX
		let fingerY = e.touches[0].clientY
		this.offsetX = Math.abs(fingerX - heroX) * (heroX < fingerX ? -1 : 1)
		this.offsetY = Math.abs(fingerY - heroY) * (heroY < fingerY ? -1 : 1)
	}

	//移动纠正战机位置
	moveEvent(e) {
		let heroX = e.touches[0].clientX + this.offsetX
		let heroY = e.touches[0].clientY + this.offsetY
		const hero = this.dataStore.get('hero')

		if (heroX <= 0) {
			heroX = 0
		} else if (heroX >= this.dataStore.canvas.width - hero.width / 2) {
			heroX = this.dataStore.canvas.width - hero.width / 2
		}
		if (heroY <= 0) {
			heroY = 0
		} else if (heroY >= this.dataStore.canvas.height - hero.height / 2) {
			heroY = this.dataStore.canvas.height - hero.height / 2
		}
		this.dataStore.get('hero').x = heroX
		this.dataStore.get('hero').y = heroY
	}

	//生成随机数
	rand(min, max) {
		return Math.random() * (max - min) + min
	}

	//创建敌人
	createEnemy() {
		let enemyImage = Sprite.getImage('enemy')
		let min = enemyImage.width * 2 / 3;
		let max = this.dataStore.canvas.width - enemyImage.width * 2 / 3
		let numRandom = this.rand(1, this.maxEnemy);
		for (let idx = 0; idx <= numRandom; idx++) {
			let randomX = this.rand(min, max)
			this.dataStore.get('enemy').push(new Enemy(randomX))
		}

	}

	//创建子弹
	createBullet() {
		let hero = this.dataStore.get('hero');
		let x = hero.x + hero.width / 3
		let y = hero.y - hero.height / 3
		this.dataStore.get('bullet').push(new Bullet(x, y))
		this.dataStore.get('bullet').push(new Bullet(x - 45, y))
		this.bulletSound()
	}

	run() {
		this.gameCheck();
		if (!this.isGameOver) {
			this.gameUp();
			this.dataStore.get('bg').draw();
			//根据帧数添加子弹
			if (this.frameCounter % this.bulletRate === 0) {
				this.createBullet()
			}
			const bulletArr = this.dataStore.get('bullet');
			//出场后删除子弹，回收
			for (let i in bulletArr) {
				if (bulletArr[i].y <= 0) {
					bulletArr.shift()
				}
			}
			//渲染子弹
			bulletArr.forEach(item => {
				item.draw();
			})
			//添加敌机
			const enemyArr = this.dataStore.get('enemy')
			//出场后删除敌机，回收
			for (let i in enemyArr) {
				if (enemyArr[i].y >= this.dataStore.canvas.height) {
					// enemyArr.splice(i, 1)
					enemyArr.shift()
				}
			}
			//根据帧数添加敌机
			this.frameCounter++;
			if (this.frameCounter % this.rate === 0) {
				this.createEnemy()
			}
			//渲染敌机
			enemyArr.forEach(item => {
				item.draw();
			});
			//渲染战机
			this.dataStore.get('hero').draw();
			this.explosionCheck()
			//敌机爆炸
			this.dataStore.get('explosion').forEach(item => {
				item.draw()
			})

			this.dataStore.get('score').draw();
			if (this.frameCounter % 360 === 0 && this.dataStore.get('explosion').length > 0) {
				this.dataStore.get('explosion').shift();
			}
			let timer = requestAnimationFrame(() => this.run())
			this.dataStore.put('timer', timer)
		} else {
			console.log('游戏结束');
			cancelAnimationFrame(this.dataStore.get('timer'))
			this.dataStore.destroy();
		}
	}

	//游戏结束检测
	gameCheck() {
		const enemyArr = this.dataStore.get('enemy');
		const ho = this.dataStore.get('hero');
		const hero = {
			top: ho.y + ho.height / 8,
			bottom: ho.y + ho.height / 2 - ho.height / 4,
			left: ho.x + ho.width / 8,
			right: ho.x + ho.width / 2 - ho.width / 8
		}
		for (let idx = 0; idx < enemyArr.length; idx++) {
			const ey = enemyArr[idx];

			const enemy = {
				top: ey.y,
				bottom: ey.y + ey.height * 2 / 3,
				left: ey.x,
				right: ey.x + ey.width / 2
			}
			if (this.crashCheck(enemy, hero)) {
				this.boomSound();
				this.isGameOver = true
				return;
			}
		}
	}

	boomSound(){
		let explosion = wx.createInnerAudioContext();
		explosion.src = 'res/audio/boom.mp3'
		explosion.startTime = 0
		explosion.play()
	}

	bulletSound(){
		let bullet = wx.createInnerAudioContext();
		bullet.src = 'res/audio/bullet.mp3'
		bullet.startTime = 0
		bullet.play()
	}

	//打中敌机检测
	explosionCheck() {
		const enemyArr = this.dataStore.get('enemy');
		const bulletArr = this.dataStore.get('bullet');

		for (let ei = 0; ei < enemyArr.length; ei++) {
			const ey = enemyArr[ei];
			const enemy = {
				top: ey.y,
				bottom: ey.y + ey.height * 2 / 3,
				left: ey.x,
				right: ey.x + ey.width / 2
			}
			for (let bt = 0; bt < bulletArr.length; bt++) {
				const bl = bulletArr[bt];
				const bullet = {
					top: bl.y,
					bottom: bl.y + bl.height / 4,
					left: bl.x,
					right: bl.x + bl.width / 4
				}
				if (this.crashCheck(enemy, bullet)) {
					enemyArr.splice(ei, 1)
					bulletArr.splice(bt, 1)
					this.gameScore++
					//播放声音
					this.boomSound();
					this.dataStore.get('explosion').push(new Explosion(ey.x + ey.width / 4, ey.y + ey.height / 3))
				}
			}
		}
		// for (let bt = 0; bt < bulletArr.length; bt++) {
		// 	const bt = bulletArr[bt];
		// 	const bullet = {
		// 		top: bt.y,
		// 		bottom: bt.y + bt.height / 4,
		// 		left: bt.x,
		// 		right: bt.x + bt.width / 4
		// 	}
		// 	for (let ei = 0; ei < enemyArr.length; ei++) {
		// 		const ey = enemyArr[ei];
		// 		const enemy = {
		// 			top: ey.y,
		// 			bottom: ey.y + ey.height * 2 / 3,
		// 			left: ey.x,
		// 			right: ey.x + ey.width / 2
		// 		}
		// 		if (this.crashCheck(enemy, bullet)) {
		// 			// this.isGameOver = true
		// 			enemyArr.splice(ei, 1)
		// 			bulletArr.splice(bt, 1)
		// 			this.dataStore.get('explosion').push(new Explosion(ey.x + ey.width / 4, ey.y + ey.height / 3))
		// 			// this.isGameOver = true
		// 		}
		// 	}
		// }
	}

	crashCheck(enemy, hero) {
		const crashX = enemy.right >= hero.left && hero.right >= enemy.left
		const crashY = enemy.bottom >= hero.top && hero.bottom >= enemy.top
		return crashX && crashY
	}

}