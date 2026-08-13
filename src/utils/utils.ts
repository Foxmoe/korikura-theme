export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export function formatDateToChinese(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

export function formatDateToISO(date: Date) {
  return date.toISOString();
}

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

export function tagToSlug(tag: string) {
  return encodeURIComponent(tag.trim());
}
