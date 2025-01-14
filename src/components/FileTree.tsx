import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import FileIcon from "./FileIcon";
import FileNode from "@/types/FileNode";

interface FileTreeProps {
  files: FileNode[];
  onSelect: (fileName: string) => void;
}

export function FileTree({ files, onSelect }: FileTreeProps) {
  const [openFolders, setOpenFolders] = useState<string[]>([
    "tailwind_app",
    "src",
    "components",
    "context",
    "styles",
    "app",
    "reactnative_app"
  ]);

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((name) => name !== folderName)
        : [...prev, folderName]
    );
  };

  const renderTree = (nodes: FileNode[]) => {
    return nodes.map((node) => {
      if (node.type === "folder") {
        const isOpen = openFolders.includes(node.name);
        return (
          <div key={node.name} className="mb-2 ">
            <div
              className="flex items-center cursor-pointer text-gray-400 hover:text-gray-50"
              onClick={() => toggleFolder(node.name)}
            >
              {isOpen ? (
                <ChevronDown size={16} color="gray" />
              ) : (
                <ChevronRight size={16} color="gray" />
              )}
              <span className="ml-2">{node.name}</span>
            </div>
            {isOpen && (
              <div className="pl-4">{renderTree(node.children || [])}</div>
            )}
          </div>
        );
      }
      return (
        <div
          key={node.name}
          className="flex items-center cursor-pointer text-sm text-gray-400 hover:text-gray-50"
          onClick={() => onSelect(node.name)}
        >
          <FileIcon filename={node.name} width={14} height={14} />
          <span className="ml-2">{node.name}</span>
        </div>
      );
    });
  };

  return <div className="space-y-2">{renderTree(files)}</div>;
}
