import React from "react";
import { Autocomplete as AutocompleteUI } from "evergreen-ui";

export default AutocompleteUI;

/*export default function Autocomplete({
    items,
    changeFunction,
    title
}) {

    return(
        <AutocompleteUI
            title={title}
            onChange={changeFunction}
            items={items}
            >
            {(props) => {
                const { getInputProps, getRef, inputValue } = props
                return (
                <TextInput
                    placeholder={title}
                    value={inputValue}
                    ref={getRef}
                    {...getInputProps()}
                />
                )
            }}
        </AutocompleteUI >
    )
}*/