let stockData = localStorage.getItem("stockData");
if (!stockData) {
  fetch("https://api.twelvedata.com/stocks").then(async res => {
    const { data } = await res.json();
    stockData = data
      .filter(
        i =>
          i.country.toLowerCase() === "india" &&
          i.exchange.toLowerCase() === "nse"
      )
      .map(i => ({ ...i, label: i.name, value: `${i.symbol}:${i.name}` }));
    localStorage.setItem("stockData", JSON.stringify(stockData));
  });
} else {
  stockData = JSON.parse(stockData);
}

export default stockData;
