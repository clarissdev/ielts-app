"use client";
import { SatExam } from "@/modules/business-types";
import { RecoilRoot } from "recoil";
import React from "react";
import Body from "./containers/Body";

type Props = {
  initialExam: SatExam;
};

export default function Page({ initialExam }: Props) {
  return (
    <RecoilRoot>
      <Body initialExam={initialExam} />
    </RecoilRoot>
  );
}
