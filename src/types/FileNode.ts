export default interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}
