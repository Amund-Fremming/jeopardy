# Jeopardy Rules

**Board:** 6×5 grid (30 cells) = 1 header row + 5 value rows, 5 categories

**Values:** Jeopardy: $200-1000 | Double Jeopardy: $400-2000 (2x)

**Daily Doubles:** 1 in Jeopardy, 2 in Double Jeopardy (hidden)

**Gameplay:**

1. Select category+value → Host shows clue (as answer)
2. Respond as question ("What/Who is...")
3. Correct: +value, pick next | Wrong: -value, others try
4. Daily Double: Solo answer, wager $5-max(score,highest_clue), then +/-wager

**Data:**

```ts
interface Clue {
  category: string;
  value: number;
  question: string;
  answer: string;
  isDailyDouble: boolean;
  isAnswered: boolean;
}
interface Board {
  categories: string[5];
  clues: Clue[5][5];
  round: "jeopardy" | "double-jeopardy";
}
```

**Flow:** Jeopardy → Double Jeopardy → Final Jeopardy (single clue, all wager)
