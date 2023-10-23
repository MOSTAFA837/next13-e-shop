interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export const MenuItem: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition"
    >
      {children}
    </div>
  );
};
