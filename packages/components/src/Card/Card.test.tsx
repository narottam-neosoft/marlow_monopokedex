import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";


describe("Card", () => {
  const mockProps = {
    name: "Pikachu",
    image: "pikachu.jpg",
    height: 23,
    weight: 34,
    location: "https://pokeapi.co/api/v2/pokemon/25",
    abilities: [
      {
        ability: {
          name: "Ability 1",
          url: "https://pokeapi.co/api/v2/ability/1",
        },
      },
      {
        ability: {
          name: "Ability 2",
          url: "https://pokeapi.co/api/v2/ability/2",
        },
      },
    ],
  };

  it("renders the card with correct props", () => {
    const { container } = render(<Card {...mockProps} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    const locationLink = screen.getByRole("link", {
      name: "https://pokeapi.co/api/v2/pokemon/25",
    });
    expect(locationLink).toBeInTheDocument();
    expect(locationLink).toHaveAttribute(
      "href",
      "https://pokeapi.co/api/v2/pokemon/25"
    );
    expect(container).toMatchSnapshot();
  });
});
