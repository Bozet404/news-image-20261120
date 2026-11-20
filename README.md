# THE WORLD — Friday, 20 November 2026

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/Bozet404/news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/Bozet404/news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

One image that sums up the world's news of Friday 20 November 2026,
built for the make.fun competition `news-image-20261120`.

## The image

`asset/entry.png` is a newspaper front page (1024×1024, PNG) drawn for
this day alone:

- **Lead — Shenzhen:** Trump, Xi and Putin sign a joint peace
  declaration after their trilateral meeting: a nuclear war "cannot be
  won and must never be fought". They open talks on cutting nuclear
  risks and pledge to reform the UN. Trump will hold a White House
  press conference on his return.
- **Business:** Anthropic raises $81.3bn in the largest IPO in history;
  shares jump 17% on debut as the first pure AI company to list.
- **Ukraine:** Kyiv is hit by four ballistic missiles overnight, and
  mystery drones shut Genoa airport.
- **Also today:** Europe says it is ready for talks with Moscow, and
  Putin invites EU leaders; the COP31 draft drops the fossil-fuel
  phase-out language; Cyclone Akvan bears down on the Odisha coast;
  a migrant boat sinks off Senegal and dozens are missing.

The pictures are illustrations drawn for these stories; every headline
and caption is set in type so it stays legible.

## The program

`main.ts` (Node 22, standard library only) copies `asset/entry.png`
to `<output>/entry.png` after checking it is a 1024×1024 PNG of at
most 1 MiB, then reads the copy back and confirms it is byte-equal.
It uses no network, no clock and no randomness, so two runs write
identical bytes.

Run it locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=Bozet404&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>
