## Bullet Way 微信小游戏
仅供娱乐学习用途，请勿商用


## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── DataStore.js                       // 帧动画的简易实现
│   ├── Resource.js                        // 游戏资源
|   ├── ResourceLoader.js                  // 游戏资源加载类
│   └── Sprite.js                          // 游戏基本元素精灵类
├── npc
│   └── Enemy.js                           // 敌机类
├── player
│   ├── Bullet.js                          // 子弹类
│   ├── Explosion.js                       // 爆炸效果类
│   └── Hero.js                            // 玩家战机类
├── runtime
│   ├── BackGround.js                      // 背景类
│   ├── Director.js                        // 导演类，用于全局控制
│   ├── Score.js                           // 用于展示分数和级别
│   └── Sound.js                           // 全局音效管理器(已废弃)
└── Main.js                                // 游戏入口主函数

./res
├── audio                                   // 音频资源
└── images                                  // 图片素材

./game.js                                   // 微信小游戏启动文件
./game.json                                 // 微信小游戏基础配置文件
./project.config.json                       // 微信小游戏基础项目配置文件
```
