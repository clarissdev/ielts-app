import { Db } from "mongodb";

import { GetUserDetailsList$Result } from "./typing";

export async function handler$GetUserDetailsList(db: Db) {
  const readingAgg = [
    {
      $lookup: {
        from: "submission-reading",
        let: { userId: { $toString: "$_id" } },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$createdBy", "$$userId"] }
            }
          },
          { $limit: 1 }
        ],
        as: "gradeReading"
      }
    },
    {
      $unwind: {
        path: "$gradeReading",
        preserveNullAndEmptyArrays: true
      }
    }
  ];

  const listeningAgg = [
    {
      $lookup: {
        from: "submission-listening",
        let: { userId: { $toString: "$_id" } },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$createdBy", "$$userId"] }
            }
          },
          { $limit: 1 }
        ],
        as: "gradeListening"
      }
    },
    {
      $unwind: {
        path: "$gradeListening",
        preserveNullAndEmptyArrays: true
      }
    }
  ];

  const writingAgg = [
    {
      $lookup: {
        from: "submission-writing",
        let: { userId: { $toString: "$_id" } },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$createdBy", "$$userId"] }
            }
          },
          { $limit: 1 }
        ],
        as: "gradeWriting"
      }
    },
    {
      $unwind: {
        path: "$gradeWriting",
        preserveNullAndEmptyArrays: true
      }
    }
  ];

  const agg = [...readingAgg, ...listeningAgg, ...writingAgg];
  const docs = await db.collection("user").aggregate(agg).toArray();

  return GetUserDetailsList$Result.parse(
    docs.map((doc) => ({
      ...doc,
      userId: doc._id.toHexString(),
      gradeReading: doc.gradeReading?.grade,
      gradeListening: doc.gradeListening?.grade,
      gradeWriting: doc.gradeWriting?.grade
    }))
  );
}
