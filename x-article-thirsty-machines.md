# X Article — thirsty-machines

Post via X's Article composer (long-form), not a thread. Paste body below. Cover image: `public/og/thirsty-machines.png`. Tables converted to bullet lists — X Article formatting doesn't reliably render markdown tables. Canonical link at bottom.

---

## Your Burger Drinks More Than Your Chatbot. So Why Are the Wells Running Dry?

Someone flips a burger at a backyard barbecue. Someone else, phone in hand, says: "You know every ChatGPT question uses a bottle of water, right?" Heads nod. The griller nods too, and slides a patty onto a bun — a patty that took roughly 2,500 liters of water to exist. Nobody mentions that. Nobody knows it.

This is the full picture, in kitchen units, with receipts. What your AI use actually costs in water, how it stacks against burgers and jeans and golf, what the companies are doing about it, what they're hiding, and — the important part — why people living next to data centers are still right to be angry even though the viral numbers are mostly wrong.

### The number everyone quotes

"One AI email uses a bottle of water" is real — UC Riverside's paper "Making AI Less Thirsty" estimated a 100-word GPT-4 email at ~519 ml, and a 500 ml bottle for every 10–50 GPT-3 responses. The companies say something wildly different: Sam Altman claims 0.32 ml per average ChatGPT query — a fifteenth of a teaspoon. Google's own technical paper puts a median Gemini prompt at 0.26 ml, about five drops.

A bottle, or five drops? 2,000x apart isn't a rounding error. Here's the trick: they're measuring different things, and both are telling the truth about the thing they measured.

- Google's five drops count only water evaporated at the data center to cool the machines.
- The academics also count water consumed at the power plant generating the electricity — making electricity boils off water too, typically 2–10x more than the data center itself uses on site.
- The biggest numbers additionally spread the one-time cost of training the model across every query.

Same reality, three different fences. Whenever you see an AI water number, ask: which fence?

Fair, fence-in-the-middle answer for one ordinary chatbot exchange today: somewhere between a few drops and a shot glass. Mistral — the French lab that published the first full independent audit of a model's footprint — landed at 45 ml per page of generated text, everything included, training and all. Three tablespoons.

### What everything else costs

The part nobody at the barbecue knows (AI figures use the honest middle fence):

- AI chatbot answer: 0.3–50 ml (drops to a shot glass)
- Full page of AI text, everything included: ~45 ml (3 tablespoons)
- Google search, pre-AI: ~0.5 ml
- Cup of coffee: ~140 liters — a bathtub
- One almond: ~12 liters
- Bar of chocolate (100g): ~1,700 liters
- Cotton t-shirt: ~2,700 liters
- Hamburger: ~2,500 liters — 16 bathtubs
- Pair of jeans: 3,800–7,500 liters
- 1 kg of beef: ~15,400 liters

The burger costs as much water as roughly 50,000 chatbot conversations — using the pessimistic AI number. Using Google's five drops, it's millions.

Zoom out to industries and the pattern holds. Agriculture takes ~70% of all freshwater humans use worldwide. US golf courses use about 1.5 billion gallons a day; all US data centers combined — every cloud, every AI model — consumed about 17.4 billion gallons in the whole of 2023, per Berkeley Lab. Golf out-drinks the entire American internet roughly thirty times over. TSMC, the one company making AI's chips, uses more water per year than every US data center combined. All US data centers together: about 0.02% of the country's water withdrawals.

One honesty footnote: most of a burger's footprint is rain falling on pasture and feed crops — water that would've fallen anyway. Data centers drink treated, drinkable water from pipes and aquifers, which is scarcer and more contested. The comparison is real, but it flatters the burger a little and the data center a little less than tech companies would like. Keep both halves.

### Where the water actually goes

A data center is thousands of computers turning electricity into heat. Three ways to shed that heat, three different deals with the water bill:

**Sweating (evaporative cooling)** — cheap, low-electricity, but the water leaves as vapor. This is where "data centers consume water" comes from.

**Fans (air cooling)** — no water on site, but far more electricity, and power plants boil off water to make electricity. You didn't eliminate the water, you moved it out of town.

**A sealed loop (liquid cooling)** — fill pipes once, recirculate forever, like a car radiator. OpenAI's giant new Texas site fills up once (~8M gallons) then tops up so little its annual water use resembles an office building's. Catch: rejecting heat without evaporation takes extra power, so some water cost still slips off-site to the grid.

No zero-water option — only choices about whose water, where. Even nuclear-powered data centers solve carbon, not water: nuclear plants are themselves heavy water users. The honest fix pairs efficient cooling with wind and solar, which need almost no water.

### The word "consumed" is doing a lot of work

The water isn't destroyed. It's moved. Evaporative cooling consumptively removes 70–90% of the water it withdraws from the local watershed — pulled from a specific lake, river, or aquifer, often the one that supplies drinking water, then handed to the sky to fall who-knows-where. That's all "consumed" means: not gone from Earth, gone from here. The portion that doesn't evaporate typically cycles through the cooling system 2–5 times, then goes back to the local treatment plant and into the watershed it came from.

So the accurate sentence isn't "AI is drinking the planet dry." It's: AI relocates a town's water into the atmosphere, and whether that town gets it back is left to the weather. Less scary, more precise — and it points straight at the real fix: stop evaporating the water in the first place.

### The scoreboard nobody will publish

What each AI company has actually told the world about what one use of their product costs in water:

- Google Gemini: published — 0.26 ml/prompt, real methodology paper, but on-site water only
- Mistral (Le Chat): published — 45 ml/page, the only full independent audit
- OpenAI ChatGPT: partial — 0.32 ml, one sentence in a blog post, no methodology, ever
- Anthropic Claude (Haiku, Sonnet, Opus, the Claude 5 family): nothing — no per-model figure, no environmental report, for any model
- Meta Llama: nothing on water (energy and carbon only, in model cards)
- xAI Grok: nothing
- DeepSeek: nothing (outside researchers estimate its R1 reasoning model among the thirstiest — 150+ ml on long queries)
- Microsoft Muse (game-generation model): nothing

Full disclosure: this article was researched and drafted with Claude — a model whose maker is on the "nothing" row. Those research sessions cost water. I can't tell you how much, because nobody can — that's precisely the point.

Two patterns worth carrying home. Bigger and chattier costs more: Mistral's audit found impact scales roughly linearly with model size, and "reasoning" models that think in long chains before answering can use 30–70x the resources of small ones. And the numbers fall fast — Google claims energy per Gemini prompt dropped 33x in one year. Any scary per-query figure you read is probably already stale.

### What the companies are doing about it

More than critics admit, less than the press releases imply:

- Microsoft pledged "water positive" by 2030, claims it got there in 2025 five years early; every data center it's designed since late 2024 uses sealed-loop cooling with zero evaporative water — ~125 million liters/year saved per site.
- Google pledged to replenish 120% of what it consumes by 2030, reports ~78% in 2025. Also the only company that defends using water — argues evaporative cooling saves so much electricity it's the better climate deal where watersheds are healthy — and switched to air cooling in Chile/Uruguay after drought-era pushback.
- Amazon (AWS) claims 75% of the way to water positive, runs the most water-frugal big fleet, cools two dozen sites with recycled wastewater, and in Oregon hands up to 96% of used cooling water to farmers for irrigation.
- Meta pledges water positive by 2030 — the one whose restoration numbers are verified by an outside firm.
- OpenAI's flagship sites use sealed-loop design. xAI promised Memphis an $80M recycling plant so its supercomputer stops drinking from the city's drinking-water aquifer — then paused construction to build more computers first, now promising completion by 2027.
- Anthropic has made no water commitments at all; its models run inside Amazon's and Google's clouds, so its footprint hides inside their reports.

The real engineering under the pledges: recycling the same water 2–5 times before discharge; using treated sewage and industrial greywater instead of drinking water (closed-loop can cut freshwater use up to 70%; Microsoft's Quincy, WA site cut potable-water use 97%); on-site rainwater harvesting; handing leftovers to farmers; closing the loop completely with direct-to-chip liquid cooling.

Here's the comparison the barbecue never makes: a hamburger's water can't be recycled — once it's soaked into the corn and the cow, it's locked in and gone. A cotton t-shirt's ~2,700 liters mostly evaporate off a field with no pipe to catch it. A data center is, oddly, one of the few giant water users that can send most of its water straight back to the tap. That doesn't make the industry saintly — the sites that hide their meter have earned every protest — but the ceiling for doing better is genuinely higher for a data center than for your dinner.

Fine print on every pledge: "water positive" math counts funded restoration projects against direct operational use only — the water embedded in electricity doesn't count, and almost none of the claims are independently audited. Directionally real. Precisely unverifiable.

### Why the neighbors are still right

AI's water use is nationally tiny and improving. So why the protests, lawsuits, 7–0 council votes? Because water is never national. Water is a specific pipe in a specific town.

- The Dalles, Oregon: Google's data centers grew to use over a quarter of the entire city's water — the city, with Google footing legal bills, spent 13 months in court trying to keep that number secret from a newspaper.
- West Des Moines, Iowa: the month GPT-4 finished training, Microsoft's cluster there pumped 11.5 million gallons — 6% of the district's water — during a three-year drought.
- Newton County, Georgia: after Meta built a $750M data center, neighbors' wells failed or turned to sediment; the facility uses ~10% of the county's water and the county projects a deficit by 2030 (Meta disputes causing the well failures). A separate Georgia data center used 29 million gallons over 15 months before anyone noticed — via low water pressure.
- Memphis: xAI's machines sit above, and drink from, the aquifer the whole city gets drinking water from.
- Uruguay and Chile: Google projects sparked protests during record droughts, got redesigned to air cooling. Tucson, Arizona rejected an Amazon-linked campus 7–0.

Notice the shape of every story: it's rarely "the number was huge," it's "the number was hidden, in a place that couldn't spare it." A data center using 0.02% of America's water can still be 25% of one town's. Averages don't live anywhere. People do.

### What nobody knows (including the companies)

No company publishes per-model numbers across its lineup. Rented data centers are invisible in environmental reports. A semiconductor fab drinks ~10 million gallons of ultrapure water a day, and nobody allocates that to the GPUs it produces. America's water data is a decade old — the last full US water census was 2015, and the government stopped doing them; most Texas data centers simply ignored the state's voluntary water survey. No law requires disclosure — a US bill to standardize AI environmental reporting has been introduced twice, passed zero times.

The pattern: AI's water use isn't monstrous. It's unaudited, self-reported, and locally concentrated — the exact conditions under which small problems quietly become big ones.

### The three lines to remember

1. Your burger used more water than a year of your chatbot questions — but check who measured, because AI companies count only the water on their own property.
2. Nationally it's a rounding error — golf uses thirty times more. Locally it can be a quarter of a town's water supply, and that's where the fights are real.
3. The scandal isn't the drinking. It's the secrecy: only one AI lab — Mistral, the small French one — has published a full, independently audited water bill. Not OpenAI, not Google, not Anthropic.

The water isn't the con. The missing receipts are.

---

Full piece, every source linked: https://maystash.xyz/posts/thirsty-machines/
