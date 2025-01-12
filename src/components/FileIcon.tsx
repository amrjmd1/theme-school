import Image from "next/image";

interface FileIconProps {
  width?: number;
  height?: number;
  filename: string;
}

const Icons = {
  tsx: "/react.png",
  css: "/css.png",
  ts: "/ts.png",
  md: "/md.png",
} satisfies Record<string, string>;

const FileIcon = ({ width = 18, height = 18, filename }: FileIconProps) => {
  const type = filename.split(".").reverse()[0] as keyof typeof Icons;

  return <Image src={Icons[type]} alt={type} width={width} height={height} />;
};

export default FileIcon;
