import { useTheme } from "@/context/ThemeProvider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ToggleThemeButton = () => {
  const { setTheme, theme } = useTheme();
  if (theme == "dark") {
    return (
      <button
        onClick={() => {
          setTheme("light");
        }}
      >
        <SunIcon width={20} height={20} />
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        setTheme("dark");
      }}
    >
      <MoonIcon width={20} height={20} />
    </button>
  );
};

export default ToggleThemeButton;
