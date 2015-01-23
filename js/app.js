var init = function() {
  var GAME_SIZE = 600;

  var PLAYER_SIZE = 12;
  var MOVE_TIME = 200;
  var SPEED = GAME_SIZE / MOVE_TIME;

  var ENEMY_SIZE = 40;
  var ENEMY_IMG = "images/zombie-small.gif";

  var BULLET_SIZE = 2;
  var BULLET_SHIFT = BULLET_SIZE >> 1;
  var BULLET_TIME = MOVE_TIME >> 1;
  var EXPLOSION_SCALE = 4;

  var calculateTime = function(roadLength) {
    return roadLength / SPEED;
  };

  var randomBetween = function(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  var generateEnemies = function() {
    var enemies = [];
    for (var i = 0; i < 5; i++) {
      var enemy = new Sprite(ENEMY_SIZE, ENEMY_SIZE);
      //enemy.backgroundColor = "#00a";
      enemy.image = game.assets["images/zombie-small.gif"];

      enemy.x = randomBetween(50, GAME_SIZE - PLAYER_SIZE);
      enemy.y = randomBetween(50, GAME_SIZE - PLAYER_SIZE);
      enemies.push(enemy);
    }
    return enemies;
  };

  var createSprite = function(x, y, size, rgbColor) {
    var sprite = new Sprite(size, size);
    sprite.x = x;
    sprite.y = y;
    sprite.backgroundColor = rgbColor;
    return sprite;
  };

  enchant();

  var game = new Game(GAME_SIZE, GAME_SIZE); // game stage
  game.fps = 60;
  game.preload(ENEMY_IMG);

  var rootScene = game.rootScene;
  rootScene.backgroundColor = "#f1f1f1";

  var player = createSprite(0, 0, PLAYER_SIZE, "#000");

  var UP_BTN_EVENTS = ["DOWN_BUTTON_UP", "UP_BUTTON_UP", "LEFT_BUTTON_UP", "RIGHT_BUTTON_UP"];
  var onBtnUp = function() {
    player.tl.clear();
  };

  game.on(enchant.Event.LOAD, function() {
    var i, enemy;

    // add player to game
    rootScene.addChild(player);

    // arrows press events
    rootScene.on(enchant.Event.RIGHT_BUTTON_DOWN, function(ev) {
      player.tl.moveX(GAME_SIZE - PLAYER_SIZE, calculateTime(GAME_SIZE - player.x));
    });
    rootScene.on(enchant.Event.DOWN_BUTTON_DOWN, function(ev) {
      player.tl.moveY(GAME_SIZE - PLAYER_SIZE, calculateTime(GAME_SIZE - player.y));
    });
    rootScene.on(enchant.Event.LEFT_BUTTON_DOWN, function(ev) {
      player.tl.moveX(0, calculateTime(player.x));
    });
    rootScene.on(enchant.Event.UP_BUTTON_DOWN, function(ev) {
      player.tl.moveY(0, calculateTime(player.y));
    });
    for (i = 0; i < UP_BTN_EVENTS.length; i++) {
      rootScene.on(enchant.Event[UP_BTN_EVENTS[i]], onBtnUp);
    }

    // generate enemies
    var enemies = generateEnemies();
    for (i = 0; i < enemies.length; i++) {
      enemy = enemies[i];
      rootScene.addChild(enemy);
    }

    // click events
    rootScene.on(enchant.Event.TOUCH_START, function(ev) {
      var bullet = createSprite(player.x, player.y, BULLET_SIZE, "#d00");
      rootScene.addChild(bullet);

      var bulletMove = bullet.tl.moveTo(ev.x - BULLET_SHIFT, ev.y - BULLET_SHIFT, BULLET_TIME);
      bulletMove.then(function() {
        bullet.scale(EXPLOSION_SCALE);
        for (i = 0; i < enemies.length; i++) {
          enemy = enemies[i];
          if (bullet.within(enemy, BULLET_SIZE * EXPLOSION_SCALE)) {
            rootScene.removeChild(enemy);
          }
        }
        setTimeout(function() {
          rootScene.removeChild(bullet);
        }, 800);
      });
    });
  });

  game.start();
};

$(function() {
  init();
});
