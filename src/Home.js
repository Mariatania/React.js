import { useState, useEffect } from "react"
import { SimpleGrid, Select, Container } from "@chakra-ui/react";
import Card from "./Cards";

function Home() {
 const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading (true);
      fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4")
        .then((res) => res.json())
        .then((data) => {
          setDeck(data.data)
          setLoading(false);
        })
      }, [])



  function sortData(type) {
    setDeck(card => {
      const kartu = [...card]
      kartu.sort((a, b) => {
        if (a[type] < b[type]){
          return -1;
        }
        if (a[type] > b[type]){
          return 1;
        }
        return 0;
      })
      return kartu
    })
    
  }
  if (loading) return <h1>Loading...</h1>
  return (
    <Container maxW="container.lg" marginY="4">
      <Select name="sort" onChange={(e) => sortData(e.target.value)} placeholder="Sort by" marginBottom={4}>
        <option value="name">Name</option>
        <option value="atk">Attack</option>
        <option value="def">Defence</option>
      </Select>
      <SimpleGrid columns={[1, 2, 4]} spacing={5}>
        {deck.map(card => (
          <Card card={card} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Home;
