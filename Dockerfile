# ============================================================
# gt-chat-contabilidade — Next.js 16 (standalone) • multi-stage
# Requer next.config.ts com `output: "standalone"`.
# Build:  docker build --build-arg NEXT_PUBLIC_SUPABASE_URL=... \
#                       --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=... -t app .
# ============================================================

# ---- deps: instala dependências a partir do lockfile ----
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compila o Next ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# As NEXT_PUBLIC_* são embutidas no bundle do BROWSER em tempo de BUILD.
# Precisam chegar como --build-arg (ver .github/workflows/ci.yml e o
# docker-compose.yml) ANTES do `next build` — defini-las só como env de
# runtime do container não adianta (afeta apenas o código de servidor), e
# o Supabase client do browser quebraria com URL/key undefined.
# Hoje o client usa só estas duas. Se ligar Web Push no client, adicione
# aqui também: ARG/ENV NEXT_PUBLIC_VAPID_PUBLIC_KEY.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# ---- runner: imagem final mínima ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Roda como usuário não-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Assets públicos + saída standalone (server.js + node_modules mínimo) + estáticos
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# server.js é gerado pela saída standalone do Next
CMD ["node", "server.js"]
