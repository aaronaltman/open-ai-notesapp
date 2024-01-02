import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="rounded-full"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    >
      <Sun className="w-[5rem] h-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
      <Moon className="w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100 " />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
