import { Button, Color, Text, Margin, Select } from "@ds.e/react/lib";
import "./App.css";

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
];

const App = () => {
  return (
    <div className="app">
      <Margin>
        {/* <Text size="lg">This is Select Components</Text> */}
        <Margin top bottom space="xs">
          <Select
            label="Select Choose a color"
            options={colorOptions}
            onOptionSelect={console.log}
            // renderOption={({ option, getOptionRecommendedProps, isSelected }) => (
            //   <li {...getOptionRecommendedProps({
            //     className: `custom-select-option ${isSelected ? "custom-select-option--selected" : ""}`
            //   })}> 
            //     <div style={{display:'flex'}}>
            //     <input type="checkbox" checked={isSelected} />
            //     <Text size="sm">{option.label}</Text>
            //     </div> 
            //   </li>
            // )}
          ></Select> 
        </Margin>
        <Text>End of Select</Text>
      </Margin>
    </div>
  );
};

export default App;
