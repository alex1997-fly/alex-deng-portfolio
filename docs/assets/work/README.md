# How to add work screenshots

1. Put new screenshots in this folder, for example:
   `public/assets/work/ulike-campaign-01.jpg`

2. Open `src/workItems.ts`.

3. Add one item to `workImages`:

```ts
   { src: assetPath('assets/work/ulike-campaign-01.jpg'), title: 'Ulike Campaign 01' },
```

The work space length and card layout are generated automatically from the list.
