import React from "react";
import areEqual from "deep-equal";
import { Selection, Editor } from "slate";
import { useRecoilCallback } from "recoil";
import { commentThreadsState } from "./utils";
import { commentThreadIdsState } from "./utils";

export const SetActiveCommentThreadIdContext = React.createContext(null);

export function useSelection(
  editor: Editor
): [Selection, (value: Selection) => void] {
  const [selection, setSelection] = React.useState<Selection>(editor.selection);
  const setSelectionOptimized = React.useCallback(
    (newSelection: Selection) => {
      // don't update the component state if selection hasn't changed.
      if (areEqual(selection, newSelection)) {
        return;
      }
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [selection as Selection, setSelectionOptimized];
}

export function useAddCommentThreadCallback() {
  return useRecoilCallback(
    ({ set }) =>
      (id: string, comment: string) => {
        set(
          commentThreadIdsState,
          (ids: Set<string>) => new Set([...Array.from(ids), id])
        );
        set(commentThreadsState(id), comment);
      },
    []
  );
}

export function useRemoveCommentThreadCallback() {
  return useRecoilCallback(
    ({ set }) =>
      (id: string) => {
        set(commentThreadIdsState, (ids: Set<string>) => {
          ids.delete(id);
          return ids;
        });
        set(commentThreadsState(id), null);
      },
    []
  );
}
