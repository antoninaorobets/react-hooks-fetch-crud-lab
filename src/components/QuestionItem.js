import React from "react";

function QuestionItem({ question, onDelete, onEdit }) {
  const { id, prompt, answers, correctIndex } = question;
  function handleDelete(event){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>res.json()).then(()=>onDelete(id))
  }
  function handleChange(event){
    const newCorect = event.target.value
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": newCorect
      })
    }).then(res=>res.json()).then((correct)=>onEdit(correct))

  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
