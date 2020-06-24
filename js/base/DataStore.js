export class DataStore{

	static getInstance(){
		if(!this.instance){
			this.instance = new DataStore();
		}
		return this.instance;
	}

	constructor(){
		this.map = new Map()
		console.log('实例化DataStore1次')
	}
	
	put(key,val){
		if(typeof val === 'function'){
			val = new val()
		}
		this.map.set(key,val)
		return this
	}

	get(key){
		return this.map.get(key)
	}

	destroy(){
		for(let key of this.map.keys()){
			this.put(key,null)
		}
	}
}