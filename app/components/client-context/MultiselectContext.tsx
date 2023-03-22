import { createContext, useContext } from "react";

type SelectedObject = {
    id: string,
    name: string,
}


interface MultiselectContextProps {
    cardId: string;
    cardIdList: SelectedObject[];
    setCardId: (cardId: string) => void;
    setCardIdList: (cardIdList: SelectedObject[]) => void;
}

// created context
export const MultiselectContext = createContext<MultiselectContextProps>({
    cardId: "",
    cardIdList: [],
    setCardId: () => {},
    setCardIdList: () => []
});

// custom hook to use context
export const useMultiselectContext = () => useContext(MultiselectContext);

interface MuiltiselectProviderProps {
    children: React.ReactNode;
    cardId: string;
    cardIdList: SelectedObject[];
    setCardId: (cardId: string) => void;
    setCardIdList: (cardIdList: SelectedObject[]) => void;
}

// created provider
export const MultiselectProvider: React.FC<MuiltiselectProviderProps> = ({
    children,
    cardId,
    cardIdList,
    setCardId,
    setCardIdList
}) => {
    const contextValue = {
        cardId,
        cardIdList,
        setCardId,
        setCardIdList
    };

    return (
        <MultiselectContext.Provider value={contextValue}>
            {children}
        </MultiselectContext.Provider>
    )
};



