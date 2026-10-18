# Lighthouse Performance Report

## 1. Overview

Lighthouse was run on the Next.js production build before and after the performance changes. The same testing settings were used for both audits.

## 2. Performance Metrics

| Metric | Before | After | Difference |
|---|---:|---:|---:|
| First Contentful Paint (FCP) | 0.9 s | 0.9 s | No change |
| Largest Contentful Paint (LCP) | 2.6 s | 2.6 s | No change |
| Total Blocking Time (TBT) | 130 ms | 80 ms | Improved by 50 ms |
| Cumulative Layout Shift (CLS) | 0.060 | 0.025 | Decreased by 58.3% |
| Speed Index | 0.9 s | 0.9 s | No change |

## 3. Analysis

- **FCP:** Remained at 0.9 seconds, indicating that initial content appeared at the same speed.
- **LCP:** Remained at 2.6 seconds, slightly above the recommended good target of 2.5 seconds.
- **TBT:** Decreased from 130 ms to 80 ms, indicating less main-thread blocking during the latest audit.
- **CLS:** Decreased from 0.060 to 0.025, indicating improved visual stability.
- **Speed Index:** Remained at 0.9 seconds.

## 4. Lighthouse Insights

The latest Lighthouse report identified the following opportunities:

1. **Image delivery:** The `/doro.png` image was downloaded at 480 × 275 pixels but displayed at approximately 59 × 34 pixels. Lighthouse estimated potential savings of about 35.1 KiB through better image sizing.
2. **Legacy JavaScript:** Approximately 13.5 KiB of potential savings from unnecessary polyfills and transforms.
3. **Render-blocking CSS:** A stylesheet of approximately 6 KiB was identified as a potential render-blocking resource.
4. **Network dependency tree:** The maximum critical path latency was 82 ms.
5. **LCP breakdown:** Time to first byte was 10 ms, and element render delay was 180 ms.

## 5. Conclusion

The latest audit showed improvements in Total Blocking Time and Cumulative Layout Shift. FCP, LCP, and Speed Index remained unchanged. The next optimization should focus on correcting image delivery for `/doro.png` and then rerunning Lighthouse to measure the effect.

**Note:** The reported metric differences are based on the two audits. They do not prove that a specific code change caused an improvement. The image optimization opportunity has been identified but has not yet been verified as completed.