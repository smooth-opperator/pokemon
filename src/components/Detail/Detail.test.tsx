import { render, screen, within } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Detail from "./index";
import fetchMock from "jest-fetch-mock";
import { mockDetailResponse } from "./utils/__mocks__/mockResponse";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  __esModule: true,
  useParams: () =>
    jest.fn(() => ({
      id: "8",
    }))(),
}));

const setup = () => {
  return render(
    <Router>
      <Detail />
    </Router>
  );
};

const { name, abilities, moves, sprites, height, weight } = mockDetailResponse;

describe("the Detail page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockDetailResponse));
  });

  test("it calls fetch with correct url", () => {
    setup();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/8/"
    );
  });

  test("it displays the name of the Pokemon", async () => {
    setup();
    expect(await screen.findByText(name)).toBeVisible();
  });

  test("it displays the weight of the Pokemon", async () => {
    setup();
    expect(await screen.findByText(`${weight} hectograms`)).toBeVisible();
  });

  test("it displays the height of the Pokemon", async () => {
    setup();
    expect(await screen.findByText(`${height} decimeters`)).toBeVisible();
  });

  test("it displays the moves of the Pokemon", () => {
    setup();
    moves.forEach(async (move) => {
      expect(await screen.findByText(`${move}`)).toBeVisible();
    });
  });

  test("it displays the abilities of the Pokemon", () => {
    setup();
    abilities.forEach(async (ability) => {
      expect(await screen.findByText(`${ability}`)).toBeVisible();
    });
  });

  test("it displays the images of the Pokemon", async () => {
    setup();

    const imagesGallery = await screen.findByTestId("sprite-images");
    expect(imagesGallery).toBeVisible();
    expect(await within(imagesGallery).findByAltText(sprites.back_default))
      .toMatchInlineSnapshot(`
      <img
        alt="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png"
      />
    `);
    expect(await within(imagesGallery).findByAltText(sprites.front_default))
      .toMatchInlineSnapshot(`
      <img
        alt="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"
      />
    `);
    expect(await within(imagesGallery).findByAltText(sprites.back_shiny))
      .toMatchInlineSnapshot(`
      <img
        alt="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/8.png"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/8.png"
      />
    `);
    expect(await within(imagesGallery).findByAltText(sprites.front_shiny))
      .toMatchInlineSnapshot(`
      <img
        alt="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png"
      />
    `);
    expect(imagesGallery.childElementCount).toBe(4);
  });
});
