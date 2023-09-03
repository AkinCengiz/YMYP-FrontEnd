const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown", myKeydown);

let interval;
let oyunBasladiMi = false;
const height = canvas.height;
const width = canvas.width;

let x = width / 2;
let y = height - 30;
let dx = 2;
let dy = 2;

let cubukGenisligi = 150;
let cubukYuksekligi = 10;
let cubukX = (width - cubukGenisligi) / 2;
let cubukY = height - cubukYuksekligi;
let cubukHiz = (width - cubukGenisligi) / 10;

let tuglaSatir = 3;
let tuglaSutun = 5;
const tuglaGenislik = 75;
const tuglaYukseklik = 20;
const tuglaOffSetTop = 30;
const tuglaOffSetLeft = 30;
const tuglaPadding = 10;
let skor = 0;
let healt = 3;
let isGameOver = false;

const tuglalar = [];

for (let i = 0; i < tuglaSatir; i++) {
    tuglalar[i] = [];
    for (let j = 0; j < tuglaSutun; j++) {
        tuglalar[i][j] = { x: 0, y: 0, status: 1 };
    }
}

//arrow function
const oyunuCiz = () => {
    tahtayiTemizle();
    if (!oyunBasladiMi && !isGameOver) {
        ctx.font = "20px verdana"
        ctx.fillText("Başlamak için tıkla...", width / 2 - 90, height / 2);
    }
    skorGetir();
    canGetir();
    topuCiz();
    cubukCiz();
    topunYonunuDegistir();
    tuglaCiz();
    tuglaKir();


};

const skorGetir = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095dd"
    ctx.fillText(`Skor : ${skor}`, width - 80, 20);
    ctx.fill();
}

const canGetir = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095dd";
    ctx.fillText(`Can : ${healt}`, 8, 20);
    ctx.fill();
}

const tuglaKir = () => {
    for (let satir = 0; satir < tuglaSatir; satir++) {
        for (let sutun = 0; sutun < tuglaSutun; sutun++) {
            const tugla = tuglalar[satir][sutun];
            if (tugla.status === 1) {
                if ((x >= tugla.x || x >= tugla.x - 10) && (x <= tugla.x + tuglaGenislik) && (y >= tugla.y || y >= tugla.y - 10) && (y <= tugla.y + tuglaYukseklik || y <= tugla.y + tuglaYukseklik - 10)) {

                    dy = -dy;
                    tugla.status = 0;
                    skor += 10;

                    if (skor / 10 === tuglaSatir * tuglaSutun) {
                        clearInterval(interval);

                        ctx.font = "25px verdana";
                        ctx.fillStyle = "#0095dd"
                        ctx.fillText(`Tebrikler, Oyunu kazandın...`, width / 2 - 150, height / 2);
                        ctx.fill();
                    }
                }
            }
        }
    }
}

const tahtayiTemizle = () => {
    ctx.clearRect(0, 0, width, height);
};

const tuglaCiz = () => {
    for (let satir = 0; satir < tuglaSatir; satir++) {
        for (let sutun = 0; sutun < tuglaSutun; sutun++) {
            if (tuglalar[satir][sutun].status === 1) {
                const tuglaX = sutun * (tuglaGenislik + tuglaPadding) + tuglaOffSetLeft;
                const tuglaY = satir * (tuglaYukseklik + tuglaPadding) + tuglaOffSetTop;

                tuglalar[satir][sutun].x = tuglaX;
                tuglalar[satir][sutun].y = tuglaY;

                ctx.beginPath();
                ctx.rect(tuglaX, tuglaY, tuglaGenislik, tuglaYukseklik);
                ctx.fillStyle = "#0095dd";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

const topuCiz = () => {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
};

const topunYonunuDegistir = () => {

    if (x + dx > width - 10 || x + dx < 10) {
        dx = -dx;
    }
    x += dx;
    if (y + dy < 10) {
        dy = -dy;
    } else if (x > cubukX && x < cubukX + cubukGenisligi && y + dy > cubukY - 10) {
        dy = -dy;
    } else if ((x < cubukX || x > cubukX + cubukGenisligi) && y + dy > height - 10) {
        dy = -dy;
        healt--;
        if (healt === 0) {
            ctx.font = "25px verdana";
            ctx.fillStyle = "red";
            ctx.fillText(`Game Over!!!`, width / 2 - 100, height / 2);
            ctx.fill();

            clearInterval(interval);
            isGameOver = true;
            oyunBasladiMi = false;
        }
    }
    y += dy;
};
const cubukCiz = () => {
    ctx.beginPath();
    ctx.rect(cubukX, cubukY, cubukGenisligi, cubukYuksekligi);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
};

// function tahtayiTemizle(){
//     ctx.clearReact(0,0,width,height);
// }
oyunuCiz();
const oyunuBaslat = () => {
    if (oyunBasladiMi === false) {
        if (isGameOver) {
            document.location.reload();
        } else {
            interval = setInterval(oyunuCiz, 10);
            oyunBasladiMi = true;
        }

    } else {
        clearInterval(interval);
        oyunBasladiMi = false;

        ctx.font = "20px verdana"
        ctx.fillText("Oyun Duraklatıldı...", width / 2 - 90, height / 2);
    }

}

function myKeydown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        if (cubukX + cubukGenisligi + cubukHiz < width) {
            cubukX += cubukHiz;
        } else {
            cubukX = width - cubukGenisligi;
        }
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        if (cubukX - cubukHiz > 0) {
            cubukX -= cubukHiz;
        } else {
            cubukX = 0;
        }
    }
}

