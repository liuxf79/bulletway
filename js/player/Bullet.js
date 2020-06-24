import { Sprite } from "../base/Sprite";
import { Director } from "../runtime/Director";

export class Bullet extends Sprite{
	constructor(x=0,y=0){
		const img = Sprite.getImage('bullet');
		super(img,0,0,img.width,img.height,0,0,img.width,img.height);
		this.x = x;
		this.y = y;
	}

	draw(){
		this.y = this.y - Director.getInstance().bulletSpeed
		super.draw(this.img,0,0,this.width,this.height,this.x,this.y,this.width/4,this.height/4);
	}
}