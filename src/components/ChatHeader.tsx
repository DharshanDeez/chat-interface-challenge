import { Settings, Sun, Moon, Globe, Mic, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const ChatHeader = () => {
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = () => {
    console.log("Open language selection modal");
  };

  const handleSpeechSettings = () => {
    console.log("Open speech recognition settings");
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <div className="text-left">
          <h1 className="font-semibold">AI Chat Assistant</h1>
          <p className="text-sm text-muted-foreground">
            Speech recognition enabled
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4 mr-2" />
            ) : (
              <Moon className="h-4 w-4 mr-2" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLanguageChange}>
            <Globe className="h-4 w-4 mr-2" />
            Language Selection
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSpeechSettings}>
            <Mic className="h-4 w-4 mr-2" />
            Speech Recognition Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
