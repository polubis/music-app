import {
  NoteButtonComponent,
  NoteButtonComponentProps,
} from "./NoteButtonComponent";
import { fireEvent, render, screen } from "@testing-library/react";

describe("NoteButtonComponent", () => {
  const renderNoteButtonComponent = (
    props: Partial<NoteButtonComponentProps> = {}
  ) => render(<NoteButtonComponent name="C" position={0} {...props} />);

  it("displays only note name", () => {
    renderNoteButtonComponent();
    expect(screen.getByText(/C/)).toBeInTheDocument();
    expect(screen.queryByText(/4/)).not.toBeInTheDocument();
  });

  it("displays note name with octave", () => {
    renderNoteButtonComponent({ octave: 4 });
    expect(screen.getByText(/C/)).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
  });

  it("calls parent function with dataset attributes", () => {
    const spy = jest.fn();
    const Stub = () => (
      <NoteButtonComponent
        name="C"
        position={0}
        octave={4}
        onClick={(e) =>
          spy({
            position: e.currentTarget.dataset.position,
            octave: e.currentTarget.dataset.octave,
          })
        }
      />
    );

    render(<Stub />);
    fireEvent.click(screen.getByText(/C/));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ position: "0", octave: "4" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
