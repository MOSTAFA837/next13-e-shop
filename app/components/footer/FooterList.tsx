interface Props {
  children: React.ReactNode;
}

export const FooterList: React.FC<Props> = ({ children }) => {
  return (
    <footer className=" w-full md:w-1/2 lg:w-1/4 mb-6 flex flex-col gap-2">
      {children}
    </footer>
  );
};
