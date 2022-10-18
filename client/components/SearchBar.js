import React from 'react';
import usePlacesAutoComplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";

export default function SearchBar({panTo}) {
    const {
        ready,
        value,
        setValue, 
        suggestions: { status, data },
        clearSuggestions} = usePlacesAutoComplete()

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        console.log(results)
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    return (
      <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          className="location-search-input"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search Location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
    )
}