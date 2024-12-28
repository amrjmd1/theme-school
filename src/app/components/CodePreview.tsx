// import Prism from "prismjs";
// import "prismjs/themes/prism-okaidia.css"; // Code editor theme.
// import "prismjs/components/prism-typescript";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Copy } from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";

interface CodePreviewProps {
  code: string;
  fileName: string;
}

export function CodePreview({ code, fileName }: CodePreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);

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
        <p className="bg-[#272822] text-gray-100 px-2 py-0.5 min-w-28 rounded-t">
          {fileName}
        </p>
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
          wrapLines={true}
          showLineNumbers={true}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: [0].includes(lineNumber)
                ? "rgba(255,255,255,0.1)"
                : "transparent",
              display: "block",
              width: "100%",
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
