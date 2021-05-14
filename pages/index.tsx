import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <div>
      <Head>
        <title>Vanilla JS 애니메이션 공부 노트</title>
        <meta name="description" content="Vanilla JS로 각종 애니메이션 효과를 구현해본 간단한 웹사이트입니다." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap" />
      </Head>
      <main className="background">
        <h1 className="main-header">
          Vanilla JS<br />
          애니메이션<br />
          공부 노트
        </h1>
        <div className="link-entry-container">
          <div className="link-entry-wrapper">
            <Link href="/scroll-fade-in">
              <a className="link-entry">
                스크롤 페이드 인<br />
                <span className="gray">Scroll Fade In</span>
              </a>
            </Link>
          </div>
          <div className="link-entry-wrapper">
            <Link href="/infinite-animation">
              <a className="link-entry">
                무한 애니메이션<br />
                <span className="gray">Infinite Animation</span>
              </a>
            </Link>
          </div>
          <div className="link-entry-wrapper">
            <Link href="/infinite-carousel">
              <a className="link-entry">
                무한 캐러셀<br />
                <span className="gray">Infinite Carousel</span>
              </a>
            </Link>
          </div>
          <div className="link-entry-wrapper">
            <Link href="/what-will-be-here">
              <a className="link-entry">
                여기엔 무엇을 넣을까<br />
                <span className="gray">What will be here</span>
              </a>
            </Link>
          </div>
          <div className="link-entry-wrapper">
            <Link href="/what-will-be-here">
              <a className="link-entry">
                여기엔 무엇을 넣을까<br />
                <span className="gray">What will be here</span>
              </a>
            </Link>
          </div>
          <div className="link-entry-wrapper">
            <Link href="/what-will-be-here">
              <a className="link-entry">
                여기엔 무엇을 넣을까<br />
                <span className="gray">What will be here</span>
              </a>
            </Link>
          </div>
        </div>
      </main>
      <style jsx>{`
        .background {
          position: relative;
          height: 100vh;
          min-height: 50rem;
          background: url('/images/background.jpg') center no-repeat;
          background-size: cover;
        }
        .main-header {
          position: absolute;
          top: 25%;
          left: 17%;
          transform: translate(-50%, -50%);
          margin: 0;
          font-family: 'Nanum Pen Script', cursive;
          font-size: 5rem;
          color: #ffffff;
          text-shadow: -2px 2px 4px #444444;
          text-align: center;
          line-height: 1;
        }
        .link-entry-container {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 33%;
        }
        .link-entry-wrapper {
          width: calc(50% - 1rem);
          max-width: 17.5rem;
          margin: 0.5rem;
        }
        .link-entry {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background-color: #ffffff;
          font-family: 'Nanum Pen Script', cursive;
          font-size: 1.5rem;
          font-weight: bold;
          color: #444444;
          text-align: center;
        }
        .link-entry > .gray {
          font-weight: normal;
          color: #888888;
        }
        @media screen and (max-width: 1199px) {
          .main-header {
            top: 15%;
            left: 50%;
            width: 95%;
            font-size: 4rem;
          }
          .link-entry-container {
            top: 45%;
            width: 95%;
            max-width: 30rem;
          }
          .link-entry-wrapper {
            max-width: 13rem;
          }
          .link-entry {
            font-size: 1.4rem;
          }
        }
        @media screen and (max-width: 543px) {
          .main-header {
            font-size: 3.5rem;
          }
          .link-entry {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
