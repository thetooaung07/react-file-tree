"use client";
/// this is the explorer version of react-file-tree

import fs from "fs";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useCallback,
  useReducer,
  useRef,
  useState,
} from "react";
import Dropzone, { useDropzone } from "react-dropzone";

import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
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
  const [nodeWithChildren, setNodeWithChildren] = useState<string[]>([]);

  const pickFolder = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);

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

  const [open, dispatch] = useReducer(
    treeViewReducer,
    new Map<string, boolean>()
  );

  return (
    <TreeViewContext.Provider
      value={{
        open,
        dispatch,
        selectedId: selected,
        selectId: select,
      }}
    >
      <div className="m-4 ">
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
          <div>
            <h1 className="font-bold">{explorerData[0].name} </h1>
            <div className="absolute right-0 top-0 flex gap-2">
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
          <TreeView.Root className="w-[50vw] h-[40vh] border-[1.5px] border-slate-200 my-4">
            {explorerData[0].children?.map((node) => (
              <TreeView.Node node={node} key={node.id} />
            ))}
          </TreeView.Root>
        )}
        {nodeWithChildren &&
          nodeWithChildren.map((el) => {
            return (
              <div key={el}>
                <h1>{el}</h1>
              </div>
            );
          })}
      </div>
    </TreeViewContext.Provider>
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
