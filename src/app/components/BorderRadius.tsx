import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface BorderRadiusProps {
  borderRadius: Record<string, number>;
  updateTheme: (
    section: string,
    mode: "light" | "dark" | undefined,
    key: string,
    value: number
  ) => void;
}

export function BorderRadius({ borderRadius, updateTheme }: BorderRadiusProps) {
  const [localBorderRadius, setLocalBorderRadius] = useState(borderRadius);

  useEffect(() => {
    setLocalBorderRadius(borderRadius);
  }, [borderRadius]);

  const handleValueChange = (key: string, newValue: number) => {
    setLocalBorderRadius((prev) => ({ ...prev, [key]: newValue }));
    updateTheme("borderRadius", undefined, key, newValue);
  };

  return (
    <div className="space-y-6">
      {Object.entries(localBorderRadius).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={key}>{key}</Label>
            <span>{value?.toFixed(2)}rem</span>
          </div>
          <Slider
            id={key}
            min={0}
            max={2}
            step={0.05}
            value={[value]}
            onValueChange={([newValue]) => handleValueChange(key, newValue)}
          />
        </div>
      ))}
    </div>
  );
}
