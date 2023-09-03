const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", tusHareketleri);

let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;
let x = 10;
let y = 10;
let konum = 20;
let boyut = 18;
let hareketX = 0;
let hareketY = 0;
let elmaX = Math.floor(Math.random() * konum);
let elmaY = Math.floor(Math.random() * konum);
let yilanUzunlugu = 3;
let yilanParcalari = [];
let skor = 0;
let seviye=10;

class YilanParcasi {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function oyunuCiz() {
  ekraniTemizle();
  yilaniCiz();
  elmayiCiz();
  yilanHareketiniGuncelle();
  elmaninKonumunuGuncelle();

  ctx.fillStyle = "white";
  ctx.font = "20px verdana";
  ctx.fillText(`Skor : ${skor}`,canvasWidth - 80,30)
  const sonuc = oyunBittiMi();
  if(sonuc) return;
  setTimeout(oyunuCiz, 100);
}

function ekraniTemizle() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
function yilaniCiz() {
  ctx.fillStyle = "green";
  for (let i of yilanParcalari) {
    ctx.fillRect(i.x * konum, i.y * konum, boyut, boyut);
  }
  yilanParcalari.push(new YilanParcasi(x, y));
  if (yilanParcalari.length > yilanUzunlugu) {
    yilanParcalari.shift();
  }

  ctx.fillStyle = "white";
  ctx.fillRect(x * konum, y * konum, boyut, boyut);
}

function elmayiCiz() {
  ctx.fillStyle = "red";
  ctx.fillRect(elmaX * konum, elmaY * konum, boyut, boyut);
}

function tusHareketleri(e) {
  switch (e.keyCode) {
    case 37:
        if(hareketX === 1) return;
      hareketX = -1;
      hareketY = 0;
      break;
    case 38:
        if(hareketY === 1) return;
      hareketY = -1;
      hareketX = 0;
      break;
    case 39:
        if(hareketX === -1) return;
      hareketX = 1;
      hareketY = 0;
      break;
    case 40:
        if(hareketY === -1) return;
      hareketY = 1;
      hareketX = 0;
      break;
  }
}
function yilanHareketiniGuncelle() {
  let sonucX = x + hareketX;
  let sonucY = y + hareketY;

  if (sonucY < 0) {
    sonucY = 19;
  } else if (sonucY > 19) {
    sonucY = 0;
  }
  if (sonucX < 0) {
    sonucX = 19;
  } else if (sonucX > 19) {
    sonucX = 0;
  }
  x = sonucX;
  y = sonucY;
}
function elmaninKonumunuGuncelle() {
  if (x === elmaX && y === elmaY) {
    elmaX = Math.floor(Math.random() * konum);
    elmaY = Math.floor(Math.random() * konum);

    let elmaKonumuMusaitMi = false;
    while (!elmaKonumuMusaitMi) {
      elmaKonumuMusaitMi = true;
      for (let parca of yilanParcalari) {
        if (parca.x === elmaX && parca.y === elmaY) {
          elmaX = Math.floor(Math.random() * konum);
          elmaY = Math.floor(Math.random() * konum);
          elmaKonumuMusaitMi = false;
        }
      }
    }

    yilanUzunlugu++;
    skor += 10;
    if(yilanUzunlugu % 3 === 0){
        seviye += 5;
    }
    document.getElementById("skor").innerText = skor;
  }
}
function oyunBittiMi(){
    let oyunBitti = false;
    if(hareketX === 0 && hareketY == 0) return;

    for(let parca of yilanParcalari)
    {
        if(parca.x === x && parca.y === y)
        {
            oyunBitti = true;
            break;
        }
    }
    if(oyunBitti){
        ctx.fillStyle = "white";
        
    }
    return oyunBitti;
}
function yeniOyun(){
    document.location.reload();
}
oyunuCiz();
