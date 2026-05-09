---
slug: "semantic-graphs"
title: "Autoregressive and Diffusion Language Models: How Each Architecture Encodes and Accesses Linguistic Knowledge"
date: "2026-05-16"
tag: "Autoregressive | Diffusion"
subtitle: "ML for NLU · Term Paper"
type: "paper"
pdf: "/papers/autoregressive-diffusion.pdf"
summary: "An exploration of how differently autoregressive and diffusion architecture deal textual data. Specifically, LLaMA-3-8B-Base and LLaDA-8B-Base were used in the experiment."
---


<!-- ::graph-viewer
---
graphData:
  nodes:
    - { id: 1, label: "king",  group: "A" }
    - { id: 2, label: "queen", group: "A" }
    - { id: 3, label: "man",   group: "B" }
    - { id: 4, label: "woman", group: "B" }
  links:
    - { source: 1, target: 2, weight: 0.9 }
    - { source: 1, target: 3, weight: 0.7 }
    - { source: 2, target: 4, weight: 0.8 }
---
:: -->

## TL;DR

Two paradigms generate text differently and that difference is *measurable*:

| | **Autoregressive (LLaMA-3-8B)** | **Masked Diffusion (LLaDA-8B)** |
|---|---|---|
| Generation | Left-to-right, one token at a time | Iterative denoising, full sequence |
| Attention | Causal (past only) | Bidirectional (full context) |
| Reversal drop (causal facts) | **90%** | **20%** |
| Infilling perplexity ↓ | 49.8 (left-only) / 35.6 (SPM) | **20.1** |
| Infilling BERTScore F1 ↑ | 0.842 / 0.849 | **0.904** |

**Claim:** Neither is "better." The training objective biases each model toward different linguistic tasks. AR is dominant for scale and fluency; diffusion has structural advantages on tasks requiring bidirectional conditioning.

---

## 1. The Core Difference, in Math

### Autoregressive: chain rule, one direction

A sequence's joint probability is factored left-to-right:

$$
P(x_1, \ldots, x_n) = \prod_{i=1}^{n} P(x_i \mid x_1, \ldots, x_{i-1})
$$

Implemented with **causal masked attention** — the upper-triangular mask blocks any view of future tokens:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}} + M\right) V,
\quad M_{ij} = \begin{cases} 0 & j \le i \\ -\infty & j > i \end{cases}
$$

The model commits to each token without seeing what comes after. Errors compound (exposure bias) and reverse-direction facts are never reinforced.

### Masked Diffusion: corrupt, then denoise globally

**Forward (corruption)** — gradually mask tokens. For original token $x_0$ at step $t$:

$$
q(x_t \mid x_0) = \text{Cat}\bigl(x_t;\; p = \bar{\alpha}_t x_0 + (1 - \bar{\alpha}_t) m\bigr)
$$

where $m$ is the one-hot for `[MASK]` and $\bar{\alpha}_t \in [0, 1]$ controls how much of the original survives ($\bar{\alpha}_0 = 1$, fully visible; $\bar{\alpha}_T = 0$, fully masked).

**Reverse (denoising)** — a *bidirectional* transformer recovers the original distribution:

$$
p_\theta(x_0 \mid x_t) = \text{Softmax}\bigl(f_\theta(x_t, t)\bigr)
$$

At every denoising step, every position attends to every other non-masked position. Right context is a constraint, not a hint.


## 3. Experiment 1 — The Reversal Curse, Causal Edition

**Setup.** Berglund et al. (2023) showed that AR models trained on "A is B" fail at "B is A" — the *reversal curse*. Their analysis was limited to identity relations and flagged causal/spatial/logical relations as open questions. This paper extends the test to **causal relations**.

**Why causal?** The form *"A causes B"* (forward) and *"B is caused by A"* (reverse) maps directly onto the AR training signal: only the forward direction gets gradient updates.

### Method

- **LLaMA-3-8B-Base:** LoRA fine-tuned on 100 forward-direction *fictional* causal facts ("Zelophane exposure triggers pulmonary inflammation"). Fictional agents eliminate memorization confounds — any reverse success must come from relational encoding, not pretraining recall.
  - LoRA config: $r = 16$, $\alpha = 32$, lr $= 3 \times 10^{-4}$, 500 steps
- **LLaDA-8B-Instruct:** Zero-shot on real causal facts (LoRA fine-tuning hit hardware/library incompatibilities — see limitations).
- **Metric:** *contains-answer accuracy* over 10 pairs, plus the **reversal drop** = forward − reverse.

### Results

| Direction | LLaMA-3 (fine-tuned, fictional) | LLaDA (zero-shot, real) |
|---|---:|---:|
| Forward (cause → effect) | **100%** (10/10) | 70% (7/10) |
| Reverse (effect → cause) | 10% (1/10) | 50% (5/10) |
| **Reversal drop** | **90%** | **20%** |



**Reading the result.** LLaMA-3 learned the forward form perfectly but cannot retrieve it in reverse — its left-to-right gradient never reinforced that direction. LLaDA's bidirectional masking exposes both directions during training, and the reversal drop drops by ~70 percentage points. The two evaluations are *not* a controlled comparison (different data, different fine-tuning state) — they are complementary evidence for the directional asymmetry hypothesis.

---

## 4. Experiment 2 — Contextual Infilling

**Task.** Given left context + right context, predict the missing middle span. AR models cannot do this natively because causal attention blocks the right side. The standard workaround is **Fill-in-the-Middle (FIM)** with the **Suffix-Prefix-Middle (SPM)** prompt format (Bavarian et al., 2022): rearrange the input so the suffix appears first, giving the model a "preview" of the right context as background.

LLaDA does it natively: at every denoising step, all non-masked tokens (including the right context) participate in attention.

### Three conditions, ten WikiText-2 sentences

1. **LLaMA-3 left-only** — standard left-to-right generation given only the prefix.
2. **LLaMA-3 SPM** — right context prepended at inference (no FIM training).
3. **LLaDA full masked sequence** — `[left] [MASK]×n [right]` fed to the denoiser.

### Metrics

- **BERTScore F1** for span-level semantic similarity (exact match would penalize valid paraphrases like "powerful scanning electron microscope" vs. "high-powered electron microscope").
- **GPT-2 Small perplexity** as a neutral third-party fluency score on the *full reconstructed sentence*. Reference: original sentences score ~26.7; well-formed Wikipedia text falls in 15–30; incoherent text exceeds 50.

### Results

| Model | Conditioning | BERTScore F1 ↑ | Perplexity ↓ |
|---|---|---:|---:|
| — | Original sentence | — | 26.7 |
| LLaMA-3-8B-Base | Left context only | 0.842 | 49.8 |
| LLaMA-3-8B-Base | SPM (right context first) | 0.849 | 35.6 |
| **LLaDA-8B-Base** | **Full masked sequence** | **0.904** | **20.1** |


**The pattern.** SPM helps LLaMA-3 — perplexity drops 14.2 points — but a 15.5-point gap to LLaDA remains. SPM exposes right context as *input tokens*; LLaDA conditions on right context *at every denoising step*. Information availability ≠ structural integration. LLaDA even beats the original sentence on perplexity (20.1 < 26.7), suggesting the denoiser converges on highly fluent reconstructions.

### Qualitative example

> *"The scientist carefully placed the sample under \_\_\_ to examine its cellular structure."*
> *Original:* "the high-powered electron microscope"

| Condition | Output |
|---|---|
| LLaMA-3 left-only | "the microscope. He was looking for the" |
| LLaMA-3 SPM | "the microscope and adjusted the focus until" |
| LLaDA | "a high-powered microscope" |

LLaMA-3 SPM uses the right context as topical priming; LLaDA integrates it as a structural constraint on the span.

---

## 5. Limitations (the honest part)

- **Training-data asymmetry.** LLaMA-3 saw ~15T tokens vs. LLaDA's ~2.3T. Differences may partly reflect data volume.
- **Reversal experiment is not a controlled comparison.** LLaMA-3 fine-tuned on fictional facts; LLaDA zero-shot on real facts; LLaDA-Base produced degenerate outputs so LLaDA-Instruct was substituted. Treat as complementary evidence, not a head-to-head benchmark.
- **Infilling sample size.** 10 hand-picked WikiText-2 items — selection bias risk.
- **GPT-2 Small as judge** has its own training bias.
- **SPM applied at inference**, not as a learned objective. A FIM-trained AR model would likely close some of the gap.

---

## 6. Takeaway

Each training objective creates measurable, predictable strengths:

- **AR wins** on scalable single-pass generation, fluency, and any task where left-to-right factorization aligns with the data structure.
- **Diffusion wins** when the task requires **bidirectional structural conditioning** — reverse-direction relations, infilling, span-level coherence.

The interesting research question isn't "which architecture is better?" but "which architectural inductive bias matches which linguistic phenomenon?"

---

## Try it yourself

A companion interactive demo (`AR_vs_Diffusion_Demo.html`) visualizes how each architecture processes a sentence step-by-step. Open it in a browser and watch AR generate left-to-right while diffusion denoises the whole sequence in parallel.

---

*Source code: [github.com/Bormey-Sky/Autoregressive-and-Diffusion-Language-Models](https://github.com/Bormey-Sky/Autoregressive-and-Diffusion-Language-Models)*
