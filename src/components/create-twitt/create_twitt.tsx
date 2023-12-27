import { useState } from 'react';
import { useTwittGlobalContext } from '../../hooks/context/twitts';
import './create_twitt.css';
import { Create_Twitt_Btn } from '../create-twitt-btn/create_twitt_btn';
import { HandleCreateTwitt } from '../../types';

function Create_Twitt() {

    const maxCharacters = 280;
    const [textAreaContent, setTextAreaContent] = useState<string>('');
    const [characters, setCharacters] = useState(280);
    const [isCreateTwAreaEmpty, setIsCreateTwAreaEmpty] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const { createTwitt } = useTwittGlobalContext();

    const handleSubmitCreateTwForm: HandleCreateTwitt = (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreateTwAreaEmpty(false);
        if (textAreaContent.length === 0) {
            setIsCreateTwAreaEmpty(true);
        } else {
            const formData = new FormData();
            formData.append("twitt", textAreaContent);
            if (file != null) {
                formData.append("image", file);
                setFileName(file.name)
            };
            createTwitt(formData);
            setTextAreaContent('');
            setFileName('');
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
        if (e.target.files) {
            const file = e.target.files[0];
            setFile(file);
            setFileName(file.name);
        }
    }

    const handleDeleteFile = () => {
        setFile(null);
        setFileName('')
    }


    return (
        <div className="create-twitt-container">

            <form action="" className="create-twitt-form">

                <textarea className={`${isCreateTwAreaEmpty && 'textarea-empty'}`} name="twitt" id="" cols={30} rows={5}
                    placeholder="Que estás pensando?" onChange={(e) => handleTextAreaCharacters(e)} maxLength={maxCharacters}></textarea>
                <input type="file" name='twitt-image' id='twitt-image' onChange={(e) => handleSubmitFile(e)} hidden />
                <div className='characters-container'>
                    <div className="filename-container">
                        <span>{fileName}</span>
                        { fileName && <span><i className='bx bx-trash delete-file' onClick={handleDeleteFile}></i></span>}
                    </div>

                    <span>{characters}</span>
                </div>
                <div className='create-tw-btn-img-container'>
                    <label htmlFor="twitt-image" className='img-label'><i className='bx bx-photo-album' ></i></label>
                    
                    <Create_Twitt_Btn content={'Twittear'} handleClick={handleSubmitCreateTwForm}/>
                </div>

            </form>

        </div>
    )
}

export default Create_Twitt