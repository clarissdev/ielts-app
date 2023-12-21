/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collapse, CollapseProps } from "antd";
import { RenderElementProps } from "slate-react";

export default function Root({ attributes, children }: RenderElementProps) {
  const items = (() => {
    const items: CollapseProps["items"] = [];
    for (let i = 0; i + 1 < children.length; i += 2) {
      items.push({
        key: i,
        label: children[i],
        children: children[i + 1]
      });
    }
    return items;
  })();
  return <Collapse accordion {...attributes} items={items} />;
}
