---
title: "Your Burger Drinks More Than Your Chatbot. So Why Are the Wells Running Dry?"
tagline: "The no-jargon, one-stop guide to AI and water: what a prompt actually costs, what everything else costs, what the tech giants are promising, and why the town next door to the data center is still right to be worried."
date: 2026-07-13
chapter: "M1"
section: "matinee"
tags: ["ai", "water", "data-centers", "environment", "explainers"]
draft: true
---

INT. A BACKYARD BARBECUE — SATURDAY AFTERNOON.

Someone flips a burger. Someone else, phone in hand, says: "You know every ChatGPT question uses a bottle of water, right?" Heads nod. The griller nods too, and slides a patty onto a bun — a patty that took roughly **2,500 liters of water** to exist. Nobody mentions that. Nobody knows it.

This article is the thing I wish someone could hand that table. Not a defense of AI, not a takedown — a full picture, in kitchen units, with receipts. By the end you'll know what your AI use actually costs in water, how it stacks against burgers and jeans and golf, what the companies are doing about it, what they're hiding, and — this is the important part — why people living next to data centers are still allowed to be angry even though the viral numbers are mostly wrong.

Grab a drink. Ironically.

## The number everyone quotes

The claim you've heard — "one AI email uses a bottle of water" — is real. It comes from researchers at UC Riverside, whose paper ["Making AI Less Thirsty"](https://arxiv.org/abs/2304.03271) estimated that generating a 100-word email with GPT-4 consumes about **519 milliliters** of water, and that GPT-3 "drinks" a 500 ml bottle for every 10–50 responses. The Washington Post ran it, and the bottle-per-email stat became the thing everyone knows about AI.

The companies say something wildly different. Sam Altman claims the average ChatGPT query uses **0.32 ml** — a fifteenth of a teaspoon. Google published an actual technical paper putting a median Gemini prompt at [**0.26 ml, about five drops**](https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference).

So which is it — a bottle or five drops? A 2,000x disagreement isn't a rounding error. Here's the trick, and it's the single most useful thing in this article: **they're measuring different things, and both are telling the truth about the thing they measured.**

- Google's five drops count only the water evaporated *at the data center* to cool the machines.
- The academics also count the water consumed *at the power plant* generating the electricity — because making electricity boils off water too, typically **2 to 10 times more** than the data center itself uses on site.
- The biggest numbers additionally spread the enormous one-time cost of *training* the model across every query.

Same reality, three different fences drawn around it. Whenever you see an AI water number, your first question should be: *which fence?*

A fair, fence-in-the-middle answer for one ordinary chatbot exchange today: **somewhere between a few drops and a shot glass.** [Mistral, the French AI lab that published the first full independent audit of a model's footprint](https://www.forbes.com/sites/janakirammsv/2025/07/28/mistral-ais-environmental-audit-puts-spotlight-on-ais-hidden-costs/), landed at **45 ml per page of generated text** — everything included, training and all. Three tablespoons.

## What everything else costs

Now the part nobody at the barbecue knows. All figures are established water-footprint research (sources linked); AI numbers use the honest middle fence.

| One of these… | …costs about this much water |
|---|---|
| AI chatbot answer | 0.3 ml – 50 ml (drops to a shot glass) |
| Full page of AI text, *everything* included | ~45 ml (3 tablespoons) |
| Google search (pre-AI) | ~0.5 ml |
| Cup of coffee | [~140 liters](https://www.waterfootprint.org/resources/Hoekstra-2008-WaterfootprintFood.pdf) — a bathtub |
| One almond | [~12 liters](https://www.sciencedirect.com/science/article/pii/S1470160X17308592) |
| Bar of chocolate (100g) | [~1,700 liters](https://www.waterfootprint.org/resources/interactive-tools/product-gallery/) |
| Cotton t-shirt | ~2,700 liters |
| Hamburger | [~2,500 liters](https://watercalculator.org/footprint/what-is-the-water-footprint-of/) — 16 bathtubs |
| Pair of jeans | 3,800–7,500 liters (estimates vary) |
| 1 kg of beef | [~15,400 liters](https://www.waterfootprint.org/resources/interactive-tools/product-gallery/) |

Read that again: the burger costs as much water as roughly **50,000 chatbot conversations** — and that's using the *pessimistic* AI number. Using Google's five drops, it's millions.

Zoom out from products to industries and the pattern holds:

- **Agriculture takes ~70% of all freshwater humans use worldwide.** Everything else fights over the rest.
- **US golf courses use about [1.5 billion gallons of water a day](https://www.gcsaa.org/docs/default-source/environment/22_waterreport_web.pdf).** All US data centers combined — every cloud, every AI model — directly consumed [about 17.4 billion gallons in the whole of 2023](https://eta.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report), per the US government's own Berkeley Lab report. Golf out-drinks the entire American internet roughly **thirty times over**.
- **One company, TSMC** — which makes the chips AI runs on — uses [more water per year than every US data center combined](https://cwrrr.org/resources/analysis-reviews/can-tsmc-taiwan-manage-water-to-save-global-electronics/).
- All US data centers together: about **0.02%** of the country's water withdrawals.

One honesty footnote, because this article's whole job is fairness: most of a burger's footprint is *rain falling on pasture and feed crops* — water that would have fallen anyway. Data centers drink *treated, drinkable water from pipes and aquifers*, which is scarcer and more contested. The burger comparison is real, but it flatters the burger a little less than it seems and the data center a little less than tech companies would like. Keep both halves.

## Where the water actually goes

A data center is thousands of computers in a warehouse, and computers turn electricity into heat. You have three ways to get rid of heat, and each makes a different deal with your water bill:

**Sweating (evaporative cooling).** Run warm water past the hot air and let it evaporate — exactly how your body cools. Cheap, uses little electricity, but the water literally leaves as vapor. This is where "data centers consume water" comes from.

**Fans (air cooling).** No water on site — but far more electricity, and power plants boil off water to make electricity. You didn't eliminate the water; you moved it out of town, to whoever lives near the power plant.

**A sealed loop (liquid cooling).** Fill pipes once, recirculate forever, like your car's radiator. [OpenAI's giant new Texas site fills up once — about 8 million gallons — then tops up so little that its annual water use resembles an office building's](https://epoch.ai/publications/openai-stargate-where-the-us-sites-stand). The catch: rejecting heat without evaporation takes extra power, so again, some water cost slips off-site to the grid.

That's the whole physics. There is no zero-water option — only choices about *whose* water, *where*. Even the nuclear-powered data centers now being planned solve carbon, not water: nuclear plants are themselves heavy water users. The honest fix is pairing efficient cooling with wind and solar, which need almost no water at all.

## The word "consumed" is doing a lot of work

Here's the part that quietly reframes the whole panic: **the water isn't destroyed. It's moved.** Nothing a data center does deletes an H₂O molecule. Water that "sweats" out of a cooling tower rises as vapor and falls again as rain — somewhere. The catch is that "somewhere" is almost never the same town. Evaporative cooling [consumptively removes 70–90% of the water it withdraws from the local watershed](https://arxiv.org/pdf/2606.21760) — pulled from a specific lake, river, or aquifer (often the very one that supplies drinking water), then handed to the sky to fall who-knows-where. That is all "consumed" means on a water bill: not gone from Earth, gone from *here*.

And the portion that *doesn't* evaporate isn't thrown away. In a typical setup the same water is [cycled through the cooling system 2 to 5 times, then sent back to the local treatment plant and released into the watershed](https://local.microsoft.com/blog/understanding-water-use-at-microsoft-datacenters/) it came from. So the accurate sentence isn't "AI is drinking the planet dry." It's: *AI relocates a town's water into the atmosphere, and whether that town gets it back is left to the weather.* Less scary, more precise — and it points straight at the real fix, which is to stop evaporating the water in the first place.

## The scoreboard nobody will publish

Here's what each AI company has actually told the world about what one use of their product costs in water:

| Model | Published water number? |
|---|---|
| Google Gemini | ✅ 0.26 ml/prompt — [real methodology paper](https://arxiv.org/html/2508.15734v1), but on-site water only |
| Mistral (Le Chat) | ✅ 45 ml/page — [the only full independent audit](https://www.deeplearning.ai/the-batch/french-ai-startup-discloses-full-lifecycle-consumption-and-emissions-for-mistral-large-2) |
| OpenAI ChatGPT | ⚠️ 0.32 ml — one sentence in a blog post, no methodology, ever |
| Anthropic Claude (Haiku, Sonnet, Opus, the Claude 5 family) | ❌ Nothing. No per-model figure, no environmental report, for any model |
| Meta Llama | ❌ Energy and carbon in model cards; water — nothing |
| xAI Grok | ❌ Nothing |
| DeepSeek | ❌ Nothing (outside researchers estimate its R1 reasoning model is among the thirstiest — [150+ ml on long queries](https://arxiv.org/abs/2505.09598)) |
| Microsoft Muse (game-generation model) | ❌ Nothing |

Full disclosure: this article was researched and drafted with Claude — a model whose maker is on the ❌ row. Those research sessions cost water. I can't tell you how much, *because nobody can*, and that's precisely the point of the row.

Two patterns worth carrying home. First, **bigger and chattier costs more**: Mistral's audit found impact scales roughly linearly with model size, and the new "reasoning" models that think in long chains before answering can use 30–70x the resources of small ones. A quick answer from a small model genuinely is drops; a long philosophical essay from a giant reasoning model genuinely is a glass. Second, **the numbers fall fast** — Google claims the energy per Gemini prompt dropped 33x in one year. Any scary per-query figure you read is probably already stale.

## What the companies are doing about it

More than critics admit; less than the press releases imply. The current state of play:

- **Microsoft** pledged in 2020 to be "water positive" by 2030 — put back more than it takes — and [claims it got there in 2025, five years early](https://www.esgtoday.com/microsoft-hits-water-positive-target-5-years-ahead-of-2030-goal/), funding wetlands, leak repair, and clean-water access. More concretely: [every data center it designs since late 2024 uses sealed-loop cooling with **zero** evaporative water](https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/) — about 125 million liters a year saved per site.
- **Google** pledged to replenish 120% of what it consumes by 2030, and reports reaching [~78% in 2025](https://blog.google/company-news/outreach-and-initiatives/sustainability/2026-environmental-report/). It's also the only company that *defends* using water: it argues evaporative cooling saves so much electricity that it's the better climate deal where watersheds are healthy — and it has switched designs to air cooling in drought-hit places (Chile, Uruguay) after communities pushed back.
- **Amazon (AWS)** claims [75% of the way to water positive](https://sustainability.aboutamazon.com/natural-resources/water), runs the most water-frugal big fleet, cools two dozen sites with recycled wastewater (expanding to 120+), and in Oregon hands up to 96% of its used cooling water to farmers for irrigation.
- **Meta** pledges water positive by 2030 and — credit where due — is the one whose restoration numbers are [verified by an outside firm](https://sustainability.atmeta.com/blog/2024/12/12/an-approach-to-water-restoration-that-benefits-communities-and-the-environment/).
- **OpenAI's** flagship sites use the sealed-loop design. **xAI** promised Memphis an $80M recycling plant so its supercomputer stops drinking from the city's drinking-water aquifer — then [paused construction to build more computers first](https://www.eenews.net/articles/xai-sidelines-major-water-reuse-project-as-ipo-looms/), now promising completion by 2027. Make of that ordering what you will.
- **Anthropic** has made no water commitments at all; its models run inside Amazon's and Google's clouds, so its footprint hides inside their reports.

Under those pledges sit a few actual techniques — the engineering, not the PR. Worth knowing them, because this is where the real progress is:

- **Recycle the same water 2–5 times** before discharging it, instead of once-through. Standard practice now, and the reason a data center's *consumption* is far below its *withdrawal*. ([Microsoft](https://local.microsoft.com/blog/understanding-water-use-at-microsoft-datacenters/))
- **Drink water nobody else wants.** Treated sewage (reclaimed water) and industrial greywater instead of drinking water — [closed-loop systems can cut freshwater use up to 70%](https://www.eesi.org/articles/view/data-centers-and-water-consumption). Microsoft's Quincy, Washington site [cut potable-water use 97% and returns 1.5 million cubic meters a year back to the community for drinking](https://local.microsoft.com/blog/understanding-water-use-at-microsoft-datacenters/).
- **Catch the rain.** On-site rainwater harvesting now feeds cooling at [Microsoft sites in the Netherlands and Ireland](https://local.microsoft.com/blog/understanding-water-use-at-microsoft-datacenters/), expanding to a dozen more countries.
- **Hand the leftovers to farmers.** In Oregon, AWS gives up to 96% of its used cooling water to local growers for irrigation (above).
- **Close the loop completely** with direct-to-chip liquid cooling — fill once, recirculate forever, zero evaporation (the Microsoft and Stargate designs above).

Now the comparison the barbecue never makes. A hamburger's water can't be recycled — once it's soaked into the corn and the cow, it's locked in the food and gone. A cotton t-shirt's ~2,700 liters mostly evaporate off a field with no pipe to catch it. Farms and golf courses *can* mitigate — [reclaimed water and subsurface drip irrigation that waters roots without evaporating are established practice](https://link.springer.com/chapter/10.1007/978-3-031-88396-5_5) — but agriculture, the thing using ~70% of all freshwater, still has no loop to close on most of it. A data center is, oddly, one of the few giant water users that can send most of its water *straight back to the tap*. That doesn't make the industry saintly — the sites that don't bother, or that hide their meter, have earned every protest. But the ceiling for doing better is genuinely higher for a data center than for your dinner, and that's a point almost nobody makes because it cuts against both sides' talking points at once.

The fine print that applies to every pledge above: "water positive" math counts *funded restoration projects* against *direct operational use only* — the water embedded in their electricity doesn't count, and almost none of the claims are independently audited. Directionally real. Precisely unverifiable.

## Why the neighbors are still right

Everything so far says AI's water use is nationally tiny and improving. So why the protests, lawsuits, and 7–0 council votes? Because **water is never national. Water is a specific pipe in a specific town.**

- **The Dalles, Oregon:** Google's data centers grew to use [over a quarter of the entire city's water](https://www.datacenterdynamics.com/en/news/we-now-know-how-much-water-googles-oregon-data-centers-use-after-city-drops-lawsuit-against-journalists/) — and the city, with Google footing the legal bills, spent 13 months in court trying to keep that number secret from a newspaper.
- **West Des Moines, Iowa:** the month GPT-4 finished training, Microsoft's cluster there pumped [11.5 million gallons — 6% of the district's water — during a three-year drought](https://www.thegazette.com/business/artificial-intelligence-technology-behind-chatgpt-was-built-in-iowa-with-a-lot-of-water/).
- **Newton County, Georgia:** after Meta built a $750M data center, [neighbors' wells failed or turned to sediment](https://ppc.land/meta-data-center-impacts-local-water-supply-in-newton-county/); the facility uses about 10% of the county's water and the county now projects a deficit by 2030. (Meta disputes causing the well failures.) In a separate Georgia case, a data center quietly used 29 million gallons over 15 months before anyone noticed — via *low water pressure*.
- **Memphis:** xAI's machines sit above — and drink from — the aquifer the whole city gets drinking water from.
- **Uruguay and Chile:** Google projects sparked protests during record droughts and got redesigned to air cooling; **Tucson, Arizona** rejected an Amazon-linked campus 7–0.

Notice the shape of every story: it's rarely "the number was huge" — it's "the number was *hidden*, in a place that couldn't spare it." A data center using 0.02% of America's water can still be 25% of one town's. Averages don't live anywhere. People do.

And notice where the buildings go: Northern Virginia (the world's biggest cluster, where drinking-water use by data centers tripled in four years), drought-stressed Phoenix, Dallas, Columbus, Atlanta — and abroad: Ireland (data centers now eat 23% of the *electricity*), Spain's driest region, Mexican towns rationed to water three days a week, India's chronically stressed cities. Cheap land and cheap power decide the map. The water is usually someone else's problem. That, not your chatbot habit, is the real story.

## What nobody knows (including the companies)

The unknown unknowns, so you can't be blindsided:

- **No company publishes per-model numbers across its lineup.** One median from Google, one blog sentence from OpenAI, one audit from little Mistral. That's the entire global disclosure.
- **Rented data centers are invisible.** Much AI compute runs in third-party buildings that appear in nobody's environmental report.
- **The chips have their own water bill.** A semiconductor fab drinks ~10 million gallons of ultrapure water *a day*, and nobody allocates that to the GPUs it produces.
- **America's water data is a decade old.** The last full US water census is from 2015; the government stopped doing them. Regulators are mapping a flood with a ten-year-old photograph. In Texas, most data centers simply [ignored the state's voluntary water survey](https://www.texastribune.org/2026/06/23/texas-data-centers-puc-water-survey/).
- **No law requires disclosure.** A US bill to standardize AI environmental reporting has been introduced twice and passed zero times; the EU's AI Act asks about energy but not water.

The pattern: the problem isn't that AI's water use is monstrous. It's that it's **unaudited, self-reported, and locally concentrated** — the exact conditions under which small problems get to become big ones quietly.

## The three lines to remember

You now know more about this than almost everyone who'll ever bring it up. The barbecue cheat sheet:

1. **"Your burger used more water than a year of your chatbot questions — but check who measured, because AI companies count only the water on their own property."**
2. **"Nationally it's a rounding error — golf uses thirty times more. Locally it can be a quarter of a town's water supply, and that's where the fights are real."**
3. **"The scandal isn't the drinking. It's the secrecy: only one AI lab — Mistral, the small French one — has published a full, independently audited water bill. Not OpenAI, not Google, not Anthropic."**

The water isn't the con. The missing receipts are. And you should say so — right after you ask how many liters are in that burger.
