interface Props {
  size: "small" | "medium" | "large";
}

const Logo = ({ size }: Props) => {
  return (
    <div
      style={{ borderRadius: "54% 46% 44% 56% / 50% 46% 54% 50%" }}
      className={`bg-[#f72585] ${
        size === "small" ? "h-8 w-8" : ""
      } inline-flex items-center justify-center`}
    >
      <h1 className="font-semibold block text-white select-none">LT</h1>
    </div>
  );
};

export default Logo;
