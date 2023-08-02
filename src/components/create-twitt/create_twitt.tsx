import './create_twitt.css'

function Create_Twitt() {
    return (
        <div className="create-twitt-container">

            <form action="" className="create-twitt-form">
               
                <textarea name="twitt" id="" cols={30} rows={5} placeholder="Que estás pensando?"></textarea>
                <label htmlFor="twitt-image" className='img-label'><i className='bx bx-photo-album' ></i></label>
                <input type="file" name='twitt-image' id='twitt-image' hidden  />
            </form>

        </div>
    )
}

export default Create_Twitt