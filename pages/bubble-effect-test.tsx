import { useEffect } from 'react';

function BubbleEffectTest() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    let canvasWidth: number;
    let canvasHeight: number;
    let sizeBase: number;

    function rand(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }

    function hsla(h: number, s: number, l: number, a: number): string {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    function initCanvas() {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      sizeBase = canvasWidth + canvasHeight;

      /* 캔버스 지우기 */
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      /* 채우기 색과 그림자 색이 섞이도록 함 */
      context.globalCompositeOperation = 'lighter';
    }

    function drawCanvas() {
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
      for (let i = 0; i < Math.floor(sizeBase * 0.1); i++) {
        const hue = rand(hueMin, hueMax);
        const saturation = rand(saturationMin, saturationMax);
        const lightness = rand(lightnessMin, lightnessMax);
        const alpha = rand(alphaMin, alphaMax);
        const blur = rand(blurMin, blurMax);
        const x = rand(xMin, xMax);
        const y = rand(yMin, yMax);
        const radius = rand(radiusMin, radiusMax);

        context.shadowColor = hsla(hue, saturation, lightness, alpha);
        context.shadowBlur = blur;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
      }
    }

    initCanvas();
    drawCanvas();
    window.addEventListener('resize', () => { initCanvas(); drawCanvas(); });
  }, []);

  return (
    <>
      <div className="container">
        <canvas id="canvas"></canvas>
      </div>
      <style jsx>{`
        #canvas {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: #000;
        }
      `}</style>
    </>
  );
}

export default BubbleEffectTest;
