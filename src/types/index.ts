// ============================================================
// ON-PAGE SEO DATA (mirrors backend/modules/onpage_scraper.py)
// ============================================================
export interface OnPageData {
  title: string;
  title_count: number;
  description: string;
  desc_count: number;
  h1: string[];
  h2_count: number;
  h3_count: number;
  total_images: number;
  missing_alt: number;
  internal_links: number;
  external_links: number;
  canonical: string;
  meta_robots: string;
  has_noindex: boolean;
  lang: string;
  og_title: string;
  word_count: number;
  schema: string;
  is_https: "Yes" | "No";
  response_time: number;
  html_size_kb: number;
  unminified_css: number;
  unminified_js: number;
  dir_listing_secured: "Yes" | "No" | "Unknown";
}

// ============================================================
// SPEED DATA (mirrors backend/modules/speed_checker.py)
// ============================================================
export interface MetricValue {
  value: string;
  score: number;
}

export interface SpeedMetrics {
  fcp: MetricValue;
  lcp: MetricValue;
  tbt: MetricValue;
  cls: MetricValue;
  si: MetricValue;
}

export interface DeviceResult {
  performance: number;
  accessibility: number;
  "best-practices": number;
  seo: number;
  metrics: SpeedMetrics;
}

export interface SpeedData {
  mobile: DeviceResult;
  desktop: DeviceResult;
}

// ============================================================
// TRAFFIC DATA (mirrors backend/modules/traffic_checker.py)
// ============================================================
export interface TrafficData {
  status: string;
  global_rank: string;
  monthly_visits: string;
  bounce_rate: string;
  pages_per_visit: string;
  avg_duration: string;
  search_traffic: string;
  direct_traffic: string;
  social_traffic: string;
  raw_data: Record<string, unknown>;
}

// ============================================================
// AI RECOMMENDATIONS (mirrors backend/modules/ai_analyzer.py)
// ============================================================
export interface AIRecommendation {
  title: string;
  text: string;
  icon?: string;
}

export interface AIResult {
  status: "success" | "error" | "no_api_key" | "";
  recommendations: AIRecommendation[];
}

// ============================================================
// AUDIT STATUS (mirrors backend app.py audit_status)
// ============================================================
export type AuditSeverity = "success" | "warning" | "danger" | "info";

export interface AuditStatus {
  message: string;
  severity: AuditSeverity;
  tip: string;
  actual: string;
}

// ============================================================
// SCORES (mirrors backend app.py calculate_scores)
// ============================================================
export interface AuditScores {
  overall: number;
  critical: number;
  warnings: number;
  passed: number;
}

// ============================================================
// USER (mirrors backend app.py user & plan)
// ============================================================
export interface AppUser {
  email: string;
  user_metadata: {
    plan: "free" | "pro";
  };
}

// ============================================================
// AUDIT STATE
// ============================================================
export type AuditTab = "onpage" | "speed" | "ai" | "export";

export interface AuditState {
  url: string;
  domain: string;
  loading: boolean;
  progress: number;
  progressText: string;
  onpage: OnPageData | null;
  speed: SpeedData | null;
  traffic: TrafficData | null;
  ai: AIResult | null;
  error: string | null;
}

// ============================================================
// BULK ANALYSIS
// ============================================================
export interface BulkResult {
  url: string;
  onpage: OnPageData | null;
  speed: SpeedData | null;
  ai_recommendations: AIRecommendation[];
  ai_status: string;
}
