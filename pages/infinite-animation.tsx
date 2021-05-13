function InfiniteAnimation() {
  return (
    <div>
      <img className="dog" src="/images/dog.png" alt="" />
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .dog {
          width: 12.5rem;
          margin: 3rem;
          animation-name: rotate;
          animation-iteration-count: infinite;
          animation-duration: 5s;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
}

export default InfiniteAnimation;
