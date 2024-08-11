let canvas = document.querySelector('canvas');

let ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let heigth = canvas.height = window.innerHeight;
let str = "000111 Vk 神 Dev 000 111 ドラゴン WEB C 開発者 0000 7 13";
let strArr = str.split("");
let fontSize = 12;
let columns = width / fontSize;
let drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, heigth);
    ctx.fillStyle = "#ff2100";
    ctx.font = `${fontSize}px system-ui`;

    for (let i = 0; i < drops.length; i++) {
        let text = strArr[Math.floor(Math.random() * strArr.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > heigth && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

window.addEventListener("resize", () => location.reload());