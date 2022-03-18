FROM node:16-alpine AS base
ARG PNPM_VERSION=6.24.4
RUN npm --no-update-notifier --no-fund --global install pnpm@${PNPM_VERSION}
WORKDIR /root/uxc

FROM base AS dev
COPY . .
# # mitigate repeated package downloads by caching pnpm-store
# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store\
#  pnpm install --filter "{packages/client}..."\
#  --frozen-lockfile\
#   # allow unsafe perms in pnpm exec given Docker runs pnpm as root
#  --unsafe-perm\
#   #  filter pnpm symlink warnings
#   # (due to cache mount default behavior i.e. Docker placing the store in a different virtual drive)
#  | grep -v "cross-device link not permitted\|Falling back to copying packages from store"
RUN pnpm install
WORKDIR /root/uxc/packages/client
CMD ["pnpm", "dev"]
