# Echoes of Memory

## Description
Echoes of Memory is a web-based memory game designed to enhance memory skills. The game involves flipping over pairs of cards, with the objective to find all matching pairs. Users need to register with their email, username, and password before playing.

The game offers:
- **Single-player mode:** 6 difficulty levels with different time limits.
- **Multiplayer mode:** 3 difficulty levels, where players take turns and the one with more matched pairs wins.

Players can also view their game statistics and rankings.

## Application Structure

The Echoes of Memory application is structured using the Model-View-Controller (MVC) architecture with an additional service layer. Below is an overview of each layer:

### Model, Controller and Service layers

**Implemented in:** `memo-java-spring`

### View Layer

**Implemented in:** `memo-react-app`

Within the `src/pages` directory, each page has its own folder:

- `home-page`: Home page
- `mp-modes-page`: Multiplayer modes
- `mp-stats-page`: Multiplayer statistics
- `play-page`: Gameplay page
- `register-page`: Registration page
- `sign-in-page`: Sign-in page
- `sp-game-page`: Single-player game
- `sp-modes-page`: Game modes
- `sp-stats-page`: Single-player statistics
- `stats-page`: Statistics pages

In the `src/common` directory, you can find components that are used across different parts of the application. For instance, navigation bar components are located in `src/common/navbar`.

#### AuthProvider

The `AuthProvider` component is responsible for handling sign-in and sign-out processes. From the `AuthContext`, you can retrieve:

- `isAuthenticated`: Indicates if the user is signed in
- `token`: User's token
- `handleSignIn`: Function to sign in
- `handleSignOut`: Function to sign out
- `userId`: User's ID
- `userName`: User's name

#### WebSocketProvider

The `WebSocketProvider` component manages WebSocket connections and messages. From the `WebSocketContext`, you can retrieve:

- `stompClientRef`: Reference to the STOMP client
- `isConnected`: Indicates if the connection to the WebSocket is successful
- `isJoined`: Indicates if the user is in a game
- `receivedMessage`: Message received via WebSocket
- `error`: Any errors encountered

#### SinglePlayerGame Component

The `SinglePlayerGame` component is responsible for single-player sessions. It displays data received from the backend such as:

- Found pairs and the last flipped cards
- Remaining time
- Number of pairs found so far

If the cards are not pairs, they flip back after 2 seconds, assisted by a timer. When navigating to the single-player page, the component sends a message to the backend to verify if the game is still valid, ensuring the user cannot navigate to an already finished session.

#### MultiPlayerGame Component

The `MultiPlayerGame` component handles multiplayer sessions. It retrieves data from `WebSocketContext` and displays:

- Found pairs and the last flipped cards
- The names of the two players and the number of pairs each has found
- The next player's turn

It also manages scenarios where the user wants to play with a friend, sending appropriate requests accordingly.

## System Requirements
The application can run on a local server (personal computer) or a web server.

### Frontend Requirements:
- React 18.2.0
- Node.js 16.15.1
- Main dependencies:
  - axios: 1.6.7
  - bootstrap: 5.3.3
  - bootstrap-icons: 1.11.3
  - react-dom: 18.2.0
  - react-responsive: 10.0.0
  - react-router-dom: 6.22.3
  - react-scripts: 5.0.1
  - react-stomp: 5.1.0
  - sass: 1.72.0
  - sockjs-client: 1.6.1
  - styled-components: 6.1.8
  - web-vitals: 2.1.4

 Requires an internet browser (e.g., Mozilla Firefox, Google Chrome, Opera, Microsoft Edge).

## Installation

### Local Installation

#### Required Software Installation

1. **Node.js and npm**
   - Download from the Node.js website and follow the installation instructions. Verify the installation with:
   ```powershell
   node -v
   npm -v
   ```
2. **Install dependencies with:**
   ```powershell
   npm install
   ```
   
## Start the application:
```powershell
npm start
```

The application will start at http://localhost:3000.
