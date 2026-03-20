import type { Option } from "../types";

const proccesOptions = (arr: string[]): Option[] => {
    const options: Option[] = [];

    for (let index = 0; index < arr.length; index++) {
        options.push({value: index, label: arr[index]})
    }

    return options
};

export { proccesOptions };