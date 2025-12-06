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
