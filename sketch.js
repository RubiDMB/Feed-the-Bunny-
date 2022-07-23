const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;
 
var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  star_img = loadImage("star.png");
  mute_btn = loadImage("mute.png");
  Emptystars = loadImage("empty.png");
  

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.3);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
 
  button2 = createImg("cut_btn.png");
  button2.position(380,80);
  button2.size(50,50);
  button3 = createImg("cut_btn.png");
  button3.position(30,40);
  button3.size(50,50)  
  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(7,{x:410,y:80});
  rope3 = new Rope(11,{x:55,y:40});
  ground = new Ground(200,690,600,20);
 
  button.mouseClicked(drop);
  button2.mouseClicked(drop2);
  button3.mouseClicked(drop3);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  onestar = createSprite(400,300,50,50);
  onestar.addImage (star_img);
  onestar.scale = 0.02
 
  onestarT  = createSprite (28,31,50,50);
  onestarT.addImage(star_img);
  onestarT.scale = 0.013
  onestarT.visible = false

  twostarT = createSprite (70,31,50,50);
  twostarT.addImage(star_img);
  twostarT.scale = 0.013
  twostarT.visible = false

  twostar = createSprite(235,450,50,50);
  twostar.addImage(star_img);
  twostar.scale = 0.02

  tablero = createSprite(50,30,50,50);
  tablero.addImage(Emptystars);
  tablero.scale = 0.15

  bunny = createSprite(230,590,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 =new Link(rope3,fruit);
 mute_btn = createImg("mute.png");
 mute_btn.position(410,20);
 mute_btn.size(50,50);
 mute_btn.mouseClicked(mute);

 balloon = createImg("balloon.png");
 balloon.position(10,260);
 balloon.size(100,100);
 balloon.mouseClicked(blow);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,30)==true)
  {
    //World.remove(world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
    
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    //World.remove(world,fruit);
    fruit=null;
     sad_sound.play();

     
   }
   
   if(collide(fruit,onestar,40)){
    onestar.visible = false;
    tablero.visible= false;
    onestarT.visible = true
   }
   
   if(collide(fruit,twostar,40)){
   twostar.visible = false
   twostarT.visible = true
   tablero.visible = false
     }
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play();

  
}

function drop2()
  {
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2= null;
  cut_sound.play();
} 

function drop3()
{
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3= null;
  cut_sound.play();
}
function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute(){
  if(bk_song.isPlaying()){
 bk_song.stop();

  } else {
    bk_song.play()
  }
}

function blow (){
  Matter.Body.applyForce(fruit,{x : 0,y :0}, {x:0.01,y:0});
  air.play();
}