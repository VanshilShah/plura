package models

import (
	"cloud.google.com/go/firestore"
)
// User represents a user.
type User struct {
	ID string
	Name string `firestore:"name,omitempty"`
	UserID string `firestore:"user_id,omitempty"`
}

// UserFrom creates a new User object from a Document snapshot
func UserFrom(snapshot *firestore.DocumentSnapshot) *User {
	var user User
	snapshot.DataTo(&user)
	user.ID = snapshot.Ref.ID;
	return &user
}