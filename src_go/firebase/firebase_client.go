package firebase

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
)

// InitApp initializes a firebase app and returns the instance
func InitApp() *firebase.App {
	// Get a Firebase app
	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	return app
}

// InitAuth initializes a firebase auth client and returns the instance
func InitAuth(app *firebase.App) *auth.Client {
	// Access auth service from the default app
	client, err := app.Auth(context.Background())
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}
	return client
}

// VerifyRequest helps the middle layer authenticate requests coming to the api.
func VerifyRequest(authClient *auth.Client, c *gin.Context) (*auth.Token, error) {
	idToken := c.Request.Header.Get("Authorization")
	return authClient.VerifyIDToken(c, idToken)
}
