"use client";
import { useBrowserSearchBlocking } from "@/modules/common-hooks/useBrowserSearchBlocking";
import React from "react";
import Editor from "@/modules/app-ui/components/Editor";
import { Descendant } from "slate";
import { RecoilRoot } from "recoil";

export default function Page() {
  const [document, setDocument] = React.useState<Descendant[]>([]);

  return (
    <div>
      <RecoilRoot>
        <Editor
          readOnly
          value={document}
          onChange={(value) => setDocument(value)}
        />
      </RecoilRoot>
    </div>
  );
}
