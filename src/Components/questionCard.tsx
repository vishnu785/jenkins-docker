import React, { useState } from 'react'
import { questionPropsType } from '../Type/quiz_type'

const QuestionCard: React.FC<questionPropsType> = ({ question, options, callback }) => {
    // console.log(question, options)

    // user radio
    
    let [selectoption, setSelectOption] = useState("") //string value ""

    const handleSelection = (ev: any)=>{
        // console.log(ev.target.value)
        setSelectOption(ev.target.value)
    }

    return (
        <div>
            <div className='question-container'>
                            
                <p className='question-style'> Q. {question} </p>
           

            <div className='option option-radio'>
                <form onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e, selectoption)}>
                    {
                        options.map((opt: string, ind: number) => {
                            return (
                                <div key={ind}>
                                    <label>
                                        <input type='radio' name='opt' 
                                        style={{margin:"8px"}}
                                        value={opt} 
                                        required 
                                        checked={selectoption === opt} //if equals then pass next option with clear
                                        onChange={handleSelection} />
                                        {opt}
                                    </label>
                                </div>
                            )
                        })
                    }
                    <input className='btn' type='submit' />
                </form>
            </div>
            </div>
        </div>
    )
}
export default QuestionCard;