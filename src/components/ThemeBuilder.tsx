import { useEffect, useState } from "react";
import { FileTree } from "./FileTree";
import { CodePreview } from "./CodePreview";
import Theme from "@/types/Theme";
import { tailwindCode, tailwindFileTree } from "@/data/tailwindCode";
import { reactnativeCode, reactnativeFileTree } from "@/data/reactnative";

interface ThemeBuilderProps {
  theme: Theme;
}

export default function ThemeBuilder({ theme }: ThemeBuilderProps) {
  const [selectedFile, setSelectedFile] = useState("tailwind.config.ts");
  const [selectedFrameWork, setSelectedFrameWork] = useState("tailwindcss");

  const Content = (() => {
    switch (selectedFrameWork) {
      case "tailwindcss":
        return {
          filesContent: tailwindCode(theme),
          filesTree: tailwindFileTree,
        };
      case "reactnative":
        return {
          filesContent: reactnativeCode(theme),
          filesTree: reactnativeFileTree,
        };

      default:
        return {
          filesContent: tailwindCode(theme),
          filesTree: tailwindFileTree,
        };
    }
  })();
  // tailwindCode(theme);

  useEffect(() => {
    if (selectedFrameWork === "tailwindcss") {
      setSelectedFile("tailwind.config.ts");
    } else if (selectedFrameWork === "reactnative") {
      setSelectedFile("ThemeContext.tsx");
    }
  }, [selectedFrameWork]);

  return (
    <div className="flex bg-[#1e272e]">
      <aside className="w-1/5 p-4 border-r border-gray-900">
        <div>
          <FileTree files={Content?.filesTree || []} onSelect={setSelectedFile} />
        </div>
      </aside>
      <div className="w-4/5 p-0 m-0 h-[calc(100vh-12rem)]">
        <CodePreview
          fileName={selectedFile}
          code={Content?.filesContent[selectedFile]}
          activeFrameWork={selectedFrameWork}
          onChangeFrameWork={setSelectedFrameWork}
        />
      </div>
    </div>
  );
}
