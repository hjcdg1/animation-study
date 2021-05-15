import { useRef, useEffect, RefObject } from 'react';

const ROWS = 12;
const COLUMNS = 4;

function ScrollAnimation() {
  /* Ref 선언 및 초기화 */
  const entryRefs: RefObject<HTMLDivElement>[][] = Array.from(Array(ROWS), () => Array(COLUMNS).fill(null));
  for (let i = 0; i < entryRefs.length; i++) {
    for (let j = 0; j < entryRefs[i].length; j++) {
      entryRefs[i][j] = useRef<HTMLDivElement>(null);
    }
  }

  function handleScroll() {
    let entry;
    let entryPosition;

    for (let i = 0; i < entryRefs.length; i++) {
      for (let j = 0; j < entryRefs[i].length; j++) {
        entry = entryRefs[i][j].current;
        if (entry) {
          entryPosition = entry.getBoundingClientRect();
          if (entryPosition.bottom >= 0 && entryPosition.top <= window.innerHeight) {
            entry.classList.add('show');
          }
        }
      }
    }
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="container">
        {Array.from(Array(ROWS)).map((_, rowIdx) => {
          return (
            <div className="row" key={rowIdx}>
              {Array.from(Array(COLUMNS)).map((_, columnIdx) => (
                <div className="entry" key={columnIdx} ref={entryRefs[rowIdx][columnIdx]}></div>
              ))}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          display: -webkit-box;
          display: -ms-flexbox;
          flex-direction: column;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          width: 100%;
          max-width: 50rem;
          padding: 0 1rem;
          margin: 2rem auto;
        }
        .row {
          display: flex;
          display: -webkit-box;
          display: -ms-flexbox;
          justify-content: space-between;
          webkit-box-pack: justify;
          -ms-flex-pack: justify;
          margin-bottom: 2rem;
        }
        .row:last-child {
          margin-bottom: 0;
        }
        .entry {
          transform: translateY(1rem);
          -webkit-transform: translateY(1rem);
          -ms-transform: translateY(1rem);
          width: 23%;
          height: 15rem;
          background-color: #87ceeb;
          opacity: 0;
          transition: all 1s;
          -webkit-transition: all 1s;
          -o-transition: all 1s;
        }
        .entry.show {
          transform: translateY(0);
          -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </>
  );
}

export default ScrollAnimation;
