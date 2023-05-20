import path from "path";
import React, { Dispatch, SetStateAction } from "react";
import { TreeNodeType } from "./TreeView";

export const ServerComponent = ({
  explorerData,
  selected,
}: {
  explorerData: TreeNodeType[];
  selected: string | null;
}) => {
  const getFilePathFromSelectedID = (
    tree: TreeNodeType[],
    selectedId: string
  ): string => {
    for (const node of tree) {
      if (node.id === selectedId) {
        return node.dir;
      }

      if (node.children !== undefined && node.children.length > 0) {
        const foundId = getFilePathFromSelectedID(node.children!, selectedId);
        if (foundId !== "") {
          return foundId;
        }
      }
    }
    return "";
  };

  return (
    <div className="w-full">
      {selected !== null && (
        <embed
          src={
            process.cwd() + getFilePathFromSelectedID(explorerData, selected)
          }
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
};
