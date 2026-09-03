# LinkedIn — self-only (CH.06, the TikTok own-account finding)

**Sequence: publish the blog first, then post this — the link in the first comment must resolve.**
Put the link in the FIRST COMMENT, not the body.
Link: https://maystash.xyz/posts/self-only/
Image: `public/art/self-only-01.jpg` (attach as the post image).

**Safe to post: no offer, no CTA — technical write-up, not OBA-gated.**

---

I wanted a script that posts my own content to my own TikTok. TikTok's docs made it sound like weeks of work.

To post directly to a profile, their API says your app needs an audit: public product URL, privacy policy, a recorded demo of the whole flow, evidence of a finished product. Until you pass, every post the API makes is forced private. Visible to nobody but you. The sandbox doesn't lift it either.

So most people grind through the review or give up.

There's a third door, and it was unlocked the whole time.

The API has two ways to publish, and everyone reads them as the fast and slow lane of one road. They're different roads.

One sends the content and it goes live with no human involved. Fully unattended. That's the one the audit guards, and it's the one forced private until you're reviewed.

The other hands the finished post into your account's own inbox as a draft. Then you, on your phone, tap the notification and publish it through TikTok's normal screen.

That second path needs no audit. And a draft delivered that way (from an app I never submitted for review, running on sandbox credentials) publishes as an ordinary, fully public post.

I didn't take TikTok's word for that. I published one and read it back from TikTok's public, unauthenticated embed endpoint: the thing anyone on the internet sees, no login, no token. The flag that marks a post private read false. All eight images, my caption, my account. Public to the world, from an app that was never reviewed.

Here's the reframe, and it's the sentence I wish the docs led with:

TikTok's own-account gate isn't "no access." It's "no UNATTENDED access."

Posting to your own account with a human tapping publish is free and needs nothing. The audit only buys two things on top: posting to other people's accounts, and removing the human tap. If you need neither, you're done today.

And that shape repeats everywhere. I've now looked at the same question across TikTok, Instagram, YouTube, X, and LinkedIn is actually the friendliest of the lot for this: posting to your own profile is self-serve, no partner review at all. The thing that decides whether a platform is cheap or expensive to automate is one question: can I post publicly to my OWN account without a review? It splits the board, and it doesn't follow platform size or reputation.

Two things that cost me hours, in case they save you some:

The draft doesn't land in your Drafts folder. It's an inbox notification in the mobile app, a surface that doesn't exist on the website. I was sure the post had failed because I was looking in the wrong place for a thing that had arrived perfectly.

The config form saves nothing while looking like it's saving. Click save with any field missing and it fires no request at all. But an on-screen error counter ticks down as you fill fields, which feels exactly like progress. Everything lives in the browser tab until the form is 100% complete, and one reload wipes it. The only honest check is a hard reload.

Both are the same lesson, and it's the one under the whole thing: a hopeful signal is not a confirmed state. The success message, the counter going down, the word "draft": each was a story the interface told me, and each was wrong. The only things I trusted were the view from the public street and the state that survived a hard reload.

Full write-up in the comments.
