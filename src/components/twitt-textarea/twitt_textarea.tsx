import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { TwittTextareaProps } from "../../utils/interfaces/props/props_interfaces";


export const TwittTextarea = (props: TwittTextareaProps) => {

    const {handleCharacters, handleTextareaChange, twittTextareaContent, isTwittTextareaEmpty} = useTwittGlobalContext();
    const {name} = props;
    const maxCharacters = 280;
    const addCharacters = 'add';
    const substractCharacters = 'substract';

    const handleTextAreaCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newContent = e.target.value;
        let spacesAndCharacters = newContent.replace(/\s+/g, "").length; // Elimina espacios y cuenta caracteres.
        if (spacesAndCharacters <= maxCharacters) {
            if (newContent.length > twittTextareaContent.length) {
                //adign characters
                handleTextareaChange(newContent);
                handleCharacters(addCharacters);
            } else {
                // substracting characters
                handleTextareaChange(newContent);
                handleCharacters(substractCharacters);
            }
        }
    }

    return (
        <textarea className={`${isTwittTextareaEmpty && 'input-error'}`} name={name} id="" cols={30} rows={5}
            placeholder="Que estás pensando?" onChange={(e) => handleTextAreaCharacters(e)} maxLength={maxCharacters}></textarea>
    )
}
