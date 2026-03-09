import { v4 as uuidv4 } from "uuid";
import { TreeNodeType } from "./TreeView";

export const data: TreeNodeType[] = [
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
            name: "index.ts",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "toggle-group.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        dir: "",
        name: "treeview",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "icons.tsx",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "index.tsx",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "treeview.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        dir: "",
        name: "long-component-folder-name-that-overflows",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "index.tsx",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "long-component.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        dir: "",
        name: "index.tsx",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "long-util-file-name-that-overflows.tsx",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "roving-tabindex.tsx",
      },
    ],
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
            name: "index.ts",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "initialValue.ts",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "tree-state.tsx",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "useTreeNode.tsx",
          },
        ],
      },
      {
        id: uuidv4(),
        dir: "",
        name: "utils",
        children: [
          {
            id: uuidv4(),
            dir: "",
            name: "chainable-map.ts",
          },
          {
            id: uuidv4(),
            dir: "",
            name: "index.ts",
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    dir: "",
    name: "pages",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "_app.tsx",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "_document.tsx",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "index.tsx",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "toggle-group.tsx",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "treeview.tsx",
      },
    ],
  },
  {
    id: uuidv4(),
    dir: "",
    name: "public",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "favicon.ico",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "file.png",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "folder.png",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "next.svg",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "thirteen.svg",
      },
      {
        id: uuidv4(),
        dir: "",
        name: "vercel.svg",
      },
    ],
  },
  {
    id: uuidv4(),
    dir: "",
    name: "styles",
    children: [
      {
        id: uuidv4(),
        dir: "",
        name: "global.css",
      },
    ],
  },
  {
    id: uuidv4(),
    dir: "",
    name: ".eslintrc.json",
  },
  {
    id: uuidv4(),
    dir: "",
    name: ".gitignore",
  },
  {
    id: uuidv4(),
    dir: "",
    name: ".prettierrc.js",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "next-env.d.ts",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "next.config.js",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "package.json",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "postcss.config.js",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "README.md",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "tailwind.config.js",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "tsconfig.json",
  },
  {
    id: uuidv4(),
    dir: "",
    name: "yarn.lock",
  },
];

export function convertListFileToObjectParentTree(
  list: {
    name: string;
    webkitRelativePath: string;
  }[]
) {
  const tree: TreeNodeType[] = [];

  list.forEach((item) => {
    const filePath = item.webkitRelativePath;
    const pathSegments = filePath.split("/");

    let currentNode: TreeNodeType | undefined;
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const parentNode = i === 0 ? tree : currentNode?.children;
      const existingNode = parentNode?.find((node) => node.name === segment);

      if (existingNode) {
        currentNode = existingNode;
      } else {
        const newNode: TreeNodeType = {
          id: uuidv4(),
          name: segment,
          dir: item.webkitRelativePath,
          children: [],
        };
        parentNode?.push(newNode);
        currentNode = newNode;
      }
    }
  });

  console.log("Tree \n\n", tree);

  const collectNodeIdsWithChildren = (nodes: TreeNodeType[]): string[] => {
    let ids: string[] = [];
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
