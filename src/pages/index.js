import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
    const initialPizzas = [];
    const initialFilterText = "";
    const resultFromUseState = useState(initialPizzas);
    const pizzasFromState = resultFromUseState[0];
    const setPizzas = resultFromUseState[1];
    const [filterText, setFilterText] = useState(initialFilterText);

    useEffect(() => {
        fetch("/api/pizzas")
            .then((data) => {
                return data.json();
            })
            .then((response) => {
                setPizzas(response.pizzas);
            });
    }, [pizzasFromState, setPizzas]);

    function Pizzas() {
        const filteredPizzas = pizzasFromState.filter((pizza) => {
            return pizza.name.toLowerCase().includes(filterText);
        });

        return filteredPizzas.map((pizza, index) => {
            return <div key={index}>{pizza.name}</div>;
        });
    }

    return (
        <>
            <Head>
                <title>Web App Workshop</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <input
                    type="search"
                    name="search"
                    data-testid="search"
                    onChange={(event) => {
                        setFilterText(event.target.value);
                    }}
                ></input>
                <Pizzas />
            </main>
        </>
    );
}
