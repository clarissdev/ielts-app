"use client";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
  value: {
    fallback: {
      [key: string]: unknown;
    };
  };
};

export function SWRProvider({ children, value }: Props) {
  return <SWRConfig value={value}>{children}</SWRConfig>;
}
