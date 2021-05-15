function InfiniteAnimation() {
  return (
    <>
      <div className="container">
        <img className="dog" src="/images/dog.png" alt="" />
      </div>
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0);
            -webkit-transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
          }
        }
        @-webkit-keyframes rotate {
          from {
            transform: rotate(0);
            -webkit-transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
          }
        }
        .dog {
          width: 10rem;
          margin: 2rem;
          animation-name: rotate;
          animation-iteration-count: infinite;
          animation-duration: 5s;
          animation-timing-function: linear;
        }
      `}</style>
    </>
  );
}

export default InfiniteAnimation;
