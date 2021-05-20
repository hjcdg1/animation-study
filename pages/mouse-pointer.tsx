import { useRef, useEffect } from 'react';

function MousePointer() {
  /* Ref 선언 및 초기화 */
  const pigRef = useRef<HTMLDivElement>(null);
  const rabbitRef = useRef<HTMLDivElement>(null);
  const horseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      const pig = pigRef.current as HTMLDivElement;
      const rabbit = rabbitRef.current as HTMLDivElement;
      const horse = horseRef.current as HTMLDivElement;

      pig.style.left = `${e.pageX - 10}px`;
      pig.style.top = `${e.pageY - 10}px`;
      rabbit.style.left = `${e.pageX - 25}px`;
      rabbit.style.top = `${e.pageY + 5}px`;
      horse.style.left = `${e.pageX - 40}px`;
      horse.style.top = `${e.pageY + 20}px`;
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="pig" ref={pigRef}>
          <img src="/images/pig.png" alt="" />
        </div>
        <div className="rabbit" ref={rabbitRef}>
          <img src="/images/rabbit.png" alt="" />
        </div>
        <div className="horse" ref={horseRef}>
          <img src="/images/horse.png" alt="" />
        </div>
      </div>
      <style jsx>{`
        html {
          cursor: none;
        }
        .pig,
        .rabbit,
        .horse {
          position: fixed;
        }
        .pig {
          width: 20px;
          transition: all 0.1s ease-out;
          -webkit-transition: all 0.1s ease-out;
          -o-transition: all 0.1s ease-out;
        }
        .rabbit {
          width: 16px;
          transition: all 0.2s ease-out;
          -webkit-transition: all 0.2s ease-out;
          -o-transition: all 0.2s ease-out;
        }
        .horse {
          width: 12px;
          transition: all 0.3s ease-out;
          -webkit-transition: all 0.3s ease-out;
          -o-transition: all 0.3s ease-out;
        }
        .pig > img,
        .rabbit > img,
        .horse > img {
          display: block;
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default MousePointer;
