import { useRef, useEffect, RefObject } from 'react';

function ScrollAnimation() {
  let entryRefs: RefObject<HTMLDivElement>[][] = Array.from(Array(12), () => Array(4).fill(null));
  for (let i = 0; i < entryRefs.length; i++) {
    for (let j = 0; j < entryRefs[i].length; j++) {
      entryRefs[i][j] = useRef<HTMLDivElement>(null);
    }
  }

  useEffect(() => {
    function handleScroll() {
      let entry;
      let entryPosition;
      for (let i = 0; i < entryRefs.length; i++) {
        for (let j = 0; j < entryRefs[i].length; j++) {
          entry = entryRefs[i][j].current as HTMLDivElement;
          entryPosition = entry.getBoundingClientRect();
          if (entryPosition.bottom >= 0 && entryPosition.top <= window.innerHeight) {
            entry.classList.add('show');
          }
        }
      }
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <div className="container">
      {Array.from(Array(12).keys()).map((_, rowIdx) => {
        return (
          <div key={rowIdx} className="row">
            {Array.from(Array(4).keys()).map((_, columnIdx) => {
              return <div key={columnIdx} ref={entryRefs[rowIdx][columnIdx]} className="entry"></div>;
            })}
          </div>
        );
      })}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 800px;
        }
        .row {
          display: flex;
        }
        .entry {
          flex: 1;
          margin: 0 10px 30px;
          height: 300px;
          background-color: skyblue;
          opacity: 0;
          transform: translateY(15px);
          transition: all 1s;
        }
        .entry.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default ScrollAnimation;
