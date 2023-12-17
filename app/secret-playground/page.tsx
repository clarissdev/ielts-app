"use client";
import { useBrowserSearchBlocking } from "@/modules/common-hooks/useBrowserSearchBlocking";
import React from "react";
import Editor from "@/modules/app-ui/components/Editor";
import { Descendant } from "slate";
import { RecoilRoot } from "recoil";

export default function Page() {
  // useBrowserSearchBlocking();
  const refInput = React.useRef<HTMLInputElement>();
  const [document, setDocument] = React.useState<Descendant[]>([]);
  console.log(JSON.stringify(document));

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
