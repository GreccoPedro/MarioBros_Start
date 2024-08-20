

// global phaser
const config ={
type : Phaser.AUTO, // webgl, canvas  or auto (ira intentando)
width : 256,
height: 244,
backgroundColor: '#049cd8',
parent: 'game', // donde se renderiza 
physics: {
    default : 'arcade',
    arcade:{
        gravity :  { y: 300 },
        debug : false
    }
},
scene:{
    preload, //se ejecuta para precargar recursos
    create, // se ejecuta cuandop el juego comienza
    update // se ejecuta en cada frame
}
}

new Phaser.Game(config) // inicializacion del juego 
// this -> game -> el juego que estamoas construyendo


function preload () {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.spritesheet(
        'mario',      // <-------ID
        'assets/entities/mario.png',
        { frameWidth:18, frameHeight: 16 } // dimensiones de cada frame 
    )
}                                                                                           //1°

function create () {
    this.add.image(100,50, 'cloud1')
                // x, y, id-del-asset
        .setOrigin(1,1)
        .setScale(0.15)


       // CREACION DEL SUELO COMO SPRITE ESTATICO 
    this.floor = this.physics.add.staticGroup();
    this.floor.create(config.width / 2, config.height - 16, 'floorbricks')

     // CREA AL MARIO CON FISICAS ACTIVIDAS

    this.mario= this.physics.add.sprite(50,210, 'mario')
    .setOrigin(0,1)
    .setCollideWorldBounds(true); //(no deja salir al pj del margen) 

    // COLISION DE MARIO CON EL SUELO
    this.physics.add.collider(this.mario, this.floor);

    // this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks' )
    // .setOrigin(0,0)

    // this.mario = this.add.sprite(50, 210, 'mario')
    // .setOrigin(0, 1)

    this.keys = this.input.keyboard.createCursorKeys()
   
    this.anims.create({
        key: 'mario-walk',
        frames : this.anims.generateFrameNumbers(
            'mario',
            {start: 3, end: 1}
        ),
        frameRate : 13,
        repeat : -1
    })


    this.anims.create({
        key: 'mario.jump',
        frames:[{key:'mario', frame: 5}]
    })

}                                                                                           // 2°

function update () {
    if (this.keys.left.isDown){
        this.mario.x -= 2
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = true
    } else if (this.keys.right.isDown){
        this.mario.x += 2
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = false
    }else{
       this.mario.anims.play('mario-idle', true)
    }

    if(this.keys.up.isDown && this.mario.body.touching.down){
        this.mario.setVelocityY(-200);
        this.mario.anims.play('mario-jump',  true)
    }
}
