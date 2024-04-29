import { render, screen } from "@testing-library/react";
import Hint from "../Hint";
import userEvent from "@testing-library/user-event";
import { useEffect, useRef, useCallback } from "react";
import { Side } from "../hooks/useHint";

test("Hint component renders successfully", () => {
	render(
		<Hint hintContent="I'm a hint" side="top">
			<div>Test children</div>
		</Hint>
	);

	const childrenElement = screen.getByText(/Test children/i);

	expect(childrenElement).toBeInTheDocument();
});

test("Hint displays correctly when visible", () => {
	const mockHintContent = "This is a hint";
	const mockSide: Side = "top";

	render(
		<Hint hintContent={mockHintContent} side={mockSide}>
			Hover me
		</Hint>
	);

	const hoverMeButton = screen.getByText(/hover me/i);
	userEvent.hover(hoverMeButton);

	const hintContent = screen.getByText(mockHintContent);
	expect(hintContent).toBeInTheDocument();
});

test("Hint does not display when not visible", () => {
	const mockHintContent = "This is a hint";
	const mockSide: Side = "top";

	render(
		<Hint hintContent={mockHintContent} side={mockSide}>
			Hover me
		</Hint>
	);

	const hintContent = screen.queryByText(mockHintContent);
	expect(hintContent).not.toBeInTheDocument();
});

const TestComponent = () => {
	const hintContainerRef = useRef<HTMLDivElement>(null);
	const onMouseOver = useCallback(() => {
		console.log("Mouse over");
	}, []);

	const onMouseOut = useCallback(() => {
		console.log("Mouse out");
	}, []);

	useEffect(() => {
		const element = hintContainerRef?.current;

		if (element) {
			element.addEventListener("mouseenter", onMouseOver);
			element.addEventListener("mouseleave", onMouseOut);
		}

		return () => {
			if (element) {
				element.removeEventListener("mouseenter", onMouseOver);
				element.removeEventListener("mouseleave", onMouseOut);
			}
		};
	}, [onMouseOver]);

	return <div ref={hintContainerRef}>Hover me</div>;
};

test("Mouse over event handler called", () => {
	const spy = jest.spyOn(console, "log");
	render(<TestComponent />);
	const element = screen.getByText(/Hover me/i);
	userEvent.hover(element);
	expect(spy).toHaveBeenCalledWith("Mouse over");
});

test("Mouse out event handler called", () => {
	const spy = jest.spyOn(console, "log");
	render(<TestComponent />);
	const element = screen.getByText(/Hover me/i);
	userEvent.unhover(element);
	expect(spy).toHaveBeenCalledWith("Mouse out");
});
