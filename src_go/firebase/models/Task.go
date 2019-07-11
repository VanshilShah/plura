package models

import (
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
)

// TaskType represents the different type of tasks that the application will handle.
type TaskType string

// RecurranceType represents the type of reccurance a task can have.
type RecurranceType string

const (
	// Project is for basic tasks with durations, deadlines and subtasks.
	Project TaskType = "project"
	// Roadblock is for tasks that are blocking certain actions.
	Roadblock TaskType = "roadblock"
	// List is a special type of task that produces new tasks based off of a list.
	List TaskType = "list"

	// Once is a RecurranceType for one time tasks
	Once RecurranceType = "once"
	// Weekly is a RecurranceType for weekly repeating tasks
	Weekly RecurranceType = "weekly"
	// Monthly is a RecurranceType for monthly repeating tasks
	Monthly RecurranceType = "monthly"
	// Yearly is a RecurranceType for yearly repeating tasks
	Yearly RecurranceType = "yearly"
	// Inherit is a RecurranceType for child tasks
	Inherit RecurranceType = "inherit"
)

// ChildTask represents a summary of a child task
type ChildTask struct {
	ID        string
	Name      string
	Duration  float32
	TaskType  TaskType
	Completed bool
}

// Task represents a task
type Task struct {
	ID          string  `firestore,json:"id,omitempty"`
	Name        string  `firestore,json:"name,omitempty"`
	Description string  `firestore:"description,omitempty"`
	Duration    float32 `firestore:"duration,omitempty"` // in minutes
	ChunkSize   float32 `firestore:"chunk,omitempty"`    // in minutes
	Recurrance  struct {
		Type     RecurranceType `firestore:"type,omitempty"`
		Deadline time.Time      `firestore:"deadline,omitempty"`
		Weekdays struct {
			S  bool `firestore:"s"`
			M  bool `firestore:"m"`
			T  bool `firestore:"t"`
			W  bool `firestore:"w"`
			TH bool `firestore:"th"`
			F  bool `firestore:"f"`
			SA bool `firestore:"sa"`
		} `firestore:"weekdays"`
		MonthDay int       `firestore:"monthday,omitempty"`
		YearDay  time.Time `firestore:"yearday,omitempty"`
	} `firestore:"recurrance,omitempty"`
	TaskType  TaskType                 `firestore:"type,omitempty"`
	Owner     *firestore.DocumentRef   `firestore:"owner,omitempty"`
	Parent    *firestore.DocumentRef   `firestore:"parent,omitempty"`
	Tags      []*firestore.DocumentRef `firestore:"tasks,omitempty"`
	Children  []ChildTask              `firestore:"children"`
	Completed bool                     `firestore:"completed,omitempty"`
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
