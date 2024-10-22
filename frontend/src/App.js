import Layout from "./components/Layout";

function App() {
  const printTest = async () => {
    const res = await fetch(process.env.REACT_APP_BASE_URL + "/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [
          {
            id: 1,
            qty: 5,
          },
        ],
      }),
    });
    const data = await res.json();
  };
  return (
    <Layout>
      {" "}
      <button onClick={printTest}>Print</button>
    </Layout>
  );
}

export default App;
