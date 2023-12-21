export type Score =
  | 1
  | 3
  | 3.5
  | 4
  | 4.5
  | 5
  | 5.5
  | 6
  | 6.5
  | 7
  | 7.5
  | 8
  | 8.5
  | 9;

const SCORE_TO_DESCRIPTION: Record<
  string,
  { skillLevel: string; description: string } | undefined
> = {
  "9": {
    skillLevel: "Expert user",
    description:
      "You have a full operational command of the language. Your use of English is appropriate, accurate and fluent, and you show complete understanding."
  },
  "8.5": {
    skillLevel: "Very good user",
    description:
      "You have a fully operational command of the language with only occasional unsystematic inaccuracies and inappropriate usage. You may misunderstand some things in unfamiliar situations. You handle complex detailed argumentation well."
  },
  "8": {
    skillLevel: "Very good user",
    description:
      "You have a fully operational command of the language with only occasional unsystematic inaccuracies and inappropriate usage. You may misunderstand some things in unfamiliar situations. You handle complex detailed argumentation well."
  },
  "7.5": {
    skillLevel: "Good user",
    description:
      "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally you handle complex language well and understand detailed reasoning."
  },
  "7": {
    skillLevel: "Good user",
    description:
      "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally you handle complex language well and understand detailed reasoning."
  },
  "6.5": {
    skillLevel: "Competent user",
    description:
      "Generally you have an effective command of the language despite some inaccuracies, inappropriate usage and misunderstandings. You can use and understand fairly complex language, particularly in familiar situations."
  },
  "6": {
    skillLevel: "Competent user",
    description:
      "Generally you have an effective command of the language despite some inaccuracies, inappropriate usage and misunderstandings. You can use and understand fairly complex language, particularly in familiar situations."
  },
  "5.5": {
    skillLevel: "Modest user",
    description:
      "You have a partial command of the language, and cope with overall meaning in most situations, although you are likely to make many mistakes. You should be able to handle basic communication in your own field."
  },
  "5": {
    skillLevel: "Modest user",
    description:
      "You have a partial command of the language, and cope with overall meaning in most situations, although you are likely to make many mistakes. You should be able to handle basic communication in your own field."
  },
  "4.5": {
    skillLevel: "Limited user",
    description:
      "Your basic competence is limited to familiar situations. You frequently show problems in understanding and expression. You are not able to use complex language."
  },
  "4": {
    skillLevel: "Limited user",
    description:
      "Your basic competence is limited to familiar situations. You frequently show problems in understanding and expression. You are not able to use complex language."
  },
  "3.5": {
    skillLevel: "Extremely limited user",
    description:
      "You convey and understand only general meaning in very familiar situations. There are frequent breakdowns in communication."
  },
  "3": {
    skillLevel: "Extremely limited user",
    description:
      "You convey and understand only general meaning in very familiar situations. There are frequent breakdowns in communication."
  }
};

export function getScoreFromNumCorrectQuestions(numCorrectQuestions: number) {
  if (numCorrectQuestions >= 39 && numCorrectQuestions <= 40) return 9;
  if (numCorrectQuestions >= 37 && numCorrectQuestions <= 38) return 8.5;
  if (numCorrectQuestions >= 35 && numCorrectQuestions <= 36) return 8;
  if (numCorrectQuestions >= 33 && numCorrectQuestions <= 34) return 7.5;
  if (numCorrectQuestions >= 30 && numCorrectQuestions <= 32) return 7;
  if (numCorrectQuestions >= 27 && numCorrectQuestions <= 29) return 6.5;
  if (numCorrectQuestions >= 23 && numCorrectQuestions <= 26) return 6;
  if (numCorrectQuestions >= 19 && numCorrectQuestions <= 22) return 5.5;
  if (numCorrectQuestions >= 15 && numCorrectQuestions <= 18) return 5;
  if (numCorrectQuestions >= 13 && numCorrectQuestions <= 14) return 4.5;
  if (numCorrectQuestions >= 10 && numCorrectQuestions <= 12) return 4;
  if (numCorrectQuestions >= 8 && numCorrectQuestions <= 9) return 3.5;
  if (numCorrectQuestions >= 6 && numCorrectQuestions <= 7) return 3;
  return 1;
}

export function getDescriptionFromScore(score: Score) {
  return SCORE_TO_DESCRIPTION[String(score)];
}
