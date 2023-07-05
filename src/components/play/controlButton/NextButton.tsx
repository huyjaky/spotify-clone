interface NextButtonProps {
  handleSkipSong: (skipTo: 'previouse' | 'next') => Promise<void>
}

const NextButton = ({handleSkipSong}: NextButtonProps) => {
  return (
    <div onClick={event => handleSkipSong("next")} className="w-fit h-full flex items-center hover:scale-[1.25] hover:transition-transform
      hover:duration-300
      ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-white"
      >
        <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
      </svg>
    </div>
  );
};

export default NextButton;