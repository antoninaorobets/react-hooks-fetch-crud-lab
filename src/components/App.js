import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => {setQuestions(data)})
  }, [])

  function handleAddQuestion(newQuestion){
    setQuestions([...questions,newQuestion])
  }
  function handleDeleteQuestion(id){
    setQuestions(questions.filter((question)=>question.id !== id))
  }
  function handleEdit(quest){
    setQuestions(questions.map((question)=>{ 
      if (question.id !== quest.id) {return question}  
       else {return quest}
    }))
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} onEdit={handleEdit} onDelete={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
