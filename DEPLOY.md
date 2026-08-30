# Deploying the Yessare storefront (Next.js)

Built as a standalone Next.js server (`output: "standalone"`) in a small Node image.

## Build & run
```bash
docker compose up -d --build
# or manually:
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.yessaretools.com -t yessare-front .
docker run -d -p 3000:3000 yessare-front
```

`NEXT_PUBLIC_API_BASE_URL` is **baked in at build time** — rebuild the image to change it.

## Reverse proxy
Point your web domain (e.g. `yessaretools.com`) at the container on port 3000. Minimal nginx:

```nginx
server {
    listen 443 ssl;
    server_name yessaretools.com www.yessaretools.com;
    ssl_certificate     /etc/letsencrypt/live/yessaretools.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yessaretools.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Checklist
- Backend `config/settings.py` already lists `yessaretools.com` / `www` in
  `CSRF_TRUSTED_ORIGINS`; add the exact web origin to `CORS_ALLOWED_ORIGINS` if you later
  turn off `CORS_ALLOW_ALL_ORIGINS`.
- `api.yessaretools.com` is in `next.config.ts` `images.remotePatterns`, so product images
  served from Django `/media/` render through `next/image`.
