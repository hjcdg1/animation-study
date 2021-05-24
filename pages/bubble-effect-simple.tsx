import { useEffect } from 'react';

function BubbleEffectSimple() {
  useEffect(() => {
    const canvasFloating = document.getElementById('canvas-floating') as HTMLCanvasElement;
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
      canvasWidth = canvasFloating.width = window.innerWidth;
      canvasHeight = canvasFloating.height = window.innerHeight;
      sizeBase = canvasWidth + canvasHeight;
      floatingBubbles = [];

      /* 움직이는 거품 그리기 준비 */
      contextFloating.globalCompositeOperation = 'lighter';
      contextFloating.shadowColor = '#ffffff';
      contextFloating.shadowBlur = 10;
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
      const velMin = 0.2;
      const velMax = 0.5;

      /* 원 불투명도 */
      const tickMin = 0;
      const tickMax = 10000;

      /* 움직이는 거품 그리기 위한 정보 구성 */
      for (let i = 0; i < Math.floor(sizeBase * 0.02); i++) {
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

      /* 움직이는 거품 그리기 */
      for (let i = 0; i < floatingBubbles.length; i++) {
        const floatingBubble = floatingBubbles[i];

        /* 거품 그리기 */
        contextFloating.beginPath();
        contextFloating.arc(floatingBubble.x, floatingBubble.y, floatingBubble.radius, 0, 2 * Math.PI);
        contextFloating.closePath();
        contextFloating.fillStyle = hsla(0, 0, 100, 0.2 + Math.cos(floatingBubble.tick * 0.02) * 0.05);
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
    constructFloatingBubbles();
    drawFloatingBubbles();

    window.addEventListener('resize', () => {
      initCanvas();
      constructFloatingBubbles();
    });
  }, []);

  return (
    <>
      <div className="container">
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
        #canvas-floating {
          background: rgba(111, 220, 217, 0.7);
        }
      `}</style>
    </>
  );
}

export default BubbleEffectSimple;
