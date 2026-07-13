// 简单日期格式化
export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

// 中文日期：2022年1月1日
export function formatDateToChinese(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

// ISO 8601（用于 RSS / JSON-LD）
export function formatDateToISO(date: Date) {
  return date.toISOString();
}

// 相对时间：3 天前 / 2 个月前
export function formatRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const day = 24 * 60 * 60 * 1000;
  const month = day * 30;
  const year = day * 365;
  if (diff < day) return "今天";
  if (diff < month) return `${Math.floor(diff / day)} 天前`;
  if (diff < year) return `${Math.floor(diff / month)} 个月前`;
  return `${Math.floor(diff / year)} 年前`;
}

/**
 * 估算阅读时长与字数。
 * 中文按字符计、英文/数字按词计，混合文本更贴近真实阅读量。
 */
export function getReadingTime(content: string, speed = 320) {
  const text = content || "";
  const cnChars = (text.match(/[一-龥]/g) || []).length;
  const enWords = (
    text
      .replace(/[一-龥]/g, " ")
      .match(/[a-zA-Z0-9]+/g) || []
  ).length;
  const words = cnChars + enWords;
  const minutes = Math.max(1, Math.round(words / speed));
  return { words, minutes };
}

// 标签/分类 URL 安全化（保留大小写，仅做编码）
export function tagToSlug(tag: string) {
  return encodeURIComponent(tag.trim());
}
