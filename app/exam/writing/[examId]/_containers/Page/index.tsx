"use client";

import React from "react";
import { RecoilRoot } from "recoil";

import Body from "./containers/Body";

import { WritingExam } from "@/modules/business-types";

type Props = {
  initialExam: WritingExam;
};

export default function Page({ initialExam }: Props) {
  return (
    <RecoilRoot>
      <Body initialExam={initialExam} />
    </RecoilRoot>
  );
}
