import { RouteComponentProps } from 'react-router-dom'
import {Card, CardActionArea, Typography} from "@material-ui/core";


type TParam = {
  id: string
}

export type StoreFeatureGameDetailProps = RouteComponentProps<TParam>

export function StoreFeatureGameDetail(props: StoreFeatureGameDetailProps) {
  const { match: { params: { id } } } = props
  return (
    <div className="container">
      <Card>
        <CardActionArea>
          <Typography variant="body2" color="textSecondary" component="p">
            {id}
          </Typography>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default StoreFeatureGameDetail;
