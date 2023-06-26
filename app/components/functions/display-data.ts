import { convertToDisplayDate } from "./convert-dates";


export const convertHeader = (header: string) => {
    const reformatAttributeName = header.split(/(?=[A-Z])/).join(" ");

    return reformatAttributeName.toLowerCase();
}


export const convertAttribute = (attribute: any) => {
    let reformatAttribute = attribute;


    if(attribute.includes(",")) {
        reformatAttribute = attribute.split(",").join(", ").toLowerCase();
    }
    if(attribute.includes("T") && attribute.includes("Z") && attribute.includes("-")) {
        reformatAttribute = convertToDisplayDate(attribute);
    }

    return reformatAttribute;
}
