# DesignSwipe (Next.js + Tailwind v4)

This is a merged project: Next.js app with UI components imported from your Figma-generated React project.

## Run locally

```bash
npm install
npm run dev
```
Open http://localhost:3000

If Tailwind throws version errors, ensure tailwindcss ^4 and @tailwindcss/postcss are installed.

### Optional: внешние изображения (Unsplash)

Для подгрузки живых интерьерных фото создайте `.env.local` и укажите:

```
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_key_here
```

Без ключа приложение использует встроенную библиотеку моков.

### Auth через Google (Supabase)

1) В Supabase включите Google OAuth и возьмите значения:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
2) Добавьте их в `.env.local` или воспользуйтесь `.env.example`.
3) Redirect URL укажите `https://<ваш-домен>/auth/v1/callback` (и `http://localhost:3000/auth/v1/callback` для локалки).
