import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { LINK } from '../config';
import { AuthProvider } from '../common/AuthContext';
import Navbar from '../common/navbar/Navbar';
import { BrowserRouter as Router} from 'react-router-dom'; 
import SPStats from '../pages/sp-stats-page';
import SinglePlayerOptions from '../pages/sp-modes-page';
import MultiPlayerStats from '../pages/mp-stats-page';

const mock = new MockAdapter(axios);
const games = [];
for(let i=0; i<15; i++) {
  games.push({ updatedAt: "2002-02-2" + i, pairs: 4*i, timeMax: 300, won: true });
}

mock.onPost(LINK + '/api/getUserInfo').reply(200, {userId: "743478", userName: "TestName", });
mock.onPost(LINK + '/api/singlePlayerStatistics/all').reply(200, 
  {
  data: games,
  currentPage: 1,
  totalPages: 2,
  totalItems: games.length
});
mock.onPost(LINK + '/api/singlePlayerStatistics/summarized').reply(200, 
  [
    {
      pairs: 'mock-pairs',
      time: 300,
      numOfGames: 10,
      wins: 5,
      losses: 5,
      winningRate: 50,
      avgRemainingTime: 150
    },
  ]
);
mock.onPost(LINK + '/api/singlePlayer/startSinglePlayer').reply(200, {
  "sessionId": "jkfvnjkamlevlmmelm"
});
mock.onPost(LINK + '/api/multiPlayerStatistics').reply(200, 
  [
    {
        "wins": 24,
        "rank": 1,
        "userName": "korte"
    },
    {
        "wins": 23,
        "rank": 2,
        "userName": "alma"
    },
    {
        "wins": 14,
        "rank": 3,
        "userName": "szilva"
    },
    {
        "wins": 3,
        "rank": 4,
        "userName": "szolo"
    },
    {
        "wins": 2,
        "rank": 5,
        "userName": "bab1"
    },
    {
        "wins": 2,
        "rank": 5,
        "userName": "Yami1"
    },
    {
        "wins": 2,
        "rank": 5,
        "userName": "meggy"
    },
    {
        "wins": 1,
        "rank": 6,
        "userName": "barack"
    },
    {
        "wins": 1,
        "rank": 6,
        "userName": "borso"
    },
    {
        "wins": 0,
        "rank": 7,
        "userName": "salata"
    },
    {
        "wins": 0,
        "rank": 7,
        "userName": "name"
    },
    {
        "wins": 0,
        "rank": 7,
        "userName": "ka_ti_23"
    }
]
)

jest.mock('../common/AuthContext', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../common/AuthContext'),
    useAuth: () => ({
      isAuthenticated: true,
      token: 'fake-token',
      handleSignIn: jest.fn(),
      handleSignOut: jest.fn(),
      userId: '12345',
      userName: 'Test User',
    }),
    AuthProvider: ({ children }) => <div>{children}</div>,
  };
});

test('render game page buttons when navigating to /game in Navbar', async () => {
  render(
    <AuthProvider>
      <Router>
        <Navbar/>
      </Router>
    </AuthProvider>
  );
  fireEvent.click(screen.getByRole('link', {name: /Play/i }));

  await waitFor(() => {
    expect(screen.getByText(/Single PLayer/i)).toBeInTheDocument();
  })
});

test('render single player stats', async () => {
  render(
    <AuthProvider>
      <Router>
        <SPStats/>
      </Router>
    </AuthProvider>
  );
  expect(screen.getByText(/Single Player Games/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/2002-02-20/i)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(/Number of Games: 15/i)).toBeInTheDocument();
  });
});

test('render game modes', async () => {
  render(
    <AuthProvider>
      <Router>
        <SinglePlayerOptions/>
      </Router>
    </AuthProvider>
  );
  expect(screen.getByText(/Game Modes/i)).toBeInTheDocument();
  
  fireEvent.click(screen.getByRole('button', {name: "Start (8 pairs 1 min)" }));
});

test('render multiplayer stats', async () => {
  render(
    <AuthProvider>
      <Router>
        <MultiPlayerStats/>
      </Router>
    </AuthProvider>
  );
  expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/szolo/i)).toBeInTheDocument();
  });
});

