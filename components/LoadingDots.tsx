import { Waveform } from '@uiball/loaders';

const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <span className="shrink-0">
        <Waveform size={45} speed={2} color="#fa9dc0" />
      </span>
      <span className="ml-2 text-zinc-900 dark:text-zinc-100">
      Please wait while we craft your visual masterpiece.
      </span>
    </div>
  );
};

export default LoadingDots;
