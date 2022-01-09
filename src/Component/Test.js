import axios from 'axios';
import React from 'react';

const Test = () => {
    async function Download(){
        let formData = new FormData()
        formData.append("image" , document.getElementById("files").files[0])
       let response = await axios.post("http://localhost:5000/mentor/test-buffer" ,formData ,  {responseType : 'blob'})
       const url =  URL.createObjectURL(new Blob([response.data]))
       const link = document.createElement("a")
       link.href = url
       link.setAttribute("download" , "testfile.xlsx")
       document.getElementById("test").appendChild(link)
       link.click()

    }
    return (
        <div id="test">
            <input type='file' id='files' ></input>
            <button onClick={Download}>Download</button>
        </div>
    );
}

export default Test;
