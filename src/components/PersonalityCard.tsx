import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import './../style.css'
import default_image from "../1.png";

interface Props {
    image: string
    name: string
    type: string
    id: number
    imageClickHandler: () => void;
    addToApplication: () => void;
}

export const PersonalityCard: FC<Props> = ({
    id,
    name,
    type,
    image,
    imageClickHandler,
    addToApplication
  }) => {
  
    return (
      <Card className='mycard'>
        <Card.Img
          variant="top"
          src={image || default_image}
          onClick={imageClickHandler}
        />
        <Card.Body>
            <Card.Title onClick={imageClickHandler}>{name}</Card.Title>
            <Card.Text>{type}</Card.Text>
        </Card.Body>
      </Card>
    );
  };