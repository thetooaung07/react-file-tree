// 1. Define m-ary tree : https://en.wikipedia.org/wiki/M-ary_tree

import clsx from "clsx";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ReactNode, useContext, useReducer } from "react";
import {
  TreeViewActionTypes,
  TreeViewContext,
  treeViewReducer,
} from "./context";
import { Arrow } from "./icons";

export type TreeNodeType = {
  id: string;
  name: string;
  dir: string;
  children?: TreeNodeType[];
};

type RootProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  value: string | null;
  onChange: (id: string) => void;
};

export const Root = ({ children, className, value, onChange }: RootProps) => {
  const [open, dispatch] = useReducer(
    treeViewReducer,
    new Map<string, boolean>()
  );

  return (
    <TreeViewContext.Provider
      value={{
        open,
        dispatch,
        selectedId: value,
        selectId: onChange,
      }}
    >
      <ul className={clsx("flex flex-col overflow-auto", className)}>
        {children}
      </ul>
    </TreeViewContext.Provider>
  );
};

type NodeProps = {
  node: TreeNodeType;
};

export const Node = ({ node: { id, name, children } }: NodeProps) => {
  const { dispatch, open, selectId, selectedId } = useContext(TreeViewContext);

  const isOpen = open.get(id);

  return (
    <li className="flex flex-col cursor-pointer select-none">
      <MotionConfig
        transition={{
          ease: [0.164, 0.84, 0.43, 1],
          duration: 0.25,
        }}
      >
        <div
          className={clsx(
            "flex items-center font-mono font-medium rounded-sm px-1 text-ellipsis whitespace-nowrap overflow-hidden",
            selectedId === id ? "bg-slate-200" : "bg-transparent"
          )}
          onClick={() => {
            open.get(id)
              ? dispatch({
                  id,
                  type: TreeViewActionTypes.CLOSE,
                })
              : dispatch({
                  id,
                  type: TreeViewActionTypes.OPEN,
                });
            selectId(id);
          }}
        >
          {children?.length ? (
            <Arrow className="h-4 w-4 shrink-0 mr-1" open={isOpen} />
          ) : (
            <span className="h-4 w-4 shrink-0 mr-1" />
          )}
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {name}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {children?.length && open.get(id) && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.25,
                  },
                  opacity: {
                    duration: 0.2,
                    delay: 0.05,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.25,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                },
              }}
              key={"ul"}
              className="pl-4"
            >
              {children.map((node) => (
                <Node node={node} key={node.id} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </MotionConfig>
    </li>
  );
};

export const TreeView = { Root, Node };
