export const navLinks = [
  { label: 'Engine', href: '#engine' },
  { label: 'Arbitrage', href: '#arbitrage' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Plan deck', href: '#deck' },
]

export const engineFeatures = [
  {
    title: 'Liquidity monitoring',
    copy: 'Continuously watches pools, swaps, order books, bridges and on-chain price feeds.',
    metric: 'Always on',
  },
  {
    title: 'Smart routing',
    copy: 'Evaluates available paths, spreads, fees and liquidity conditions before execution.',
    metric: 'Adaptive',
  },
  {
    title: 'Transaction watcher',
    copy: 'Tracks pending transactions, confirmations and settlement state across the route.',
    metric: 'Real time',
  },
  {
    title: 'Risk controls',
    copy: 'Models slippage, volatility, depth and execution exposure before a cycle proceeds.',
    metric: 'Guarded',
  },
  {
    title: 'Cross-chain intelligence',
    copy: 'Coordinates liquidity movement across Avalanche X-Chain, P-Chain and C-Chain.',
    metric: 'Triple chain',
  },
  {
    title: 'Execution logic',
    copy: 'Turns market dislocations into a monitor, interpret, route, execute and optimize loop.',
    metric: 'AI assisted',
  },
]

export const strategyComparison = {
  trading: {
    label: 'Trading',
    headline: 'Wait for the market to move.',
    copy: 'The source deck frames trading as a time-bound position: buy an asset, hold through price movement and sell later while accepting direction and timing risk.',
    metrics: [
      { label: 'Dependency', value: 'Future price movement' },
      { label: 'Exposure', value: 'Longer market window' },
      { label: 'Decision style', value: 'Directional' },
    ],
    rows: {
      time: 'High - wait for movement',
      exposure: 'Longer and directional',
      speed: 'Minutes, hours or days',
      model: 'Forecast and timing',
    },
  },
  arbitrage: {
    label: 'Arbitrage',
    headline: 'Execute a price difference.',
    copy: 'The source deck frames arbitrage as buying on one venue and selling on another during a short-lived market dislocation, while accounting for route costs and settlement.',
    metrics: [
      { label: 'Dependency', value: 'Existing price gap' },
      { label: 'Exposure', value: 'Short execution window' },
      { label: 'Decision style', value: 'System driven' },
    ],
    rows: {
      time: 'Opportunity based',
      exposure: 'Shorter execution window',
      speed: 'Milliseconds to seconds',
      model: 'Detection and routing',
    },
  },
}

export const evolutionPhases = [
  {
    phase: 1,
    short: 'Centralized transfers',
    period: '2013-2019',
    title: 'Centralized-exchange arbitrage',
    copy: 'Early arbitrage moved assets between centralized venues and depended on deposits, confirmations, withdrawals and manual coordination.',
    focus: 'Transfer bound',
    points: ['Buy on the lower-price exchange', 'Wait for transfer and confirmation', 'Sell on the higher-price exchange'],
  },
  {
    phase: 2,
    short: 'Smart-contract execution',
    period: '2019-2022',
    title: 'Decentralized arbitrage on Ethereum',
    copy: 'Smart contracts, atomic transactions and flash liquidity moved more of the workflow into code, while gas and congestion remained key constraints.',
    focus: 'Atomic logic',
    points: ['Detect a pool inefficiency', 'Borrow, swap and repay atomically', 'Keep the remaining result after costs'],
  },
  {
    phase: 3,
    short: 'High-speed ecosystems',
    period: '2020-present',
    title: 'High-speed market renaissance',
    copy: 'Faster settlement and lower transaction costs created frequent but short-lived opportunities in active decentralized markets.',
    focus: 'Speed',
    points: ['Scan active liquidity venues', 'Identify and execute quickly', 'Capture and recycle liquidity'],
  },
  {
    phase: 4,
    short: 'Triple-chain intelligence',
    period: 'Present and beyond',
    title: 'Avalanche HyperGen era',
    copy: 'The supplied plan presents HyperGen as a coordination layer for monitoring, routing and execution across Avalanche operational chains.',
    focus: 'Coordination',
    points: ['Real-time monitoring and watching', 'Cross-chain route validation', 'AI-assisted execution logic'],
  },
]

export const chains = [
  {
    id: 'X',
    name: 'X-Chain',
    subtitle: 'Asset Exchange',
    copy: 'Digital asset transfers and liquidity movement.',
    accent: '#E84142',
    glow: 'rgba(232,65,66,.24)',
  },
  {
    id: 'P',
    name: 'P-Chain',
    subtitle: 'Platform Coordination',
    copy: 'Validators, staking systems and network coordination.',
    accent: '#E9A23B',
    glow: 'rgba(233,162,59,.22)',
  },
  {
    id: 'C',
    name: 'C-Chain',
    subtitle: 'Smart Contracts',
    copy: 'EVM applications, DeFi and decentralized automation.',
    accent: '#17A7B8',
    glow: 'rgba(23,167,184,.22)',
  },
]

export const ecosystemItems = [
  { title: 'DeFi', copy: 'Liquidity, lending, DEX and yield environments.' },
  { title: 'AI infrastructure', copy: 'Models, data, automation and agent workflows.' },
  { title: 'Gaming', copy: 'On-chain assets, economies and digital ownership.' },
  { title: 'NFT platforms', copy: 'Digital collectibles, marketplaces and utility.' },
  { title: 'Automation tools', copy: 'Bots, execution logic and smart operations.' },
  { title: 'High-frequency markets', copy: 'Fast-moving venues with short-lived spreads.' },
]

export const distributionGroups = {
  core: {
    label: 'Core',
    total: 39,
    accent: '#16A05D',
    levels: [
      { level: 1, rate: 15, self: '$0', directs: 1 },
      { level: 2, rate: 10, self: '$200', directs: 2 },
      { level: 3, rate: 5, self: '$200', directs: 3 },
      { level: 4, rate: 4, self: '$200', directs: 4 },
      { level: 5, rate: 5, self: '$500', directs: 5 },
    ],
  },
  mid: {
    label: 'Mid',
    total: 17,
    accent: '#D99A17',
    levels: [
      { level: 6, rate: 3, self: '$500', directs: 6 },
      { level: 7, rate: 3, self: '$500', directs: 7 },
      { level: 8, rate: 3, self: '$500', directs: 8 },
      { level: 9, rate: 3, self: '$500', directs: 9 },
      { level: 10, rate: 5, self: '$500', directs: 10 },
    ],
  },
  deep: {
    label: 'Deep',
    total: 11,
    accent: '#E84142',
    levels: [
      { level: 11, rate: 2, self: '$1,500', directs: 11 },
      { level: 12, rate: 2, self: '$1,500', directs: 12 },
      { level: 13, rate: 2, self: '$1,500', directs: 13 },
      { level: 14, rate: 2, self: '$1,500', directs: 14 },
      { level: 15, rate: 3, self: '$1,500', directs: 15 },
    ],
  },
}

export const ranks = [
  { rank: 1, name: 'Spark', volume: '1K : 1K', bounty: '$100' },
  { rank: 2, name: 'Rise', volume: '5K : 5K', bounty: '$500' },
  { rank: 3, name: 'Star', volume: '15K : 15K', bounty: '$1.5K' },
  { rank: 4, name: 'Pro', volume: '40K : 40K', bounty: '$4K' },
  { rank: 5, name: 'Elite', volume: '80K : 80K', bounty: '$8K' },
  { rank: 6, name: 'Titan', volume: '160K : 160K', bounty: '$16K' },
  { rank: 7, name: 'Crown', volume: '320K : 320K', bounty: '$32K' },
  { rank: 8, name: 'Legend', volume: '640K : 640K', bounty: '$64K' },
  { rank: 9, name: 'Master', volume: '1.25M : 1.25M', bounty: '$125K' },
  { rank: 10, name: 'Icon', volume: '2.5M : 2.5M', bounty: '$250K' },
  { rank: 11, name: 'Apex', volume: '5M : 5M', bounty: '$500K' },
  { rank: 12, name: 'Infinity', volume: '10M : 10M', bounty: '$1M' },
]

export const deckSlides = [
  {
    page: 1,
    title: 'Liquidity Intelligence Engine',
    copy: 'The source deck establishes the white, chrome, black and Avalanche-red visual language.',
    image: './deck/page-01.webp',
  },
  {
    page: 3,
    title: 'HyperGen AI Engine',
    copy: 'Monitoring, smart swaps, yield mechanics, cross-chain intelligence and optimization.',
    image: './deck/page-03.webp',
  },
  {
    page: 8,
    title: 'Triple-chain architecture',
    copy: 'X-Chain, P-Chain and C-Chain are presented as an interconnected liquidity system.',
    image: './deck/page-08.webp',
  },
  {
    page: 13,
    title: 'Always-on market nervous system',
    copy: 'A visual pipeline for feeds, transaction watching, risk controls and execution.',
    image: './deck/page-13.webp',
  },
  {
    page: 16,
    title: 'Entry liquidity',
    copy: 'The plan introduces participation, activation, execution and reward-generation concepts.',
    image: './deck/page-16.webp',
  },
  {
    page: 18,
    title: '15-level distribution',
    copy: 'Core, mid and deep levels are summarized with the plan-stated percentage structure.',
    image: './deck/page-18.webp',
  },
  {
    page: 20,
    title: '12-rank milestone ladder',
    copy: 'Matching-business milestones progress from Spark through Infinity in the source plan.',
    image: './deck/page-20.webp',
  },
]

export const faqs = [
  {
    q: 'Is the market dashboard connected to live exchanges?',
    a: 'No. The simulator is an interactive front-end visualization of the workflow shown in the supplied plan. It does not execute trades or connect to a wallet.',
  },
  {
    q: 'Are the percentages and rewards guaranteed?',
    a: 'No. They are displayed only as plan-stated figures from the source deck. Returns, rewards, processing times and milestone outcomes can never be treated as guaranteed.',
  },
  {
    q: 'Is this project ready for production deployment?',
    a: 'The front-end is structured for a Vite production build and has passed source and responsive-layout checks. A real launch still needs audited contracts, legal review, secure authentication, backend APIs, analytics, monitoring and verified copy.',
  },
  {
    q: 'Can a wallet or member portal be integrated later?',
    a: 'Yes. The components are intentionally modular so wallet connection, authentication, live data, KYC flows and a member dashboard can be added without rebuilding the landing page.',
  },
]
