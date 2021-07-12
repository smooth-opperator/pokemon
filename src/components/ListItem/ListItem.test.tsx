import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import ListItem from "./index";
import { IListItem } from "../interfaces";

const setup = (newProps?: Partial<IListItem>) => {
  const componentProps = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    isFavorite: false,
    toggleFavorite: () => null,
    ...newProps,
  };
  return render(
    <Router>
      <ListItem {...componentProps} />
    </Router>
  );
};

describe("the ListItem component", () => {
  test("clicking the heart calls toggleFavorite", async () => {
    const toggleFavorite = jest.fn();
    setup({ toggleFavorite });

    const Heart = await screen.findByTestId("heart");
    expect(toggleFavorite).not.toHaveBeenCalled();

    user.click(Heart);
    expect(toggleFavorite).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/1/"
    );
  });
});
