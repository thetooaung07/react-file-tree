/// this is the explorer version of react-file-tree
"use client";
import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TreeNodeType, TreeView } from "./TreeView";
import { convertListFileToObjectParentTree } from "./utils";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

export const AppV3 = () => {
  const [selected, select] = useState<string | null>(null);
  const [explorerData, setExplorerData] = useState<TreeNodeType[]>([]);

  const pickFolder = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files).map((file) => ({
        name: file.name,
        webkitRelativePath: file.webkitRelativePath,
      }));

      setExplorerData(convertListFileToObjectParentTree(fileList));
    }
  };

  return (
    <div className="m-4 ">
      <h2 className="text-center">V3</h2>

      <div className="mb-8">
        <input
          type="file"
          onChange={pickFolder}
          webkitdirectory=""
          directory=""
          mozdirectory=""
          multiple
        />
      </div>

      {explorerData?.length > 0 && (
        <h1 className="">
          {explorerData[0].name} ({explorerData[0].dir})
        </h1>
      )}

      {explorerData?.length > 0 && explorerData[0].children !== undefined && (
        <TreeView.Root
          className="w-[50vw] h-[40vh] border-[1.5px] border-slate-200 my-4"
          value={selected}
          onChange={select}
        >
          {explorerData[0].children?.map((node) => (
            <TreeView.Node node={node} key={node.id} />
          ))}
        </TreeView.Root>
      )}
    </div>
  );
};
