interface Props {
  size: "small" | "medium" | "large";
}

const Logo = ({ size }: Props) => {
  let sizeClass = "";
  if (size === "small") {
    sizeClass = "h-8 w-8";
  } else if (size === "medium") {
    sizeClass = "h-12 w-12";
  }
  return (
    <div
      style={{ borderRadius: "54% 46% 44% 56% / 50% 46% 54% 50%" }}
      className={`bg-[#f72585] ${sizeClass} inline-flex items-center justify-center`}
    >
      <h1 className="block select-none font-semibold text-white">LT</h1>
    </div>
  );
};

export default Logo;
