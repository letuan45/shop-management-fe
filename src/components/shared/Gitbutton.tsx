import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Gitbutton = () => {
  return (
    <Link to="/" className="flex items-center gap-1">
      <GitHubLogoIcon width={20} height={20} />
      <span className="text-sm font-light">Github</span>
    </Link>
  );
};

export default Gitbutton;
