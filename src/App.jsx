import { useState, useEffect } from 'react'

//students
import students from './data/students';

function App() {

  const resetStudent = {

    'name': '',
    'course': '',
    'status': 'inactive'
  };

  //student
  const [student, setStudent] = useState(resetStudent); //form add student

  //students list
  const [studentsList, setStudentsList] = useState(students);

  useEffect(() => {

    setStudentsList(students);
  }, []);


  return (
    <>
      <main class="container">
        <h1>Gestione Studenti</h1>

        <div id="status-message" class="status-message"></div>
        
        <section class="form-section">
          <h2>Aggiungi Studente</h2>
          <form id="student-form">
            <label>
              Nome:
              <input type="text" name="name" value={student.name} required />
            </label>
            <label>
              Corso:
              <input type="text" name="course" value={student.course} required />
            </label>
            <label>
              Stato:
              <select name="status" value={student.status} required>
                <option value="active">Attivo</option>
                <option value="inactive">Inattivo</option>
              </select>
            </label>
            <button type="submit">Aggiungi</button>
          </form>
        </section>

        <section class="filter-section">
          <h2>Filtra</h2>
          <input type="text" id="filter-name" placeholder="Filtra per nome" />
          <input type="text" id="filter-course" placeholder="Filtra per corso" />
        </section>

        <section class="list-section">
          <div class="list-header">
            <h2>Elenco Studenti</h2>
            <div class="sort-controls">
              <label>Ordina per:</label>
              <select id="sort-by">
                <option value="name">Nome</option>
                <option value="course">Corso</option>
              </select>
            </div>
          </div>
          <ul id="student-list">

            {studentsList.map(elem =>

              <li>
                <div>
                  <strong>{elem.name}</strong> - {elem.course}
                  <span class="status">({elem.status})</span>
                </div>
                <div class="actions">
                  <button class="edit-btn">Modifica</button>
                  <button class="delete-btn">Elimina</button>
                </div>
                <form class="edit-form">
                  <label>
                    Nome:
                    <input type="text" name="name" value="Giulia" />
                  </label>
                  <label>
                    Corso:
                    <input type="text" name="course" value="Matematica" />
                  </label>
                  <label>
                    Stato:
                    <select name="status">
                      <option value="active" selected>Attivo</option>
                      <option value="inactive">Inattivo</option>
                    </select>
                  </label>
                  <button type="submit">Salva modifiche</button>
                </form>
              </li>
            )}

            

          </ul>
        </section>
      </main>
    </>
  )
}

export default App
