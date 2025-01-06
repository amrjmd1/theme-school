import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface TypographyProps {
  typography: {
    sans: string;
    heading: string;
    fontSize: string;
    fontWeight_light: string;
    fontWeight_normal: string;
    fontWeight_semibold: string;
    fontWeight_bold: string;
    lineHeight_normal: string;
    lineHeight_relaxed: string;
    lineHeight_tight: string;
  };
  updateTheme: (
    section: string,
    mode: "light" | "dark" | undefined,
    key: string,
    value: number | string
  ) => void;
}

export function Typography({ typography, updateTheme }: TypographyProps) {
  const [localTypography, setLocalTypography] = useState(typography);

  useEffect(() => {
    setLocalTypography(typography);
  }, [typography]);

  const fontFamilies = [
    "SF Pro",
    "SF Mono",
    "New York",
    "Georgia",
    "Palatino",
    "Times New Roman",
    "Arial",
    "Helvetica",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Courier New",
    "Lucida Console",
    "Monaco",
  ];

  const parseFontWeight = (weight: string) => parseInt(weight);
  const parseLineHeight = (height: string) => parseFloat(height);

  const handleValueChange = (key: string, newValue: string | number) => {
    console.log(key, newValue);
    setLocalTypography((prev) => ({ ...prev, [key]: newValue }));
    updateTheme("typography", undefined, key, newValue);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fontFamily">Sans</Label>
        <Select
          onValueChange={(value) => handleValueChange("sans", value)}
          value={localTypography.sans}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={localTypography.sans} />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="fontFamily">Heading</Label>
        <Select
          onValueChange={(value) => handleValueChange("heading", value)}
          value={localTypography.heading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={localTypography.heading} />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <h3 className="text-xl font-bold mb-2">Font Weight</h3>
      <div className="space-y-2">
        <Label htmlFor="fontWeightLight">Light</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="fontWeightLight"
            min={100}
            max={900}
            step={100}
            value={[parseFontWeight(localTypography.fontWeight_light)]}
            onValueChange={([value]) =>
              handleValueChange("fontWeight_light", value.toString())
            }
          />
          <span className="w-12 text-right">
            {localTypography.fontWeight_light}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fontWeightNormal">Normal</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="fontWeightNormal"
            min={100}
            max={900}
            step={100}
            value={[parseFontWeight(localTypography.fontWeight_normal)]}
            onValueChange={([value]) =>
              handleValueChange("fontWeight_normal", value.toString())
            }
          />
          <span className="w-12 text-right">
            {localTypography.fontWeight_normal}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fontWeightSemibold">Semibold</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="fontWeightSemibold"
            min={100}
            max={900}
            step={100}
            value={[parseFontWeight(localTypography.fontWeight_semibold)]}
            onValueChange={([value]) =>
              handleValueChange("fontWeight_semibold", value.toString())
            }
          />
          <span className="w-12 text-right">
            {localTypography.fontWeight_semibold}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fontWeightBold">Bold</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="fontWeightBold"
            min={100}
            max={900}
            step={100}
            value={[parseFontWeight(localTypography.fontWeight_bold)]}
            onValueChange={([value]) =>
              handleValueChange("fontWeight_bold", value.toString())
            }
          />
          <span className="w-12 text-right">
            {localTypography.fontWeight_bold}
          </span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">Line Height</h3>
      <div className="space-y-2">
        <Label htmlFor="lineHeight">normal</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="lineHeight"
            min={1}
            max={2}
            step={0.1}
            value={[parseLineHeight(localTypography.lineHeight_normal)]}
            onValueChange={([value]) =>
              handleValueChange("lineHeight_normal", value?.toFixed(1))
            }
          />
          <span className="w-12 text-right">{localTypography.lineHeight_normal}</span>
        </div>
      </div>

      
      <div className="space-y-2">
        <Label htmlFor="lineHeight">relaxed</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="lineHeight"
            min={1}
            max={2}
            step={0.1}
            value={[parseLineHeight(localTypography.lineHeight_relaxed)]}
            onValueChange={([value]) =>
              handleValueChange("lineHeight_relaxed", value?.toFixed(1))
            }
          />
          <span className="w-12 text-right">{localTypography.lineHeight_relaxed}</span>
        </div>
        <div className="space-y-2">
        <Label htmlFor="lineHeight">tight</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="lineHeight"
            min={1}
            max={2}
            step={0.1}
            value={[parseLineHeight(localTypography.lineHeight_tight)]}
            onValueChange={([value]) =>
              handleValueChange("lineHeight_tight", value?.toFixed(1))
            }
          />
          <span className="w-12 text-right">{localTypography.lineHeight_tight}</span>
        </div>
      </div>
    </div>
    </div>
  );
}
