import { ThreeDots } from "react-loader-spinner";

type LoadingProps = {
  width?: string;
  height?: string;
  color?: string;
};

export default function Loading({
  width = "75",
  height = "40",
  color = "#4a6dff",
}: LoadingProps) {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius="9"
      color={color}
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={false}
    />
  );
}
