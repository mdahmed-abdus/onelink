function BlurredBgCenteredItems({ items }) {
  return (
    <div className="z-10 py-6 w-screen h-screen absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex flex-col items-center justify-center rounded-lg backdrop-blur-xl bg-primary bg-opacity-20">
      {items}
    </div>
  );
}

export default BlurredBgCenteredItems;
