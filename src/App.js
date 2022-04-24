import React from 'react';
import './App.css';
import { Accordion, Button, CloseButton, Col, Container, Form, Row, Stack, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ players, setPlayers ] = React.useState(JSON.parse(window.localStorage.getItem('players')) || []);
  const [ shuffledPlayers, setShuffledPlayers ] = React.useState([]);
  const [ uniqueFights, setUniqueFights ] = React.useState([]);
  const [ input, setInput ] = React.useState('');

  const addPlayer = () => {
    if(!input || input.trim().length === 0) return;
    if(players.find(p => p === input.trim())) return;

    players.push(input.trim());
    setInput('');

    window.localStorage.setItem('players', JSON.stringify(players));
    setShuffledPlayers([]);
    setUniqueFights([]);
  }

  const removePlayer = (player) => {
    const _players = players.filter(p => p !== player);

    setPlayers(_players);
    window.localStorage.setItem('players', JSON.stringify(_players));
    setShuffledPlayers([]);
    setUniqueFights([]);
  }

  const shuffle = () => {
    setShuffledPlayers(players.slice().sort(() => 0.5 - Math.random()));
  }

  const getUniqueTeams = () => {
    if (players.length === 0) return;
    
    setUniqueFights(combinations(players, Math.ceil(players.length / 2)).map(team1 => {
      return  [...team1, ...players.filter(p => !team1.includes(p))]
    }));
  }

  const renderTable = (table) => {
    if (!table.length === 0) return null;

    const team1 = table.slice(0, Math.ceil(table.length / 2))
    const team2 = table.slice(Math.ceil(table.length / 2), table.length)

    return team1.map((player, index) => {
      return (
        <tr key={player}>
          <td>{player}</td>
          <td>{team2[index] ? team2[index] : ''}</td>
        </tr>
      )
    })
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <br />
            <Stack gap={3}>
              { players.map(player => {
                return (
                  <Stack direction="horizontal" gap={3}>
                    <Form.Control 
                      className="me-auto" 
                      value={player} 
                      disabled />

                    <CloseButton onClick={() => removePlayer(player)} />
                  </Stack>
                )
              })}

              <Stack direction="horizontal" gap={3}>
                <Form.Control 
                  className="me-auto" 
                  value={input} 
                  onChange={e => setInput(e.target.value)}
                  placeholder="Enter player name"
                  onKeyDown={e => e.key === 'Enter' ? addPlayer() : undefined} />

                <Button variant="secondary" onClick={addPlayer}>Add</Button>
              </Stack>
            </Stack>
          </Col>
        </Row>

        <br />
        <br />

        <Row>
          <Col>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={shuffle}>
                Shuffle into two teams
              </Button>
            </div>
            
            <br />
            {
              shuffledPlayers.length !== 0 && <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Team 1</th>
                      <th>Team 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    { renderTable(shuffledPlayers) }
                  </tbody>
                </Table>
              </Row>
            }
          </Col>
          <Col>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={getUniqueTeams}>
                Generate unique teams
              </Button>
            </div>

            <br />
            {
              uniqueFights.length !== 0 && <Row>
                <Accordion>
                  {
                    uniqueFights.map((fight, index) => {
                      return (
                        <Accordion.Item eventKey={`${index}`} key={index}>
                          <Accordion.Header>{`Fight #${index + 1}`}</Accordion.Header>
                          <Accordion.Body>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Team 1</th>
                                  <th>Team 2</th>
                                </tr>
                              </thead>
                              <tbody>
                                { renderTable(fight) }
                              </tbody>
                            </Table>
                          </Accordion.Body>
                          <br />
                        </Accordion.Item>
                      );
                    })
                  }
                </Accordion>
              </Row>
            }
          </Col>
        </Row>



        
      </Container>
    </div>
  );
}

const combinations = (a, c) => {
  let index = []
  let n = a.length

  for (let j = 0; j < c; j++)
      index[j] = j
  index[c] = n

  let ok = true
  let result = []

  while (ok) {

      let comb = []
      for (let j = 0; j < c; j++)
          comb[j] = a[index[j]]
      result.push(comb)

      ok = false

      for (let j = c; j > 0; j--) {
          if (index[j - 1] < index[j] - 1) {
              index[j - 1]++
              for (let k = j; k < c; k++)
                  index[k] = index[k - 1] + 1
              ok = true
              break
          }
      }
  }

  return result
}


export default App;
