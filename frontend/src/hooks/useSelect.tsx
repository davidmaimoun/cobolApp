import { useState } from "react";

export const useSelect = (
  initialOptions: string[] = [],
  defaultValue = "",
  onChange?: (selectedValue: string) => void
) => {
  const [selected, setSelected] = useState(defaultValue);
  const [options, setOptions] = useState<string[]>(initialOptions);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelected(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const SelectComponent = () => (
    <select value={selected} onChange={handleChange} className="custom-select">
      <option value="" disabled>Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return { selected, setSelected, SelectComponent, options, setOptions };
};
