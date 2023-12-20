"use client";

import "react-quill/dist/quill.snow.css";
import React from "react";
import { RecoilRoot } from "recoil";

import Body from "./containers/Body";

import { ReadingExam } from "@/modules/business-types";

type Props = {
  initialExam: ReadingExam;
};

export default function Page({ initialExam }: Props) {
  return (
    <RecoilRoot>
      <Body initialExam={initialExam} />
    </RecoilRoot>
  );
}
