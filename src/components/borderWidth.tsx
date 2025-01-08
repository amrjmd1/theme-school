import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface borderWidthProps {
  borderWidth: Record<string, number>;
  updateTheme: (
    section: string,
    mode: "light" | "dark" | undefined,
    key: string,
    value: number
  ) => void;
}

export function BorderWidth({ borderWidth, updateTheme }: borderWidthProps) {
  const [localborderWidth, setLocalborderWidth] = useState(borderWidth);

  useEffect(() => {
    setLocalborderWidth(borderWidth);
  }, [borderWidth]);

  const handleValueChange = (key: string, newValue: number) => {
    setLocalborderWidth((prev) => ({ ...prev, [key]: newValue }));
    updateTheme("borderWidth", undefined, key, newValue);
  };

  return (
    <div className="space-y-6">
      {Object.entries(localborderWidth).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={key}>{key}</Label>
            <span>{value?.toFixed(1)}px</span>
          </div>
          <Slider
            id={key}
            min={0}
            max={10}
            step={0.1}
            value={[value]}
            onValueChange={([newValue]) => handleValueChange(key, newValue)}
          />
        </div>
      ))}
    </div>
  );
}
