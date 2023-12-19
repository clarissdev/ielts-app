"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import Editor from "@/modules/app-ui/components/Editor";

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
