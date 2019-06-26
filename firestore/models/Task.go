package models

import (
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
)

// TaskType represents the different type of tasks that the application will handle.
type TaskType string

const (
	// Project is for basic tasks with durations, deadlines and subtasks.
	Project TaskType = "project"
	// Roadblock is for tasks that are blocking certain actions.
	Roadblock TaskType = "roadblock"
	// List is a special type of task that produces new tasks based off of a list.
	List TaskType = "list"
)

// ChildTask represents a summary of a child task
type ChildTask struct {
	ID        string
	Name      string
	TaskType  TaskType
	Completed bool
}

// Task represents a task
type Task struct {
	ID          string                   `firestore:"id,omitempty"`
	Name        string                   `firestore:"name,omitempty"`
	Description string                   `firestore:"description,omitempty"`
	Deadline    time.Time                `firestore:"deadline,omitempty"`
	Duration    int                      `firestore:"duration,omitempty"` // in minutes
	Repetition  string                   `firestore:"repetition,omitempty"`
	TaskType    TaskType                 `firestore:"type,omitempty"`
	Owner       *firestore.DocumentRef   `firestore:"owner,omitempty"`
	Parent      *firestore.DocumentRef   `firestore:"parent,omitempty"`
	Tags        []*firestore.DocumentRef `firestore:"tasks,omitempty"`
	Children    []ChildTask
	Completed   bool `firestore:"completed,omitempty"`
}

// TaskFrom creates a new Task object from a Document snapshot
func TaskFrom(snapshot *firestore.DocumentSnapshot) *Task {
	var task Task
	// data := snapshot.Data()
	// fmt.Println(data)
	if err := snapshot.DataTo(&task); err != nil {
		fmt.Println(err)
	}
	task.ID = snapshot.Ref.ID
	return &task
}
