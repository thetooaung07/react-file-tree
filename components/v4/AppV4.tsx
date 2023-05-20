"use client";
/// this is the explorer version of react-file-tree

import fs from "fs";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import Dropzone, { useDropzone } from "react-dropzone";

import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { ServerComponent } from "./ServerComponent";
import { TreeNodeType, TreeView } from "./TreeView";
import {
  TreeViewActionTypes,
  TreeViewContext,
  treeViewReducer,
} from "./context";
import { convertListFileToObjectParentTree } from "./utils";
import UploadIcon from "/public/upload.svg";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

export const AppV4 = () => {
  const [selected, select] = useState<string | null>(null);
  const [explorerData, setExplorerData] = useState<TreeNodeType[]>([]);
  const [open, dispatch] = useReducer(
    treeViewReducer,
    new Map<string, boolean>()
  );
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
    <TreeViewContext.Provider
      value={{
        open,
        dispatch,
        selectedId: selected,
        selectId: select,
      }}
    >
      <div className="container flex flex-col lg:flex-row justify-center items-center">
        <FileExplorer
          explorerData={explorerData}
          setExplorerData={setExplorerData}
        ></FileExplorer>

        {/* <ServerComponent
          selected={selected}
          explorerData={explorerData}
        ></ServerComponent> */}

        {/* <div className="w-full">
          {selected !== null && (
            <embed
              src={"/" + getFilePathFromSelectedID(explorerData, selected)}
              width="100%"
              height="500px"
            />
          )}
        </div> */}
      </div>
    </TreeViewContext.Provider>
  );
};

export const FileExplorer = ({
  explorerData,
  setExplorerData,
}: {
  explorerData: TreeNodeType[];
  setExplorerData: Dispatch<SetStateAction<TreeNodeType[]>>;
}) => {
  const [nodeWithChildren, setNodeWithChildren] = useState<string[]>([]);
  const { dispatch } = useContext(TreeViewContext);

  const pickFolder = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileList = Array.from(files).map((file) => ({
        name: file.name,
        webkitRelativePath: file.webkitRelativePath,
      }));
      const { tree, nodeIdsWithChildren } =
        convertListFileToObjectParentTree(fileList);
      setExplorerData(tree);
      setNodeWithChildren(nodeIdsWithChildren);
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-center">V3</h2>
      <h2 className="text-center mb-4">
        You can now imports folders from local and test dynamic data
      </h2>
      {explorerData.length === 0 && (
        <MyDropzone
          setExplorerData={setExplorerData}
          pickFolder={pickFolder}
          setNodeWithChildren={setNodeWithChildren}
        ></MyDropzone>
      )}
      {explorerData?.length > 0 && (
        <div className="flex justify-between">
          <h1 className="font-bold">{explorerData[0].name} </h1>
          <div className="flex gap-2">
            <button
              className="border p-2 w-8 h-8 bg-white z-20 text-center flex items-center justify-center"
              onClick={() => {
                dispatch({
                  type: TreeViewActionTypes.OPEN_ALL,
                  ids: nodeWithChildren,
                });
              }}
            >
              +
            </button>
            <button
              className="border p-2 w-8 h-8 bg-white z-20 text-center flex items-center justify-center"
              onClick={() => {
                dispatch({
                  type: TreeViewActionTypes.CLOSE_All,
                });
              }}
            >
              x
            </button>
          </div>
        </div>
      )}

      {explorerData?.length > 0 && explorerData[0].children !== undefined && (
        <TreeView.Root className="w-[40vw] h-[40vh] border-[1.5px] border-slate-200 mb-4 mt-1">
          {explorerData[0].children?.map((node) => (
            <TreeView.Node node={node} key={node.id} />
          ))}
        </TreeView.Root>
      )}
    </div>
  );
};

interface FileWithPath extends File {
  path?: string;
}

const MyDropzone = ({
  pickFolder,
  setExplorerData,
  setNodeWithChildren,
}: {
  pickFolder: (e: ChangeEvent<HTMLInputElement>) => void;
  setExplorerData: Dispatch<SetStateAction<TreeNodeType[]>>;
  setNodeWithChildren: Dispatch<SetStateAction<string[]>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles) {
        const fileList = Array.from(acceptedFiles).map((file) => ({
          name: file.name,
          webkitRelativePath: file.path!.substring(1) ?? "",
        }));

        const { tree, nodeIdsWithChildren } =
          convertListFileToObjectParentTree(fileList);

        setExplorerData(tree);
        setNodeWithChildren(nodeIdsWithChildren);
      }
    },
    [setExplorerData, setNodeWithChildren]
  );

  const onButtonClick = (e: any) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      pickFolder(e);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      onClick={onButtonClick}
      className={`dropzone ${
        isDragActive ? "active" : ""
      } my-8 border-dashed border-2 border-slate-400 h-full flex justify-center items-center bg-slate-50 cursor-pointer p-6 text-center`}
    >
      <p className="opacity-20 text-2xl flex flex-col items-center">
        <Image
          src={UploadIcon}
          alt=""
          width={56}
          height={56}
          className="mb-2"
        />
        Upload Files
      </p>
      <input
        {...getInputProps()}
        type="file"
        webkitdirectory=""
        directory=""
        mozdirectory=""
        multiple
        ref={fileInputRef}
        style={{
          display: "none",
        }}
        onChange={(e) => {
          onButtonClick(e);
        }}
      ></input>
    </div>
  );
};

export default MyDropzone;
