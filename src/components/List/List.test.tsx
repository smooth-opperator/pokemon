import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import List from "./index";
import fetchMock from "jest-fetch-mock";
import { mockListResponse } from "./utils/__mocks__/mockResponse";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  __esModule: true,
  useParams: () =>
    jest.fn(() => ({
      page: "1",
    }))(),
}));

const setup = () => {
  return render(
    <Router>
      <List />
    </Router>
  );
};

const disabledButtonColor = "lightgrey";
const enabledButtonColor = "whitesmoke";

describe("the List page", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/list/1");
    fetchMock.resetMocks();
    fetchMock.mockResponses(
      [JSON.stringify(mockListResponse), { status: 200 }],
      [
        JSON.stringify({ sprites: { front_default: "front_default" } }),
        { status: 200 },
      ]
    );
  });

  test("it calls fetch with correct url", () => {
    setup();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
    );
  });

  test("it displays the message about how many results were found", async () => {
    setup();
    const message = screen.getByText("Showing: 0 - 0 of 0 Pokemon");

    expect(screen.getByText("Showing: 0 - 0 of 0 Pokemon")).toBeVisible();
    expect(
      await screen.findByText("Showing: 0 - 50 of 248 Pokemon")
    ).toBeVisible();
    expect(message.innerHTML).toBe("Showing: 0 - 50 of 248 Pokemon");
  });

  it('renders the pagination "Prev" button', async () => {
    setup();
    const PrevLink = await screen.findByText("Prev");
    expect(PrevLink.parentElement.nodeName).toBe("BUTTON");
    expect(PrevLink).toMatchInlineSnapshot(`
      <a
        href="/list/0"
      >
        Prev
      </a>
    `);
  });

  test('the pagination "Prev" button is not clickable', async () => {
    setup();
    const PrevLink = await screen.findByText("Prev");
    expect(PrevLink.parentElement).toHaveStyle("pointer-events: none");
    expect(PrevLink.parentElement).toHaveStyle(
      `background: ${disabledButtonColor}`
    );
  });

  it('renders the pagination "Next" button', async () => {
    setup();
    const NextLink = await screen.findByText("Next");
    expect(NextLink.parentElement.nodeName).toBe("BUTTON");
    expect(NextLink).toMatchInlineSnapshot(`
      <a
        href="/list/2"
      >
        Next
      </a>
    `);
  });

  test('the pagination "Next" button is clickable', async () => {
    setup();
    const NextLink = await screen.findByText("Next");
    expect(NextLink.parentElement).not.toHaveStyle("pointer-events: none");
    expect(NextLink.parentElement).toHaveStyle(
      `background: ${enabledButtonColor}`
    );
  });

  it("renders the container for the results", async () => {
    setup();
    const resultsContainer = await screen.findByTestId("list-results");
    expect(resultsContainer).toBeVisible();
  });

  it("renders a card component for each result", async () => {
    setup();
    const resultsContainer = await screen.findByTestId("list-results");
    expect(resultsContainer.childElementCount).toBe(50);
    expect(resultsContainer.firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-gKAaRy dZKdLE"
      >
        <div
          class="sc-iCoGMd fYDJPt"
        >
          <svg
            data-testid="heart"
          >
            heart.svg
          </svg>
        </div>
        <a
          href="/item/1"
        >
          <div
            class="sc-fujyAs gsPIdb"
          >
            <img
              alt="bulbasaur"
              src="front_default"
            />
          </div>
          <div
            class="sc-pNWdM iZQWOr"
          >
            bulbasaur
          </div>
        </a>
      </div>
    `);
  });
});
