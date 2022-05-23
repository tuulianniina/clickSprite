const canvas = document.getElementById("canvas");
let context = document.querySelector("canvas").getContext("2d");
canvas.height = 400;
canvas.width = 500;
const width = canvas.width;
const height = canvas.height;
const bound = canvas.getBoundingClientRect();

let img1 = {
  src : 'phone1.png',
  spriteW : 58,
  spriteH : 98,
  pos : { x : width /  3, y : height / 6},
}
let spritesheet1 = {
  src : 'phoneSHEET1.png',
  spriteW : 58,
  spriteH : 98,
  pos : { x : width / 3, y : height / 6},
  spriteX : 23,
  spriteY : 4,
  count : 92,
}
function anim(sprite) {
  anim.isOn = true;
  context.imageSmoothingEnabled = false;
  var img = document.createElement("img");
  img.src = sprite.src;
  var spriteW = sprite.spriteW;
  var spriteH = sprite.spriteH;
  var spriteX = sprite.spriteX;
  var spriteY = sprite.spriteY;
  var count = sprite.count;
	img.addEventListener("load", () => {
		var cycleX = 0;
    var cycleY = 0;
    for (var i = 0; i < count; i++) {
      (function(i) {
    		setTimeout(() => {
    			context.clearRect(0, 0, spriteW, spriteH);
    			context.drawImage(img,
    				cycleX * spriteW, cycleY * spriteH, spriteW, spriteH,
    				sprite.pos.x, sprite.pos.y, spriteW * 3, spriteH * 3);
    			cycleX = cycleX + 1;
          if (cycleX === spriteX) {
            cycleY = cycleY + 1;
            cycleX = 0;
            if (cycleY === spriteY) {
              cycleY = 0;
            }
            if (i === count - 1) {
              anim.isOn = false;
            }
          }
    		}, 100*i);
      })(i);
    }
	});
}

function drawStill(image) {
  context.imageSmoothingEnabled = false;
  var img = document.createElement("img");
  img.src = image.src;
  var spriteW = image.spriteW;
  var spriteH = image.spriteH;
  img.addEventListener("load", function() {
    context.drawImage(img,
      0, 0, spriteW, spriteH,
      image.pos.x, image.pos.y, spriteW * 3, spriteH * 3);
  });
}
drawStill(img1);

canvas.addEventListener("click", function(event) {
  if (!anim.isOn && event.clientX - bound.left > spritesheet1.pos.x &&
      event.clientX - bound.left < spritesheet1.pos.x + spritesheet1.spriteW * 3 &&
      event.clientY - bound.top > spritesheet1.pos.y &&
      event.clientY - bound.top < spritesheet1.pos.y + spritesheet1.spriteH * 3) {
        anim(spritesheet1);
  }
});
