import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from 'react'

interface TypographyProps {
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  }
  updateTheme: (section: string, key: string, value: string | number) => void
}

export function Typography({ typography, updateTheme }: TypographyProps) {
  const [localTypography, setLocalTypography] = useState(typography)

  useEffect(() => {
    setLocalTypography(typography)
  }, [typography])

  const fontFamilies = ['SF Pro, sans-serif', 'SF Mono, monospace', 'New York, serif']

  const parseFontSize = (size: string) => parseInt(size.replace('px', ''))
  const parseFontWeight = (weight: string) => parseInt(weight)
  const parseLineHeight = (height: string) => parseFloat(height)

  const handleValueChange = (key: string, newValue: string | number) => {
    console.log(key, newValue)
    setLocalTypography(prev => ({ ...prev, [key]: newValue }))
    updateTheme('typography',undefined, key, newValue)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fontFamily">Font Family</Label>
        <Select onValueChange={(value) => handleValueChange('fontFamily', value)} value={localTypography.fontFamily}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={localTypography.fontFamily} />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font}>{font}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="fontSize"
            min={12}
            max={24}
            step={1}
            value={[parseFontSize(localTypography.fontSize)]}
            onValueChange={([value]) => handleValueChange('fontSize', `${value}px`)}
          />
          <span className="w-12 text-right">{localTypography.fontSize}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fontWeight">Font Weight</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="fontWeight"
            min={100}
            max={900}
            step={100}
            value={[parseFontWeight(localTypography.fontWeight)]}
            onValueChange={([value]) => handleValueChange('fontWeight', value.toString())}
          />
          <span className="w-12 text-right">{localTypography.fontWeight}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lineHeight">Line Height</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="lineHeight"
            min={1}
            max={2}
            step={0.1}
            value={[parseLineHeight(localTypography.lineHeight)]}
            onValueChange={([value]) => handleValueChange('lineHeight', value?.toFixed(1))}
          />
          <span className="w-12 text-right">{localTypography.lineHeight}</span>
        </div>
      </div>
    </div>
  )
}

