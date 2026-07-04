export const ADMIN_SESSION_COOKIE = "zavikstech_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export interface AdminSessionPayload {
  sub: string;
  email: string;
  name: string | null;
  iat: number;
  exp: number;
}

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.AUTH_SECRET ??
    "zavikstech-development-session-secret"
  );
}

function encodeBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function encodeText(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function decodeText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

function toBufferSource(bytes: Uint8Array): BufferSource {
  return bytes as unknown as BufferSource;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    toBufferSource(encodeText(sessionSecret())),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signAdminSession(
  payload: Omit<AdminSessionPayload, "iat" | "exp">,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const session: AdminSessionPayload = {
    ...payload,
    iat: now,
    exp: now + ADMIN_SESSION_TTL_SECONDS,
  };
  const encodedPayload = encodeBase64Url(encodeText(JSON.stringify(session)));
  const key = await hmacKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    toBufferSource(encodeText(encodedPayload)),
  );
  return `${encodedPayload}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionToken(
  token: string,
): Promise<AdminSessionPayload | null> {
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  const key = await hmacKey();
  const isValid = await crypto.subtle.verify(
    "HMAC",
    key,
    toBufferSource(decodeBase64Url(signaturePart)),
    toBufferSource(encodeText(payloadPart)),
  );

  if (!isValid) return null;

  try {
    const payload = JSON.parse(
      decodeText(decodeBase64Url(payloadPart)),
    ) as AdminSessionPayload;
    if (
      !payload?.sub ||
      !payload.email ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}