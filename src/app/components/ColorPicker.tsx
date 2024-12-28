import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ColorPickerProps {
  colors: {
    light: Record<string, string>
    dark: Record<string, string>
  }
  updateTheme: (section: string, mode: 'light' | 'dark', key: string, value: string) => void
}

export function ColorPicker({ colors, updateTheme }: ColorPickerProps) {
  return (
    <Tabs defaultValue="light">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="light">Light Mode</TabsTrigger>
        <TabsTrigger value="dark">Dark Mode</TabsTrigger>
      </TabsList>
      <TabsContent value="light" className="mt-4">
        <ColorSet colors={colors.light} updateTheme={(key, value) => updateTheme('colors', 'light', key, value)} />
      </TabsContent>
      <TabsContent value="dark" className="mt-4">
        <ColorSet colors={colors.dark} updateTheme={(key, value) => updateTheme('colors', 'dark', key, value)} />
      </TabsContent>
    </Tabs>
  )
}

interface ColorSetProps {
  colors: Record<string, string>
  updateTheme: (key: string, value: string) => void
}

function ColorSet({ colors, updateTheme }: ColorSetProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="flex flex-col space-y-2">
          <Label htmlFor={key}>{key}</Label>
          <div className="flex space-x-2">
            <Input
              id={key}
              type="color"
              value={value}
              onChange={(e) => updateTheme(key, e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={value}
              onChange={(e) => updateTheme(key, e.target.value)}
              className="flex-grow"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

