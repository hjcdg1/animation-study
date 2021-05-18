import { useRef, useEffect } from 'react';

const HEX_LETTERS = '0123456789abcdef';

function FallingAnimation() {
  /* Ref 선언 및 초기화 */
  const containerRef = useRef<HTMLDivElement>(null);

  function getRandomColor(): string {
    return `#${Array.from(Array(6), () => HEX_LETTERS[Math.floor(Math.random() * 16)]).join('')}`;
  }

  function handleAnimationEnd(this: HTMLElement) {
    this.remove();
  }

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    const containerWidth = container.offsetWidth;
    const firstPaper = container.children[0] as HTMLElement;

    firstPaper.style.left = `${50 + Math.floor(Math.random() * (containerWidth - 100))}px`;
    firstPaper.style.backgroundColor = getRandomColor();
    firstPaper.addEventListener('animationend', handleAnimationEnd);

    setInterval(() => {
      const paper = container.children[0].cloneNode() as HTMLElement;

      paper.style.left = `${50 + Math.floor(Math.random() * (containerWidth - 100))}px`;
      paper.style.backgroundColor = getRandomColor();
      paper.addEventListener('animationend', handleAnimationEnd);

      container.append(paper);
    }, 50);
  }, []);

  return (
    <>
      <div className="container" ref={containerRef}>
        <div className="paper"></div>
      </div>
      <style jsx>{`
        @keyframes falling {
          from {
            top: 0;
            transform: translateX(0) rotate3d(2, 1, 1, 0);
            -webkit-transform: translateX(0) rotate3d(2, 1, 1, 0);
            opacity: 1;
          }
          25% {
            top: 25%;
            transform: translateX(40px) rotate3d(2, 1, 1, 360deg);
            -webkit-transform: translateX(40px) rotate3d(2, 1, 1, 360deg);
          }
          50% {
            top: 50%;
            transform: translateX(0) rotate3d(2, 1, 1, 720deg);
            -webkit-transform: translateX(0) rotate3d(2, 1, 1, 720deg);
          }
          75% {
            top: 75%;
            transform: translateX(-40px) rotate3d(2, 1, 1, 1080deg);
            -webkit-transform: translateX(-40px) rotate3d(2, 1, 1, 1080deg);
          }
          to {
            top: 100%;
            transform: translateX(0) rotate3d(2, 1, 1, 1440deg);
            -webkit-transform: translateX(0) rotate3d(2, 1, 1, 1440deg);
            opacity: 0;
          }
        }
        .container {
          position: relative;
          width: 100%;
          max-width: 50rem;
          height: calc(100vh - 4rem);
          padding: 2rem 1rem 0;
          margin: 2rem auto;
          background: linear-gradient(to bottom, #ecc6c6, #b8eef9);
          background: -webkit-gradient(linear, left top, left bottom, from(#ecc6c6), to(#b8eef9));
          background: -o-linear-gradient(top, #ecc6c6, #b8eef9);
        }
        .paper {
          position: absolute;
          top: 0;
          width: 10px;
          height: 20px;
          animation-name: falling;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: both;
        }
      `}</style>
    </>
  );
}

export default FallingAnimation;
