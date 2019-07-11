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
	ID          string                   `firestore,json:"id,omitempty"`
	Name        string                   `firestore,json:"name,omitempty"`
	Description string                   `firestore:"description,omitempty"`
	Duration    float32                  `firestore:"duration,omitempty"` // in minutes
	ChunkSize   float32                  `firestore:"chunk,omitempty"`    // in minutes
	Recurrance  Recurrance               `firestore:"recurrance,omitempty"`
	TaskType    TaskType                 `firestore:"type,omitempty"`
	Owner       *firestore.DocumentRef   `firestore:"owner,omitempty"`
	Parent      *firestore.DocumentRef   `firestore:"parent,omitempty"`
	Tags        []*firestore.DocumentRef `firestore:"tasks,omitempty"`
	Children    []ChildTask              `firestore:"children"`
	Completed   bool                     `firestore:"completed,omitempty"`
}

// Recurrance represents the duedate of the task
type Recurrance struct {
	Type     RecurranceType `firestore:"type,omitempty"`
	Deadline time.Time      `firestore:"deadline,omitempty"`
	Weekdays Weekdays       `firestore:"weekdays"`
	MonthDay int            `firestore:"monthday,omitempty"`
	YearDay  time.Time      `firestore:"yearday,omitempty"`
}

// Weekdays represents the weekdays a task could be repeating
type Weekdays struct {
	S  bool `firestore:"s"`
	M  bool `firestore:"m"`
	T  bool `firestore:"t"`
	W  bool `firestore:"w"`
	TH bool `firestore:"th"`
	F  bool `firestore:"f"`
	SA bool `firestore:"sa"`
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

// DefaultTasks is the set of default tasks every user is initialized with.
var DefaultTasks = [...]Task{
	Task{
		ID: "root",
	},
	Task{
		ID:          "sample_once",
		Name:        "Sample First Task",
		Description: "A simple one time task",
		Duration:    5,
		ChunkSize:   1,
		Recurrance: Recurrance{
			Type:     Once,
			Deadline: time.Now().Add(time.Hour * 24 * 7),
		},
		TaskType: Project,
		Parent: &firestore.DocumentRef{
			ID: "root",
		},
		Completed: false,
	},
	Task{
		ID:          "sample_daily",
		Name:        "Sample Daily Repeating Task",
		Description: "This is an example of how to have a task repeat every day",
		Duration:    1,
		ChunkSize:   1,
		Recurrance: Recurrance{
			Type: Weekly,
			Weekdays: Weekdays{
				S:  true,
				M:  true,
				T:  true,
				W:  true,
				TH: true,
				F:  true,
				SA: true,
			},
		},
		TaskType: Project,
		Parent: &firestore.DocumentRef{
			ID: "root",
		},
		Completed: false,
	},
	Task{
		ID:          "sample_child",
		Name:        "Sample Child Task",
		Description: "This is an example of a child task which inherit's its parent's deadline",
		Duration:    1,
		ChunkSize:   1,
		Recurrance: Recurrance{
			Type: Inherit,
		},
		TaskType: Project,
		Parent: &firestore.DocumentRef{
			ID: "sample_once",
		},
		Completed: false,
	},
}
