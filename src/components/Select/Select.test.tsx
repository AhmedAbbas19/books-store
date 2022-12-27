import { fireEvent } from "@testing-library/react";
import { IShelf } from "../../store/books-reducer";
import { renderWithContext } from "../../utils/test-utils";
import Select from "./Select";

test("should call handlerFunction onChange", () => {
    const changeHandlerMock = jest.fn();
    const {getByTestId} = renderWithContext(<Select options={[
        {value: IShelf.read, label: 'Read'},
        {value: IShelf.none, label: 'None'},
    ]}
    initial={'none'} changeHandler={changeHandlerMock}/>);
    const element = getByTestId("select");
    const event = { target: { value: "read" } };
    fireEvent.change(element, event);
    expect(changeHandlerMock).toBeCalled();
});