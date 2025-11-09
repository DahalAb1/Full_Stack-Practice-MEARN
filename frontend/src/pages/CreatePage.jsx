import { ArrowLeft } from 'lucide-react';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import api from '../lib/axios.js'; 



const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState(""); 
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e) => { 
      e.preventDefault();  
      
      if(!title || !content){ 
        toast.error("All fields are required"); 
        return; 
      }

      setLoading(true)

      try{ 
        await api.post("/notes",{title,content}); 
        toast.success("Note create successfully"); 

      }catch(error){ 
          console.log("Error creating note",error);
          if(error.response.status === 429) { 
            toast.error("Slow down, you're creating too many notes"), { 
                duration: 4000, 
                icon:"💀",
            }
          } else{ 
            toast.error("Failed to create note."); 
          }


      }finally{ 
          setLoading(false)
      }
  }

  return (

    <div className ="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>
          <Link to = {"/"} className = "btn btn-ghost mb-6">
          <ArrowLeft className = "size-5"></ArrowLeft>
          Back to Notes
          </Link>

          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-6'>
                  Create New Note
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-semibold'>Title</span>
                  </label>
                  <input 
                    type="text"
                    placeholder='Enter note title...'
                    className='input input-bordered w-full'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-semibold'>Content</span>
                  </label>
                  <textarea
                    placeholder='Write your note here...'
                    className='textarea textarea-bordered w-full h-32'
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end mt-6">
                  <button type="submit" className='btn btn-primary'>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>     



  )
}

export default CreatePage
