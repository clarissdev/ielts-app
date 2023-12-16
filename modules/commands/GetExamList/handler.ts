import { Db } from "mongodb";
import { extractSearchTerms } from "../utils";
import { Params } from "./typing";
import { Exam } from "@/modules/business-types";

function fromTerm(term: string) {
  const regex = term.replace(/[^\w]/, ".");
  return {
    $or: [
      { title: { $regex: regex, $options: "i" } },
      { description: { $regex: regex, $options: "i" } },
    ],
  };
}

function fromSearchQuery(text: string) {
  const { tags, searchTerms } = extractSearchTerms(text);

  return {
    ...(searchTerms.length
      ? { $and: searchTerms.map((term) => fromTerm(term)) }
      : {}),
    ...(tags.length ? { tags: { $all: tags } } : {}),
  };
}

export async function handler$GetExamList(
  db: Db,
  { createdBy, year, searchQuery, offset, limit }: Params
) {
  const query = searchQuery ? fromSearchQuery(searchQuery) : undefined;
  const matchQuery = [...(query ? [{ $match: query }] : [])];

  const countAggs: any[] = [
    ...(createdBy ? [{ $match: { createdBy: createdBy } }] : []),
    ...matchQuery,
    ...(year != null ? [{ $match: { year: year } }] : []),
  ];

  const pagingTerm = [
    ...(offset ? [{ $skip: offset }] : []),
    ...(limit != undefined ? [{ $limit: limit || 1 }] : []),
  ];

  const aggs = [
    ...countAggs,
    { $facet: { data: [...pagingTerm], pagination: [{ $count: "total" }] } },
  ];

  const aggResults = await db.collection("exam").aggregate(aggs).toArray();

  if (!aggResults[0]) {
    return { artworks: [], count: 0 };
  }

  const docs = aggResults[0].data;
  const count = Number(aggResults[0].pagination[0]?.total ?? 0);
  const exams: Exam[] = docs.map((doc: any) => {
    const examId = doc._id.toHexString();
    return Exam.parse({ examId, ...doc });
  });
  return { exams, count };
}
