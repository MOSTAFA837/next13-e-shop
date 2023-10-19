interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4">
      {children}
    </div>
  );
};
