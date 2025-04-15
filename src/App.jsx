import { useState, useEffect } from 'react'

//axios
import axios from 'axios';

//students
import students from './data/students';

// rand course
import courseRand from './utils/courseRand';
// rand status
import statusRand from './utils/statusRand';

function App() {

  const uri = 'https://jsonplaceholder.typicode.com/users';

  const resetStudent = {

    'name': '',
    'course': '',
    'status': 'active'
  };

  //student
  const [student, setStudent] = useState(resetStudent); //form add student

  //students list
  const [studentsList, setStudentsList] = useState(students);

  //filter name
  const [filterName, setFilterName] = useState('');

  useEffect(() => {

    setStudentsList(students);
  }, []);

  useEffect(() => {

    axios.get(uri)
    .then(res => {
      
      const studentsFromApi = res.data.map((elem) => ({
        id: elem.id,
        name: elem.name,
        course: courseRand(),
        status: statusRand()
      }));
      setStudentsList(prev => [...prev, ...studentsFromApi]);

      console.log('console from api');
      console.log(studentsFromApi);
    })
    .catch(err => console.log(err));
  }, [])

  useEffect(() => {

    let filteredName = studentsList;
    
    if (filterName !== '') {

        filteredName = studentsList.filter(elem => elem.name.toLowerCase().match(filterName.toLowerCase()));
    }
    
    setStudentsList(filteredName);
  }, [filterName]);

  function sendForm(e) {

    e.preventDefault();

    students.push(student);

    //reset form
    setStudent(resetStudent);
  }

  function handleChangeInput(e) {

    const newStudent = {

      ...student,
      [e.target.name]: e.target.value
    }

    setStudent(newStudent);
  }

  console.log(courseRand());
  console.log(statusRand());
  console.log(students);

  return (
    <>
      <main className="container">
        <h1>Gestione Studenti</h1>

        <div id="status-message" className="status-message"></div>
        
        <section className="form-section">
          <h2>Aggiungi Studente</h2>
          <form id="student-form" onSubmit={sendForm}>
            <label>
              Nome:
              <input type="text" name="name" onChange={handleChangeInput} value={student.name} required />
            </label>
            <label>
              Corso:
              <input type="text" name="course" onChange={handleChangeInput}  value={student.course} required />
            </label>
            <label>
              Stato:
              <select name="status" onChange={handleChangeInput} value={student.status} required>
                <option value="active">Attivo</option>
                <option value="inactive">Inattivo</option>
              </select>
            </label>
            <button type="submit">Aggiungi</button>
          </form>
        </section>

        <section className="filter-section">
          <h2>Filtra</h2>
          <input type="text" id="filter-name" placeholder="Filtra per nome" onChange={e => setFilterName(e.target.value)} />
          <input type="text" id="filter-course" placeholder="Filtra per corso" />
        </section>

        <section className="list-section">
          <div className="list-header">
            <h2>Elenco Studenti</h2>
            <div className="sort-controls">
              <label>Ordina per:</label>
              <select id="sort-by">
                <option value="name">Nome</option>
                <option value="course">Corso</option>
              </select>
            </div>
          </div>
          <ul id="student-list">

            {studentsList.map((elem, i) =>

              <li key={i}>
                <div>
                  <strong>{elem.name}</strong> - {elem.course}
                  <span className="status">({elem.status})</span>
                </div>
                <div className="actions">
                  <button className="edit-btn">Modifica</button>
                  <button className="delete-btn">Elimina</button>
                </div>
                {/* <form className="edit-form">
                  <label>
                    Nome:
                    <input type="text" name="name" value={elem.name} />
                  </label>
                  <label>
                    Corso:
                    <input type="text" name="course" value={elem.course} />
                  </label>
                  <label>
                    Stato:
                    <select name="status">
                      <option value="active" selected>Attivo</option>
                      <option value="inactive">Inattivo</option>
                    </select>
                  </label>
                  <button type="submit">Salva modifiche</button>
                </form> */}
              </li>
            )}
          </ul> 
        </section>
      </main>
    </>
  )
}

export default App
