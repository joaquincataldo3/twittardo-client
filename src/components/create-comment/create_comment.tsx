import './create_comment.css'

function Create_Comment() {
  return (   
        <div className="create-comment-container">

            <form action="" className="create-comment-form">
               
                <textarea name="twitt" id="" cols={30} rows={5} placeholder="Que estás pensando?"></textarea>
                
            </form>

        </div>
  )
}

export default Create_Comment