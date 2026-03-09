"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FileExplorer: () => AppV4,
  FileExplorerPanel: () => FileExplorer,
  TreeView: () => TreeView,
  TreeViewActionTypes: () => TreeViewActionTypes,
  TreeViewContext: () => TreeViewContext,
  convertListFileToObjectParentTree: () => convertListFileToObjectParentTree,
  treeViewReducer: () => treeViewReducer
});
module.exports = __toCommonJS(index_exports);

// src/AppV4.tsx
var import_react3 = require("react");
var import_react_dropzone = require("react-dropzone");

// src/TreeView.tsx
var import_clsx2 = __toESM(require("clsx"));
var import_framer_motion2 = require("framer-motion");
var import_react2 = require("react");

// src/context.tsx
var import_react = require("react");
var TreeViewActionTypes = /* @__PURE__ */ ((TreeViewActionTypes2) => {
  TreeViewActionTypes2["OPEN"] = "OPEN";
  TreeViewActionTypes2["CLOSE"] = "CLOSE";
  TreeViewActionTypes2["OPEN_ALL"] = "OPEN_ALL";
  TreeViewActionTypes2["CLOSE_All"] = "CLOSE_All";
  return TreeViewActionTypes2;
})(TreeViewActionTypes || {});
var TreeViewContext = (0, import_react.createContext)({
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
var import_clsx = __toESM(require("clsx"));
var import_framer_motion = require("framer-motion");
function Arrow({ open, className }) {
  return /* @__PURE__ */ React.createElement(
    import_framer_motion.motion.svg,
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      className: (0, import_clsx.default)("origin-center", className),
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
  return /* @__PURE__ */ React.createElement("ul", { className: (0, import_clsx2.default)("flex flex-col overflow-auto", className) }, children);
};
var Node = ({ node: { id, name, children } }) => {
  const { dispatch, open, selectId, selectedId } = (0, import_react2.useContext)(TreeViewContext);
  const isOpen = open.get(id);
  return /* @__PURE__ */ React.createElement("li", { className: "flex flex-col cursor-pointer select-none" }, /* @__PURE__ */ React.createElement(
    import_framer_motion2.MotionConfig,
    {
      transition: {
        ease: [0.164, 0.84, 0.43, 1],
        duration: 0.25
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: (0, import_clsx2.default)(
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
    /* @__PURE__ */ React.createElement(import_framer_motion2.AnimatePresence, { initial: false }, children?.length && open.get(id) && /* @__PURE__ */ React.createElement(
      import_framer_motion2.motion.ul,
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
var import_uuid = require("uuid");
var data = [
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "components",
    children: [
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "toggle-group",
        children: [
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "index.ts"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "toggle-group.tsx"
          }
        ]
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "treeview",
        children: [
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "icons.tsx"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "index.tsx"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "treeview.tsx"
          }
        ]
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "long-component-folder-name-that-overflows",
        children: [
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "index.tsx"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "long-component.tsx"
          }
        ]
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "index.tsx"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "long-util-file-name-that-overflows.tsx"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "roving-tabindex.tsx"
      }
    ]
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "lib",
    children: [
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "treeview",
        children: [
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "index.ts"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "initialValue.ts"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "tree-state.tsx"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "useTreeNode.tsx"
          }
        ]
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "utils",
        children: [
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "chainable-map.ts"
          },
          {
            id: (0, import_uuid.v4)(),
            dir: "",
            name: "index.ts"
          }
        ]
      }
    ]
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "pages",
    children: [
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "_app.tsx"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "_document.tsx"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "index.tsx"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "toggle-group.tsx"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "treeview.tsx"
      }
    ]
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "public",
    children: [
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "favicon.ico"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "file.png"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "folder.png"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "next.svg"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "thirteen.svg"
      },
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "vercel.svg"
      }
    ]
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "styles",
    children: [
      {
        id: (0, import_uuid.v4)(),
        dir: "",
        name: "global.css"
      }
    ]
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: ".eslintrc.json"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: ".gitignore"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: ".prettierrc.js"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "next-env.d.ts"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "next.config.js"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "package.json"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "postcss.config.js"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "README.md"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "tailwind.config.js"
  },
  {
    id: (0, import_uuid.v4)(),
    dir: "",
    name: "tsconfig.json"
  },
  {
    id: (0, import_uuid.v4)(),
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
          id: (0, import_uuid.v4)(),
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
  const [selected, select] = (0, import_react3.useState)("");
  const [explorerData, setExplorerData] = (0, import_react3.useState)([]);
  const [rawFileList, setRawFileList] = (0, import_react3.useState)();
  const [open, dispatch] = (0, import_react3.useReducer)(treeViewReducer, /* @__PURE__ */ new Map());
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
  const [nodeWithChildren, setNodeWithChildren] = (0, import_react3.useState)([]);
  const { dispatch } = (0, import_react3.useContext)(TreeViewContext);
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
  const fileInputRef = (0, import_react3.useRef)(null);
  const onDrop = (0, import_react3.useCallback)(
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
  const { getRootProps, getInputProps, isDragActive } = (0, import_react_dropzone.useDropzone)({ onDrop });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileExplorer,
  FileExplorerPanel,
  TreeView,
  TreeViewActionTypes,
  TreeViewContext,
  convertListFileToObjectParentTree,
  treeViewReducer
});
//# sourceMappingURL=index.js.map