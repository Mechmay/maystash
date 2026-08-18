// People the assistant is allowed to acknowledge.
//
// Rules for adding anyone, and they are not negotiable:
//
//  1. THEY SAID YES. These are other people's facts, not May's. Nobody goes in
//     here who hasn't agreed to be described on a public website by a chatbot
//     that will repeat it to strangers on request.
//  2. PUBLIC-SAFE ONLY. Write only what that person already says about
//     themselves in public. No employer they haven't posted, no city, no
//     schedule, no anecdote they'd wince at, nothing about family.
//  3. ASSUME IT LEAKS. A card is in the model's context while it answers, and
//     the site's own CTF exists to prove that context can be talked out of a
//     model. If a line would be a problem in a screenshot, it doesn't go in.
//
// `triggers` are the words that pull a card into context — the card is only
// loaded when a visitor uses one, never preloaded. That is what stops the
// assistant greeting a stranger by a name they merely guessed, and stops the
// roster being extractable in one go: what isn't in the prompt can't be leaked
// from it.

export type Person = {
  /** How the assistant refers to them. Use whatever they'd want printed. */
  name: string;
  /** Words that bring this card into context. Keep them specific. */
  triggers: string[];
  /** The only thing that may be said. One or two sentences, public-safe. */
  publicFacts: string;
};

export const PEOPLE: Person[] = [
  // Empty on purpose — see rule 1. Add someone only after they've said yes.
  //
  // {
  //   name: 'Ada',
  //   triggers: ['ada', 'ada l'],
  //   publicFacts:
  //     "We worked together on an open-source project a while back — she's the " +
  //     'reason half of it compiles. She writes about compilers publicly.',
  // },
];
