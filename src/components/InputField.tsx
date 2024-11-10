import { FC } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import './../style.css'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

const InputField: FC<Props> = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Искать' }) => (
    <InputGroup className="mb-3">
        <Form.Control
          placeholder={placeholder}
          aria-label="Recipient's username"
          aria-describedby="search"
		  value={value}
		  onChange={(event => setValue(event.target.value))}
        />
         <Button disabled={loading} onClick={onSubmit} className="mybutton">
           {buttonTitle}
	      </Button>
    </InputGroup>
)

export default InputField