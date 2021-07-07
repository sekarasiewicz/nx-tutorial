import styled from "styled-components";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { getAllGames } from '../fake-api'
import { Header } from "@nxegghead/store/ui-shared";

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
`
export const App = () => {
  return (
    <StyledApp>
    <Header />
    <div className="container">
      <div className="games-layout">
        {getAllGames().map((x) => (
          <Card key={x.id} className="game-card">
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
                <Typography variant="body2" color="textSecondary" component="p">
                  {x.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className="game-rating"
                >
                  <strong>Rating:</strong> {x.rating}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
    </StyledApp>
  );
}

export default App;
