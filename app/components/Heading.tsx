interface Props {
  title: string;
  center?: boolean;
}

export const Heading: React.FC<Props> = ({ title, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="font-bold text-2xl">{title}</h2>
    </div>
  );
};
