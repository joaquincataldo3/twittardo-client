import { useState, FormEvent } from 'react';
import { useTwittGlobalContext } from '../../hooks/context/twitts';
import { FormBtn } from '../form-btn/form_btn';
import { HandleCreateTwitt } from '../../types';
import { TwittTextarea } from '../twitt-textarea/twitt_textarea';
import { TwittCharacters } from '../twitt-characters/twitt_characters';
import './create_twitt.css';
import '../../style-variables/variables.css';
import { ErrorContainer } from '../error-container/error_container';

export const CreateTwitt = () => {
   
    const { twittTextareaContent, handleTextareaIsEmpty, handleTextareaChange} = useTwittGlobalContext();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const { createTwitt, twittError } = useTwittGlobalContext();

    const handleSubmitCreateTwForm: HandleCreateTwitt = (e: FormEvent) => {
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
                { twittError && <ErrorContainer message={twittError} /> }
                <FormBtn content={'Twittear'} handleClick={(e) => handleSubmitCreateTwForm(e)} widthNum={70} additionalClassName={['margin-left-auto']}/>
            </form>
        </div>
    )
}
