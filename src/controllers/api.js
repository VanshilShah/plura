
import firebase from 'firebase/app';

async function getName() {
    return fetch('/api/name', {
      method: 'GET',
      headers: {
        'Authorization': await getAuthorization(),
      } 
    });
}

async function getTasks() {
  return fetch('/api/tasks', {
    method: 'GET',
    headers: {
      'Authorization': await getAuthorization(),
    }
  });
}

async function saveTask(task) {
  return fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Authorization': await getAuthorization(),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task)
  }); 
}

async function deleteTask(deletingTask) {
  return fetch('/api/tasks', {
    method: 'DELETE',
    headers: {
      'Authorization': await getAuthorization(),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deletingTask)
  });
}

async function getAuthorization (){
  return firebase.auth().currentUser.getIdToken();
}

export default { getTasks, deleteTask, saveTask, getName };

