// import path from "path";
// import React, {
//   Dispatch,
//   SetStateAction,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import { TreeNodeType } from "./TreeView";

// export const ServerComponent = ({
//   explorerData,
//   selected,
//   rawFileList,
// }: {
//   rawFileList: FileList | null | undefined;
//   explorerData: TreeNodeType[];
//   selected: string;
// }) => {
//   const getFilePathFromSelectedID = useCallback(
//     (tree: TreeNodeType[], selectedId: string): TreeNodeType | undefined => {
//       for (const node of tree) {
//         if (node.id === selectedId) {
//           return node;
//         }

//         if (node.children !== undefined && node.children.length > 0) {
//           const foundNode = getFilePathFromSelectedID(
//             node.children!,
//             selectedId
//           );
//           if (foundNode) {
//             return foundNode;
//           }
//         }
//       }
//     },
//     []
//   );

//   const findTheBlob = useCallback(() => {
//     const filePath = getFilePathFromSelectedID(explorerData, selected);
//     if (
//       rawFileList !== null &&
//       rawFileList !== undefined &&
//       filePath !== undefined
//     ) {
//       for (const file of rawFileList) {
//         if (file.webkitRelativePath === filePath.dir) {
//           return file;
//         }
//       }
//     }
//   }, [explorerData, getFilePathFromSelectedID, rawFileList, selected]);

//   const [fileContent, setFileContent] = useState<string>("");

//   useEffect(() => {
//     const file = findTheBlob();

//     if (file !== undefined) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const content = e.target?.result as string;
//         setFileContent(content);
//       };

//       reader.readAsText(file);
//     }
//   }, [findTheBlob]);

//   return (
//     <div className="w-full">
//       {selected !== null && (
//         // <h2 className="w-96 h-96">{fileContent}</h2>
//         <iframe
//           src={fileContent}
//           frameBorder="0"
//           width="100%"
//           height="500px"
//         ></iframe>
//         // <embed src={fileContent} width="100%" height="500px" />
//       )}
//     </div>
//   );
// };
