"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { Descendant } from "slate";

import Editor from "@/modules/app-ui/components/Editor";

export default function Page() {
  const [document, setDocument] = React.useState<Descendant[]>([
    // {
    //   type: "div",
    //   children: [
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "The total amount of plastic remaining to be recycled in a facility over x shifts is represented by the graph above. Which of the following represents the y-intercept of the graph?"
    //         }
    //       ]
    //     },
    //     {
    //       type: "imagev2",
    //       src: "https://theenglishcoach.vn/assets/sat_1_m3_q5.png",
    //       children: [{ text: "" }]
    //     }
    //   ]
    // }
    // {
    //   type: "radio",
    //   index: "question_12",
    //   allAnswers: ["A", "B", "C", "D"],
    //   hideId: true,
    //   children: [
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "A) "
    //         },
    //         {
    //           type: "fraction",
    //           children: [{ text: "1" }, { text: "10" }]
    //         },
    //         {
    //           text: " x + "
    //         },
    //         {
    //           type: "fraction",
    //           children: [{ text: "1" }, { text: "7" }]
    //         },
    //         {
    //           text: " y = 200"
    //         }
    //       ]
    //     },
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "B) "
    //         },
    //         {
    //           type: "fraction",
    //           children: [{ text: "1" }, { text: "10" }]
    //         },
    //         {
    //           text: " x + "
    //         },
    //         {
    //           type: "fraction",
    //           children: [{ text: "1" }, { text: "7" }]
    //         },
    //         {
    //           text: " y = 3,420"
    //         }
    //       ]
    //     },
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "C) 10x + 7y = 200"
    //         }
    //       ]
    //     },
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "D) 10x + 7y = 3,420"
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]);

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
