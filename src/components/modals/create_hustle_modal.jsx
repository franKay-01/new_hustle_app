import $ from 'jquery'; 
import { useState, Fragment, useEffect, useRef } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react'
import MediaUpload from '../media';
import TagInput from 'react-materialui-tag-input'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useFunctions from '../../utils/functions';
import useHustleFunctions from '../../utils/hustles';
import Loader from '../loader';
import { ShowToast } from '../showToast';
import useUploadFunction from '../../utils/imageFileUpload'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function CreateHustleModal({handleClose, show}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [allCategories, setAllCategories] = useState([])
  const [idImg, setIdImg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [categorySelected, setCategorySelected] = useState("")
  const [selectedFile, setSelectedFile] = useState([]);
  const [inputTags, setInputTags] = useState([])
  const [form, setForm] = useState({title: '', experience_level: '', 
    date_needed: '', budget: '', start_time: '', end_time: ''})

  const editorStateRef = useRef(editorState);

  const { createHustle } = useHustleFunctions()
  const { getAllCategories } = useFunctions()
  const { handleImageBlobsUpload } = useUploadFunction()

  const handleFormChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
	}

  const handleSupportingDocumentImageUploads = async () => {
    const mediaArray = []

    if (selectedFile.length > 0){
      await Promise.all(selectedFile.map(async (item) => {
        const imageUrl = await handleImageBlobsUpload(item.fileimage);
        mediaArray.push(imageUrl);
      }));
    }
    
    return mediaArray
  };

  const getCategories = async () => {
    setIsLoading(true)

    const {response_code, categories} = await getAllCategories()
    if (response_code === 200){
      setIsLoading(false)
      setAllCategories(categories)
      return
    }

    setIsLoading(false)
    ShowToast("error", "Country details not loaded. Check internet connection and try again")
    return
  }

  const handleRadio = (val) => {
    setForm({...form, experience_level: val})
  } 

  const findCategoryId = (categoryName) => {
    const foundCategory = allCategories.find(category => category.category_name === categoryName);
    return foundCategory ? foundCategory.id : null;
  };

  const areAnyValuesEmpty = () => {
    return Object.entries(form).some(([key, value]) => value === '');
  };

  const submitHustleDetails = async () => {
    setIsLoading(true)

    const currentState = editorStateRef.current.getCurrentContent();
    const html = draftToHtml(convertToRaw(currentState));
    const plainText = currentState.getPlainText();

    console.log('HTML:', html);
    console.log('Plain Text:', plainText);

    if (categorySelected.length === 0){
      setIsLoading(false)
      ShowToast("error", "Hustle category is required.")
      return
    }

    const null_response = areAnyValuesEmpty()
    if (null_response){
      setIsLoading(false)
      ShowToast("error", "Job title, Description & Experience level are required")
      return
    }

    if (inputTags.length > 5){
      setIsLoading(false)
      ShowToast("error", "You can only add 5 maximum skills. Add other skills in your description")
      return
    }

    const budgetValue = parseInt(form.budget, 10);

    if (isNaN(budgetValue) || budgetValue < 0) {
      ShowToast("error","Please enter a valid positive integer for the budget.");
      return;
    }

    const contentImageUrl = await handleSupportingDocumentImageUploads()

    const params = {
      "title": form.title,
      "latitude": "5.666",
      "longitude": "45.2323",
      "category_id": findCategoryId(categorySelected),
      "description": form.hustle_description,
      "skills_required": inputTags,
      "image": null,
      "document": contentImageUrl.length > 0 ? contentImageUrl[0] : null,
      "experience_level": form.experience_level,
      "document_required": false,
      "budget": form.budget,
      "preferred_date": form.date_needed,
      "preferred_start_time": form.start_time,
      "preferred_end_time": form.end_time,
      "src": "WEB"
    }
    console.log("DATA ", JSON.stringify(params))
    // const {response_code, msg} = await createHustle(params)
    // if (response_code === 200){
    //   ShowToast("success", "Hustle created successfully")
    //   return history('/requester/hustles')
    // }

    // if (response_code === 401){
    //   ShowToast("error", "Session expired. Sign in to continue!")
    //   return history('/')
    // }

    setIsLoading(false)
    // ShowToast("error", msg)
    // return
  }


  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className={showHideClassName}>
      <section className="modal-main !bg-[#F5F5F5] overflow-y-auto">
        { isLoading ? 
         <Loader/>
         :
         <>
          <div className="flex justify-between p-3">
            <h1 className="modal-header-text">Create hustle</h1>
            <div className="flex flex-row gap-2 justify-between items-center">
              <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="#000F1F"/>
              </svg>
            </div>
          </div>
          <hr className='default'/>
          <div className="flex flex-col gap-2 p-3">
            <div className='flex flex-col'>
              <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2'>
                <div className='flex flex-col'>
                  <label className="form-label mt-4">Enter job title</label>
                  <input onChange={handleFormChange} name="title" value={form.title} className="auth-input-box block" placeholder='eg. Gardening' type="text"/>
                </div>
                <div className='flex flex-col'>
                  <label className="form-label mt-4">Select category</label>
                  <Listbox value={categorySelected} onChange={setCategorySelected}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full h-[3.3rem] hc-border cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{categorySelected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="mt-1 absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {allCategories?.map((option, optionIdx) => (
                            <Listbox.Option
                              key={optionIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                  active ? 'bg-green-900 text-white' : 'text-gray-900'
                                }`
                              }
                              value={option.category_name}
                            >
                              {({ categorySelected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      categorySelected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {option.category_name}
                                  </span>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mt-4 gap-2">
                <div className="flex flex-col">
                  <label className="form-label">Preferred date</label>
                  <div className="flex flex-row gap-2">
                    <input 
                      type="date" 
                      name="date_needed"
                      onChange={handleFormChange}
                      className="auth-input-box auth-input-box-date-alt block" 
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="form-label">Preferred time</h1>
                  <div className="flex flex-row gap-2">
                    <input 
                      type="time" 
                      name="start_time"
                      onChange={handleFormChange}
                      className="auth-input-box auth-input-box-date block" 
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <input 
                      type="time" 
                      name="end_time"
                      onChange={handleFormChange}
                      className="auth-input-box auth-input-box-date block" 
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2'>
                <div className='flex flex-col'>
                  <label className="form-label mt-4">Service duration</label>
                  <input name="first_name" className="auth-input-box block" placeholder='3 hours' type="text" disabled/>
                </div>
                <div className='flex flex-col'>
                  <label className="form-label mt-4">Location</label>
                  <input name="first_name" className="auth-input-box block" placeholder='eg. Adenta' type="text"/>
                </div>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2'>
                <div className="flex flex-col relative">
                  <label className="form-label mt-4">Budget</label>
                  <input name="budget" 
                    onChange={handleFormChange}
                    className="auth-input-box auth-input-box-alt block" type="text" value={form.budget}/>
                  <h1 className="absolute text-[#000] top-[60%] left-2 proposal-placeholder-text">GHS</h1>
                </div>
                <div className='flex flex-col '>
                  <label className="form-label mt-4">What is the experience level you want?</label>
                  <div className="flex flex-row gap-2 mt-4">
                    <p className='flex flex-row items-center gap-2'>
                      <input onClick={() => handleRadio('Beginner')} className='w-4 h-4' type="radio" id="test1" name="experience"/>
                      <label for="test1" className='form-label'>Beginner</label>
                    </p>
                    <p className='flex flex-row items-center gap-2'>
                      <input onClick={() => handleRadio('Intermediate')} className='w-4 h-4' type="radio" id="test2" name="experience"/>
                      <label for="test2" className='form-label'>Intermediate</label>
                    </p>
                    <p className='flex flex-row items-center gap-2'>
                      <input onClick={() => handleRadio('Expert')} className='w-4 h-4' type="radio" id="test3" name="experience"/>
                      <label for="test3" className='form-label'>Expert</label>
                    </p>
                  </div>
                </div>
              </div>

              <label className="form-label mt-4">Add skills required to get the job done</label>
              <label className="form-label !text-[12px]">You can only add 5 maximum</label>            
              <TagInput 
                tags={inputTags} 
                setTags={setInputTags}
                allowBackspace />
              <label className="form-label !text-[12px]">Click enter to add skill</label>

              <div className="flex flex-col mt-4">
                <h1 className="form-label">Brief service description</h1>
              </div>
              <Editor 
                editorState={editorState}
                onEditorStateChange={(state) => {
                  setEditorState(state);
                  editorStateRef.current = state;
                }}
                wrapperClassName="editor-wrapper" 
                toolbar={{ options: ['inline','list', 'link', 'image'] }} 
              />
              
              <h1 className="form-label mt-4">Upload supporting images</h1>
              <MediaUpload setOriginalSelectedFile={setSelectedFile}/>

              <div className='flex justify-center'>
                <button onClick={() => submitHustleDetails()} className='flex !w-[30%] view-more-button justify-center items-center mt-4'>
                  <h1 className='view-more-button-text'>Create hustle</h1>
                </button>
              </div>
            </div>
          </div>
         </>
        }
      </section>
    </div>
  )
}