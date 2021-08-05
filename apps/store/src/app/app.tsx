import styled from 'styled-components';
import { Route, useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Header } from '@nxegghead/store/ui-shared';
import { formatRating } from '@nxegghead/store/formatters';
import { StoreFeatureGameDetail } from '@nxegghead/store/feature-game-detail';
import { useEffect, useState } from 'react';
import { IGame } from '@nxegghead/api/util-interfaces';

const StyledApp = styled.div`
  .games-layout {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .container {
    max-width: 800px;
    margin: 50px auto;
  }

  .game-card {
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .game-rating {
      padding-top: 10px;
    }
  }

  .center-content {
    display: flex;
    justify-content: center;
  }

  .game-details {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .game-card-media {
    height: 140px;
  }
`;

export const App = () => {
  const history = useHistory()

  const [state, setState] = useState<{
    data: IGame[],
    loadingState: 'success' | 'error' | 'loading'
  }>({ data: [], loadingState: 'success' })

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading'
    })

    fetch('api/games')
      .then(x => x.json())
      .then(res => {
        setState({
          ...state,
          data: res,
          loadingState: 'success'
        })
      })
      .catch(err => {
        setState({
          ...state,
          loadingState: 'error'
        })
      })
  }, [])

  return (
    <StyledApp>
      <Header title="Board Game Hoard" />
      <div className="container" data-testid="app-container">
        <div className="games-layout">
          {state.loadingState === 'loading' && 'loading'}
          {state.loadingState === 'error' && <div>'Error retrieving Data'</div> }
          {state.loadingState === 'success' && state.data.map(x => (
            <Card key={x.id} className="game-card" onClick={() => history.push(`/game/${x.id}`)}>
              <CardActionArea>
                <CardMedia
                  className="game-card-media"
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="game-rating"
                  >
                    <strong>Rating:</strong> {formatRating(x.rating)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
      <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </StyledApp>
  );
};

export default App;
