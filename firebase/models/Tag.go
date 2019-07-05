package models

// Tag represents a tag.
type Tag struct {
	ID string
	Name string `firestore:"name,omitempty"`
	Description string `firestore:"description,omitempty"`
	Owner string `firestore:"description,omitempty"`
}
