import { useState } from 'react';
import { useTwittGlobalContext } from '../../hooks/context/twitts';
import './create_twitt.css';

function Create_Twitt() {

    const maxCharacters = 280;
    const [textAreaContent, setTextAreaContent] = useState('');
    const [characters, setCharacters] = useState(280);
    const [isCreateTwAreaEmpty, setIsCreateTwAreaEmpty] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const {createTwitt} = useTwittGlobalContext();

    const handleSubmitCreateTwForm = (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreateTwAreaEmpty(false);
        if(textAreaContent.length === 0){
            setIsCreateTwAreaEmpty(true);
        } else {
            const formData = new FormData();
            formData.append("twitt", textAreaContent);
            if(file != null){
                formData.append("image", file)
            };
            createTwitt(formData);
        }
    }

    const handleTextAreaCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newContent = e.target.value;
        let spacesAndCharacters = newContent.replace(/\s+/g, "").length; // Elimina espacios y cuenta caracteres.

        if (spacesAndCharacters <= maxCharacters) {
            if (newContent.length > textAreaContent.length) {
                //adign characters
                setTextAreaContent(newContent);
                setCharacters(prevState => prevState - 1);
            } else {
                // substracting characters
                setTextAreaContent(newContent);
                setCharacters(prevState => prevState + 1);
            }
        }
    }

    const handleSubmitFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const file = e.target.files[0];
            setFile(file)
        }  
    }


    return (
        <div className="create-twitt-container">

            <form action="" className="create-twitt-form">

                <textarea className={`${isCreateTwAreaEmpty && 'textarea-empty'}`} name="twitt" id="" cols={30} rows={5}
                    placeholder="Que estás pensando?" onChange={(e) => handleTextAreaCharacters(e)} maxLength={maxCharacters}></textarea>
                <input type="file" name='twitt-image' id='twitt-image' onChange={(e) => handleSubmitFile(e)} hidden />
                <div className='characters-container'>
                    <span>{characters}</span>
                </div>
                <div className='create-tw-btn-img-container'>
                    <label htmlFor="twitt-image" className='img-label'><i className='bx bx-photo-album' ></i></label>
                    <button type='submit' className='create-tw-btn' onClick={(e) => handleSubmitCreateTwForm(e)}>Twittear</button>
                </div>

            </form>

        </div>
    )
}

export default Create_Twitt