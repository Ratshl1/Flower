/*=========================================
        I LOVE U CINEMATIC
            PART 1
=========================================*/

const drawCanvas = document.getElementById("drawCanvas");
const drawCtx = drawCanvas.getContext("2d");

const particleCanvas = document.getElementById("particleCanvas");
const particleCtx = particleCanvas.getContext("2d");

const imageContainer = document.getElementById("imageContainer");
const flowerImage = document.getElementById("flowerImage");

const light = document.getElementById("light");

/*=========================================
              CANVAS SIZE
=========================================*/

function resize(){

    drawCanvas.width = window.innerWidth;
    drawCanvas.height = window.innerHeight;

    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

/*=========================================
          DRAW STYLE
=========================================*/

drawCtx.lineCap="round";
drawCtx.lineJoin="round";

drawCtx.strokeStyle="#71b7ff";

drawCtx.lineWidth=4;

/*=========================================
        FLOWER POSITION
=========================================*/

const leftFlower={

    x:drawCanvas.width*0.33,

    y:drawCanvas.height*0.72

};

const rightFlower={

    x:drawCanvas.width*0.67,

    y:drawCanvas.height*0.72

};

/*=========================================
      CHILD DRAWING EFFECT
=========================================*/

function roughLine(x1,y1,x2,y2){

    drawCtx.beginPath();

    drawCtx.moveTo(x1,y1);

    const pieces=35;

    for(let i=1;i<=pieces;i++){

        const t=i/pieces;

        const x=x1+(x2-x1)*t+(Math.random()-0.5)*5;

        const y=y1+(y2-y1)*t+(Math.random()-0.5)*5;

        drawCtx.lineTo(x,y);

    }

    drawCtx.stroke();

}

/*=========================================
            PETAL
=========================================*/

function petal(cx,cy,size,angle){

    drawCtx.save();

    drawCtx.translate(cx,cy);

    drawCtx.rotate(angle);

    drawCtx.beginPath();

    for(let i=0;i<50;i++){

        const t=i/50;

        const x=Math.sin(t*Math.PI)*size*.72;

        const y=-size*t;

        if(i===0)
            drawCtx.moveTo(0,0);

        drawCtx.lineTo(

            x+(Math.random()-.5)*2,

            y+(Math.random()-.5)*2

        );

    }

    for(let i=50;i>=0;i--){

        const t=i/50;

        const x=-Math.sin(t*Math.PI)*size*.72;

        const y=-size*t;

        drawCtx.lineTo(

            x+(Math.random()-.5)*2,

            y+(Math.random()-.5)*2

        );

    }

    drawCtx.closePath();

    drawCtx.stroke();

    drawCtx.restore();

}

/*=========================================
      FLOWER CENTER
=========================================*/

function center(cx,cy){

    for(let i=0;i<18;i++){

        drawCtx.beginPath();

        drawCtx.arc(

            cx+(Math.random()-0.5)*18,

            cy+(Math.random()-0.5)*18,

            2,

            0,

            Math.PI*2

        );

        drawCtx.stroke();

    }

}
