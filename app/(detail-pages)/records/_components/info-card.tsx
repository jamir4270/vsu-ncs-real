type InfoCardProps = {
  title: string;
  description: string;
};

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="flex-1">
      <p>{title}</p>
      <h1>{description}</h1>
    </div>
  );
}
