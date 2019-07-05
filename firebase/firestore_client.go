package firebase

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/VanshilShah/plura/firebase/models"
	"google.golang.org/api/iterator"
)

// InitFirestoreClient initializes the firestore client and returns the instance
func InitFirestoreClient(app *firebase.App) *firestore.Client {
	// Get a Firestore client.
	c, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	return c
}

// GetName returns a name of a user
func GetName(client *firestore.Client, ctx context.Context) string {
	iter := client.Collection("users").Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// return err
		}
		user := models.UserFrom(doc)
		return user.Name
	}
	return "no name"
}

// GetTasks returns a list of tasks
func GetTasks(client *firestore.Client, ctx context.Context) map[string]*models.Task {
	tasks := []*models.Task{}
	iter := client.Collection("tasks").Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// return err
		}
		tasks = append(tasks, (models.TaskFrom(doc)))
	}
	// fmt.Println(tasks)
	return buildTaskHeirarchy(tasks)
}

func buildTaskHeirarchy(tasks []*models.Task) map[string]*models.Task {
	taskMap := make(map[string]*models.Task)
	// populate map
	for _, task := range tasks {
		taskMap[task.ID] = task
	}

	// update children fields
	for _, task := range tasks {
		if task.Parent != nil {
			taskMap[task.Parent.ID].Children = append(taskMap[task.Parent.ID].Children, models.ChildTask{task.ID, task.Name, task.TaskType, task.Completed})
		}
	}
	return taskMap
}

// SaveTask saves a new task or updates an existing one
func SaveTask(client *firestore.Client, ctx context.Context, task models.Task) bool {
	fmt.Println(task)
	var err error
	task.Children = nil
	if task.ID == "" {
		_, _, err = client.Collection("tasks").Add(ctx, task)
	} else {
		_, err = client.Collection("tasks").Doc(task.ID).Set(ctx, task)
	}
	if err != nil {
		fmt.Println(err)
	}
	return err == nil
}

// DeleteTask deletes an existing task as well as all of its children tasks
func DeleteTask(client *firestore.Client, ctx context.Context, task models.Task) bool {
	fmt.Println(task)
	_, err := client.Collection("tasks").Doc(task.ID).Delete(ctx)
	for _, childTask := range task.Children {
		_, err = client.Collection("tasks").Doc(childTask.ID).Delete(ctx)
	}
	if err != nil {
		// Handle any errors in an appropriate way, such as returning them.
		fmt.Println(err)
	}
	return err == nil
}
