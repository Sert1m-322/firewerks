const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let WIDTH;
let HEIGHT;

const resize = () => {
    WIDTH = canvas.width = window.innerWidth;
    HEIGHT = canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize);
resize()

let particles_list = [];
let rockets = [];

const colors = ["#FF3B3B", "#FF9F1C", "#FFE66D", "#2EC4B6", "#4D96FF", "#B15EFF", "#FF5DA2", "#FFFFFF"];

addEventListener("click", (e) =>{
    rockets.push({
        x: e.clientX,
        y: e.clientY,
        skoka: Math.floor(Math.random() * 70) + 50,
        particles: Math.floor(Math.random() * 300) +50,
    })
    
})

const tick = () => {

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for(let rocket of rockets){
        if(rocket.skoka === 1){
            for(let i = 0; i <= rocket.particles; i++){
                speed = Math.random() * 5 + 2;
                angle = Math.random() * Math.PI * 2;

                particles_list.push({
                    x: rocket.x,
                    y: rocket.y,

                    vx: Math.cos(angle) * (speed),
                    vy: Math.sin(angle) * (speed),

                    angle: Math.random() * Math.PI * 2,
                    skoka: Math.floor(Math.random() * 50) + 5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                })
            }

            }
        

        if (rocket.skoka >= 0 && rocket.y > 0){
            rocket.y -= 5
            ctx.beginPath();
            ctx.arc(rocket.x, rocket.y, 4, 0, Math.PI * 2)
            ctx.fillStyle = "white";
            ctx.fill();
            rocket.skoka --

        }else if (rocket.y <= 0){
            rocket.y = HEIGHT

        }

    }

    for (let par of particles_list){
        ctx.beginPath();
        ctx.arc(par.x, par.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = par.color;
        ctx.fill();

        if (par.skoka !== 0){
            par.skoka--

            par.vy += 0.05;
            par.x += par.vx;
            par.y += par.vy;;

            par.vx *= 0.98;
            par.vy *= 0.98;
        }

    }


    particles_list = particles_list.filter(par => par.skoka > 0);
    rockets = rockets.filter(rocket => rocket.skoka > 0);
    requestAnimationFrame(tick)
}

tick()
