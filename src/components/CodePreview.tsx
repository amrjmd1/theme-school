import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown, Copy } from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import FileIcon from "./FileIcon";

interface CodePreviewProps {
  code: string;
  fileName: string;
}

const frameworks = [
  {
    value: "tailwindcss",
    label: "Tailwind CSS",
    disabled: false,
  },
  {
    value: "shadcn",
    label: "Shadcn/ui",
    disabled: true,
  },
  {
    value: "nextui",
    label: "Next UI",
    disabled: true,
  },
];

export function CodePreview({ code, fileName }: CodePreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("tailwindcss");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-row justify-between px-4 pt-1">
        <div className="flex items-center bg-[#272822] px-2 py-0.5 rounded-t gap-4">
          <FileIcon filename={fileName} />
          <p className="text-gray-100">{fileName}</p>
        </div>

        <div className="flex flex-row gap-10">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between text-gray-300"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select framework..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        disabled={framework.disabled}
                      >
                        {framework.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                {copySuccess ? (
                  <Check size={20} strokeWidth={1.75} color="white" />
                ) : (
                  <Copy
                    size={20}
                    strokeWidth={1.75}
                    className="hover:text-white text-gray-400"
                    onClick={handleCopy}
                  />
                )}
              </TooltipTrigger>

              <TooltipContent side="left">
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)] bg-[#272822]">
        <SyntaxHighlighter
          language="tsx"
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: 0,
            paddingBottom: 50,
            background: "transparent",
            fontSize: "0.875rem",
          }}
          wrapLines
          showLineNumbers
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: [0].includes(lineNumber)
                ? "rgba(255,255,255,0.1)"
                : "transparent",
              display: "block",
              width: "100%",
              whiteSpace: "pre-wrap",
            },
          })}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </ScrollArea>
    </div>
  );
}
