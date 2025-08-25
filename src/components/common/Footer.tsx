import { theme } from "../../styles/theme";
import { cn } from "../../lib/utils";

const Footer = () => {
  return (
    <footer className="mt-20 pt-8 border-t border-white/10">
      <div className="text-center">
        <p className={cn(theme.typography.bodySmall, "text-gray-500")}>
          © Elisha Theetla, All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
