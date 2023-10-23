interface Props {
  onClick: () => void;
}

export const Backdrop: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="z-20 bg-black opacity-60 w-screen h-screen fixed top-0 left-0"
    />
  );
};
