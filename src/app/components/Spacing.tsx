import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from 'react'

interface SpacingProps {
  spacing: Record<string, number>
  updateTheme: (section: string, key: string, value: number) => void
}

export function Spacing({ spacing, updateTheme }: SpacingProps) {
  const [localSpacing, setLocalSpacing] = useState(spacing)

  useEffect(() => {
    setLocalSpacing(spacing)
  }, [spacing])

  const handleValueChange = (key: string, newValue: number) => {
    setLocalSpacing(prev => ({ ...prev, [key]: newValue }))
    updateTheme('spacing',undefined, key, newValue)
  }

  return (
    <div className="space-y-6">
      {Object.entries(localSpacing).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={key}>{key}</Label>
            <span>{value?.toFixed(2)}rem</span>
          </div>
          <Slider
            id={key}
            min={0}
            max={3}
            step={0.1}
            value={[value]}
            onValueChange={([newValue]) => handleValueChange(key, newValue)}
          />
        </div>
      ))}
    </div>
  )
}

