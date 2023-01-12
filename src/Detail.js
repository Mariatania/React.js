import { Text ,Box, Button, Container, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Detail() {
  const [cardData, setCardData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCard = async () => {
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`
      const response = await fetch(url)
      const data = await response.json();
      setCardData(data.data[0])
      setIsLoading(false)
    }
    fetchCard()
  }, [id])
  if (isLoading) return <Heading as={"h1"}>Loading...</Heading>
  return (
    <Container maxW={"container.lg"}>
      <Button m={4} onClick={() => navigate(-1)}>Back</Button>
      <SimpleGrid marginY={4} columns={2}>
        {cardData?.card_images && <Image src={cardData?.card_images[0].image_url} />}
        <Box>
          <Heading as={"h2"}>{cardData?.name}</Heading>
          <Box>
            <Text fontWeight="bold">
              Level: {cardData?.level}
            </Text>
            <Text fontWeight="bold">
              {cardData?.attribute}
            </Text>
            <Text fontWeight="bold">
              ATK/{cardData?.atk} DEF/{cardData?.def}
            </Text>
            <Text>
              [ {cardData?.type} / {cardData?.race} ]
            </Text>
            <Text>
            {cardData?.desc}
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
      <Heading marginY={6} textAlign={"center"}>Card Set</Heading>
      <SimpleGrid columns={[1, 2, 4, 6, 8]} spacing={8}>
      {cardData.card_sets && cardData?.card_sets.map((card, i) => (
          <Box>
          <Text>Name: {card.set_name}</Text>
          <Text>Code: {card.set_code}</Text>
          <Text>Rarity: {card.set_rarity}</Text>
          <Text>Price: {card.set_price}</Text>
        </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Detail;
