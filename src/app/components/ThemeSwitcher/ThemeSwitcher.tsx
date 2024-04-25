import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import "@/app/components/ThemeSwitcher/ThemeSwitcher.css";

interface ThemeSwitcherProps {
  resolvedTheme: string;
  handleThemeChange: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  resolvedTheme,
  handleThemeChange,
}) => {
  return (
    <div className="self-end m-4 p-2 flex items-center">
      <MdOutlineLightMode key="light" />
      <label className="switch">
        <input
          type="checkbox"
          checked={resolvedTheme === "dark"}
          onChange={handleThemeChange}
        />
        <span className="slider round"></span>
      </label>
      <MdOutlineDarkMode key="dark" />
    </div>
  );
};

export default ThemeSwitcher;
