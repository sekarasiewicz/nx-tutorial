import { RouteComponentProps } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { formatRating } from '@nxegghead/store/formatters'
import { IGame } from '@nxegghead/api/util-interfaces'

type TParam = {
  id: string
}

export type StoreFeatureGameDetailProps = RouteComponentProps<TParam>

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
  const { match: { params: { id } } } = props
  const [state, setState] = useState<{
    data: IGame | null,
    loadingState: 'success' | 'error' | 'loading'
  }>({
    data: null,
    loadingState: 'success'
  })
  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading'
    })
    fetch(`/api/games/${id}`)
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
          loadingState: 'success'
        })
      }).catch((err) => {
        setState({
          ...state,
          loadingState: 'error'
        })
    })
  }, [id])
  let info
  if (state.loadingState === 'loading') {
    info = 'Loading...'
  } else if (state.loadingState === 'error'){
    info = <div>Error fetching data</div>
  }

  return (
    <div className="container">
      {info ? info :
        <Card>
          <CardActionArea>
            <CardMedia
              className="game-card-media"
              image={state.data?.image}
              title={state.data?.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.data?.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="game-rating"
              >
                <strong>Rating:</strong> {formatRating(state.data?.rating || 0)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      }
    </div>
  )
}

export default StoreFeatureGameDetail
