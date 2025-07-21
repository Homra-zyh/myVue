/**
 * 将任意网址拼成对应的 favicon.ico 地址，获取其图标
 */
export function getFaviconUrl(siteUrl = '') {
  try {
    // 去掉可能的 <url ...> 标签，只保留裸 URL
    // const raw = siteUrl.replace(/<[^>]+>/g, '').trim();
    // if (!raw) return '';
    // const url = new URL(raw);
    return `${siteUrl}/favicon.ico`;
  } catch {
    // 解析失败时给一个默认空图标
    return 'https://www.baidu.com/favicon.ico';
  }
}