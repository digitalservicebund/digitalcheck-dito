export function mailto(
  email: string,
  subject?: string,
  body?: string,
  cc?: string,
): string {
  const params = new URLSearchParams();
  if (cc) params.append("cc", cc);
  if (subject) params.append("subject", subject);
  if (body) params.append("body", body);
  const query = params.toString().replaceAll("+", "%20");
  const queryStr = query ? `?${query}` : "";
  return `mailto:${email}${queryStr}`;
}
