import { v4 as uuidv4 } from "uuid";
import { TreeNodeType } from "./TreeView";

export const data: TreeNodeType[] = [
  {
    id: uuidv4(),
    name: "components",
    children: [
      {
        id: uuidv4(),
        name: "toggle-group",
        children: [
          {
            id: uuidv4(),
            name: "index.ts",
          },
          {
            id: uuidv4(),
            name: "toggle-group.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        name: "treeview",
        children: [
          {
            id: uuidv4(),
            name: "icons.tsx",
          },
          {
            id: uuidv4(),
            name: "index.tsx",
          },
          {
            id: uuidv4(),
            name: "treeview.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        name: "long-component-folder-name-that-overflows",
        children: [
          {
            id: uuidv4(),
            name: "index.tsx",
          },
          {
            id: uuidv4(),
            name: "long-component.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        name: "index.tsx",
      },
      {
        id: uuidv4(),
        name: "long-util-file-name-that-overflows.tsx",
      },
      {
        id: uuidv4(),
        name: "roving-tabindex.tsx",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "lib",
    children: [
      {
        id: uuidv4(),
        name: "treeview",
        children: [
          {
            id: uuidv4(),
            name: "index.ts",
          },
          {
            id: uuidv4(),
            name: "initialValue.ts",
          },
          {
            id: uuidv4(),
            name: "tree-state.tsx",
          },
          {
            id: uuidv4(),
            name: "useTreeNode.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        name: "utils",
        children: [
          {
            id: uuidv4(),
            name: "chainable-map.ts",
          },
          {
            id: uuidv4(),
            name: "index.ts",
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "pages",
    children: [
      {
        id: uuidv4(),
        name: "_app.tsx",
      },
      {
        id: uuidv4(),
        name: "_document.tsx",
      },
      {
        id: uuidv4(),
        name: "index.tsx",
      },
      {
        id: uuidv4(),
        name: "toggle-group.tsx",
      },
      {
        id: uuidv4(),
        name: "treeview.tsx",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "public",
    children: [
      {
        id: uuidv4(),
        name: "favicon.ico",
      },
      {
        id: uuidv4(),
        name: "file.png",
      },
      {
        id: uuidv4(),
        name: "folder.png",
      },
      {
        id: uuidv4(),
        name: "next.svg",
      },
      {
        id: uuidv4(),
        name: "thirteen.svg",
      },
      {
        id: uuidv4(),
        name: "vercel.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "styles",
    children: [
      {
        id: uuidv4(),
        name: "global.css",
      },
    ],
  },
  {
    id: uuidv4(),
    name: ".eslintrc.json",
  },
  {
    id: uuidv4(),
    name: ".gitignore",
  },
  {
    id: uuidv4(),
    name: ".prettierrc.js",
  },
  {
    id: uuidv4(),
    name: "next-env.d.ts",
  },
  {
    id: uuidv4(),
    name: "next.config.js",
  },
  {
    id: uuidv4(),
    name: "package.json",
  },
  {
    id: uuidv4(),
    name: "postcss.config.js",
  },
  {
    id: uuidv4(),
    name: "README.md",
  },
  {
    id: uuidv4(),
    name: "tailwind.config.js",
  },
  {
    id: uuidv4(),
    name: "tsconfig.json",
  },
  {
    id: uuidv4(),
    name: "yarn.lock",
  },
];
