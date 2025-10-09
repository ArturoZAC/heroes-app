import { fireEvent, render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[]
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

describe("CustomPagination", () => {
  test("should render component with default values", () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    expect(screen.getByText("Anterior")).toBeDefined();
    expect(screen.getByText("Siguiente")).toBeDefined();

    expect(screen.getByText("1")).toBeDefined();
  });

  test("should disabled previous button when page is 1", () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    const previousButton = screen.getByText("Anterior");
    expect(previousButton.getAttributeNames()).toContain("disabled");
  });

  test("should disabled next button when we are in the last page", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=5"]);
    const nextButton = screen.getByText("Siguiente");
    expect(nextButton.getAttributeNames()).toContain("disabled");
  });

  test("should disabled button 3 when we are in page 3", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=3"]);
    const button2 = screen.getByText("2");
    const button3 = screen.getByText("3");
    expect(button2.getAttribute("variant")).toContain("outline");
    expect(button3.getAttribute("variant")).toContain("default");
  });

  test("should change page when click on number button", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=3"]);
    const button2 = screen.getByText("2");
    const button3 = screen.getByText("3");
    expect(button2.getAttribute("variant")).toContain("outline");
    expect(button3.getAttribute("variant")).toContain("default");

    fireEvent.click(button2);

    expect(button2.getAttribute("variant")).toContain("default");
    expect(button3.getAttribute("variant")).toContain("outline");
  });
});
