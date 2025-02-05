import { Button } from "@/components/ui/button";

interface QuickRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const QuickReplies = ({ suggestions, onSelect }: QuickRepliesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="secondary"
          className="rounded-full text-sm"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};