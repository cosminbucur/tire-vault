✨ create a Reports component

Use recharts and this mock data to display:
- a count of tyres by brand and size
- a graph with the number of tires by brand
- a graph with the number of tires by size

```js
  public data = [
    {
      brand: 'Continental',
      sizes: [
        { size: '215 / 65 R17', count: 8 },
        { size: '215 / 65 R15', count: 12 }
      ],
      count: '20'
    },
    {
      brand: 'Pirelli',
      sizes: [
        { size: '215 / 65 R17', count: 4 },
        { size: '215 / 65 R15', count: 8 }
      ],
      count: '12'
    },
    {
      brand: 'Michelin',
      sizes: [
        { size: '215 / 65 R17', count: 4 },
        { size: '215 / 65 R15', count: 8 }
      ],
      count: '12'
    }
  ];

  public tyresBySize = [
    { size: '215 / 65 R17', count: 4 },
    { size: '215 / 65 R15', count: 8 }
  ];

  public tyresByBrand = [
    { brand: 'Continental', count: 8 },
    { brand: 'Pirelli', count: 6 },
    { brand: 'Michelin', count: 4 }
  ];
```