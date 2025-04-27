interface ExampleMap {
  name: string
  description: string
  creator: string
}

export const maps: ExampleMap[] = [
  { name: "Empty room", description: "18×15 cells", creator: "EdsonMartinelli" },
  { name: "Large room", description: "24×24 cells", creator: "ryuzera" },
  { name: "Another large room", description: "24×24 cells", creator: "ryuzera" },
  { name: "Small room with obstacles", description: "14×12 cells", creator: "ryuzera" },
  { name: "Small room with monuments", description: "10×10 cells", creator: "ryuzera" },
  { name: "Small room with cave", description: "12×12 cells", creator: "ryuzera" },
];
