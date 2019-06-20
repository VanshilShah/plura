package firestore

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

var client *firestore.Client

// Init initializes the firestore client and returns the instance
func Init() {
	// Sets your Google Cloud Platform project ID.
	projectID := "plura-244219"

	// Get a Firestore client.
	ctx := context.Background()
	c, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	client = c

	// Close client when done.
	// defer client.Close()
	// return client
}

// GetName returns a name of a user
func GetName(ctx context.Context) string {
	iter := client.Collection("users").Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// return err
		}
		var user User
		doc.DataTo(&user)
		// fmt.Println(doc.Data(), user.Name)
		return user.Name
	}
	return "no name"
}

// User represents a user.
type User struct {
	Name string `firestore:"name,omitempty"`
}
