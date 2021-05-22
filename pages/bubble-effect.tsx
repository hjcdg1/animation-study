import { useEffect } from 'react';

function BubbleEffect() {
  useEffect(() => {
    const c1 = document.getElementById('c1') as HTMLCanvasElement;
    const c2 = document.getElementById('c2') as HTMLCanvasElement;
    const context1 = c1.getContext('2d') as CanvasRenderingContext2D;
    const context2 = c2.getContext('2d') as CanvasRenderingContext2D;

    let canvasWidth = c1.width = c2.width = window.innerWidth;
    let canvasHeight = c1.height = c2.height = window.innerHeight;
    let sizeBase = canvasWidth + canvasHeight;
    let parts = [] as {
      x: number;
      y: number;
      radius: number;
      angle: number;
      vel: number;
      tick: number;
    }[];

    function rand(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }

    function hsla(h: number, s: number, l: number, a: number): string {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    function drawCanvas() {
      const hueMin = rand(0, 360);
      const hueMax = hueMin + 100;
      const saturationMin = 10;
      const saturationMax = 70;
      const lightnessMin = 20;
      const lightnessMax = 50;
      const alphaMin = 0.1;
      const alphaMax = 0.5;
      const blurMin = 10;
      const blurMax = sizeBase * 0.04;
      const radiusMin = 1;
      const radiusMax = sizeBase * 0.04;

      context1.clearRect(0, 0, canvasWidth, canvasHeight);
      context1.globalCompositeOperation = 'lighter';

      let count = Math.floor(sizeBase * 0.1);
      while (count--) {
        const hue = rand(hueMin, hueMax);
        const saturation = rand(saturationMin, saturationMax);
        const lightness = rand(lightnessMin, lightnessMax);
        const alpha = rand(alphaMin, alphaMax);
        const blur = rand(blurMin, blurMax);
        const x = rand(0, canvasWidth);
        const y = rand(0, canvasHeight);
        const radius = rand(radiusMin, radiusMax);

        context1.shadowColor = hsla(hue, saturation, lightness, alpha);
        context1.shadowBlur = blur;
        context1.beginPath();
        context1.arc(x, y, radius, 0, 2 * Math.PI);
        context1.closePath();
        context1.fill();
      }

      for (let i = 0; i < Math.floor(sizeBase * 0.03); i++) {
        parts.push({
          x: rand(0, canvasWidth),
          y: rand(0, canvasHeight),
          radius: rand(1, sizeBase * 0.03),
          angle: rand(0, 2 * Math.PI),
          vel: rand(0.1, 0.5),
          tick: rand(0, 10000)
        });
      }
    }

    function initCanvas() {
      canvasWidth = c1.width = c2.width = window.innerWidth;
      canvasHeight = c1.height = c2.height = window.innerHeight;
      sizeBase = canvasWidth + canvasHeight;
      parts = [];

      drawCanvas();
    }

    function loop() {
      requestAnimationFrame(loop);

      context2.clearRect(0, 0, canvasWidth, canvasHeight);
      context2.globalCompositeOperation = 'source-over';
      context2.shadowBlur = 0;
      context2.drawImage(c1, 0, 0);
      context2.globalCompositeOperation = 'lighter';
      context2.shadowBlur = 15;
      context2.shadowColor = '#fff';

      let i = parts.length;
      while (i--) {
        const part = parts[i];

        part.x += Math.cos(part.angle) * part.vel;
        part.y += Math.sin(part.angle) * part.vel;
        part.angle += rand(-0.05, 0.05);

        context2.beginPath();
        context2.arc(part.x, part.y, part.radius, 0, 2 * Math.PI);
        context2.fillStyle = hsla(0, 0, 100, 0.075 + Math.cos(part.tick * 0.02) * 0.05);
        context2.fill();

        if (part.x - part.radius > canvasWidth) part.x = -part.radius;
        if (part.x + part.radius < 0) part.x = canvasWidth + part.radius;
        if (part.y - part.radius > canvasHeight) part.y = -part.radius;
        if (part.y + part.radius < 0) part.y = canvasHeight + part.radius;

        part.tick++;
      }
    }

    /* Initialization */
    initCanvas();
    loop();
    window.addEventListener('resize', initCanvas);
  }, []);

  return (
    <>
      <div className="container">
        <canvas id="c1"></canvas>
        <canvas id="c2"></canvas>
      </div>
      <style jsx>{`
        canvas {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        #c1 {
          opacity: 0;
        }
        #c2 {
          background: #000;
        }
      `}</style>
    </>
  );
}

export default BubbleEffect;
