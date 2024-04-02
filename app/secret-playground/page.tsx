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
    //           text: "Horses' Responses to Novel Objects Based on Number of Handlers",
    //           bold: true
    //         }
    //       ]
    //     },
    //     {
    //       type: "info-table",
    //       numRows: 6,
    //       numColumns: 3,
    //       children: [
    //         {
    //           type: "info-table-head",
    //           children: [
    //             {
    //               type: "info-table-tr",
    //               children: [
    //                 {
    //                   type: "info-table-th",
    //                   children: [{ text: "" }]
    //                 },
    //                 {
    //                   type: "info-table-th",
    //                   children: [{ text: "Only One Handler" }]
    //                 },
    //                 {
    //                   type: "info-table-th",
    //                   children: [{ text: "Multiple Handlers" }]
    //                 }
    //               ]
    //             }
    //           ]
    //         },
    //         {
    //           type: "info-table-body",
    //           children: [
    //             {
    //               type: "info-table-tr",
    //               children: [
    //                 {
    //                   type: "info-table-td",
    //                   children: [{ text: "No reluctance", bold: true }]
    //                 },
    //                 {
    //                   type: "info-table-td",
    //                   children: [{ text: "45%" }]
    //                 },
    //                 { type: "info-table-td", children: [{ text: "25%" }] }
    //               ]
    //             },
    //             {
    //               type: "info-table-tr",
    //               children: [
    //                 {
    //                   type: "info-table-td",
    //                   children: [{ text: "Mild reluctance", bold: true }]
    //                 },
    //                 {
    //                   type: "info-table-td",
    //                   children: [{ text: "42%" }]
    //                 },
    //                 { type: "info-table-td", children: [{ text: "49%" }] }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "Horses have been domesticated for thousands of years. Therefore, they show great sensitivity to the emotions of humans. Biologist Océane Liehrmann from the University of Turku, Finland, led a team of researchers in a study of horses to determine the effect of the number of handlers (either only one person or multiple people) on the horses' responses to a novel object. The researchers determined that horses with only one handler were less reluctant to interact with the novel object than were horses with multiple handlers. For example, 45% of horses with only one handler had no reluctance when interacting with a novel object while _______\n\nWhich choice most effectively uses data from the table to complete the example?"
    //         }
    //       ]
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
    //           text: "A) Washington, D.C., on the 18th and the 19th."
    //         }
    //       ]
    //     },
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "B) Philadelphia, PA, on the 23rd and the 25th"
    //         }
    //       ]
    //     },
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "C) Philadelphia, PA, on the 24th and the 26th."
    //         }
    //       ]
    //     },
    //     {
    //       type: "div",
    //       children: [
    //         {
    //           text: "D) Washington, D.C., on the 23rd and the 24th."
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
