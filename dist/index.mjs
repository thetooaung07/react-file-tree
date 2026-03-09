"use client";

// src/AppV4.tsx
import { useCallback, useContext as useContext2, useReducer as useReducer2, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

// src/TreeView.tsx
import clsx from "clsx";
import { AnimatePresence, MotionConfig, motion as motion2 } from "framer-motion";
import { useContext } from "react";

// src/context.tsx
import { createContext } from "react";
var TreeViewActionTypes = /* @__PURE__ */ ((TreeViewActionTypes2) => {
  TreeViewActionTypes2["OPEN"] = "OPEN";
  TreeViewActionTypes2["CLOSE"] = "CLOSE";
  TreeViewActionTypes2["OPEN_ALL"] = "OPEN_ALL";
  TreeViewActionTypes2["CLOSE_All"] = "CLOSE_All";
  return TreeViewActionTypes2;
})(TreeViewActionTypes || {});
var TreeViewContext = createContext({
  open: /* @__PURE__ */ new Map(),
  dispatch: () => {
  },
  selectedId: null,
  selectId: () => {
  }
});
var treeViewReducer = (state, action) => {
  switch (action.type) {
    case "OPEN" /* OPEN */:
      return new Map(state).set(action.id, true);
    case "CLOSE" /* CLOSE */:
      const newState = new Map(state);
      newState.delete(action.id);
      return newState;
    case "OPEN_ALL" /* OPEN_ALL */:
      if (action.ids.length === state.size) {
        return state;
      } else {
        const openAll = /* @__PURE__ */ new Map();
        action.ids.map((id) => {
          return openAll.set(id, true);
        });
        return openAll;
      }
    case "CLOSE_All" /* CLOSE_All */:
      const newCloseAllState = /* @__PURE__ */ new Map();
      return newCloseAllState;
    default:
      throw new Error("Tree Reducer received an unknown operation");
  }
};

// src/icons.tsx
import classNames from "clsx";
import { motion } from "framer-motion";
function Arrow({ open, className }) {
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      className: classNames("origin-center", className),
      initial: false,
      animate: { rotate: open ? 90 : 0 },
      style: { originX: "8px", originY: "8px" },
      transition: {
        duration: 0.25,
        ease: [0.164, 0.84, 0.43, 1]
      }
    },
    /* @__PURE__ */ React.createElement(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M8.25 4.5l7.5 7.5-7.5 7.5"
      }
    )
  );
}

// src/TreeView.tsx
var Root = ({ children, className }) => {
  return /* @__PURE__ */ React.createElement("ul", { className: clsx("flex flex-col overflow-auto", className) }, children);
};
var Node = ({ node: { id, name, children } }) => {
  const { dispatch, open, selectId, selectedId } = useContext(TreeViewContext);
  const isOpen = open.get(id);
  return /* @__PURE__ */ React.createElement("li", { className: "flex flex-col cursor-pointer select-none" }, /* @__PURE__ */ React.createElement(
    MotionConfig,
    {
      transition: {
        ease: [0.164, 0.84, 0.43, 1],
        duration: 0.25
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: clsx(
          "flex items-center font-mono font-medium rounded-sm px-1 text-ellipsis whitespace-nowrap overflow-hidden",
          selectedId === id ? "bg-slate-200" : "bg-transparent"
        ),
        onClick: () => {
          open.get(id) ? dispatch({
            id,
            type: "CLOSE" /* CLOSE */
          }) : dispatch({
            id,
            type: "OPEN" /* OPEN */
          });
          selectId(id);
        }
      },
      children?.length ? /* @__PURE__ */ React.createElement(Arrow, { className: "h-4 w-4 shrink-0 mr-1", open: isOpen }) : /* @__PURE__ */ React.createElement("span", { className: "h-4 w-4 shrink-0 mr-1" }),
      /* @__PURE__ */ React.createElement("span", { className: "text-ellipsis whitespace-nowrap overflow-hidden" }, name)
    ),
    /* @__PURE__ */ React.createElement(AnimatePresence, { initial: false }, children?.length && open.get(id) && /* @__PURE__ */ React.createElement(
      motion2.ul,
      {
        initial: { height: 0, opacity: 0 },
        animate: {
          height: "auto",
          opacity: 1,
          transition: {
            height: {
              duration: 0.25
            },
            opacity: {
              duration: 0.2,
              delay: 0.05
            }
          }
        },
        exit: {
          height: 0,
          opacity: 0,
          transition: {
            height: {
              duration: 0.25
            },
            opacity: {
              duration: 0.2
            }
          }
        },
        key: "ul",
        className: "pl-4"
      },
      children.map((node) => /* @__PURE__ */ React.createElement(Node, { node, key: node.id }))
    ))
  ));
};
var TreeView = { Root, Node };

// src/utils.tsx
import { v4 as uuidv4 } from "uuid";
var data = [
  {
    id: uuidv4(),
    dir: "",
    name: "components",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "toggle-group",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "index.ts"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "toggle-group.tsx"
          }
        ]
      },
      {
        id: uuidv4(),
        dir: "",
        name: "treeview",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "icons.tsx"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "index.tsx"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "treeview.tsx"
          }
        ]
      },
      {
        id: uuidv4(),
        dir: "",
        name: "long-component-folder-name-that-overflows",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "index.tsx"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "long-component.tsx"
          }
        ]
      },
      {
        id: uuidv4(),
        dir: "",
        name: "index.tsx"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "long-util-file-name-that-overflows.tsx"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "roving-tabindex.tsx"
      }
    ]
  },
  {
    id: uuidv4(),
    dir: "",
    name: "lib",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "treeview",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "index.ts"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "initialValue.ts"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "tree-state.tsx"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "useTreeNode.tsx"
          }
        ]
      },
      {
        id: uuidv4(),
        dir: "",
        name: "utils",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "chainable-map.ts"
          },
          {
            id: uuidv4(),
            dir: "",
            name: "index.ts"
          }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    dir: "",
    name: "pages",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "_app.tsx"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "_document.tsx"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "index.tsx"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "toggle-group.tsx"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "treeview.tsx"
      }
    ]
  },
  {
    id: uuidv4(),
    dir: "",
    name: "public",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "favicon.ico"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "file.png"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "folder.png"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "next.svg"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "thirteen.svg"
      },
      {
        id: uuidv4(),
        dir: "",
        name: "vercel.svg"
      }
    ]
  },
  {
    id: uuidv4(),
    dir: "",
    name: "styles",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "global.css"
      }
    ]
  },
  {
    id: uuidv4(),
    dir: "",
    name: ".eslintrc.json"
  },
  {
    id: uuidv4(),
    dir: "",
    name: ".gitignore"
  },
  {
    id: uuidv4(),
    dir: "",
    name: ".prettierrc.js"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "next-env.d.ts"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "next.config.js"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "package.json"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "postcss.config.js"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "README.md"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "tailwind.config.js"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "tsconfig.json"
  },
  {
    id: uuidv4(),
    dir: "",
    name: "yarn.lock"
  }
];
function convertListFileToObjectParentTree(list) {
  const tree = [];
  list.forEach((item) => {
    const filePath = item.webkitRelativePath;
    const pathSegments = filePath.split("/");
    let currentNode;
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const parentNode = i === 0 ? tree : currentNode?.children;
      const existingNode = parentNode?.find((node) => node.name === segment);
      if (existingNode) {
        currentNode = existingNode;
      } else {
        const newNode = {
          id: uuidv4(),
          name: segment,
          dir: item.webkitRelativePath,
          children: []
        };
        parentNode?.push(newNode);
        currentNode = newNode;
      }
    }
  });
  console.log("Tree \n\n", tree);
  const collectNodeIdsWithChildren = (nodes) => {
    let ids = [];
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        ids.push(node.id);
        ids = ids.concat(collectNodeIdsWithChildren(node.children));
      }
    });
    return ids;
  };
  const nodeIdsWithChildren = collectNodeIdsWithChildren(tree);
  return { tree, nodeIdsWithChildren };
}

// src/AppV4.tsx
var UploadIcon = () => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    viewBox: "0 0 24 24",
    width: "56",
    height: "56",
    className: "mb-2",
    id: "upload"
  },
  /* @__PURE__ */ React.createElement(
    "path",
    {
      fill: "currentColor",
      d: "M18,9h-2c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1,0.4,1,1v7c0,0.6-0.4,1-1,1H6c-0.6,0-1-0.4-1-1v-7c0-0.6,0.4-1,1-1h2 c0.6,0,1-0.4,1-1S8.6,9,8,9H6c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h12c1.7,0,3-1.3,3-3v-7C21,10.3,19.7,9,18,9z M9.7,6.7L11,5.4V17 c0,0.6,0.4,1,1,1h0c0.6,0,1-0.4,1-1V5.4l1.3,1.3C14.5,6.9,14.7,7,15,7c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4l-3-3c0,0,0,0,0,0 c-0.4-0.4-1-0.4-1.4,0l-3,3c-0.4,0.4-0.4,1,0,1.4C8.7,7.1,9.3,7.1,9.7,6.7z"
    }
  )
);
var AppV4 = () => {
  const [selected, select] = useState("");
  const [explorerData, setExplorerData] = useState([]);
  const [rawFileList, setRawFileList] = useState();
  const [open, dispatch] = useReducer2(treeViewReducer, /* @__PURE__ */ new Map());
  const getFilePathFromSelectedID = (tree, selectedId) => {
    for (const node of tree) {
      if (node.id === selectedId) {
        return node.dir;
      }
      if (node.children !== void 0 && node.children.length > 0) {
        const foundId = getFilePathFromSelectedID(node.children, selectedId);
        if (foundId !== "") {
          return foundId;
        }
      }
    }
    return "";
  };
  return /* @__PURE__ */ React.createElement(
    TreeViewContext.Provider,
    {
      value: {
        open,
        dispatch,
        selectedId: selected,
        selectId: select
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "container flex flex-col lg:flex-row justify-center items-center" }, /* @__PURE__ */ React.createElement(
      FileExplorer,
      {
        explorerData,
        setExplorerData,
        setRawFileList
      }
    ))
  );
};
var FileExplorer = ({
  explorerData,
  setExplorerData,
  setRawFileList
}) => {
  const [nodeWithChildren, setNodeWithChildren] = useState([]);
  const { dispatch } = useContext2(TreeViewContext);
  const pickFolder = (e) => {
    const files = e.target.files;
    setRawFileList(files);
    if (files) {
      const fileList = Array.from(files).map((file) => ({
        name: file.name,
        webkitRelativePath: file.webkitRelativePath
      }));
      const { tree, nodeIdsWithChildren } = convertListFileToObjectParentTree(fileList);
      setExplorerData(tree);
      setNodeWithChildren(nodeIdsWithChildren);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "m-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-center" }, "V4"), /* @__PURE__ */ React.createElement("h2", { className: "text-center mb-4" }, "You can now imports folders from local and test dynamic data"), explorerData.length === 0 && /* @__PURE__ */ React.createElement(
    MyDropzone,
    {
      setExplorerData,
      pickFolder,
      setNodeWithChildren
    }
  ), explorerData?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("h1", { className: "font-bold" }, explorerData[0].name, " "), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "border p-2 w-8 h-8 bg-white z-20 text-center flex items-center justify-center",
      onClick: () => {
        dispatch({
          type: "OPEN_ALL" /* OPEN_ALL */,
          ids: nodeWithChildren
        });
      }
    },
    "+"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "border p-2 w-8 h-8 bg-white z-20 text-center flex items-center justify-center",
      onClick: () => {
        dispatch({
          type: "CLOSE_All" /* CLOSE_All */
        });
      }
    },
    "x"
  ))), explorerData?.length > 0 && explorerData[0].children !== void 0 && /* @__PURE__ */ React.createElement(TreeView.Root, { className: "w-[40vw] h-[40vh] border-[1.5px] border-slate-200 mb-4 mt-1" }, explorerData[0].children?.map((node) => /* @__PURE__ */ React.createElement(TreeView.Node, { node, key: node.id }))));
};
var MyDropzone = ({
  pickFolder,
  setExplorerData,
  setNodeWithChildren
}) => {
  const fileInputRef = useRef(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles) {
        const fileList = Array.from(acceptedFiles).map((file) => ({
          name: file.name,
          webkitRelativePath: file.path.substring(1) ?? ""
        }));
        const { tree, nodeIdsWithChildren } = convertListFileToObjectParentTree(fileList);
        setExplorerData(tree);
        setNodeWithChildren(nodeIdsWithChildren);
      }
    },
    [setExplorerData, setNodeWithChildren]
  );
  const onButtonClick = (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      pickFolder(e);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ...getRootProps(),
      onClick: onButtonClick,
      className: `dropzone ${isDragActive ? "active" : ""} my-8 border-dashed border-2 border-slate-400 h-full flex justify-center items-center bg-slate-50 cursor-pointer p-6 text-center`
    },
    /* @__PURE__ */ React.createElement("p", { className: "opacity-20 text-2xl flex flex-col items-center" }, /* @__PURE__ */ React.createElement(UploadIcon, null), "Upload Files"),
    /* @__PURE__ */ React.createElement(
      "input",
      {
        ...getInputProps(),
        type: "file",
        webkitdirectory: "",
        directory: "",
        mozdirectory: "",
        multiple: true,
        ref: fileInputRef,
        style: {
          display: "none"
        },
        onChange: (e) => {
          onButtonClick(e);
        }
      }
    )
  );
};
export {
  AppV4 as FileExplorer,
  FileExplorer as FileExplorerPanel,
  TreeView,
  TreeViewActionTypes,
  TreeViewContext,
  convertListFileToObjectParentTree,
  treeViewReducer
};
//# sourceMappingURL=index.mjs.map