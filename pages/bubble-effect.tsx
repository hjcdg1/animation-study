import { useEffect } from 'react';

function BubbleEffect() {
  useEffect(() => {
    const canvasBackground = document.getElementById('canvas-background') as HTMLCanvasElement;
    const canvasFloating = document.getElementById('canvas-floating') as HTMLCanvasElement;
    const contextBackground = canvasBackground.getContext('2d') as CanvasRenderingContext2D;
    const contextFloating = canvasFloating.getContext('2d') as CanvasRenderingContext2D;

    let canvasWidth: number;
    let canvasHeight: number;
    let sizeBase: number;
    let floatingBubbles = [] as {
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

    function initCanvas() {
      canvasWidth = canvasBackground.width = canvasFloating.width = window.innerWidth;
      canvasHeight = canvasBackground.height = canvasFloating.height = window.innerHeight;
      sizeBase = canvasWidth + canvasHeight;
      floatingBubbles = [];
    }

    function drawCanvasBackground() {
      /* 캔버스 지우기 */
      contextBackground.clearRect(0, 0, canvasWidth, canvasHeight);

      /* 채우기 색과 그림자 색이 섞이도록 함 */
      contextBackground.globalCompositeOperation = 'lighter';

      /* 그림자 색 (색상, 채도, 명도, 불투명도) */
      const hueMin = rand(0, 360);
      const hueMax = hueMin + 100;
      const saturationMin = 10;
      const saturationMax = 70;
      const lightnessMin = 20;
      const lightnessMax = 50;
      const alphaMin = 0.1;
      const alphaMax = 0.5;

      /* 그림자 번짐 정도 */
      const blurMin = 10;
      const blurMax = sizeBase * 0.04;

      /* 원 중심 좌표 */
      const xMin = 0;
      const xMax = canvasWidth;
      const yMin = 0;
      const yMax = canvasHeight;

      /* 원 반지름 */
      const radiusMin = 1;
      const radiusMax = sizeBase * 0.04;

      /* 백그라운드 거품 그리기 */
      for (let i = 0; i < Math.floor(sizeBase * 0.2); i++) {
        const hue = rand(hueMin, hueMax);
        const saturation = rand(saturationMin, saturationMax);
        const lightness = rand(lightnessMin, lightnessMax);
        const alpha = rand(alphaMin, alphaMax);
        const blur = rand(blurMin, blurMax);
        const x = rand(xMin, xMax);
        const y = rand(yMin, yMax);
        const radius = rand(radiusMin, radiusMax);

        contextBackground.shadowColor = hsla(hue, saturation, lightness, alpha);
        contextBackground.shadowBlur = blur;
        contextBackground.beginPath();
        contextBackground.arc(x, y, radius, 0, 2 * Math.PI);
        contextBackground.closePath();
        contextBackground.fillStyle = '#000000';
        contextBackground.fill();
      }
    }

    function constructFloatingBubbles() {
      /* 원 중심 좌표 */
      const xMin = 0;
      const xMax = canvasWidth;
      const yMin = 0;
      const yMax = canvasHeight;

      /* 원 반지름 */
      const radiusMin = 1;
      const radiusMax = sizeBase * 0.03;

      /* 원 이동 방향 */
      const angleMin = 0;
      const angleMax = 2 * Math.PI;

      /* 원 이동 속력 */
      const velMin = 0.1;
      const velMax = 0.5;

      /* 원 불투명도 */
      const tickMin = 0;
      const tickMax = 10000;

      /* 움직이는 거품 그리기 위한 정보 구성 */
      for (let i = 0; i < Math.floor(sizeBase * 0.03); i++) {
        floatingBubbles.push({
          x: rand(xMin, xMax),
          y: rand(yMin, yMax),
          radius: rand(radiusMin, radiusMax),
          angle: rand(angleMin, angleMax),
          vel: rand(velMin, velMax),
          tick: rand(tickMin, tickMax)
        });
      }
    }

    function drawFloatingBubbles() {
      requestAnimationFrame(drawFloatingBubbles);

      /* 캔버스 지우기 */
      contextFloating.clearRect(0, 0, canvasWidth, canvasHeight);

      /* 백그라운드 거품 그리기 */
      contextFloating.globalCompositeOperation = 'source-over';
      contextFloating.shadowBlur = 0;
      contextFloating.drawImage(canvasBackground, 0, 0);

      /* 움직이는 거품 그리기 준비 */
      contextFloating.globalCompositeOperation = 'lighter';
      contextFloating.shadowColor = '#ffffff';
      contextFloating.shadowBlur = 15;

      /* 움직이는 거품 그리기 */
      for (let i = 0; i < floatingBubbles.length; i++) {
        const floatingBubble = floatingBubbles[i];

        /* 거품 그리기 */
        contextFloating.beginPath();
        contextFloating.arc(floatingBubble.x, floatingBubble.y, floatingBubble.radius, 0, 2 * Math.PI);
        contextFloating.closePath();
        contextFloating.fillStyle = hsla(0, 0, 100, 0.075 + Math.cos(floatingBubble.tick * 0.02) * 0.05);
        contextFloating.fill();

        /* 거품 이동 */
        floatingBubble.x += floatingBubble.vel * Math.cos(floatingBubble.angle);
        floatingBubble.y += floatingBubble.vel * Math.sin(floatingBubble.angle);
        if (floatingBubble.x - floatingBubble.radius > canvasWidth) floatingBubble.x = -floatingBubble.radius;
        if (floatingBubble.x + floatingBubble.radius < 0) floatingBubble.x = canvasWidth + floatingBubble.radius;
        if (floatingBubble.y - floatingBubble.radius > canvasHeight) floatingBubble.y = -floatingBubble.radius;
        if (floatingBubble.y + floatingBubble.radius < 0) floatingBubble.y = canvasHeight + floatingBubble.radius;

        /* 거품 이동 방향 변경 */
        floatingBubble.angle += rand(-0.05, 0.05);

        /* 거품 불투명도 조절 */
        floatingBubble.tick++;
      }
    }

    initCanvas();
    drawCanvasBackground();
    constructFloatingBubbles();
    drawFloatingBubbles();

    window.addEventListener('resize', () => {
      initCanvas();
      drawCanvasBackground();
      constructFloatingBubbles();
    });
  }, []);

  return (
    <>
      <div className="container">
        <canvas id="canvas-background"></canvas>
        <canvas id="canvas-floating"></canvas>
      </div>
      <style jsx>{`
        canvas {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        #canvas-background {
          opacity: 0;
        }
        #canvas-floating {
          background: #000000;
        }
      `}</style>
    </>
  );
}

export default BubbleEffect;
