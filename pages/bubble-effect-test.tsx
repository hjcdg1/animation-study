import { useEffect } from 'react';

function BubbleEffectTest() {
  useEffect(() => {
    const c1 = document.getElementById('c1') as HTMLCanvasElement;
    const c2 = document.getElementById('c2') as HTMLCanvasElement;
    const context1 = c1.getContext('2d') as CanvasRenderingContext2D;
    const context2 = c2.getContext('2d') as CanvasRenderingContext2D;

    let canvasWidth = c1.width = c2.width = window.innerWidth;
    let canvasHeight = c1.height = c2.height = window.innerHeight;

    function hsla(h: number, s: number, l: number, a: number): string {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    function drawCanvas() {
      context1.clearRect(0, 0, c1.width, c1.height);
      context1.globalCompositeOperation = 'lighter';

      context1.shadowColor = hsla(83.89924831688373, 32.97048202599757, 40.70346903267691, 0.45048079246490645);
      context1.shadowBlur = 26.902288409015206;
      context1.beginPath();
      context1.arc(1173.9343837333647, 257.72501343471447, 23.49130901861002, 0, 2 * Math.PI);
      context1.closePath();
      context1.fill();

      context1.shadowColor = hsla(115.48399629869456, 24.7014640752544, 21.58883545988398, 0.75395653578385333);
      context1.shadowBlur = 45.700345296928624;
      context1.beginPath();
      context1.arc(945.2122978885006, 406.4920602650181, 79.25037001932012, 0, 2 * Math.PI);
      context1.closePath();
      context1.fill();
    }

    function initCanvas() {
      canvasWidth = c1.width = c2.width = window.innerWidth;
      canvasHeight = c1.height = c2.height = window.innerHeight;

      drawCanvas();
    }

    /* Initialization */
    initCanvas();
    context2.clearRect(0, 0, c1.width, c1.height);
    context2.globalCompositeOperation = 'source-over';
    context2.shadowBlur = 0;
    context2.drawImage(c1, 0, 0);
    context2.globalCompositeOperation = 'lighter';
    context2.shadowBlur = 15;
    context2.shadowColor = '#fff';
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

export default BubbleEffectTest;
