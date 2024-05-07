import * as React from "react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mockStoreData } from "../utils/mockdata";

jest.mock("next/router", () => require("next-router-mock"));

const mockStore = configureStore([thunk]);
const store = mockStore(mockStoreData);
describe("pokemon-list", () => {
  it("list name column renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const textElement = screen.getByText(/name/i)
    expect(textElement).toBeInTheDocument();
  });

  it("navigates to the Pokemon details page when a row is clicked", () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    useRouterMock.mockImplementation(() => ({
      push: pushMock,
    }));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText("bulbasaur"));
    expect(pushMock).toHaveBeenCalledWith("/bulbasaur");
  });
});
