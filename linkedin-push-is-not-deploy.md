# LinkedIn — observation, "push is not deploy" (2026-10-03)
# Short post, ~85 words. Self-own shape. No link, no image needed.
# Safe to post: no offer, no CTA, no client, no pricing. Not OBA-gated.
# Source: this actually happened 2026-09-09/10. See memory content-machine-deploy-is-scp.

---

I fixed a bug, committed it, pushed it, and said it was fixed.

Then the alerts kept coming. Four more.

The server does not pull from git. It never has. Deploying means me copying a file onto it, which I had not done.

What gave it away was a database column. I had added it that morning. It was still empty after the job ran, which means the job that ran was older than the column.
