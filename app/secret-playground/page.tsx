"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import Editor from "@/modules/app-ui/components/Editor";

export default function Page() {
  const [document, setDocument] = React.useState<Descendant[]>([]);

  //console.log(document);
  console.log(JSON.stringify(document).replaceAll('"', '\\"'));
  //console.log(JSON.stringify(document));
  return (
    <div>
      <RecoilRoot>
        <Editor value={document} onChange={(value) => setDocument(value)} />
      </RecoilRoot>
    </div>
  );
}
