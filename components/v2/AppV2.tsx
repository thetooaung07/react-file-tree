"use client";

import React, { useState } from "react";
import { data } from "../v2/data";
import { TreeView } from "./TreeView";

export const AppV2 = () => {
  const [selected, select] = useState<string | null>(null);
  return (
    <div className="m-4">
      <h2 className="text-center">V2</h2>
      <h2 className="text-center">
        Better Structure code with smooth animation
      </h2>
      <TreeView.Root
        className="w-72 h-full border-[1.5px] border-slate-200 m-4"
        value={selected}
        onChange={select}
      >
        {data.map((node) => (
          <TreeView.Node node={node} key={node.id} />
        ))}
      </TreeView.Root>
    </div>
  );
};
