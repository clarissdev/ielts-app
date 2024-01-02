"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import Editor from "@/modules/app-ui/components/Editor";

export default function Page() {
  const [document, setDocument] = React.useState<Descendant[]>([
    {
      type: "paragraph",
      children: [
        {
          text: "We've been talking about a useful article on health you have read and I'd like to discuss with you one or two more general questions related to this. Let's consider first of all ..."
        }
      ]
    },
    {
      type: "paragraph",
      children: [{ text: "Discussion topics: Healthy living" }]
    },
    {
      type: "ul",
      children: [
        {
          type: "div",
          children: [
            {
              text: "the main things people in your country do to stay healthy"
            }
          ]
        },
        {
          type: "div",
          children: [{ text: "it’s harder to be healthy now than in the past" }]
        },
        {
          type: "div",
          children: [
            {
              text: "whether magazine articles about healthy living are always useful"
            }
          ]
        }
      ]
    }
  ]);

  //console.log(document);
  //console.log(JSON.stringify(document).replaceAll('"', '\\"'));
  console.log(JSON.stringify(document));
  return (
    <div>
      <RecoilRoot>
        <Editor value={document} onChange={(value) => setDocument(value)} />
      </RecoilRoot>
    </div>
  );
}
