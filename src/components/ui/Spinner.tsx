type SpinnerProps = { isMini?: boolean };

export default function Spinner({ isMini = false }: SpinnerProps) {
  return <div className={isMini ? "spinner-mini" : "spinner"}></div>;
}
