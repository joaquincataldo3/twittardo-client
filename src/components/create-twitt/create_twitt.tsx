import { useState } from 'react';
import { useTwittGlobalContext } from '../../hooks/context/twitts';
import { Create_Twitt_Btn } from '../create-twitt-btn/create_twitt_btn';
import { HandleCreateTwitt } from '../../types';
import { TwittTextarea } from '../twitt-textarea/twitt_textarea';
import { TwittCharacters } from '../twitt-characters/twitt_characters';
import './create_twitt.css';

function Create_Twitt() {
   
    const { twittTextareaContent, handleTextareaIsEmpty, handleTextareaChange} = useTwittGlobalContext();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const { createTwitt } = useTwittGlobalContext();

    const handleSubmitCreateTwForm: HandleCreateTwitt = (e: React.FormEvent) => {
        e.preventDefault();
        handleTextareaIsEmpty(false);
        if (twittTextareaContent.length === 0) {
            handleTextareaIsEmpty(true);
        } else {
            const formData = new FormData();
            formData.append("twitt", twittTextareaContent);
            if (file != null) {
                formData.append("image", file);
                setFileName(file.name)
            };
            createTwitt(formData);
            handleTextareaChange('');
            setFileName('');
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
        setFileName('');
    }

    return (
        <div className="create-twitt-container">
            <form action="" className="create-twitt-form">

                <TwittTextarea name='twitt' />
                <input type="file" name='twitt-image' id='twitt-image' onChange={(e) => handleSubmitFile(e)} hidden />
                <div className='characters-container'>
                    <div className="filename-container">
                        <span>{fileName}</span>
                        { fileName && <span><i className='bx bx-trash delete-file' onClick={handleDeleteFile}></i></span>}
                    </div>
                </div>
                <div className='create-tw-btn-img-container'>
                    <label htmlFor="twitt-image" className='img-label'><i className='bx bx-photo-album' ></i></label>
                    <TwittCharacters />
                </div>
                    <Create_Twitt_Btn content={'Twittear'} handleClick={handleSubmitCreateTwForm}/>

            </form>
        </div>
    )
}

export default Create_Twitt