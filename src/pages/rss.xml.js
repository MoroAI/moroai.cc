import rss from '@astrojs/rss';

export async function GET(context) {
  const posts = [
    {
      title: 'Introducing MoroAI: The Local-First Model Adaptation Foundry',
      description: 'Why we built MoroAI: transforming confidential enterprise data into reliable, deployable local language models on consumer GPUs without cloud lock-in.',
      pubDate: new Date('2026-09-28'),
      link: '/blog/introducing-moroai/',
    },
    {
      title: 'Why Standard LLM Deduplication Erases Rare Knowledge: Meet MI Guard',
      description: 'How standard cosine semantic deduplication accidentally prunes mission-critical domain facts, and how Shannon mutual information bounds mathematically protect edge cases.',
      pubDate: new Date('2026-09-24'),
      link: '/blog/epistemic-data-curation/',
    },
    {
      title: 'Never Lose a Training Run: The 5-Step Autonomous OOM Recovery Engine',
      description: 'An inside look at how MoroAI intercepts CUDA memory exceptions, dynamically resizes tensor batches, and resumes training with zero data loss.',
      pubDate: new Date('2026-09-20'),
      link: '/blog/oom-auto-recovery/',
    },
    {
      title: 'Closing the Local Loop: Mining User Interactions for Continuous DPO Alignment',
      description: 'Turn real-world corrections and thumbs-down feedback into high-yield chosen/rejected preference pairs without sending user prompts to external cloud endpoints.',
      pubDate: new Date('2026-09-15'),
      link: '/blog/dpo-flywheel/',
    },
  ];

  return rss({
    title: 'MoroAI Engineering Blog',
    description: 'Technical deep-dives on sovereign AI, local model adaptation, and information-theoretic machine learning.',
    site: context.site || 'https://moroai.cc',
    items: posts,
  });
}
