[
    {
      _id: "var1",
      choices: { Color: "#ff0000", Size: "S" }, // Red, Small
      stock: { inStock: true, quantity: 10 }
    },
    {
      _id: "var2",
      choices: { Color: "#0000ff", Size: "M" }, // Blue, Medium
      stock: { inStock: false, quantity: 0 }
    },
    {
      _id: "var3",
      choices: { Color: "#00ff00", Size: "L" }, // Green, Large
      stock: { inStock: true, quantity: 5 }
    }
  ]

  

  const productOptions = [
    {
      name: "Color",
      choices: [
        { description: "Red", value: "#ff0000" },
        { description: "Blue", value: "#0000ff" },
        { description: "Green", value: "#00ff00" }
      ]
    },
    {
      name: "Size",
      choices: [
        { description: "Small", value: "S" },
        { description: "Medium", value: "M" },
        { description: "Large", value: "L" }
      ]
    }
  ]
  

  const clickHandler = disabled
  ? undefined
  : ()=>setSelectedOptions((prev) => ({ ...prev, [option.name]: choice.descripiton }));