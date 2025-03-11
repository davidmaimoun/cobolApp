import { useState } from "react";

export function useRadio(option1: string, option2: string) {
    const [option, setOption] = useState<string>(option1);
    const [selected, setSelected] = useState<boolean>(false);

    const Radio = (
        <div className="flex space-x-4 p-4">
        <button
            className={`btn btn-no-border-right transition-all duration-300 ${
            option === option1 ? "radio-selected" : "radio-no-selected"
            }`}
            onClick={() => {setSelected(false); setOption(option1)}}
        >
            {option1}
        </button>

        <button
            className={`btn btn-no-border-left transition-all duration-300 ${
            option === option2 ? "radio-selected" : "radio-no-selected"
            }`}
            onClick={() => {setSelected(true); setOption(option2)}}
        >
            {option2}
        </button>
        </div>
    );

    return { selected, Radio };
}
