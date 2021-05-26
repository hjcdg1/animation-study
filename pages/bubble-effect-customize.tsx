import { useRef, useEffect } from 'react';

function BubbleEffectCustomize() {
  /* Ref 선언 및 초기화 */
  const canvasBackgroundRef = useRef<HTMLCanvasElement>(null);
  const canvasFloatingRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasBackground = canvasBackgroundRef.current as HTMLCanvasElement;
    const canvasFloating = canvasFloatingRef.current as HTMLCanvasElement;
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
      canvasWidth = canvasBackground.width = canvasFloating.width = document.body.offsetWidth;
      canvasHeight = canvasBackground.height = canvasFloating.height = document.body.offsetHeight;
      sizeBase = canvasWidth + canvasHeight;
      floatingBubbles = [];
    }

    function drawCanvasBackground() {
      /* 캔버스 지우기 */
      contextBackground.clearRect(0, 0, canvasWidth, canvasHeight);

      /* 채우기 색과 그림자 색이 섞이도록 함 */
      contextBackground.globalCompositeOperation = 'lighter';

      const ratio = canvasWidth / 1500;
      const [p1, p2] = [200 - 50 * ratio, 400 + 50 * ratio];
      const [p3, p4] = [425 + 50 * ratio, 375 + 125 * ratio];

      /* 곡선 그리기 (영역 1 채우기) */
      contextBackground.beginPath();
      contextBackground.moveTo(0, 300);
      contextBackground.bezierCurveTo(1 / 3 * canvasWidth, p1, 2 / 3 * canvasWidth, p2, canvasWidth, 300);
      contextBackground.lineTo(canvasWidth, 0);
      contextBackground.lineTo(0, 0);
      contextBackground.lineTo(0, 300);
      contextBackground.fillStyle = 'rgb(125, 113, 234)';
      contextBackground.fill();

      /* 곡선 그리기 (영역 2 채우기) */
      contextBackground.beginPath();
      contextBackground.moveTo(0, 300);
      contextBackground.bezierCurveTo(1 / 3 * canvasWidth, p1, 2 / 3 * canvasWidth, p2, canvasWidth, 300);
      contextBackground.bezierCurveTo(4 / 5 * canvasWidth, p3, 1 / 2 * canvasWidth, 350, 1 / 2 * canvasWidth, 350);
      contextBackground.bezierCurveTo(3 / 8 * canvasWidth, 308, 1 / 10 * canvasWidth, p4, 0, 300);
      contextBackground.fillStyle = 'rgb(168, 136, 245)';
      contextBackground.fill();

      /* 곡선 그리기 (영역 2 채우기) */
      contextBackground.beginPath();
      contextBackground.moveTo(canvasWidth, 300);
      contextBackground.bezierCurveTo(4 / 5 * canvasWidth, p3, 1 / 2 * canvasWidth, 350, 1 / 2 * canvasWidth, 350);
      contextBackground.bezierCurveTo(3 / 8 * canvasWidth, 308, 1 / 10 * canvasWidth, p4, 0, 300);
      contextBackground.lineTo(0, canvasHeight);
      contextBackground.lineTo(canvasWidth, canvasHeight);
      contextBackground.lineTo(canvasWidth, 300);
      contextBackground.fillStyle = 'rgb(240, 240, 255)';
      contextBackground.fill();
    }

    function constructFloatingBubbles() {
      /* 원 중심 좌표 */
      const xMin = 0;
      const xMax = canvasWidth;
      const yMin = 0;
      const yMax = canvasHeight;

      /* 원 반지름 */
      const radiusMin = 1;
      const radiusMax = sizeBase * 0.015;

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
      for (let i = 0; i < Math.floor(sizeBase * 0.015); i++) {
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

      /* 백그라운드 곡선 그리기 */
      contextFloating.globalCompositeOperation = 'source-over';
      contextFloating.shadowBlur = 0;
      contextFloating.drawImage(canvasBackground, 0, 0);

      /* 움직이는 거품 그리기 준비 */
      contextFloating.globalCompositeOperation = 'lighter';
      contextFloating.shadowColor = '#ffffff';
      contextFloating.shadowBlur = 10;

      /* 움직이는 거품 그리기 */
      for (let i = 0; i < floatingBubbles.length; i++) {
        const floatingBubble = floatingBubbles[i];

        /* 거품 그리기 */
        contextFloating.beginPath();
        contextFloating.arc(floatingBubble.x, floatingBubble.y, floatingBubble.radius, 0, 2 * Math.PI);
        contextFloating.closePath();
        contextFloating.fillStyle = hsla(0, 0, 100, 0.1 + Math.cos(floatingBubble.tick * 0.02) * 0.05);
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
      <div className="container"></div>
      <div className="canvas-container">
        <canvas className="canvas-background" ref={canvasBackgroundRef}></canvas>
        <canvas className="canvas-floating" ref={canvasFloatingRef}></canvas>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          z-index: 1;
          height: 1500px;
        }
        .canvas-background,
        .canvas-floating {
          position: absolute;
          inset: 0;
        }
        .canvas-background {
          opacity: 0;
        }
      `}</style>
    </>
  );
}

export default BubbleEffectCustomize;
