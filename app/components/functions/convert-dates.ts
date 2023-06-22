import { parse, formatISO, parseISO, format } from 'date-fns';


export function convertToISOString(dateString: string) {
    const parsedDate = parse(dateString, 'MM/dd/yyyy', new Date());
    const isoString = formatISO(parsedDate);
    return isoString;
}

export function convertToDisplayDate(isoString: string) {
    const parsedDate = parseISO(isoString);
    const formattedDate = format(parsedDate, 'MM/dd/yyyy');
    return formattedDate;
}