import { atomFamily, atom } from "recoil";
import {
  Editor,
  Element as SlateElement,
  Text,
  Location,
  NodeEntry,
  BaseText
} from "slate";
import { v4 as uuidv4 } from "uuid";

export type Comment = string;
export type FontSize = "standard" | "large" | "extra-large";
export type Color = "standard" | "blue";

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return marks ? (marks as any)[format] === true : false;
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export function getNodeEntryAtSelection(editor: Editor) {
  if (editor.selection == null) {
    return null;
  }

  const textNodeEntry = Editor.nodes(editor, {
    at: editor.selection,
    mode: "lowest"
  }).next().value;

  return textNodeEntry;
}

export const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (n as any)["type"] === format
    })
  );
  return !!match;
};

export const COMMENT_THREAD_PREFIX = "commentThread_";

export function getMarkForCommentThreadId(threadId: string) {
  return `${COMMENT_THREAD_PREFIX}${threadId}`;
}

export function getCommentThreadsOnTextNode(
  textNode: Text | Omit<BaseText, "text">
) {
  return new Set(
    // Because marks are just properties on nodes,
    // we can simply use Object.keys() here.
    Object.keys(textNode)
      .filter(isCommentThreadIdMark)
      .map(getCommentThreadIdFromMark)
  );
}

export function getCommentThreadIdFromMark(mark: string) {
  if (!isCommentThreadIdMark(mark)) {
    throw new Error("Expected mark to be of a comment thread");
  }
  return mark.replace(COMMENT_THREAD_PREFIX, "");
}

export function isCommentThreadIdMark(maybeCommentThread: string) {
  return maybeCommentThread.indexOf(COMMENT_THREAD_PREFIX) === 0;
}

export function getSmallestCommentThreadAtTextNode(
  editor: Editor,
  textNode: Text
) {
  const commentThreads = getCommentThreadsOnTextNode(textNode);
  const commentThreadsAsArray = Array.from(commentThreads);

  let shortestCommentThreadId = commentThreadsAsArray[0];

  const reverseTextNodeIterator = (slateEditor: Editor, nodePath?: Location) =>
    Editor.previous(slateEditor, {
      at: nodePath,
      mode: "lowest",
      match: Text.isText
    });

  const forwardTextNodeIterator = (slateEditor: Editor, nodePath?: Location) =>
    Editor.next(slateEditor, {
      at: nodePath,
      mode: "lowest",
      match: Text.isText
    });

  if (commentThreads.size > 1) {
    // The map here tracks the lengths of the comment threads.
    // We initialize the lengths with length of current text node
    // since all the comment threads span over the current text node
    // at the least.
    const commentThreadsLengthByID = new Map(
      commentThreadsAsArray.map((id) => [id, textNode.text.length])
    );

    // traverse in the reverse direction and update the map
    updateCommentThreadLengthMap(
      editor,
      commentThreads,
      reverseTextNodeIterator,
      commentThreadsLengthByID
    );

    // traverse in the forward direction and update the map
    updateCommentThreadLengthMap(
      editor,
      commentThreads,
      forwardTextNodeIterator,
      commentThreadsLengthByID
    );

    let minLength = Number.POSITIVE_INFINITY;

    // Find the thread with the shortest length.
    for (const [threadId, length] of Array.from(commentThreadsLengthByID)) {
      if (length < minLength) {
        shortestCommentThreadId = threadId;
        minLength = length;
      }
    }
  }

  return shortestCommentThreadId;
}

function updateCommentThreadLengthMap(
  editor: Editor,
  commentThreads: Set<string>,
  nodeIterator: (
    slateEditor: Editor,
    nodePath?: Location
  ) => NodeEntry<Text> | undefined,
  map: Map<string, number>
) {
  let nextNodeEntry = nodeIterator(editor);

  while (nextNodeEntry != null) {
    const nextNode = nextNodeEntry[0];
    const commentThreadsOnNextNode = getCommentThreadsOnTextNode(nextNode);

    const intersection = Array.from(commentThreadsOnNextNode).filter((x) =>
      commentThreads.has(x)
    );

    // All comment threads we're looking for have already ended meaning
    // reached an uncommented text node OR a commented text node which
    // has none of the comment threads we care about.
    if (intersection.length === 0) {
      break;
    }

    // update thread lengths for comment threads we did find on this
    // text node.
    for (let i = 0; i < intersection.length; i++) {
      const value = map.get(intersection[i]) || 0;
      map.set(intersection[i], value + nextNode.text.length);
    }

    // call the iterator to get the next text node to consider
    nextNodeEntry = nodeIterator(editor, nextNodeEntry[1]);
  }

  return map;
}

export const fontSizeState = atom<FontSize>({
  key: "fontSize",
  default: "standard"
});

export const colorState = atom<Color>({
  key: "color",
  default: "standard"
});

export const answersState = atom<Record<string, string>>({
  key: "answers",
  default: {}
});

export const commentThreadsState = atomFamily<string | null, string>({
  key: "commentThreads",
  default: null
});

export const commentThreadIdsState = atom({
  key: "commentThreadIds",
  default: new Set<string>([])
});

export function insertCommentThread(
  editor: Editor,
  addCommentThread: (id: string, comment: string) => void
) {
  const threadId = uuidv4();
  addCommentThread(threadId, "");
  Editor.addMark(editor, getMarkForCommentThreadId(threadId), true);
  return threadId;
}
