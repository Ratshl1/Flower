// ==========================
// I LOVE U CINEMATIC
// Part 1
// ==========================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = document.getElementById("finalImage");
const flash = document.getElementById("flash");

resize();

window.addEventListener("resize", resize);

function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

ctx.lineCap="round";
ctx.lineJoin="round";

let progress = 0;

const flowerLeft={
    x:canvas.width*0.33,
    y:canvas.height*0.72,
    s:1
};

const flowerRight={
    x:canvas.width*0.67,
    y:canvas.height*0.72,
    s:1
};

function roughLine(x1,y1,x2,y2){

    ctx.beginPath();

    ctx.moveTo(x1,y1);

    const pieces=30;

    for(let i=1;i<=pieces;i++){

        const t=i/pieces;

        const nx=x1+(x2-x1)*t+(Math.random()-0.5)*4;
        const ny=y1+(y2-y1)*t+(Math.random()-0.5)*4;

        ctx.lineTo(nx,ny);

    }

    ctx.stroke();

}

function petal(cx,cy,r,rot){

    ctx.save();

    ctx.translate(cx,cy);

    ctx.rotate(rot);

    ctx.beginPath();

    for(let i=0;i<45;i++){

        const t=i/45;

        const x=Math.sin(t*Math.PI)*r*0.7;

        const y=-t*r;

        if(i===0)
            ctx.moveTo(0,0);

        ctx.lineTo(
            x+(Math.random()-0.5)*2,
            y+(Math.random()-0.5)*2
        );

    }

    for(let i=45;i>=0;i--){

        const t=i/45;

        const x=-Math.sin(t*Math.PI)*r*0.7;

        const y=-t*r;

        ctx.lineTo(
            x+(Math.random()-0.5)*2,
            y+(Math.random()-0.5)*2
        );

    }

    ctx.closePath();

    ctx.stroke();

    ctx.restore();

}

function drawFlower(f){

    ctx.strokeStyle="#6aa8ff";

    ctx.lineWidth=4;

    roughLine(
        f.x,
        f.y,
        f.x,
        f.y-180
    );

    const topY=f.y-180;

    const size=65;

    for(let i=0;i<6;i++){

        petal(
            f.x,
            topY,
            size,
            i*Math.PI/3
        );

    }

    for(let i=0;i<12;i++){

        ctx.beginPath();

        ctx.arc(
            f.x+(Math.random()-0.5)*16,
            topY+(Math.random()-0.5)*16,
            2,
            0,
            Math.PI*2
        );

        ctx.stroke();

    }

}
// ====================================
// Part 2
// رسم تدريجي ثم التحول للصورة
// ====================================

let frame = 0;
let finished = false;

function animate(){

    frame++;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.save();

    ctx.strokeStyle="#74b8ff";
    ctx.lineWidth=4;
    ctx.shadowBlur=10;
    ctx.shadowColor="#7ab7ff";

    // رسم الساق تدريجياً

    if(frame<120){

        let h=frame/120;

        roughLine(
            flowerLeft.x,
            flowerLeft.y,
            flowerLeft.x,
            flowerLeft.y-180*h
        );

    }else{

        roughLine(
            flowerLeft.x,
            flowerLeft.y,
            flowerLeft.x,
            flowerLeft.y-180
        );

    }

    // بعد ثانيتين تقريباً يبدأ رسم البتلات

    if(frame>120){

        let petals=Math.min(
            6,
            Math.floor((frame-120)/18)
        );

        for(let i=0;i<petals;i++){

            petal(
                flowerLeft.x,
                flowerLeft.y-180,
                65,
                i*Math.PI/3
            );

        }

    }

    // الزهرة الثانية

    if(frame>230){

        let h=Math.min(1,(frame-230)/120);

        roughLine(
            flowerRight.x,
            flowerRight.y,
            flowerRight.x,
            flowerRight.y-180*h
        );

    }

    if(frame>350){

        let petals=Math.min(
            6,
            Math.floor((frame-350)/18)
        );

        for(let i=0;i<petals;i++){

            petal(
                flowerRight.x,
                flowerRight.y-180,
                65,
                i*Math.PI/3
            );

        }

    }

    ctx.restore();

    // انتهاء الرسم

    if(frame==620 && !finished){

        finished=true;

        cinematicTransition();

    }

    if(!finished)
        requestAnimationFrame(animate);

}

animate();


// ====================================
// التحول السينمائي
// ====================================

function cinematicTransition(){

    flash.classList.add("flash");

    setTimeout(()=>{

        img.classList.add("showImage");

    },500);

    setTimeout(()=>{

        canvas.classList.add("fadeCanvas");

    },1200);

}
// =========================================
// Part 3
// الصورة تصبح "حية"
// =========================================

let windTime = 0;

function livingAnimation(){

    windTime += 0.015;

    const sway = Math.sin(windTime) * 2.5;
    const scale = 1 + Math.sin(windTime*0.8)*0.01;

    img.style.transform =
        `translate(-50%,-50%)
         rotate(${sway}deg)
         scale(${scale})`;

    requestAnimationFrame(livingAnimation);

}

// يبدأ بعد انتهاء الانتقال

setTimeout(()=>{

    img.classList.add("glow");

    livingAnimation();

    createParticles();

},7000);


// =========================================
// جسيمات مضيئة
// =========================================

const particles=[];

class Particle{

    constructor(){

        this.reset();

        this.y=Math.random()*canvas.height;

    }

    reset(){

        this.x=Math.random()*canvas.width;

        this.y=canvas.height+20;

        this.size=Math.random()*3+1;

        this.speed=0.2+Math.random()*0.8;

        this.alpha=.2+Math.random()*.8;

    }

    update(){

        this.y-=this.speed;

        this.x+=Math.sin(this.y/40)*0.3;

        if(this.y<-20)
            this.reset();

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle=`rgba(255,180,255,${this.alpha})`;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

function createParticles(){

    for(let i=0;i<120;i++){

        particles.push(new Particle());

    }

    particleLoop();

}

function particleLoop(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const p of particles){

        p.update();

        p.draw();

    }

    requestAnimationFrame(particleLoop);

}
