import { useEffect } from 'react';

function BubbleEffectTest() {
  useEffect(() => {
    const c = document.getElementById('c') as HTMLCanvasElement;
    const context = c.getContext('2d') as CanvasRenderingContext2D;

    function hsla(h: number, s: number, l: number, a: number): string {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    function drawCanvas() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;

      context.clearRect(0, 0, c.width, c.height);
      context.globalCompositeOperation = 'lighter';

      context.shadowColor = hsla(83.89924831688373, 32.97048202599757, 40.70346903267691, 0.45048079246490645);
      context.shadowBlur = 26.902288409015206;
      context.beginPath();
      context.arc(1173.9343837333647, 257.72501343471447, 23.49130901861002, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      context.shadowColor = hsla(115.48399629869456, 24.7014640752544, 21.58883545988398, 0.75395653578385333);
      context.shadowBlur = 45.700345296928624;
      context.beginPath();
      context.arc(945.2122978885006, 406.4920602650181, 79.25037001932012, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    }

    /* Initialization */
    drawCanvas();
    window.addEventListener('resize', drawCanvas);
  }, []);

  return (
    <>
      <div className="container">
        <canvas id="c"></canvas>
      </div>
      <style jsx>{`
        canvas {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        #c {
          background: #000;
        }
      `}</style>
    </>
  );
}

export default BubbleEffectTest;
