"use client";

import React from "react";
import { RecoilRoot } from "recoil";

import Body from "./containers/Body";

import { ListeningExam } from "@/modules/business-types";

type Props = {
  initialExam: ListeningExam;
};

export default function Page({ initialExam }: Props) {
  return (
    <RecoilRoot>
      <Body initialExam={initialExam} />
    </RecoilRoot>
  );
}
