import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface FontSizeProps {
  fontsize: Record<string, number>;
  updateTheme: (key: string, value: number) => void;
}

export function FontSize({ fontsize, updateTheme }: FontSizeProps) {
  const [localFontSize, setLocalFontSize] = useState(fontsize);

  useEffect(() => {
    setLocalFontSize(fontsize);
  }, [fontsize]);

  const handleValueChange = (key: string, newValue: number) => {
    setLocalFontSize((prev) => ({ ...prev, [key]: newValue }));
    updateTheme(key, newValue);
  };

  return (
    <div className="space-y-6">
      {Object.entries(localFontSize).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={key}>{key}</Label>
            <span>{value?.toFixed(0)}px</span>
          </div>
          <Slider
            id={key}
            min={0}
            max={50}
            step={1}
            value={[value]}
            onValueChange={([newValue]) => handleValueChange(key, newValue)}
          />
        </div>
      ))}
    </div>
  );
}
