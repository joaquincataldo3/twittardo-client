import { useTwittGlobalContext } from "../../hooks/context/twitts"
import './twitt_characters.css';

export const TwittCharacters = () => {

  const { characters } = useTwittGlobalContext();

  return (
    <div className="characters-container">
        <p>{characters}</p>
    </div>
  )
}
